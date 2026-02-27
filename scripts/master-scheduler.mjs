import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const UPDATE_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

const scripts = [
    'scripts/update-macro-snapshot.mjs',
    'scripts/update-snb-snapshot.mjs',
    'scripts/update-swiss-open-data.mjs'
];

async function runUpdate() {
    console.log(`[${new Date().toISOString()}] Starting scheduled data update...`);

    for (const script of scripts) {
        try {
            console.log(`Running: ${script}`);
            const { stdout, stderr } = await execAsync(`node ${script}`);
            if (stdout) console.log(stdout.trim());
            if (stderr) console.error(`Error in ${script}:`, stderr.trim());
        } catch (error) {
            console.error(`Failed to execute ${script}:`, error.message);
        }
    }

    console.log(`[${new Date().toISOString()}] Update cycle complete. Notifying server to revalidate...`);

    // Notify the Next.js server to refresh the home and other pages
    try {
        const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const apiKey = process.env.STB_API_KEY || 'SwissTech_App_Secret_2026_!#';

        const response = await fetch(`${url}/api/admin/revalidate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: 'full' })
        });

        if (response.ok) {
            console.log(`[Revalidation] Server notified successfully: ${response.statusText}`);
        } else {
            console.error(`[Revalidation] Server notification failed: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.error(`[Revalidation] Error notifying server: ${err.message}`);
    }

    console.log(`[${new Date().toISOString()}] Next run in 40 minutes.`);
}

async function start() {
    console.log("=== SwissTech Briefing Data Scheduler Started ===");
    console.log(`Update Interval: ${UPDATE_INTERVAL_MS / (60 * 1000)} minutes`);

    // Initial run
    await runUpdate();

    // Set interval loop
    setInterval(async () => {
        await runUpdate();
    }, UPDATE_INTERVAL_MS);
}

start();
