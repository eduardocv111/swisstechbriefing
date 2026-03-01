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

    console.log(`[${new Date().toISOString()}] Update cycle complete.`);

    // Wait for the next run
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
