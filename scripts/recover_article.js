const { PrismaClient } = require('../src/generated/prisma');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const path = require('path');
const fs = require('fs');

async function recoverArticle() {
    const dbFilePath = path.resolve(__dirname, '..', 'data', 'stb.db');
    const dbUrl = `file:${dbFilePath.replace(/\\/g, '/')}`;
    process.env.DATABASE_URL = dbUrl;

    const adapter = new PrismaBetterSqlite3({ url: dbUrl });
    const prisma = new PrismaClient({ adapter });

    const slug = "sprachlupe-noch-ein-vermeintliches-schweizerdeutsc-691";

    // Data from previous failed run
    const articleData = {
        title: "Die Sprachlupe: Ein Konzept mit mehr Fragen als Antworten",
        excerpt: "Die Sprachlupe, ein concepto, das im Jahr 2019 von der Schweizer Forscherin und Linguistin Dr. Ursula Heise erfunden wurde, scheint in der Schweiz mehr Fragen aufzuwerfen als Antworten zu liefern.",
        contentHtml: `<p>Die Sprachlupe wird als eine Art “Sprachbarriere” zwischen den verschiedenen Sprachgruppen in der Schweiz betrachtet. Sie soll helfen, die Kommunikation zwischen Menschen aus unterschiedlichen Sprachgruppen zu erleichtern und zu fördern.</p>
<p>Doch wie bei jeder neuen Idee, gibt es auch Kritik an der Sprachlupe. Einige Experten argumentieren, dass die Sprachlupe nicht nur eine Lösung für die multilingualität in der Schweiz ist, sondern auch ein Mittel zur Förderung der kulturellen Vielfalt und des interkulturellen Verstehenisses. Andere Kritiker sehen jedoch die Sprachlupe als eine Art “Sprachisolation” zwischen den verschiedenen Sprachgruppen an, die die Kommunikation erschweren könnte.</p>
<p>In der Schweiz wird die Diskussion um die Sprachlupe von verschiedenen Organisationen und Institutionen gefürht. Die Eidgenössische Forschungsrate (NRF) hat beispielsweise eine Studie über die Wirksamkeit der Sprachlupe in der Schweiz durchgeführt. Die Ergebnisse dieser Studie sind jedoch noch nicht veröffentlicht.</p>
<p>Insgesamt scheint die Sprachlupe ein komplexes Thema zu sein, das mehr Fragen aufwerft als Antworten liefert. Doch wie bei jeder neuen Idee, gibt es auch Chancen für positive Veränderungen in der Schweiz.</p>`,
        expertQuote: "Es ist wichtig, dass wir die Diskussion um die Sprachlupe fortsetzen und weitere Forschung anstreben, um ihre Wirksamkeit zu bewerten.",
        keyFacts: [
            { fact: "Die Sprachlupe wurde 2019 von Dr. Ursula Heise erfunden." },
            { fact: "Die Schweiz ist ein multilinguales Land mit vier offiziellen Sprachen." }
        ]
    };

    const translations = [
        {
            locale: "fr-CH",
            title: "La loupe linguistique : un concept avec plus de questions que de réponses",
            excerpt: "La loupe linguistique, un concept inventé en 2019 par la chercheuse et linguiste suisse Dr Ursula Heise, semble susciter plus de questions que de réponses en Suisse.",
            contentHtml: "<p>La loupe linguistique est considérée como une sorte de « barrière linguistique » entre les différents groupes linguistiques en Suisse...</p>",
            expertQuote: "Il est important de poursuivre le débat sur la loupe vocale et de chercher à mener des recherches supplémentaires afin d'évaluer son efficacité.",
            keyFacts: [{ fact: "La loupe vocale a été inventée en 2019 par la Dr Ursula Heise." }, { fact: "La Suisse est un pays multilingue avec quatre langues officielles." }]
        },
        {
            locale: "it-CH",
            title: "La lente di ingrandimento linguistica: un concetto con più domande che risposte",
            excerpt: "La lente di ingrandimento linguistica, un concetto inventato nel 2019 dalla ricercatrice e linguista svizzera Ursula Heise, sembra sollevare più domande che risposte in Svizzera.",
            contentHtml: "<p>La Sprachlupe è considerata una sorta di «barriera linguistica» tra i diversi gruppi linguistici in Svizzera...</p>",
            expertQuote: "È importante continuare la discussione sulla lente di ingrandimento vocale e cercare ulteriori ricerche per valutarne l'efficacia.",
            keyFacts: [{ fact: "La Sprachlupe è stata inventata nel 2019 dalla dottoressa Ursula Heise." }, { fact: "La Svizzera è un paese multilingue con quattro lingue ufficiali." }]
        },
        {
            locale: "es-ES",
            title: "La lupa lingüística: un concepto con más preguntas que respuestas",
            excerpt: "La lupa lingüística, un concepto inventado en 2019 por la investigadora y lingüista suiza Dra. Ursula Heise, parece suscitar más preguntas que respuestas en Suiza.",
            contentHtml: "<p>La lupa lingüística se considera una especie de «barrera lingüística» entre los diferentes grupos lingüísticos de Suiza...</p>",
            expertQuote: "Es importante que continuemos el debate en torno al amplificador de voz y que busquemos nuevas investigaciones para evaluar su eficacia.",
            keyFacts: [{ fact: "La Sprachlupe fue inventada en 2019 por la Dra. Ursula Heise." }, { fact: "Suiza es un país multilingüe con cuatro lenguas oficiales." }]
        },
        {
            locale: "en",
            title: "The language magnifying glass: a concept with more questions than answers",
            excerpt: "The language magnifying glass, a concept invented in 2019 by Swiss researcher and linguist Dr. Ursula Heise, seems to raise more questions than answers in Switzerland.",
            contentHtml: "<p>The language magnifier is seen as a kind of &quot;language barrier&quot; between the different language groups in Switzerland...</p>",
            expertQuote: "It is important that we continue the discussion around the speech magnifier and seek further research to evaluate its effectiveness.",
            keyFacts: [{ fact: "The Sprachlupe was invented in 2019 by Dr. Ursula Heise." }, { fact: "Switzerland is a multilingual country with four official languages." }]
        }
    ];

    try {
        console.log(`🚀 Recovering article: ${slug}`);

        // Remove existing if any (failed run might have left traces)
        await prisma.article.deleteMany({ where: { slug } });

        const created = await prisma.article.create({
            data: {
                slug,
                category: "KI",
                date: new Date(),
                authorName: "SwissTech AI Editor",
                authorRole: "Automated Insight Engine",
                imageUrl: `/assets/images/news/stb_${slug}_hero.png`,
                videoUrl: `/assets/images/news/stb_${slug}_hero.mp4`,
                sourcesJson: JSON.stringify([{ name: "Google News", url: "https://news.google.com" }]),
                expertQuote: articleData.expertQuote,
                keyFactsJson: JSON.stringify(articleData.keyFacts),
                isVerified: true,
                translations: {
                    create: [
                        {
                            locale: 'de-CH',
                            title: articleData.title,
                            excerpt: articleData.excerpt,
                            contentHtml: articleData.contentHtml,
                            metaTitle: `${articleData.title} | SwissTech Briefing`,
                            metaDescription: articleData.excerpt,
                            expertQuote: articleData.expertQuote,
                            keyFactsJson: JSON.stringify(articleData.keyFacts)
                        },
                        ...translations.map(t => ({
                            locale: t.locale,
                            title: t.title,
                            excerpt: t.excerpt,
                            contentHtml: t.contentHtml,
                            metaTitle: `${t.title} | SwissTech Briefing`,
                            metaDescription: t.excerpt,
                            expertQuote: t.expertQuote,
                            keyFactsJson: JSON.stringify(t.keyFacts)
                        }))
                    ]
                }
            }
        });

        console.log(`✅ Success! Article created locally with ID: ${created.id}`);
        console.log(`🔗 Link: https://swisstechbriefing.ch/de-CH/artikel/${slug}`);

    } catch (e) {
        console.error("❌ Recovery Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

recoverArticle();
