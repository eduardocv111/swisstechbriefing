# 🛡️ AI Engine Supervisor: Control-Plane Architecture

This document outlines the specialized orchestration layer designed to stabilize, monitor, and automate the SwissTech Briefing AI pipeline.

---

## 🏗️ 1. Supervisor Control-Plane
The **Supervisor** (`ai_engine/supervisor/supervisor.js`) acts as the central brain of the AI Engine. It transitions the system from a collection of loose scripts to a robust, managed service.

### Key Responsibilities:
- **Pipeline Orchestration:** Sequences Trend Scanning, Deep Research, Generation, Translation, and Publishing.
- **Dynamic Scheduling (Heartbeat):** Manages high-frequency maintenance (e.g., 5-minute Market Data updates) alongside low-frequency AI content cycles (e.g., 1-hour intervals).
- **Resource Concurrency:** Prevents GPU/CPU collisions by pausing non-critical maintenance tasks (Market updates) while the intensive AI model pipeline is active.

---

## 🩺 2. Health Check System
Before any resource-intensive operation starts, the Supervisor executes a comprehensive health sweep via `health.js`.

| Check | Target | Purpose |
| :--- | :--- | :--- |
| **Ollama** | `localhost:11434` | Verifies models (Llama3.1, Flux) are ready for inference. |
| **OpenClaw** | `localhost:18789` | Ensures the local monitoring gateway is reachable. |
| **Disk IO** | `/public/assets` | Verifies write permissions and path availability for images/videos. |
| **Database** | `stb.db` | Confirms Prisma connectivity before committing content. |

---

## 🔄 3. Resilience & Retry Policy
Implemented in `retryPolicy.js`, the supervisor applies an **Exponential Backoff with Jitter** strategy to all critical external calls.

- **Retries:** Default 3 attempts for network-sensitive tasks.
- **Fail-Safe Mechanism:** If a non-critical component fails (e.g., Video generation), the Supervisor performs a "Graceful Degradation," publishing the article with images only rather than failing the entire cycle.

---

## 📡 4. OpenClaw Integration
The Supervisor reports all lifecycle events to the **OpenClaw Local Gateway** for real-time monitoring and debugging.

- **Security:** Uses `OPENCLAW_TOKEN` via Bearer authentication.
- **Event Logging:** Reports `PIPELINE_START`, `TOPIC_SELECTED`, `HEARTBEAT_SUCCESS`, and `PIPELINE_FAILURE`.
- **Visibility:** Failures are instantly visible in the OpenClaw Dashboard, including stack traces and context metadata.

---

## 🖤 5. Black Box Diagnostics
When a "Critical Failure" occurs that retries cannot resolve, the **Diagnostics Module** (`diagnostics.js`) triggers.

### The "Black Box" Report:
- **Location:** `ai_engine/supervisor/reports/ISSUE_[TIMESTAMP].md`
- **Content:** Exact error log, pipeline stage, model status, and a direct briefing for the AI Assistant (Antigravity).
- **Usage:** This allows the AI Assistant to "read" what happened during autonomous hours and propose an immediate patch upon the next human interaction.

---

## ⚡ 6. Post-Publish Revalidation
To solve static asset caching and "hidden image" issues, the Supervisor triggers a specialized **Next.js Revalidation Flow**.

1. **API Trigger:** Calls `/api/admin/revalidate` with the specific article slug.
2. **Global Sync:** Forces the Next.js cache to refresh across all locales (DE, FR, IT, ES, EN).
3. **Headless Verification:** Performs a `HEAD` request with a cache-buster query string to confirm the final image is physically reachable by the public CDN/Proxy.

---

## 📂 7. Directory Structure
- `ai_engine/supervisor/supervisor.js`: Main service runner.
- `ai_engine/supervisor/health.js`: Environment validator.
- `ai_engine/supervisor/diagnostics.js`: Error reporting engine.
- `ai_engine/supervisor/reports/`: Storage for diagnostic logs (The Black Box).
- `ai_engine/supervisor/tools/web-refresh.js`: Next.js revalidation utility.

---
*Created by Antigravity AI for SwissTech Briefing Clean Engine.*
