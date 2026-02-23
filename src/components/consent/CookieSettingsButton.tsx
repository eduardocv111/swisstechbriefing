'use client';

/**
 * Button that opens the cookie preferences modal.
 * Dispatches a custom event caught by CookieBanner.
 * Use in Footer or anywhere you want a "change cookies" link.
 */
export default function CookieSettingsButton() {
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent('stb-open-cookie-prefs'));
    };

    return (
        <button
            onClick={handleClick}
            className="hover:text-primary transition-colors cursor-pointer text-left"
            type="button"
        >
            Cookie-Einstellungen
        </button>
    );
}
