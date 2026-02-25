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
            placeholder: "Email Adresse",
            button: "Abonnieren",
            consent: "Ich stimme zu, dass SwissTech Briefing mich per E-Mail kontaktiert.",
            success: "Vielen Dank! Bitte prüfen Sie Ihren Posteingang zur Bestätigung.",
            error_duplicate: "Sie sind bereits angemeldet.",
            error_generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es später erneut.",
            privacy_note: "Datenschutz",
            imprint_note: "Impressum"
        }
    }
};

export interface NewsletterSubmission {
    email: string;
    consent: boolean;
}
