/**
 * Newsletter Configuration
 * Centralized settings for Sender.net integration
 */

export const NEWSLETTER_CONFIG = {
    // These should be moved to .env in production
    listId: process.env.SENDER_LIST_ID || "",
    endpoint: "https://api.sender.net/v2/subscribers",

    // UI Strings (Fallback in case dictionary is missing)
    defaultLocale: "de-CH",
    messages: {
        "de-CH": {
            title: "SwissTech Briefing Newsletter",
            description: "Analysen zu KI, Startups und digitaler Souveränität. Direkt in Ihre Inbox.",
            placeholder: "E-Mail-Adresse",
            button: "ABONNIEREN",
            button_loading: "Wird gesendet...",
            consent: "Ich möchte den Newsletter von SwissTech Briefing erhalten und stimme der Verarbeitung meiner Daten gemäss Datenschutzerklärung zu.",
            success: "Bitte prüfe deinen Posteingang und bestätige deine Anmeldung.",
            error_duplicate: "Diese E-Mail-Adresse ist bereits registriert.",
            error_generic: "Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.",
            error_email: "Bitte gib eine gültige E-Mail-Adresse ein.",
            error_consent: "Bitte stimme der Datenschutzerklärung zu.",
            trust_note: "Kostenlos. Abmeldung jederzeit möglich.",
            privacy_note: "Datenschutz",
            imprint_note: "Impressum"
        }
    }
};

export interface NewsletterSubmission {
    email: string;
    consent: boolean;
}
