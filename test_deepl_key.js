const translator = require('./ai_engine/translator.js');

async function testApiKey() {
    console.log("🚀 Iniciando prueba de API Key de DeepL...");
    const testArticle = {
        title: "Test de traducción profesional",
        excerpt: "Esta es una prueba de la nueva clave de API.",
        contentHtml: "<p>Hola mundo, esto es una prueba de integración con DeepL Pro.</p>",
        expertQuote: "La tecnología es el futuro.",
        keyFacts: ["Dato 1", "Dato 2"]
    };

    try {
        const results = await translator.translateArticle(testArticle, ['en']);
        if (results.length > 0 && results[0].title) {
            console.log("✅ ¡ÉXITO! Traducción recibida:");
            console.log("EN Title:", results[0].title);
            console.log("EN Content:", results[0].contentHtml);
        } else {
            console.error("❌ Fallo en la prueba: No se recibieron resultados.");
        }
    } catch (err) {
        console.error("❌ Error crítico en la prueba:", err.message);
        if (err.message.includes("quota")) {
            console.error("⚠️ La cuota sigue excedida o la clave no tiene créditos.");
        } else if (err.message.includes("Authorization")) {
            console.error("⚠️ Error de autorización: La clave parece inválida.");
        }
    }
}

testApiKey();
