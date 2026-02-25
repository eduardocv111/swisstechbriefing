# SwissTech Briefing API v1 Documentation (Hardenened for Mobile)

This documentation outlines the stable API v1 for SwissTech Briefing.

## Base URL
`https://swisstechbriefing.ch/api/v1`

## Security & Reliability
- **Header Auth:** `x-api-key` is required for all requests.
- **Rate Limiting:** Initial limit is 100 requests per minute per IP.
- **CORS:** Configured via `ALLOWED_ORIGINS` in `.env`.
- **Response Format:** Standardized JSON with `status`, `version`, and `requestId`.

---

## Standard Response Structure
```json
{
  "status": "success",
  "version": "1.1",
  "requestId": "abc123yz",
  "data": { ... },
  "metadata": {
    "timestamp": "2026-02-25T14:30:00Z"
  }
}
```

---

## New Endpoints (v1.1)

### 1. Home Dashboard (Composite)
**Endpoint:** `GET /home`
**Payload:** `{ featured, latest, categories }`
**Benefit:** Reduces initial app load time with a single request.

### 2. Related Articles
**Endpoint:** `GET /articles/related?slug=[target-slug]`
**Params:** `slug` (required), `limit` (default 3), `locale`.

---

## Existing Endpoints (Standardized)

- `GET /articles/latest`
- `GET /articles/[slug]`
- `GET /categories`
- `GET /categories/[slug]/articles`
- `GET /search?q=...`

---

## Error Codes
- `UNAUTHORIZED`: Invalid or missing API key.
- `TOO_MANY_REQUESTS`: Rate limit exceeded.
- `VALIDATION_ERROR`: Missing or invalid parameters.
- `NOT_FOUND`: Resource not found.
- `INTERNAL_ERROR`: Unexpected server error.

---

## Proposed Contract for Mobile App

1. **RequestId:** Always log `requestId` in your app's debug logs for troubleshooting.
2. **CORS:** Ensure your app's domain (if using a webview) or local bundle is in `ALLOWED_ORIGINS`.
3. **Images:** Always use absolute `imageUrl` provided in the JSON.
4. **Auth Storage:** Store the `x-api-key` in secure storage (KeyChain/EncryptedSharedPreferences).
