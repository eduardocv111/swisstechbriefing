const { researchFromTitle } = require('./index');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '..', '.env') });

const testTitle = process.argv[2] || "KI-Regulierung Schweiz 2024";

async function runTest() {
    console.log(`[Test-Research] 🕵️ Testing with query: "${testTitle}"`);
    const result = await researchFromTitle(testTitle);

    if (result.ok) {
        console.log(`[Test-Research] ✅ SUCCESS!`);
        console.log(`[Test-Research] 📊 Stats:`, result.stats);
        console.log(`[Test-Research] 📡 Sources:`, result.sources);
        console.log(`[Test-Research] 📖 Bundle Preview (500 chars):`);
        console.log('-'.repeat(50));
        console.log(result.bundleText.substring(0, 500));
        console.log('-'.repeat(50));
    } else {
        console.error(`[Test-Research] ❌ FAILED: ${result.reason}`);
        console.error(`[Test-Research] 📊 Stats:`, result.stats);
    }
}

runTest();
