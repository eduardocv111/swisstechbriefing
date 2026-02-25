# SwissTech Briefing Mobile Strategy & Architecture (v1)

## 1. Tactical Decision: React Native + Expo (TypeScript)
**Recommendation:** We will go with **React Native + Expo**.

### Why?
1. **Developer Velocity:** Expo's development workflow (EAS, OTA Updates) is 2-3x faster than pure native or standard React Native.
2. **Web Synergy:** Your existing backend/frontend is Next.js/TypeScript. We can share types and business logic between the web and the mobile app.
3. **Performance:** For a content-heavy app like SwissTech Briefing, React Native's "Native Components" provide better scroll performance than Flutter's canvas-drawn UI for complex text rendering.
4. **Maintenance:** One codebase for iOS and Android.

---

## 2. MVP Definition (Version 1)

### Screens & Flow
1. **Home (The Pulse):** Featured hero article + Horizontal category chips + Latest vertical feed. 
2. **Kategorien (The Library):** Grid view of all 4 main categories. Tapping opens a paginated list.
3. **Suche (Discovery):** Real-time search with history.
4. **Artikel-Detail (The Reader):** Optimized typography, high-res images, "Related Articles" footer.
5. **Mehr (Settings/Legal):** Dark/Light mode toggle, Newsletter signup (Fase 1: Link/WebView), Legal links (Impressum/Datenschutz).

### Premium Mobile Features (V1)
- **Skeleton Loading:** Shimmer effects instead of spinners.
- **Haptic Feedback:** Subtle vibrations on button taps and successful searches.
- **Biometric Ready:** Base structure ready for secure login in V2.
- **Sharing:** Native OS Share sheets.
- **Offline Cache:** Reading articles already opened while offline.

---

## 3. UX/UI Design Guidelines (Swiss Tech Editorial)

### Visual Language
- **Accent Color:** `#e11d48` (Rose 600) — used for CTAs and highlights.
- **Background:** 
  - Dark: `#0a0a0a` (OLED Black)
  - Light: `#fdfdfd` (Soft Paper)
- **Typography:** 
  - Headlines: **Outfit** or **Inter Tight** (Bold/ExtraBold).
  - Body: **Inter** (Regular, 16pt-18pt) for maximum readability.
- **Spacing:** 8px grid system (4, 8, 16, 24, 32).

### Navigation Architecture
- **Bottom Tab Bar:** 4 Main Icons: `Home`, `Categories`, `Search`, `More`.
- **Top Bar:** Large Headlines that shrink on scroll (iOS Style).

---

## 4. Technical Architecture

### Folder Structure (Scalable)
```text
/mobile
  /src
    /api          # Typed client (Axios + TanStack Query)
    /components   # UI Kit (Buttons, Cards, Typography)
    /features     # Business domains (Home, ArticleReader, Search)
    /hooks        # Shared logic (useTheme, useAuth)
    /navigation   # React Navigation Stacks/Tabs
    /store        # Global state (Zustand)
    /theme        # Design tokens
    /utils        # Formatting, image helpers
  /assets         # Fonts, icons, splash
```

### Stack Detail
- **State Management:** **Zustand** (Ultra-lightweight).
- **Data Fetching:** **TanStack Query (v5)** (Handles cache, retries, and pagination automatically).
- **Styling:** **NativeWind** (Tailwind CSS for React Native) for 1:1 parity with your web styling.
- **Storage:** **Expo Secure Store** (for API keys) + **MMKV** (for high-speed local cache).

---

## 5. Phase 2 Roadmap (Expansion)

### 5.1 Push Notifications
We will use **Expo Notifications** connected to **FCM (Android)** and **APNs (iOS)**. The architecture already includes a `deviceToken` field placeholder in the local store.

### 5.2 Monetization (Revenue Manager)
We will implement "Soft CTAs" at the end of articles. Instead of a hard paywall, we will promote the **Google Reader Revenue Manager** contribution page via a secure In-App Browser (`expo-web-browser`).

### 5.3 Dedicated Newsletter Screen
In Phase 2, we will move from a WebView to a native form directly connected to your `src/app/api/v1/newsletter` (to be created) for a 1-tap subscription experience.

---

## 6. Implementation Checklist (Step by Step)

### Phase 1: Setup
- [ ] Initialize Expo project with TypeScript.
- [ ] Setup NativeWind for styling.
- [ ] Configure Environment Variables (`API_BASE_URL`, `STB_API_KEY`).

### Phase 2: Core Engine
- [ ] Create `ApiClient` with x-api-key header and standard error handling.
- [ ] Implement `useHome` and `useArticle` hooks.
- [ ] Build UI Kit (Premium Article Card).

### Phase 3: Polish
- [ ] Add Skeleton loaders.
- [ ] Implement deep linking (`swisstech://artikel/slug`).
- [ ] Beta testing via Expo Orbit / TestFlight.
