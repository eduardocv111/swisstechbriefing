export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    author: {
        name: string;
        slug: string;
        role: string;
        bio: string;
    };
    date: string;
    datePublished: string;
    image: string;
    readingTimeMinutes?: number;
    content?: string;
    summaryPoints?: string[];
    impactItems?: { icon: string; title: string; desc: string }[];
}

export const CATEGORIES = [
    { name: 'KI', href: '/kategorie/ki', slug: 'ki' },
    { name: 'Startups', href: '/kategorie/startups', slug: 'startups' },
    { name: 'Regulierung', href: '/kategorie/regulierung', slug: 'regulierung' },
    { name: 'Defense & Security Tech', href: '/kategorie/defense-security-tech', slug: 'defense-security-tech' },
];

export const FEATURED_ARTICLE: Article = {
    id: 'featured-1',
    slug: 'eth-supercomputer-alps-ki',
    title: 'ETH Zürich stellt neuen Supercomputer "Alps" für KI-Forschung vor',
    category: 'KI',
    categorySlug: 'ki',
    author: {
        name: 'Marc Lehmann',
        slug: 'marc-lehmann',
        role: 'Chefredaktor KI & Tech',
        bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
    },
    date: 'Aktuell',
    datePublished: '2026-05-20T08:00:00Z',
    readingTimeMinutes: 4,
    image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
    excerpt:
        'Die Forschung an künstlicher Intelligenz in der Schweiz erhält einen massiven Schub durch die neue Infrastruktur am CSCS in Lugano.',
    summaryPoints: [
        'Der neue Supercomputer "Alps" gehört zu den leistungsstärksten der Welt.',
        'Er steht am Nationalen Hochleistungsrechenzentrum (CSCS) in Lugano.',
        'Fokus liegt auf der Entwicklung grosser Sprachmodelle "Made in Switzerland".',
    ],
    impactItems: [
        {
            icon: 'security',
            title: 'Erhalt der technologischen Souveränität',
            desc: 'Die Kontrolle über eigene Rechenkapazitäten reduziert die Abhängigkeit von globalen Tech-Giganten.',
        },
        {
            icon: 'school',
            title: 'Attraktivität des Forschungsstandorts',
            desc: 'Weltklasse-Infrastruktur zieht internationale Talente und Spitzenforscher nach Zürich und Lugano.',
        },
        {
            icon: 'rocket_launch',
            title: 'Unterstützung für lokale Startups',
            desc: 'Schweizer Jungunternehmen erhalten durch gezielte Programme Zugriff auf Hochleistungstechnologie.',
        },
    ],
};

