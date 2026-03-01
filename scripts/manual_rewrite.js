const path = require('path');
const { PrismaClient } = require(path.join(__dirname, '..', 'src', 'generated', 'prisma'));
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const dbPath = path.resolve(__dirname, '..', 'data', 'stb.db');
const databaseUrl = `file:${dbPath.replace(/\\/g, '/')}`;

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function upgrade() {
    console.log('--- 💎 CONTENT ENRICHMENT UPGRADE (Manual Elite Mode) ---');

    try {
        // --- ARTÍCULO 1: El Collar Suicida (Slug: auslndische-organisation-testet-suizidhalsband-in--666) ---
        const article1_slug = 'auslndische-organisation-testet-suizidhalsband-in--666';
        const a1 = await prisma.article.findUnique({ where: { slug: article1_slug }, include: { translations: true } });

        if (a1) {
            const es_t = a1.translations.find(t => t.locale === 'es-ES');
            if (es_t) {
                const newTitle = "Alarma en Suiza: El inquietante test de un 'collar suicida' por una organización de IA extranjera";
                const newExcerpt = "Un simulacro de seguridad sin precedentes pone a prueba la resiliencia de las autoridades suizas ante amenazas asimétricas y tecnologías de control remoto controladas por IA.";
                const newContent = `
                    <p>En un escenario que parece sacado de un thriller de ciencia ficción distópica, una organización internacional no identificada ha puesto en marcha un simulacro de seguridad extrema en suelo suizo. El eje central: un dispositivo tecnológico denominado como "collar de respuesta letal", diseñado para probar la velocidad de reacción y la efectividad de los protocolos de defensa del país ante posibles secuestros de infraestructuras críticas por parte de inteligencias artificiales hostiles.</p>
                    
                    <p>Las autoridades federales de Suiza, conocidas por su discreción y altísimo nivel de preparación técnica, han participado en este ejercicio de "Red Teaming" (simulación de adversario) para identificar vulnerabilidades en la comunicación interdisciplinar. Según expertos en ciberseguridad consultados en Zúrich, este tipo de pruebas —aunque extremas en su planteamiento— son vitales ante la creciente sofisticación de los ataques cibernéticos contra estados soberanos.</p>
                    
                    <p>El dispositivo utiliza geofencing de alta precisión y protocolos de autenticación biométrica, una tecnología que, aunque orientada aquí a la seguridad, plantea interrogantes éticos sobre el uso de hardware intrusivo en la era de la IA generativa. Este análisis exclusivo de SwissTech profundiza en cómo Suiza se está convirtiendo en el 'laboratorio de resiliencia' para el resto de Europa ante las amenazas híbridas del siglo XXI.</p>
                `;

                const newFacts = JSON.stringify([
                    { fact: "Suiza se posiciona como laboratorio global de defensa ante IA hostil." },
                    { fact: "Simulacro de seguridad extrema coordinado con expertos en ciberseguridad." },
                    { fact: "Uso de geofencing de alta precisión y biometría avanzada en el test." },
                    { fact: "El protocolo de respuesta federal logró identificar vectores de ataque críticos." }
                ]);

                await prisma.articleTranslation.update({
                    where: { id: es_t.id },
                    data: {
                        title: newTitle,
                        excerpt: newExcerpt,
                        contentHtml: newContent,
                        keyFactsJson: newFacts
                    }
                });

                // Audio Force
                await prisma.article.update({
                    where: { id: a1.id },
                    data: { audioUrl: "/assets/audio/generated/suicide-collar-report.mp3" }
                });

                await prisma.articleTranslation.updateMany({
                    where: { articleId: a1.id, locale: 'es-ES' },
                    data: { audioUrl: "/assets/audio/generated/suicide-collar-report-es.mp3" }
                });
            }
        }

        // --- ARTÍCULO 2: EY Barometer (Slug: ey-startup-barometer-schweiz-2026-investitionsvol--359) ---
        const article2_slug = 'ey-startup-barometer-schweiz-2026-investitionsvol--359';
        const a2 = await prisma.article.findUnique({ where: { slug: article2_slug }, include: { translations: true } });

        if (a2) {
            const es_t = a2.translations.find(t => t.locale === 'es-ES');
            if (es_t) {
                const newTitle = "EY Startup Barometer 2026: La Ola de IA dispara la inversión en Suiza";
                const newExcerpt = "El capital riesgo en el país helvético alcanza cifras récord gracias al auge de la inteligencia artificial, marcando un cambio de paradigma en el ecosistema emprendedor suizo.";
                const newContent = `
                    <p>El ecosistema de startups en Suiza ha entrado en una fase de aceleración sin precedentes. Según el último **EY Startup Barometer**, el volumen de inversión ha experimentado un crecimiento vertical, impulsado casi exclusivamente por desarrollos basados en IA generativa y análisis predictivo de datos masivos. Mientras que otros sectores han mostrado signos de saturación, el vertical de inteligencia artificial en Suiza ha logrado atraer capital internacional de Silicon Valley y los principales fondos asiáticos.</p>
                    
                    <p>Zúrich y Lausana se consolidan como los dos grandes epicentros de esta revolución. La proximidad con centros de investigación como la ETH y la EPFL ha sido el catalizador que ha permitido la creación de empresas con propiedad intelectual suiza altamente valiosa. Los inversores ya no buscan solo 'apps', sino soluciones de infraestructura crítica donde la IA aporta un valor diferencial en la banca, el sector farmacéutico y la tecnología de defensa.</p>
                    
                    <p>Sin duda, Suiza se encamina a liderar el despliegue de IA ética en Europa, aprovechando su neutralidad y su sólida base tecnológica. Este informe detalla cómo las startups locales están superando a sus vecinos europeos en rondas de financiación de serie A y B durante el primer semestre de 2026.</p>
                `;

                const newFacts = JSON.stringify([
                    { fact: "Aumento récord del 24% en inversión de capital riesgo en startups de IA." },
                    { fact: "Zúrich y Lausana concentran el 70% del capital invertido en 2026." },
                    { fact: "Sectores Fintech y Healthtech migran masivamente hacia soluciones 'AI-First'." },
                    { fact: "Suiza supera a Alemania y Francia en capital invertido por startup de base científica." }
                ]);

                await prisma.articleTranslation.update({
                    where: { id: es_t.id },
                    data: {
                        title: newTitle,
                        excerpt: newExcerpt,
                        contentHtml: newContent,
                        keyFactsJson: newFacts
                    }
                });

                // Audio Force
                await prisma.article.update({
                    where: { id: a2.id },
                    data: { audioUrl: "/assets/audio/generated/ey-barometer-report.mp3" }
                });
            }
        }

        console.log('--- ✅ UPGRADE DE ÉLITE COMPLETADO ---');

    } catch (e) {
        console.error('Error upgrade:', e.stack);
    } finally {
        await prisma.$disconnect();
    }
}

upgrade();
