# SwissTech Briefing - Mobile App Deployment Guide

This guide outlines the steps to build and deploy the mobile application using **Expo (EAS)**.

## 🚀 Prerequisites

1.  **Expo CLI**: `npm install -g expo-cli`
2.  **EAS CLI**: `npm install -g eas-cli`
3.  **Expo Account**: Log in at [expo.dev](https://expo.dev).

## 🛠️ Build Profiles (`eas.json`)

We have defined three main build profiles:
*   **`development`**: For local testing with Expo Go or a development client.
*   **`preview`**: For internal testing (Android APK or iOS Internal Distribution).
*   **`production`**: Final build for App Store / Play Store.

## 📦 Building for Android

### Internal Testing (APK)
```bash
eas build --profile preview --platform android
```
Download the resulting APK and install it on any Android device.

### Production (AAB)
```bash
eas build --profile production --platform android
```

## 🍎 Building for iOS

### Internal Testing (TestFlight Prep)
```bash
eas build --profile preview --platform ios
```
*Note: Requires an Apple Developer Program membership.*

### Production
```bash
eas build --profile production --platform ios
```

## 🔔 Push Notifications

1.  Initialize the project: `eas project:init`
2.  Follow the prompts to create a new project on Expo.
3.  Update the `projectId` in `app.json` > `extra.eas.projectId`.
4.  Push notifications require a physical device.

## ✅ Release Checklist

*   [ ] Increment version in `app.json`.
*   [ ] Run `npm install` to ensure all lockfiles are up to date.
*   [ ] Verify `apiUrl` and `apiKey` in `app.json` (Fase 2.0 uses hardened production settings).
*   [ ] Test Pull-to-Refresh and Search on a real device.
*   [ ] Check that Support CTAs open the browser correctly.