export const ARTICLES: Article[] = [
    // --- KI (10 articles) ---
    {
        id: 'ki-1',
        slug: 'epfl-llm-schweizer-dialekte',
        title: 'EPFL entwickelt Sprachmodell für Schweizer Dialekte',
        excerpt:
            'Forscher in Lausanne präsentieren ein KI-Modell, das Berner, Zürcher und Walliser Dialekte präzise versteht.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Elena Vontobel',
            slug: 'elena-vontobel',
            role: 'KI-Spezialistin',
            bio: 'Elena Vontobel forscht an der Schnittstelle von Linguistik und Informatik. Sie berichtet über technologische Durchbrüche an Schweizer Hochschulen.',
        },
        date: '19. Mai 2026',
        datePublished: '2026-05-19T10:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'ki-2',
        slug: 'innosuisse-ki-startup-boost',
        title: 'Innosuisse lanciert Förderprogramm für KI-Startups',
        excerpt: 'Mit einem neuen Millionen-Fonds will der Bund die Kommerzialisierung von KI-Forschung beschleunigen.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Marc Lehmann',
            slug: 'marc-lehmann',
            role: 'Chefredaktor',
            bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
        },
        date: '18. Mai 2026',
        datePublished: '2026-05-18T14:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 2,
    },
    {
        id: 'ki-3',
        slug: 'swisscom-ki-netz-optimierung',
        title: 'Swisscom nutzt KI zur autonomen Netzsteuerung',
        excerpt: 'Durch den Einsatz intelligenter Algorithmen konnte die Energieeffizienz im Mobilfunknetz um 15% gesteigert werden.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Elena Vontobel',
            slug: 'elena-vontobel',
            role: 'KI-Spezialistin',
            bio: 'Elena Vontobel forscht an der Schnittstelle von Linguistik und Informatik. Sie berichtet über technologische Durchbrüche an Schweizer Hochschulen.',
        },
        date: '17. Mai 2026',
        datePublished: '2026-05-17T09:15:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 4,
    },
    {
        id: 'ki-4',
        slug: 'usz-ki-diagnose-radiologie',
        title: 'Radiologie am USZ: KI erkennt Tumoren früher',
        excerpt: 'Das Universitätsspital Zürich setzt neue Massstäbe bei der computergestützten Diagnose von Lungenkrebs.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Marc Lehmann',
            slug: 'marc-lehmann',
            role: 'Chefredaktor',
            bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
        },
        date: '16. Mai 2026',
        datePublished: '2026-05-16T11:45:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 5,
    },
    {
        id: 'ki-5',
        slug: 'sbb-ki-fahrplan-resilienz',
        title: 'SBB stabilisiert Fahrplan mit KI-Simulationen',
        excerpt: 'Ein neues System berechnet in Echtzeit optimale Umleitungen bei Betriebsstörungen im Schienennetz.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Elena Vontobel',
            slug: 'elena-vontobel',
            role: 'KI-Spezialistin',
            bio: 'Elena Vontobel forscht an der Schnittstelle von Linguistik und Informatik. Sie berichtet über technologische Durchbrüche an Schweizer Hochschulen.',
        },
        date: '15. Mai 2026',
        datePublished: '2026-05-15T08:20:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'ki-6',
        slug: 'ki-ethik-kantone-leitlinien',
        title: 'Kantone einigen sich auf KI-Ethik-Leitlinien',
        excerpt: 'Der Einsatz von KI in der öffentlichen Verwaltung soll transparent und diskriminierungsfrei erfolgen.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Marc Lehmann',
            slug: 'marc-lehmann',
            role: 'Chefredaktor',
            bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
        },
        date: '14. Mai 2026',
        datePublished: '2026-05-14T16:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 3,
    },
    {
        id: 'ki-7',
        slug: 'fintech-zuerich-ki-kredit',
        title: 'Zürcher Fintech revolutioniert Kreditprüfung mit KI',
        excerpt: 'Durch alternative Datenquellen ermöglicht das Startup einen schnelleren Zugang zu Kleinkrediten für KMU.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Elena Vontobel',
            slug: 'elena-vontobel',
            role: 'KI-Spezialistin',
            bio: 'Elena Vontobel forscht an der Schnittstelle von Linguistik und Informatik. Sie berichtet über technologische Durchbrüche an Schweizer Hochschulen.',
        },
        date: '13. Mai 2026',
        datePublished: '2026-05-13T10:10:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 2,
    },
    {
        id: 'ki-8',
        slug: 'ki-energie-leutwil-pilot',
        title: 'Pilotprojekt: KI steuert Stromnetz in Leutwil',
        excerpt: 'In der Aargauer Gemeinde wird getestet, wie KI die volatile Einspeisung von Solarstrom ausgleichen kann.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Marc Lehmann',
            slug: 'marc-lehmann',
            role: 'Chefredaktor',
            bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
        },
        date: '12. Mai 2026',
        datePublished: '2026-05-12T13:40:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 4,
    },
    {
        id: 'ki-9',
        slug: 'ki-bildung-gymnasium-bern',
        title: 'KI als Tutor: Berner Gymnasium startet Versuch',
        excerpt: 'Schüler nutzen personalisierte KI-Assistenten zur Wiederholung von Mathematik-Stoff.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Elena Vontobel',
            slug: 'elena-vontobel',
            role: 'KI-Spezialistin',
            bio: 'Elena Vontobel forscht an der Schnittstelle von Linguistik und Informatik. Sie berichtet über technologische Durchbrüche an Schweizer Hochschulen.',
        },
        date: '11. Mai 2026',
        datePublished: '2026-05-11T09:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'ki-10',
        slug: 'google-zuerich-ki-campus',
        title: 'Google erweitert KI-Forschungszentrum in Zürich',
        excerpt: 'Der Standort Zürich wird zum globalen Hub für die Entwicklung nachhaltiger KI-Infrastruktur.',
        category: 'KI',
        categorySlug: 'ki',
        author: {
            name: 'Marc Lehmann',
            slug: 'marc-lehmann',
            role: 'Chefredaktor',
            bio: 'Marc Lehmann ist ein erfahrener Technologiejournalist mit Fokus auf künstliche Intelligenz und digitale Ethik. Er leitet die Redaktion von SwissTech Briefing seit 2024.',
        },
        date: '10. Mai 2026',
        datePublished: '2026-05-10T15:20:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 2,
    },

    // --- Startups (10 articles) ---
    {
        id: 'startups-1',
        slug: 'zuerich-startup-unicorn-2026',
        title: 'Zürcher Software-Firma erreicht Unicorn-Status',
        excerpt: 'Nach einer erfolgreichen Finanzierungsrunde wird das Cloud-Startup mit über einer Milliarde Franken bewertet.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Sarah Widmer',
            slug: 'sarah-widmer',
            role: 'Startup-Analystin',
            bio: 'Sarah Widmer beobachtet seit über zehn Jahren die Schweizer Startup-Szene mit Fokus auf Fintech und nachhaltige Investments.',
        },
        date: '19. Mai 2026',
        datePublished: '2026-05-19T08:45:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 3,
    },
    {
        id: 'startups-2',
        slug: 'deeptech-invest-rekord-ch',
        title: 'Rekordinvestitionen in Schweizer Deep-Tech',
        excerpt: 'Trotz globaler Flaute verzeichnen Schweizer Startups im Bereich Halbleiter und Photonik massives Wachstum.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Thomas Gmür',
            slug: 'thomas-gmuer',
            role: 'Wirtschaftsjournalist',
            bio: 'Thomas Gmür analysiert wirtschaftspolitische Rahmenbedingungen für Deep-Tech-Unternehmen am Standort Schweiz.',
        },
        date: '18. Mai 2026',
        datePublished: '2026-05-18T10:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 2,
    },
    {
        id: 'startups-3',
        slug: 'biozentrum-basel-spin-off-krebs',
        title: 'Basler Spin-off revolutioniert Krebstherapie',
        excerpt: 'Das Biotech-Startup nutzt personalisierte Immunzellen zur gezielten Bekämpfung von soliden Tumoren.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Sarah Widmer',
            slug: 'sarah-widmer',
            role: 'Startup-Analystin',
            bio: 'Sarah Widmer beobachtet seit über zehn Jahren die Schweizer Startup-Szene mit Fokus auf Fintech und nachhaltige Investments.',
        },
        date: '17. Mai 2026',
        datePublished: '2026-05-17T12:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 5,
    },
    {
        id: 'startups-4',
        slug: 'foodtech-hafermilch-innovation',
        title: 'Schweizer Foodtech entwickelt lokale Milchalternative',
        excerpt: 'Ein Startup aus dem Seeland nutzt enzymatische Verfahren, um Hafermilch ohne Geschmacksverstärker zu produzieren.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Thomas Gmür',
            slug: 'thomas-gmuer',
            role: 'Wirtschaftsjournalist',
            bio: 'Thomas Gmür analysiert wirtschaftspolitische Rahmenbedingungen für Deep-Tech-Unternehmen am Standort Schweiz.',
        },
        date: '16. Mai 2026',
        datePublished: '2026-05-16T09:40:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 2,
    },
    {
        id: 'startups-5',
        slug: 'cleantech-solar-fassade-eth',
        title: 'ETH-Spin-off präsentiert Solar-Fassaden-Module',
        excerpt: 'Die neuartigen Module sind optisch nicht von Stein zu unterscheiden und produzieren effizient Strom.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Sarah Widmer',
            slug: 'sarah-widmer',
            role: 'Startup-Analystin',
            bio: 'Sarah Widmer beobachtet seit über zehn Jahren die Schweizer Startup-Szene mit Fokus auf Fintech und nachhaltige Investments.',
        },
        date: '15. Mai 2026',
        datePublished: '2026-05-15T13:15:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 4,
    },
    {
        id: 'startups-6',
        slug: 'lugano-lifestyle-tech-hub',
        title: 'Neuer Tech-Hub in Lugano eröffnet',
        excerpt: 'Das Tessin stärkt seine Position als Innovationsstandort für Lifestyle- und Fashion-Technologien.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Thomas Gmür',
            slug: 'thomas-gmuer',
            role: 'Wirtschaftsjournalist',
            bio: 'Thomas Gmür analysiert wirtschaftspolitische Rahmenbedingungen für Deep-Tech-Unternehmen am Standort Schweiz.',
        },
        date: '14. Mai 2026',
        datePublished: '2026-05-14T11:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 2,
    },
    {
        id: 'startups-7',
        slug: 'femtech-genf-investor-millionen',
        title: 'Genfer Femtech erhält Millionen-Finanzierung',
        excerpt: 'Das Startup fokussiert sich auf digitale Lösungen für die reproduktive Gesundheit von Frauen.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Sarah Widmer',
            slug: 'sarah-widmer',
            role: 'Startup-Analystin',
            bio: 'Sarah Widmer beobachtet seit über zehn Jahren die Schweizer Startup-Szene mit Fokus auf Fintech und nachhaltige Investments.',
        },
        date: '13. Mai 2026',
        datePublished: '2026-05-13T15:50:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'startups-8',
        slug: 'proptech-zuerich-digital-twin',
        title: 'Zürcher Proptech digitalisiert Schweizer Baustellen',
        excerpt: 'Mit Hilfe von Drohnen und KI werden digitale Zwillinge von Grossprojekten in Echtzeit erstellt.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Thomas Gmür',
            slug: 'thomas-gmuer',
            role: 'Wirtschaftsjournalist',
            bio: 'Thomas Gmür analysiert wirtschaftspolitische Rahmenbedingungen für Deep-Tech-Unternehmen am Standort Schweiz.',
        },
        date: '12. Mai 2026',
        datePublished: '2026-05-12T08:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 4,
    },
    {
        id: 'startups-9',
        slug: 'startup-days-bern-2026-review',
        title: 'Startup Days Bern: Brückenbauer für Innovation',
        excerpt: 'Über 1000 Gründer und Investoren trafen sich in der Hauptstadt zum Netzwerken und Matchen.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Sarah Widmer',
            slug: 'sarah-widmer',
            role: 'Startup-Analystin',
            bio: 'Sarah Widmer beobachtet seit über zehn Jahren die Schweizer Startup-Szene mit Fokus auf Fintech und nachhaltige Investments.',
        },
        date: '11. Mai 2026',
        datePublished: '2026-05-11T17:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 2,
    },
    {
        id: 'startups-10',
        slug: 'innosuisse-startup-training-internationale-expansion',
        title: 'Export-Schub: Innosuisse berät Schweizer Gründer',
        excerpt: 'Neues Mentoring-Programm soll Startups den Markteintritt in den USA und Asien erleichtern.',
        category: 'Startups',
        categorySlug: 'startups',
        author: {
            name: 'Thomas Gmür',
            slug: 'thomas-gmuer',
            role: 'Wirtschaftsjournalist',
            bio: 'Thomas Gmür analysiert wirtschaftspolitische Rahmenbedingungen für Deep-Tech-Unternehmen am Standort Schweiz.',
        },
        date: '10. Mai 2026',
        datePublished: '2026-05-10T11:20:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 3,
    },

    // --- Regulierung (10 articles) ---
    {
        id: 'regulierung-1',
        slug: 'finma-krypto-richtlinien-2026',
        title: 'FINMA verschärft Krypto-Aufsicht',
        excerpt: 'Neue Richtlinien konkretisieren die Compliance-Anforderungen für Schweizer Staking-Anbieter.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Dr. Beat Hintermann',
            slug: 'beat-hintermann',
            role: 'Experte Regulierung',
            bio: 'Dr. Beat Hintermann ist Jurist und Experte für Technologieregulierung. Er berät Organisationen bei der Umsetzung von Compliance-Standards.',
        },
        date: '19. Mai 2026',
        datePublished: '2026-05-19T14:15:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'regulierung-2',
        slug: 'bundesrat-ki-gesetz-entwurf',
        title: 'Schweiz plant eigenes KI-Gesetz',
        excerpt: 'Der Bundesrat will Innovation fördern, aber klare Leitplanken für Hochrisiko-Anwendungen setzen.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Karin Joss',
            slug: 'karin-joss',
            role: 'Bundeshaus-Redaktorin',
            bio: 'Karin Joss berichtet für SwissTech Briefing aus dem Bundeshaus über Digitalpolitik und kantonale Innovationsförderung.',
        },
        date: '18. Mai 2026',
        datePublished: '2026-05-18T09:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 4,
    },
    {
        id: 'regulierung-3',
        slug: 'ncsc-cybersecurity-kmu-pflicht',
        title: 'NCSC: Neue Sicherheitspflichten für KMU',
        excerpt: 'Kritische Zulieferer müssen künftig Mindeststandards in der Cybersicherheit nachweisen.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Dr. Beat Hintermann',
            slug: 'beat-hintermann',
            role: 'Experte Regulierung',
            bio: 'Dr. Beat Hintermann ist Jurist und Experte für Technologieregulierung. Er berät Organisationen bei der Umsetzung von Compliance-Standards.',
        },
        date: '17. Mai 2026',
        datePublished: '2026-05-17T11:40:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 2,
    },
    {
        id: 'regulierung-4',
        slug: 'eu-ai-act-ch-unternehmen-folgen',
        title: 'Auswirkungen des EU AI Act auf Schweizer Firmen',
        excerpt: 'Experten warnen vor regulatorischer Doppelbelastung für exportorientierte Schweizer Softwarehäuser.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Karin Joss',
            slug: 'karin-joss',
            role: 'Bundeshaus-Redaktorin',
            bio: 'Karin Joss berichtet für SwissTech Briefing aus dem Bundeshaus über Digitalpolitik und kantonale Innovationsförderung.',
        },
        date: '16. Mai 2026',
        datePublished: '2026-05-16T15:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 5,
    },
    {
        id: 'regulierung-5',
        slug: 'bazl-drohnen-regulierung-luftraum-ch',
        title: 'BAZL passt Drohnen-Regeln für Stadtgebiete an',
        excerpt: 'Lieferdrohnen erhalten unter strengen Auflagen Zugang zu dedizierten Flugkorridoren.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Dr. Beat Hintermann',
            slug: 'beat-hintermann',
            role: 'Experte Regulierung',
            bio: 'Dr. Beat Hintermann ist Jurist und Experte für Technologieregulierung. Er berät Organisationen bei der Umsetzung von Compliance-Standards.',
        },
        date: '15. Mai 2026',
        datePublished: '2026-05-15T08:10:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 3,
    },
    {
        id: 'regulierung-6',
        slug: 'digital-identitaet-bund-check',
        title: 'E-ID: Bundesrat prüft Schnittstellen für Banken',
        excerpt: 'Die staatliche digitale Identität soll künftig auch für die Eröffnung von Bankkonten nutzbar sein.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Karin Joss',
            slug: 'karin-joss',
            role: 'Bundeshaus-Redaktorin',
            bio: 'Karin Joss berichtet für SwissTech Briefing aus dem Bundeshaus über Digitalpolitik und kantonale Innovationsförderung.',
        },
        date: '14. Mai 2026',
        datePublished: '2026-05-14T12:20:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 2,
    },
    {
        id: 'regulierung-7',
        slug: 'medtech-mdr-aequivalenz-ch-eu',
        title: 'Neue Export-Regeln für Schweizer Medtech',
        excerpt: 'Ein Teilerfolg bei den Verhandlungen mit der EU erleichtert den Marktzugang für orthopädische Implantate.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Dr. Beat Hintermann',
            slug: 'beat-hintermann',
            role: 'Experte Regulierung',
            bio: 'Dr. Beat Hintermann ist Jurist und Experte für Technologieregulierung. Er berät Organisationen bei der Umsetzung von Compliance-Standards.',
        },
        date: '13. Mai 2026',
        datePublished: '2026-05-13T10:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 4,
    },
    {
        id: 'regulierung-8',
        slug: 'kantone-steueranreize-remote-work',
        title: 'Steuerwettbewerb um digitale Nomaden',
        excerpt: 'Zentralschweizer Kantone prüfen spezielle Pauschalen für ortsunabhängige Technologie-Fachkräfte.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Karin Joss',
            slug: 'karin-joss',
            role: 'Bundeshaus-Redaktorin',
            bio: 'Karin Joss berichtet für SwissTech Briefing aus dem Bundeshaus über Digitalpolitik und kantonale Innovationsförderung.',
        },
        date: '12. Mai 2026',
        datePublished: '2026-05-12T16:15:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 3,
    },
    {
        id: 'regulierung-9',
        slug: 'green-finance-transparenz-ch',
        title: 'Bund verschärft Green-Finance-Regeln',
        excerpt: 'Banken müssen die CO2-Intensität ihrer Portfolios künftig nach einem standardisierten Verfahren offenlegen.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Dr. Beat Hintermann',
            slug: 'beat-hintermann',
            role: 'Experte Regulierung',
            bio: 'Dr. Beat Hintermann ist Jurist und Experte für Technologieregulierung. Er berät Organisationen bei der Umsetzung von Compliance-Standards.',
        },
        date: '11. Mai 2026',
        datePublished: '2026-05-11T09:45:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 4,
    },
    {
        id: 'regulierung-10',
        slug: 'urheberrecht-ki-training-verleger-forderungen',
        title: 'Verleger fordern Vergütung für KI-Training',
        excerpt: 'Eine Branchenallianz verlangt klare gesetzliche Regeln für die Nutzung journalistischer Inhalte durch Tech-Konzerne.',
        category: 'Regulierung',
        categorySlug: 'regulierung',
        author: {
            name: 'Karin Joss',
            slug: 'karin-joss',
            role: 'Bundeshaus-Redaktorin',
            bio: 'Karin Joss berichtet für SwissTech Briefing aus dem Bundeshaus über Digitalpolitik und kantonale Innovationsförderung.',
        },
        date: '10. Mai 2026',
        datePublished: '2026-05-10T14:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 2,
    },

    // --- Defense & Security Tech (10 articles) ---
    {
        id: 'defense-1',
        slug: 'armasuisse-quantenverschluesselung-militaer-ch',
        title: 'Quantensichere Kommunikation für Schweizer Armee',
        excerpt: 'armasuisse testet neue hybride Verschlüsselungsverfahren zum Schutz vor künftigen Supercomputer-Angriffen.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Andreas Burckhardt',
            slug: 'andreas-burckhardt',
            role: 'Sicherheitsexperte',
            bio: 'Andreas Burckhardt ist Fachredaktor für Cybersicherheit und nationale Verteidigungstechnologien mit langjähriger Erfahrung in der Sicherheitsberatung.',
        },
        date: '19. Mai 2026',
        datePublished: '2026-05-19T11:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 4,
    },
    {
        id: 'defense-2',
        slug: 'schweizer-armee-aufklaerungsdrohnen-test-thun',
        title: 'Armee testet heimische Aufklärungsdrohnen',
        excerpt:
            'Die neuen unbemannten Systeme sollen die Überwachungskapazitäten in unwegsamem alpinen Gelände massiv verbessern.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Major Lukas Meyer',
            slug: 'lukas-meyer',
            role: 'Gastautor',
            bio: 'Major Lukas Meyer ist Experte für militärische Innovationsprozesse und schreibt als Gastautor über die digitale Transformation der Armee.',
        },
        date: '18. Mai 2026',
        datePublished: '2026-05-18T13:45:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 3,
    },
    {
        id: 'defense-3',
        slug: 'cybersecurity-bund-ransomware-schutz-investition',
        title: 'Bund investiert Millionen in Ransomware-Schutz',
        excerpt:
            'Ein neues Abwehrzentrum soll kritische Infrastrukturen proaktiv vor Erpressungs-Angriffen aus dem Ausland schützen.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Andreas Burckhardt',
            slug: 'andreas-burckhardt',
            role: 'Sicherheitsexperte',
            bio: 'Andreas Burckhardt ist Fachredaktor für Cybersicherheit und nationale Verteidigungstechnologien mit langjähriger Erfahrung in der Sicherheitsberatung.',
        },
        date: '17. Mai 2026',
        datePublished: '2026-05-17T16:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 2,
    },
    {
        id: 'defense-4',
        slug: 'ruag-innovation-space-zivil-tech-transfer',
        title: 'RUAG öffnet sich für zivile Tech-Startups',
        excerpt:
            'Mit dem neuen Innovation Space will der Rüstungskonzern den Wissensaustausch mit der Privatwirtschaft forcieren.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Major Lukas Meyer',
            slug: 'lukas-meyer',
            role: 'Gastautor',
            bio: 'Major Lukas Meyer ist Experte für militärische Innovationsprozesse und schreibt als Gastautor über die digitale Transformation der Armee.',
        },
        date: '16. Mai 2026',
        datePublished: '2026-05-16T10:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 3,
    },
    {
        id: 'defense-5',
        slug: 'epfl-weltraumschrott-tracking-satellit',
        title: 'EPFL-Projekt zur Verfolgung von Weltraumschrott',
        excerpt:
            'Ein Mini-Satellit aus Lausanne soll helfen, die wachsende Gefahr durch Trümmerteile im Erdorbit zu bändigen.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Andreas Burckhardt',
            slug: 'andreas-burckhardt',
            role: 'Sicherheitsexperte',
            bio: 'Andreas Burckhardt ist Fachredaktor für Cybersicherheit und nationale Verteidigungstechnologien mit langjähriger Erfahrung in der Sicherheitsberatung.',
        },
        date: '15. Mai 2026',
        datePublished: '2026-05-15T14:45:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 5,
    },
    {
        id: 'defense-6',
        slug: 'eth-zuerich-post-quanten-kryptographie-standard',
        title: 'ETH-Forscher setzen Standards für Cybersicherheit',
        excerpt:
            'Ein neues Protokoll für die sichere Datenübertragung soll auch Angriffe durch künftige Quantenrechner abwehren.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Major Lukas Meyer',
            slug: 'lukas-meyer',
            role: 'Gastautor',
            bio: 'Major Lukas Meyer ist Experte für militärische Innovationsprozesse und schreibt als Gastautor über die digitale Transformation der Armee.',
        },
        date: '14. Mai 2026',
        datePublished: '2026-05-14T09:10:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 4,
    },

    // ✅ Integrated + fixed authors (slug + bio) for defense-7..10
    {
        id: 'defense-7',
        slug: 'grenzschutz-ki-sensorik-grenzueberwachung-ch',
        title: 'Grenzwachtkorps setzt auf KI-Sensorik',
        excerpt: 'An der grünen Grenze im Rheintal überwachen intelligente Sensoren unauffällig den Personenfluss.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Andreas Burckhardt',
            slug: 'andreas-burckhardt',
            role: 'Sicherheitsexperte',
            bio: 'Andreas Burckhardt ist Fachredaktor für Cybersicherheit und nationale Verteidigungstechnologien mit langjähriger Erfahrung in der Sicherheitsberatung.',
        },
        date: '13. Mai 2026',
        datePublished: '2026-05-13T12:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBMI_Pa0fzLpfWe7SyhpELOOfy1xZ57yUA5B5wiEON1aG1eUS1fr-Itf2c4w8iKzwmYIlWNutU5wak9fgj-C9IXb9h8gNLvCqexU21vVQPRNRv9INj-VFvfViNbTRukRljBelV04C5hekCakghWt_ilGV7VKH3kbQaqIM8HpcAU8NMhU0nJJCSRGZQrSmZPWxkNDfcMfm8tuDLHp4WbQGMohezlNfyLsIkutP4teDIimAUwKmKI5bo0Av7YuMOTrJb8qyl5S6AcgoUR',
        readingTimeMinutes: 2,
    },
    {
        id: 'defense-8',
        slug: 'cyber-resilienz-schweizer-stromnetz-abwaehr-test',
        title: 'Swissgrid erhöht Resilienz gegen Cyber-Attacken',
        excerpt:
            'In einem koordinierten Test wurde die Abwehrbereitschaft der nationalen Netzleitstelle gegen Hackerangriffe geprüft.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Major Lukas Meyer',
            slug: 'lukas-meyer',
            role: 'Gastautor',
            bio: 'Major Lukas Meyer ist Experte für militärische Innovationsprozesse und schreibt als Gastautor über die digitale Transformation der Armee.',
        },
        date: '12. Mai 2026',
        datePublished: '2026-05-12T15:30:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBuY4_czo4K-OfJFKZRovCXJSmx_jrtz0Adji9qWwoh80STP2_wsaD_xxWl_jh2Sxyr73EZr2LDt1l86aQplLn451tgJyU73XNavtZx1zBUTwVzJFSTRxp_WqhSitorbqCIRQFfikjtnYl-lBf0tek20zLrRFNXULpJMBFkc_aQyoyqPZNFUj-4OsBYZKHtbFAy2FdvAWDr6uI4w4XkvSzPM67kOlysZ1ttcvcjDZPDHRG3FVdM2e7kNvru-SYqhwok-J8IoAYiRWQV',
        readingTimeMinutes: 3,
    },
    {
        id: 'defense-9',
        slug: 'autonome-landsysteme-thun-hub',
        title: 'Thun wird Hub für autonome Landsysteme',
        excerpt: 'Ein neues Testgelände ermöglicht die Erprobung von robotischen Unterstützungsfahrzeugen für militärische Logistik.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Andreas Burckhardt',
            slug: 'andreas-burckhardt',
            role: 'Sicherheitsexperte',
            bio: 'Andreas Burckhardt ist Fachredaktor für Cybersicherheit und nationale Verteidigungstechnologien mit langjähriger Erfahrung in der Sicherheitsberatung.',
        },
        date: '11. Mai 2026',
        datePublished: '2026-05-11T10:15:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCCwUJxdUhtbupAHVa8bX1mhOmEsg6P6Yrk7x7DyYd1rf5e-X2e3wSNsMwCPC5v2oGqN_5-9i6FP0B2ec9Ag0NnUsd5zI1FFa0Gzwe-rxW2FBXJRG8pqJ0YINDlapx4LAyRUGMbr8VdhLN1tsAszMuLec5zcEa5JdXHaFmaiiLCCI24vbsj-HE6MjRiD1nBvhsLc_EMGpo1oyqbUzS8G4D3Pn5lRv9pExx3oGgZG7NsUbCp_JWLw4n-0-v6MmwAYbrjqCE9_8AKMvnS',
        readingTimeMinutes: 4,
    },
    {
        id: 'defense-10',
        slug: 'dual-use-tech-transfer-bundesrat-programm',
        title: 'Bund fördert Dual-Use-Innovationen',
        excerpt: 'Ein neues Programm erleichtert den Transfer von Sicherheitstechnologien in den zivilen Markt und umgekehrt.',
        category: 'Defense & Security Tech',
        categorySlug: 'defense-security-tech',
        author: {
            name: 'Major Lukas Meyer',
            slug: 'lukas-meyer',
            role: 'Gastautor',
            bio: 'Major Lukas Meyer ist Experte für militärische Innovationsprozesse und schreibt als Gastautor über die digitale Transformation der Armee.',
        },
        date: '10. Mai 2026',
        datePublished: '2026-05-10T16:00:00Z',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB6v95fZEd3c6GgzKG2zmSuqOvHMySONG3RcdcEXjxfAlmvetyvUQMnRUqQVMuovsRWfTXmcld4J33bcDVCsE36DhorWqT5uuvGey4TQj6vFSNGYtlwIlhtjjQVPYK_-fapkVnrqNpN0mmUKYzYTDp5tA1ZLNtQLvH7QQWDKPZLyQDHLJ453CQ_GJh0F9vqfZMT2mLE52ExXbnPr-5iurMQxN1hGlnmj7zGyVYLqkPqhA6eTIZDEGmcA42pntsw32RGA8nJFeRhqHj3',
        readingTimeMinutes: 3,
    },
];