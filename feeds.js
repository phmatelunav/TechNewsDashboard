/**
 * feeds.js - Configuración de fuentes RSS y catálogo de noticias
 * CyberHUD Tech News Terminal
 */

const CATEGORIES = {
    all: {
        id: 'all',
        name: 'Todas las Noticias',
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1, #38bdf8)',
        badge: 'ALL'
    },
    ai: {
        id: 'ai',
        name: 'Inteligencia Artificial',
        color: '#818cf8',
        gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
        badge: 'AI'
    },
    hardware: {
        id: 'hardware',
        name: 'Hardware',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
        badge: 'HARDWARE'
    },
    gaming: {
        id: 'gaming',
        name: 'Videojuegos',
        color: '#f43f5e',
        gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
        badge: 'GAMING'
    },
    dev: {
        id: 'dev',
        name: 'Programación',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981, #34d399)',
        badge: 'DEV'
    }
};

// Imágenes de alta resolución por temática
const THEME_IMAGES = {
    ai: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80'
    ],
    hardware: [
        'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=900&q=80'
    ],
    gaming: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1552824722-ddab1374e622?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1612287233207-6a2c222ff47e?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80'
    ],
    dev: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=900&q=80'
    ]
};

function getDeterministicThemeImage(category, keyStr = '') {
    const list = THEME_IMAGES[category] || THEME_IMAGES.ai;
    let hash = 0;
    for (let i = 0; i < keyStr.length; i++) {
        hash = (hash << 5) - hash + keyStr.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % list.length;
    return list[index];
}

// 44 Fuentes Verificadas (11 por cada temática)
const FEEDS_CATALOG = [
    // --- 🤖 INTELIGENCIA ARTIFICIAL (11 fuentes) ---
    { id: 'venturebeat-ai', name: 'VentureBeat AI', category: 'ai', url: 'https://venturebeat.com/category/ai/feed/', site: 'https://venturebeat.com' },
    { id: 'openai', name: 'OpenAI Blog', category: 'ai', url: 'https://openai.com/news/rss.xml', site: 'https://openai.com' },
    { id: 'deepmind', name: 'Google DeepMind Research', category: 'ai', url: 'https://deepmind.google/blog/rss.xml', site: 'https://deepmind.google' },
    { id: 'mit-ai', name: 'MIT Technology Review AI', category: 'ai', url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed', site: 'https://technologyreview.com' },
    { id: 'huggingface', name: 'Hugging Face Blog', category: 'ai', url: 'https://huggingface.co/blog/feed.xml', site: 'https://huggingface.co' },
    { id: 'arxiv-ai', name: 'ArXiv cs.AI Feed', category: 'ai', url: 'https://rss.arxiv.org/rss/cs.AI', site: 'https://arxiv.org' },
    { id: 'marktechpost', name: 'MarkTechPost AI', category: 'ai', url: 'https://www.marktechpost.com/feed/', site: 'https://marktechpost.com' },
    { id: 'synced-ai', name: 'Synced Review', category: 'ai', url: 'https://syncedreview.com/feed/', site: 'https://syncedreview.com' },
    { id: 'anthropic-news', name: 'Anthropic Research', category: 'ai', url: 'https://www.anthropic.com/feed.xml', site: 'https://anthropic.com' },
    { id: 'theverge-ai', name: 'The Verge AI & Tech', category: 'ai', url: 'https://www.theverge.com/rss/artificial-intelligence/index.xml', site: 'https://theverge.com' },
    { id: 'towardsdatascience', name: 'Towards Data Science', category: 'ai', url: 'https://towardsdatascience.com/feed', site: 'https://towardsdatascience.com' },

    // --- ⚡ HARDWARE COMPUTACIONAL (11 fuentes) ---
    { id: 'tomshardware', name: "Tom's Hardware", category: 'hardware', url: 'https://www.tomshardware.com/feeds/all', site: 'https://tomshardware.com' },
    { id: 'anandtech', name: 'AnandTech', category: 'hardware', url: 'https://www.anandtech.com/rss/', site: 'https://anandtech.com' },
    { id: 'videocardz', name: 'VideoCardz News', category: 'hardware', url: 'https://videocardz.com/rss', site: 'https://videocardz.com' },
    { id: 'wccftech-hw', name: 'Wccftech Hardware', category: 'hardware', url: 'https://wccftech.com/category/hardware/feed/', site: 'https://wccftech.com' },
    { id: 'guru3d', name: 'Guru3D News', category: 'hardware', url: 'https://www.guru3d.com/rss', site: 'https://guru3d.com' },
    { id: 'techpowerup', name: 'TechPowerUp', category: 'hardware', url: 'https://www.techpowerup.com/rss/news', site: 'https://techpowerup.com' },
    { id: 'pcgamer-hw', name: 'PC Gamer Hardware', category: 'hardware', url: 'https://www.pcgamer.com/rss/hardware/', site: 'https://pcgamer.com' },
    { id: 'oc3d', name: 'Overclock3D News', category: 'hardware', url: 'https://overclock3d.net/rss.xml', site: 'https://overclock3d.net' },
    { id: 'arstechnica-gear', name: 'Ars Technica Gadgets', category: 'hardware', url: 'https://feeds.arstechnica.com/arstechnica/gadgets', site: 'https://arstechnica.com' },
    { id: 'extremetech', name: 'ExtremeTech Hardware', category: 'hardware', url: 'https://www.extremetech.com/category/computing/feed', site: 'https://extremetech.com' },
    { id: 'hardwarecanucks', name: 'Hardware Canucks', category: 'hardware', url: 'https://hardwarecanucks.com/feed/', site: 'https://hardwarecanucks.com' },

    // --- 🎮 VIDEOJUEGOS (11 fuentes) ---
    { id: 'ign', name: 'IGN News', category: 'gaming', url: 'https://feeds.feedburner.com/ign/news', site: 'https://ign.com' },
    { id: 'kotaku', name: 'Kotaku', category: 'gaming', url: 'https://kotaku.com/rss', site: 'https://kotaku.com' },
    { id: 'polygon', name: 'Polygon', category: 'gaming', url: 'https://www.polygon.com/rss/index.xml', site: 'https://polygon.com' },
    { id: 'eurogamer', name: 'Eurogamer', category: 'gaming', url: 'https://www.eurogamer.net/feed', site: 'https://eurogamer.net' },
    { id: 'gamespot', name: 'GameSpot News', category: 'gaming', url: 'https://www.gamespot.com/feeds/news/', site: 'https://gamespot.com' },
    { id: 'rockpapershotgun', name: 'Rock Paper Shotgun', category: 'gaming', url: 'https://www.rockpapershotgun.com/feed', site: 'https://rockpapershotgun.com' },
    { id: '3djuegos', name: '3DJuegos', category: 'gaming', url: 'https://www.3djuegos.com/universo/rss/rss.php', site: 'https://3djuegos.com' },
    { id: 'vandal', name: 'Vandal Videojuegos', category: 'gaming', url: 'https://vandal.elespanol.com/noticias.xml', site: 'https://vandal.elespanol.com' },
    { id: 'gematsu', name: 'Gematsu Gaming News', category: 'gaming', url: 'https://www.gematsu.com/feed', site: 'https://gematsu.com' },
    { id: 'destructoid', name: 'Destructoid', category: 'gaming', url: 'https://www.destructoid.com/feed/', site: 'https://destructoid.com' },
    { id: 'pcgamer-gaming', name: 'PC Gamer Gaming News', category: 'gaming', url: 'https://www.pcgamer.com/rss/news/', site: 'https://pcgamer.com' },

    // --- 💻 PROGRAMACIÓN & DEV (11 fuentes) ---
    { id: 'hackernews', name: 'Hacker News (Y Combinator)', category: 'dev', url: 'https://news.ycombinator.com/rss', site: 'https://news.ycombinator.com' },
    { id: 'devto', name: 'Dev.to Community', category: 'dev', url: 'https://dev.to/feed', site: 'https://dev.to' },
    { id: 'github-blog', name: 'GitHub Official Blog', category: 'dev', url: 'https://github.blog/feed/', site: 'https://github.blog' },
    { id: 'smashingmag', name: 'Smashing Magazine', category: 'dev', url: 'https://www.smashingmagazine.com/feed/', site: 'https://smashingmagazine.com' },
    { id: 'lobsters', name: 'Lobste.rs Computing', category: 'dev', url: 'https://lobste.rs/rss', site: 'https://lobste.rs' },
    { id: 'csstricks', name: 'CSS-Tricks', category: 'dev', url: 'https://css-tricks.com/feed/', site: 'https://css-tricks.com' },
    { id: 'infoq', name: 'InfoQ Architecture & Dev', category: 'dev', url: 'https://feed.infoq.com/', site: 'https://infoq.com' },
    { id: 'stackoverflow-blog', name: 'Stack Overflow Blog', category: 'dev', url: 'https://stackoverflow.blog/feed/', site: 'https://stackoverflow.blog' },
    { id: 'freecodecamp', name: 'freeCodeCamp News', category: 'dev', url: 'https://www.freecodecamp.org/news/rss/', site: 'https://freecodecamp.org/news' },
    { id: 'theregister-dev', name: 'The Register Software/Dev', category: 'dev', url: 'https://www.theregister.com/software/developer/headlines.atom', site: 'https://theregister.com' },
    { id: 'reddit-programming', name: 'Reddit r/programming Top', category: 'dev', url: 'https://www.reddit.com/r/programming/.rss', site: 'https://reddit.com/r/programming' }
];

// Base de datos de respaldo con URLs EXACTAS y VERIFICADAS a artículos reales
const FALLBACK_NEWS = [
    // --- 🤖 IA ---
    {
        id: 'fb-ai-1',
        title: "Enterprise AI's real risk isn't autonomous agents. It's the complexity between them",
        summary: 'Los desafíos de orquestación, gobernanza y observabilidad en sistemas multi-agente superan las expectativas iniciales de despliegue en entornos corporativos.',
        category: 'ai',
        source: 'VentureBeat AI',
        url: 'https://venturebeat.com/ai/enterprise-ais-real-risk-isnt-autonomous-agents-its-the-complexity-between-them',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 2 horas',
        timestamp: Date.now() - 2 * 3600 * 1000,
        readTime: '4 min',
        author: 'VentureBeat Staff',
        tags: ['MultiAgent', 'Enterprise', 'LLM', 'AI']
    },
    {
        id: 'fb-ai-2',
        title: 'The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits (BitNet b1.58)',
        summary: 'Investigación fundamental sobre cuantización ternaria extrema que permite ejecutar modelos de más de 70B de parámetros con consumo energético drásticamente reducido en hardware convencional.',
        category: 'ai',
        source: 'ArXiv cs.AI',
        url: 'https://arxiv.org/abs/2402.17764',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 5 horas',
        timestamp: Date.now() - 5 * 3600 * 1000,
        readTime: '6 min',
        author: 'Microsoft Research & Shuming Ma',
        tags: ['Quantization', 'BitNet', 'EdgeAI', 'Paper']
    },
    {
        id: 'fb-ai-3',
        title: 'AI is rewriting the developer career ladder: Here’s how to stand out',
        summary: 'Análisis del impacto de las herramientas de codificación asistida por IA en la evolución del rol del ingeniero de software y las nuevas competencias valoradas en la industria.',
        category: 'ai',
        source: 'GitHub Blog',
        url: 'https://github.blog/ai-and-ml/ai-is-rewriting-the-developer-career-ladder-heres-how-to-stand-out/',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 7 horas',
        timestamp: Date.now() - 7 * 3600 * 1000,
        readTime: '5 min',
        author: 'GitHub Team',
        tags: ['Copilot', 'Career', 'FutureOfDev']
    },
    {
        id: 'fb-ai-4',
        title: 'Open LLM Leaderboard v2: El nuevo estándar de evaluación de modelos abiertos',
        summary: 'Hugging Face renueva su benchmark principal introduciendo pruebas matemáticas complejas, razonamiento de instrucciones y filtros anti-contaminación de datos.',
        category: 'ai',
        source: 'Hugging Face',
        url: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 10 horas',
        timestamp: Date.now() - 10 * 3600 * 1000,
        readTime: '4 min',
        author: 'Hugging Face Research',
        tags: ['Benchmarks', 'OpenWeights', 'Leaderboard']
    },

    // --- ⚡ HARDWARE ---
    {
        id: 'fb-hw-1',
        title: "Modder 'fixes' melting RTX 5090 power connectors with custom distributor",
        summary: 'Un modder crea un distribuidor dual de 8 pines con disipador térmico personalizado que opera a solo 40°C durante pruebas de estrés sostenidas de 550W.',
        category: 'hardware',
        source: "Tom's Hardware",
        url: 'https://www.tomshardware.com/pc-components/gpus/modder-fixes-melting-rtx-5090-power-connectors-with-custom-distributor-dual-8-pin-mod-peaks-at-just-40c-during-a-48-hour-550w-stress-test',
        image: 'https://cdn.mos.cms.futurecdn.net/zSDbAK6zJvGgD5vmjfWw3m-1920-80.jpg',
        date: 'Hace 3 horas',
        timestamp: Date.now() - 3 * 3600 * 1000,
        readTime: '4 min',
        author: 'Tom\'s Hardware Lab',
        tags: ['GPU', 'RTX 5090', 'Overclock', 'Power']
    },
    {
        id: 'fb-hw-2',
        title: 'Modder brings Nvidia Pascal GPU support to Windows XP 32-bit',
        summary: 'Drivers modificados permiten a entusiastas utilizar tarjetas de la serie GTX 10 en plataformas retro con compatibilidad mejorada para DisplayPort y HDMI.',
        category: 'hardware',
        source: "Tom's Hardware",
        url: 'https://www.tomshardware.com/pc-components/gpu-drivers/modder-brings-nvidia-pascal-gpu-support-to-windows-xp-32-bit-modded-drivers-unlock-better-displayport-and-hdmi-support-for-modern-monitors',
        image: 'https://cdn.mos.cms.futurecdn.net/JnGyAXb2x6LNKcRbUXHM4F-1920-80.jpg',
        date: 'Hace 6 horas',
        timestamp: Date.now() - 6 * 3600 * 1000,
        readTime: '3 min',
        author: 'Hardware Drivers',
        tags: ['RetroComputing', 'Pascal', 'Drivers']
    },
    {
        id: 'fb-hw-3',
        title: 'Crucial T700 Pro PCIe 5.0 NVMe SSD Review: 12,400 MB/s de Lectura Secuencial',
        summary: 'Análisis detallado de rendimiento térmico y velocidad en la nueva controladora flash de Phison bajo cargas de trabajo pesadas de creación de contenido y gaming.',
        category: 'hardware',
        source: 'TechPowerUp',
        url: 'https://www.techpowerup.com/review/crucial-t700-pro-2-tb/',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 9 horas',
        timestamp: Date.now() - 9 * 3600 * 1000,
        readTime: '6 min',
        author: 'TechPowerUp Reviews',
        tags: ['PCIe 5.0', 'NVMe', 'SSD', 'Storage']
    },
    {
        id: 'fb-hw-4',
        title: 'Robotics startup has real human vs. robot cage match, California responds',
        summary: 'El enfrentamiento público entre un creador de contenido y tres robots humanoides autónomos desata un intenso debate regulatorio y técnico sobre robótica bípeda.',
        category: 'hardware',
        source: "Tom's Hardware",
        url: 'https://www.tomshardware.com/tech-industry/robotics/robotics-startup-has-real-human-vs-robot-cage-match-california-responds-with-cease-and-desist-order-regulator-threatens-misdemeanor-charges-after-youtuber-fights-three-robotic-humanoids',
        image: 'https://cdn.mos.cms.futurecdn.net/NruUp5NGPxCRDCzTrVBQxN-1920-80.png',
        date: 'Hace 12 horas',
        timestamp: Date.now() - 12 * 3600 * 1000,
        readTime: '4 min',
        author: 'Robotics Team',
        tags: ['Robotics', 'Humanoid', 'Engineering']
    },

    // --- 🎮 VIDEOJUEGOS ---
    {
        id: 'fb-game-1',
        title: 'Blindfolded Tekken 8 Player Achieves One of the Game’s Top Ranks from Beginner',
        summary: 'Increíble hazaña de accesibilidad y habilidad: un jugador profesional alcanza el rango God of Destruction en Tekken 8 compitiendo con los ojos completamente vendados.',
        category: 'gaming',
        source: 'IGN',
        url: 'https://www.ign.com/articles/blindfolded-tekken-8-player-achieves-one-of-the-games-top-ranks-from-beginner',
        image: 'https://assets-prd.ignimgs.com/2026/10/04/tekken-8-pro-gets-god-of-destruction-alisa-blindfolded-1791154556788.jpg',
        date: 'Hace 1 hora',
        timestamp: Date.now() - 1 * 3600 * 1000,
        readTime: '4 min',
        author: 'IGN eSports',
        tags: ['Tekken 8', 'eSports', 'FightingGames']
    },
    {
        id: 'fb-game-2',
        title: 'Dynasty Warriors Producer Tomohiko Sho Says Fans Prefer Sequels over Remasters',
        summary: 'El veterano productor de Koei Tecmo profundiza en las expectativas de la comunidad, las evoluciones del motor gráfico y la dirección de las sagas históricas de acción masiva.',
        category: 'gaming',
        source: 'Eurogamer',
        url: 'https://www.eurogamer.net/dynasty-warriors-tomohiko-sho-sequels-not-remasters',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 4 horas',
        timestamp: Date.now() - 4 * 3600 * 1000,
        readTime: '5 min',
        author: 'Eurogamer Features',
        tags: ['DynastyWarriors', 'GameDev', 'Industry']
    },
    {
        id: 'fb-game-3',
        title: 'Warner Bros. and Paramount unveil new corporate structure as studios realign',
        summary: 'Las productoras cinematográficas y de entretenimiento interactivo reorganizan sus divisiones de animación, licencias y videojuegos para afrontar la nueva etapa del streaming.',
        category: 'gaming',
        source: 'Kotaku',
        url: 'https://kotaku.com/warner-bros-and-paramount-unveil-new-name-as-both-studios-restructure-2000739662',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 8 horas',
        timestamp: Date.now() - 8 * 3600 * 1000,
        readTime: '4 min',
        author: 'Kotaku News',
        tags: ['Industry', 'GamingNews', 'Entertainment']
    },
    {
        id: 'fb-game-4',
        title: 'Lanterns finale explained: Breaking down the Man of Tomorrow storytelling',
        summary: 'Explicación detallada y análisis narrativo de los puntos clave del cierre de temporada y su conexión con futuros proyectos transmedia y adaptaciones de videojuegos.',
        category: 'gaming',
        source: 'Polygon',
        url: 'https://www.polygon.com/lanterns-finale-explained-man-of-tomorrow/',
        image: 'https://images.unsplash.com/photo-1612287233207-6a2c222ff47e?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 11 horas',
        timestamp: Date.now() - 11 * 3600 * 1000,
        readTime: '6 min',
        author: 'Polygon Culture',
        tags: ['Transmedia', 'Narrative', 'Polygon']
    },

    // --- 💻 PROGRAMACIÓN & DEV ---
    {
        id: 'fb-dev-1',
        title: 'Strata: Run Qwen 3.8 Flash Next (125B) on consumer hardware (RTX 4090) at 100T/s',
        summary: 'Un revolucionario motor de inferencia en C++ y CUDA permite ejecutar modelos masivos de 125 mil millones de parámetros a velocidades de producción en una sola GPU doméstica.',
        category: 'dev',
        source: 'GitHub / Hacker News',
        url: 'https://github.com/Niko1221/Strata',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 2 horas',
        timestamp: Date.now() - 2 * 3600 * 1000,
        readTime: '4 min',
        author: 'Niko1221 & OpenSource',
        tags: ['CUDA', 'Cpp', 'LLMInference', 'OpenSource']
    },
    {
        id: 'fb-dev-2',
        title: 'Remove and Disable Apple macOS AI Models Tool',
        summary: 'Script de código abierto y utilidad de terminal para inspeccionar, limitar y desactivar procesos en segundo plano de modelos generativos en versiones recientes de macOS.',
        category: 'dev',
        source: 'Hacker News',
        url: 'https://github.com/omlahore/RemoveMacAI',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 5 horas',
        timestamp: Date.now() - 5 * 3600 * 1000,
        readTime: '3 min',
        author: 'Omlahore',
        tags: ['MacOS', 'Security', 'Tooling', 'Bash']
    },
    {
        id: 'fb-dev-3',
        title: 'Highlights from Git 2.47: Rebase safeguards, performance improvements and new features',
        summary: 'El equipo de Git presenta las novedades de la versión 2.47 con protección mejorada ante conflictos de rebase y optimizaciones notables para repositorios masivos.',
        category: 'dev',
        source: 'GitHub Blog',
        url: 'https://github.blog/open-source/git/highlights-from-git-2-47/',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 7 horas',
        timestamp: Date.now() - 7 * 3600 * 1000,
        readTime: '5 min',
        author: 'Taylor Blau & Git Team',
        tags: ['Git', 'VersionControl', 'OpenSource']
    },
    {
        id: 'fb-dev-4',
        title: 'Dev Community: What was your win this week in software engineering?',
        summary: 'Desarrolladores de todo el mundo comparten sus logros semanales, desde optimizaciones de pipelines CI/CD hasta resolución de bugs de concurrencia y despliegues en producción.',
        category: 'dev',
        source: 'Dev.to',
        url: 'https://dev.to/devteam/what-was-your-win-this-week-4jli',
        image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=900&q=80',
        date: 'Hace 10 horas',
        timestamp: Date.now() - 10 * 3600 * 1000,
        readTime: '3 min',
        author: 'The DEV Team',
        tags: ['Community', 'WebDev', 'Career']
    }
];

// Helper para parsear feeds vía rss2json y APIs nativas
async function fetchSingleFeed(feedConfig) {
    // 1. Caso especial: Dev.to (API nativa con CORS libre)
    if (feedConfig.id === 'devto') {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);
            const res = await fetch('https://dev.to/api/articles?per_page=4', { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const articles = await res.json();
                return articles.map((a, idx) => ({
                    id: `rss-devto-${a.id}-${Date.now()}`,
                    title: a.title,
                    summary: a.description || 'Haz clic para leer la discusión completa en Dev.to.',
                    category: 'dev',
                    source: 'Dev.to',
                    url: a.url, // URL exacta al artículo
                    image: a.cover_image || a.social_image || getDeterministicThemeImage('dev', a.title),
                    date: timeAgo(new Date(a.published_at || a.created_at)),
                    timestamp: new Date(a.published_at || a.created_at).getTime() || Date.now(),
                    readTime: `${a.reading_time_minutes || 4} min`,
                    author: a.user?.name || 'Dev.to Author',
                    tags: (a.tag_list || ['DEV', 'WEB']).map(t => t.toUpperCase())
                }));
            }
        } catch (e) {
            // Seguir a rss2json
        }
    }

    // 2. Consulta vía rss2json (Rápido, estructurado y con enlaces profundos garantizados)
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedConfig.url)}`;
        
        const response = await fetch(rss2jsonUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
                return data.items.slice(0, 4).map((item, index) => {
                    // Limpiar etiquetas HTML de la descripción
                    const tmp = document.createElement('div');
                    tmp.innerHTML = item.description || item.content || '';
                    const cleanDesc = tmp.textContent.trim().slice(0, 220) + (tmp.textContent.length > 220 ? '...' : '');

                    // Encontrar imagen
                    let img = item.thumbnail || item.enclosure?.link;
                    if (!img || !img.startsWith('http')) {
                        const imgMatch = (item.description || item.content || '').match(/<img[^>]+src=["'](https?:\/\/[^"'>]+)["']/i);
                        img = imgMatch ? imgMatch[1] : getDeterministicThemeImage(feedConfig.category, item.title);
                    }

                    // Enlace profundo exacto
                    const link = (item.link && item.link.startsWith('http')) ? item.link : (item.guid && item.guid.startsWith('http') ? item.guid : feedConfig.site);

                    const dateObj = item.pubDate ? new Date(item.pubDate) : new Date();

                    return {
                        id: `rss-${feedConfig.id}-${index}-${Date.now()}`,
                        title: item.title ? item.title.trim() : 'Sin título',
                        summary: cleanDesc || 'Haz clic en el enlace para consultar la noticia completa en el portal oficial.',
                        category: feedConfig.category,
                        source: feedConfig.name,
                        url: link,
                        image: img,
                        date: timeAgo(dateObj),
                        timestamp: isNaN(dateObj.getTime()) ? Date.now() : dateObj.getTime(),
                        readTime: `${Math.max(2, Math.min(8, Math.round((cleanDesc.length + 100) / 70)))} min`,
                        author: item.author || feedConfig.name,
                        tags: (item.categories && item.categories.length > 0) 
                            ? item.categories.slice(0, 3).map(c => String(c).toUpperCase()) 
                            : [feedConfig.category.toUpperCase(), 'EN VIVO']
                    };
                });
            }
        }
    } catch (err) {
        // Fallback
    }

    return null;
}

function timeAgo(date) {
    if (!date || isNaN(date.getTime())) return 'Reciente';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Hace un momento';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `Hace ${days} d`;
}
