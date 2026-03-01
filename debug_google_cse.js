const axios = require('axios');
require('dotenv').config();

/**
 * Super Simple Debug Script for Google Custom Search API
 * Explicitly tests the credentials provided.
 */
async function testGoogleCSE() {
    console.log("--- GOOGLE CSE CREDENTIALS CHECK ---");
    const apiKey = process.env.GOOGLE_CSE_API_KEY;
    const cseId = process.env.GOOGLE_CSE_ID;

    console.log(`🔑 API Key (Prefix): ${apiKey ? apiKey.substring(0, 5) + '...' : 'MISSING'}`);
    console.log(`🆔 CSE ID: ${cseId || 'MISSING'}`);

    if (!apiKey || !cseId) {
        console.error("❌ ERROR: Missing credentials in .env file.");
        return;
    }

    try {
        console.log("\n📡 Sending request to Google Custom Search API...");
        const url = 'https://www.googleapis.com/customsearch/v1';
        const response = await axios.get(url, {
            params: {
                key: apiKey,
                cx: cseId,
                q: 'Swiss Tech News',
                num: 1
            },
            timeout: 5000
        });

        if (response.data && response.data.items) {
            console.log("✅ SUCCESS! Internal API Connection Working.");
            console.log(`📄 First Result: ${response.data.items[0].title}`);
            console.log(`🔗 Link: ${response.data.items[0].link}`);
        } else {
            console.warn("⚠️ Request succeeded but no results were found for this query.");
            console.log("Raw Response Data:", JSON.stringify(response.data, null, 2));
        }

    } catch (error) {
        console.error("\n❌ API REQUEST FAILED");
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Message:`, JSON.stringify(error.response.data, null, 2));

            if (error.response.status === 403) {
                console.log("\n💡 PRO-TIP: Check if Google 'Custom Search API' is ENABLED in your Cloud Console.");
                console.log("Visit: https://console.cloud.google.com/apis/library/customsearch.googleapis.com");
            }
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
}

testGoogleCSE();
