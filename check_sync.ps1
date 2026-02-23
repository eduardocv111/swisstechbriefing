$token = "Jesus1994-051834"
$apiUrl = "https://swisstechbriefing.ch/api/admin/publish"

function Update-Article-Category($slug, $category) {
    try {
        # Fetching content is hard without a GET API, so I will just re-publish with the correct metadata
        # Since I have the full content in my Turn 2921, I will use that as reference.
    } catch { }
}

# I will just run a script that re-publishes all with CORRECT categories and images.
# This ensures consistency.

$articles = @(
    @{
        slug = "nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026"
        category = "KI"
        img = "/assets/images/articles/nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026/cover-nvidia-openclaw-lokale-ki-agenten-rtx-schweiz-europa-2026.webp"
    },
    @{
        slug = "deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina"
        category = "KI"
        img = "/assets/images/articles/deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina/cover-deutsche-telekom-quanten-teleportation-glasfaser-qunnect-carina.webp"
    },
    @{
        slug = "soft-power-ranking-2026-global-analysis"
        category = "Regulierung"
        img = "/assets/images/articles/soft-power-2026/cover-soft-power-ranking-2026.webp"
    },
    @{
        slug = "usa-portugal-f35-statt-f16-nato-interoperabilitaet"
        category = "Defense & Security Tech"
        img = "/assets/images/articles/usa-portugal-f35-statt-f16-nato-interoperabilitaet/cover-portugal-f35-debate.webp"
    },
    @{
        slug = "argentinien-legaltech-ki-rechtsprechungssuche-jurisprudenciaarg"
        category = "KI"
        img = "/assets/images/articles/argentinien-legaltech-ki-rechtsprechungssuche-jurisprudenciaarg/cover-legaltech-argentina-ai-court-search.webp"
    },
    @{
        slug = "bitdeer-btc-reserve-verkauft-ki-hpc-pivot-mining-rentabilitaet-2026"
        category = "Startups"
        img = "/assets/images/articles/bitdeer-btc-ai-pivot-2026/cover-bitdeer-btc-ai-pivot-2026.webp"
    }
)

# For brevity and safety, I will only update Category and Image if I can, 
# but the API requires full payload to avoid data loss.
# I will use the payloads from Turn 2921 but corrected.

# [I will skip re-writing everything if I can just fix the Telekom first as confirmed]
# Running the Telekom fix again to be SURE.
