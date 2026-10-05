# ⚡ CYBERHUD // TECH RADAR

Terminal futurista y personal de noticias de tecnología en tiempo real enfocada en cuatro ejes fundamentales: **Inteligencia Artificial**, **Hardware Computacional**, **Videojuegos** y **Programación & Desarrollo de Software**.

Diseñado con una estética *Cyberpunk / Sci-Fi HUD* de alto impacto visual, arquitectura modular y conexión a más de 40 medios de comunicación internacionales.

---

## 🚀 Características Principales

- **🎨 Estética Cyberpunk / Glassmorphism**:
  - Efectos visuales de resplandor neón con paletas cromáticas diferenciadas por categoría:
    - 🤖 **Inteligencia Artificial**: Acentos Cian holográfico (`#00f3ff`).
    - ⚡ **Hardware Computacional**: Acentos Ámbar de alto voltaje (`#ff9900`).
    - 🎮 **Videojuegos**: Acentos Neón Magenta (`#ff007f`).
    - 💻 **Programación & Dev**: Acentos Verde Matrix (`#00ff66`).
  - Capa opcional de líneas de escaneo CRT (*CRT SCAN*) con interruptor en el HUD.
  - Tarjetas con bordes cortados en diagonal, efecto de zoom en imágenes al pasar el cursor y desenfoque translúcido (`backdrop-filter`).
- **🌌 Fondo Interactivo de Partículas (Canvas 2D)**:
  - Constelación de partículas reactivas en tiempo real al cursor del ratón y sincronización de colores con la categoría activa.
- **📡 Catálogo de +40 Fuentes Tecnológicas**:
  - Conexión a 44 medios reconocidos (11 por área): *OpenAI, DeepMind, Tom's Hardware, IGN, Kotaku, Eurogamer, Polygon, Hacker News, Dev.to, GitHub Blog, TechPowerUp, VentureBeat, ArXiv, etc.*
  - Motor de consulta asíncrono con `rss2json` y APIs nativas (Dev.to / HackerNews) para extracción de enlaces profundos garantizados.
  - Base de datos local rica con enlaces y artículos verificados como respaldo (*offline-first*).
- **⏱️ Telemetría y Marquesina de Última Hora (Ticker)**:
  - Cinta continua con titulares de última hora que se pausa al interactuar.
  - Reloj digital en tiempo real sincronizado con hora local y UTC.
- **🔎 Búsqueda y Productividad**:
  - Filtro instantáneo por texto (títulos, resúmenes, autores y etiquetas).
  - Marcadores persistentes de favoritos almacenados localmente en `localStorage`.
  - Visor modal holográfico para lectura rápida y botón directo `LEER ↗` hacia el artículo original.

---

## 📂 Estructura del Proyecto

```text
tech-news-dashboard/
├── index.html       # Estructura semántica, cabecera HUD, ticker, controles y modales
├── styles.css       # Estilos Cyberpunk, variables neón, layout responsive y animaciones
├── feeds.js         # Catálogo de 44 fuentes, base de datos de respaldo y parser RSS
├── particles.js     # Motor Canvas de partículas y cuadrícula reactiva al cursor
├── app.js           # Controlador principal de estado, filtros, bookmarks y eventos
└── README.md        # Documentación del proyecto
```

---

## 🛠️ Cómo Ejecutarlo

No requiere instalaciones complejas ni dependencias de backend:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/phmatelunav/TechNewsDashboard.git
   ```
2. Entra al directorio:
   ```bash
   cd TechNewsDashboard
   ```
3. Abre `index.html` en tu navegador favorito (Chrome, Edge, Firefox, Brave).

---

## 📄 Licencia

MIT License © 2026 phmatelunav
