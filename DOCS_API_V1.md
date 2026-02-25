# SwissTech Briefing API v1 Documentation

This documentation outlines the stable API v1 for SwissTech Briefing, designed for integration with mobile apps (React Native, Flutter) and third-party services.

## Base URL
`https://swisstechbriefing.ch/api/v1`

## Security
All requests must include the following header:
- `x-api-key`: Your secret API key (provided in `.env` as `STB_API_KEY`)

---

## 1. Latest Articles
**Endpoint:** `GET /articles/latest`

**Query Parameters:**
- `locale` (optional): `de-CH` (default), `fr-CH`, `it-CH`, `en-US`.
- `limit` (optional): Number of articles to return (default: 10, max: 100).

**Example Response:**
```json
{
  "status": "success",
  "count": 1,
  "data": [
    {
      "id": "uuid",
      "slug": "article-slug",
      "title": "Article Title",
      "excerpt": "Short summary...",
      "category": "KI",
      "imageUrl": "https://swisstechbriefing.ch/assets/...",
      "publishedAt": "2026-02-25T12:00:00Z",
      "author": "Redaktion",
      "webUrl": "https://swisstechbriefing.ch/de-CH/artikel/article-slug"
    }
  ],
  "metadata": {
    "locale": "de-CH",
    "timestamp": "2026-02-25T14:30:00Z"
  }
}
```

---

## 2. Categories
**Endpoint:** `GET /categories`

**Example Response:**
```json
{
  "status": "success",
  "version": "1.0",
  "data": [
    { "id": "ki", "slug": "ki", "label": "KI" },
    { "id": "startups", "slug": "startups", "label": "Startups" }
  ]
}
```

---

## 3. Articles by Category
**Endpoint:** `GET /categories/[slug]/articles`

**Query Parameters:**
- `locale` (optional): Language.
- `page` (optional): Page number (default: 1).
- `limit` (optional): Articles per page (default: 20).

**Example Response:**
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

## 4. Search
**Endpoint:** `GET /search`

**Query Parameters:**
- `q`: Search query (min 2 chars).
- `locale`: Language.
- `page`: Page number.
- `limit`: Articles per page.

---

## 5. Article Detail
**Endpoint:** `GET /articles/[slug]`

**Query Parameters:**
- `locale`: Language.

**Example Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "title": "...",
    "contentHtml": "<div>Full article content...</div>",
    "author": { "name": "...", "role": "..." },
    ...
  }
}
```

---

## Proposed Contract for Mobile App (Flutter/React Native)

For a robust app integration, the app should follow these rules:
1. **Caching:** Implement local SQLite/Hive caching for the feed. Use a 15-30 minute TTL.
2. **HTML Rendering:** Use `flutter_widget_from_html` (Flutter) or `react-native-render-html` (React Native) to display `contentHtml`.
3. **Images:** Use `CachedNetworkImage` for efficiency.
4. **Auth:** Store the `x-api-key` securely in `EncryptedSharedPreferences` (Android) or `KeyChain` (iOS).
5. **Errors:** Handle `401` by showing a "Connectivity/License Error" and `404` by showing "Content not found".
