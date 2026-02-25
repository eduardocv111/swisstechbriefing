"use server";

import { z } from "zod";
import { NEWSLETTER_CONFIG } from "@/lib/newsletter";

const newsletterSchema = z.object({
    email: z.string().email("Ungültige E-Mail-Adresse"),
    consent: z.boolean().refine((val) => val === true, "Zustimmung erforderlich"),
    honeypot: z.string().optional(), // Anti-spam honey pot
});

export type NewsletterState = {
    status: "idle" | "loading" | "success" | "error";
    message?: string;
};

/**
 * Server Action for Newsletter Subscription
 * Connects to Sender.net API v2
 */
export async function subscribeToNewsletter(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const consent = formData.get("consent") === "on";
    const honeypot = formData.get("full_name_field") as string; // Honeypot field

    // 1. Basic Anti-Spam (Honeypot)
    if (honeypot) {
        console.warn(`[Newsletter] Potential spam detected for ${email}`);
        return { status: "success", message: "Success" }; // Fake success for bots
    }

    // 2. Validation
    const validatedFields = newsletterSchema.safeParse({
        email,
        consent,
    });

    if (!validatedFields.success) {
        return {
            status: "error",
            message: validatedFields.error.flatten().fieldErrors.email?.[0] ||
                validatedFields.error.flatten().fieldErrors.consent?.[0] ||
                "Validation Error",
        };
    }

    const SENDER_API_TOKEN = process.env.SENDER_API_TOKEN;
    const SENDER_LIST_ID = process.env.SENDER_LIST_ID;

    if (!SENDER_API_TOKEN) {
        console.error("[Newsletter] SENDER_API_TOKEN is missing in environment variables.");
        return { status: "error", message: "Server configuration error." };
    }

    try {
        const response = await fetch(NEWSLETTER_CONFIG.endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${SENDER_API_TOKEN}`,
            },
            body: JSON.stringify({
                email: validatedFields.data.email,
                groups: SENDER_LIST_ID ? [SENDER_LIST_ID] : [],
                trigger_automation: true, // For double opt-in if configured in Sender
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`[Newsletter] Subscriber added successfully: ${email}`);
            return { status: "success" };
        }

        // Handle common Sender.net errors
        // 422 usually means validation error or already exists
        if (response.status === 422) {
            if (data.errors && JSON.stringify(data.errors).includes("taken")) {
                return { status: "success" }; // Silent success if already subscribed
            }
        }

        console.error("[Newsletter] Sender.net API error:", data);
        return { status: "error", message: NEWSLETTER_CONFIG.messages["de-CH"].error_generic };

    } catch (error) {
        console.error("[Newsletter] Network error:", error);
        return { status: "error", message: "Network error. Please try again." };
    }
}
