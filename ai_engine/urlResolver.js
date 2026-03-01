const axios = require("axios");
const cheerio = require("cheerio");
const net = require("net");

const BLOCKED_HOSTS = new Set([
    "google.com", "www.google.com", "consent.google.com", "accounts.google.com",
    "google-analytics.com", "googletagmanager.com", "gstatic.com", "www.gstatic.com",
    "facebook.com", "twitter.com", "instagram.com", "linkedin.com", "apple.com", "microsoft.com",
    "w3.org", "schema.org", "wikipedia.org",
    "localhost", "127.0.0.1", "[::1]", "0.0.0.0"
]);

function isPrivateIP(hostname) {
    if (net.isIP(hostname)) {
        const ip = hostname;
        // RFC 1918 & Local
        if (ip.startsWith('10.') || ip.startsWith('192.168.')) return true;
        if (ip === '127.0.0.1' || ip === '::1' || ip === '0.0.0.0' || ip.startsWith('169.254.')) return true;
        if (ip.startsWith('172.')) {
            const parts = ip.split('.');
            const second = parseInt(parts[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
    }
    return false;
}

const ASSET_EXT_RE = /\.(js|css|png|jpg|jpeg|webp|svg|gif|ico|map|xml|json|txt|pdf|zip|gz)(\?|#|$)/i;

function safeURL(u) {
    try { return new URL(u); } catch { return null; }
}

function isPublisherLike(urlStr) {
    const u = safeURL(urlStr);
    if (!u) return false;
    const host = u.hostname.toLowerCase();

    // Fast block for Google/Social/Tech giants
    if (BLOCKED_HOSTS.has(host)) return false;
    if (isPrivateIP(host)) return false;
    for (const blocked of BLOCKED_HOSTS) {
        if (host.endsWith("." + blocked)) return false;
    }

    if (host.includes('google')) return false;
    if (ASSET_EXT_RE.test(urlStr)) return false;

    // Low requirement: valid URLs are usually > 15 chars
    if (urlStr.length < 15) return false;

    return true;
}

function decodeGoogleNewsLink(googleLink) {
    if (!googleLink || typeof googleLink !== 'string') return null;
    try {
        const match = googleLink.match(/\/(?:rss\/)?articles\/([A-Za-z0-9_-]+)/);
        if (!match) return null;

        let token = match[1];
        token = token.replace(/-/g, '+').replace(/_/g, '/');
        while (token.length % 4 !== 0) token += '=';

        const buffer = Buffer.from(token, 'base64');
        const binary = buffer.toString('binary');

        // Pattern 1: Simple HTTP match
        const urlMatch = binary.match(/https?:\/\/[^\s\x00-\x1F\x7F"'<>]+/i);
        if (urlMatch) {
            let url = urlMatch[0].split(/[^\w\d\.\/\-\:\?\=\&\%\#\+]/)[0];
            if (isPublisherLike(url)) return url;
        }

        // Pattern 2: Binary scrubbing for hidden URLs
        const scrubbed = binary.replace(/[^\x20-\x7E]/g, ' ');
        const secondMatch = scrubbed.match(/https?:\/\/[^\s"'<>]+/i);
        if (secondMatch) {
            let url = secondMatch[0].split(/[^\w\d\.\/\-\:\?\=\&\%\#\+]/)[0];
            if (isPublisherLike(url)) return url;
        }
    } catch (e) { return null; }
    return null;
}

async function resolveGoogleNewsToPublisher(initialUrl) {
    const decoded = decodeGoogleNewsLink(initialUrl);
    if (decoded) return { ok: true, url: decoded, method: "decode:token" };

    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "de-CH,de;q=0.9,en-US;q=0.8,en;q=0.7",
        "Referer": "https://news.google.com/"
    };

    try {
        const res = await axios.get(initialUrl, {
            headers,
            maxRedirects: 15,
            timeout: 8000,
            validateStatus: (status) => status < 500,
        });

        // 1. Follow standard redirect
        const responseUrl = res?.request?.res?.responseUrl || initialUrl;
        if (isPublisherLike(responseUrl)) return { ok: true, url: responseUrl, method: "redirect" };

        // 2. Scan HTML for Meta Refreshes or encoded JS redirects
        const html = typeof res.data === "string" ? res.data : "";

        // Pattern: <meta http-equiv="refresh" content="0;url=https://..."
        const metaMatch = html.match(/url=(https?:\/\/[^"'>\s]+)/i);
        if (metaMatch && isPublisherLike(metaMatch[1])) {
            return { ok: true, url: metaMatch[1], method: "meta-refresh" };
        }

        const allUrls = html.match(/https?:\/\/[^\s\x00-\x1F\x7F"'<>]+/gi) || [];

        for (let cand of allUrls) {
            let clean = cand.replace(/\\x2f/g, '/').replace(/\\/g, '').split(/[^\w\d\.\/\-\:\?\=\&\%\#\+]/)[0];
            // Lowered length requirement from 50 to 20 for more flexibility
            if (isPublisherLike(clean) && clean.length > 20) {
                return { ok: true, url: clean, method: "regex:heuristics" };
            }
        }

        return { ok: false, url: responseUrl, reason: "unresolved_publisher" };
    } catch (e) {
        return { ok: false, url: initialUrl, reason: `error:${e.message}` };
    }
}

module.exports = { resolveGoogleNewsToPublisher, decodeGoogleNewsLink };
