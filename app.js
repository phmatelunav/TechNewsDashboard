/**
 * app.js - CyberHUD Tech News Controller
 * Gestión de estado, feeds asíncronos, filtros, búsqueda, marcadores y modales.
 */

class NewsDashboard {
    constructor() {
        this.articles = [...FALLBACK_NEWS];
        this.activeCategory = 'all';
        this.searchQuery = '';
        this.sortOrder = 'recent';
        this.bookmarks = this.loadBookmarks();
        this.scanlinesActive = true;
        this.isLoadingFeeds = false;

        this.initDOMElements();
        this.initClock();
        this.bindEvents();
        this.updateCategoryCounts();
        this.renderTicker();
        this.renderArticles();
        this.fetchLiveFeeds();
    }

    initDOMElements() {
        this.newsGrid = document.getElementById('news-grid');
        this.tickerContent = document.getElementById('ticker-content');
        this.searchInput = document.getElementById('search-input');
        this.sortSelect = document.getElementById('sort-select');
        this.clockElement = document.getElementById('digital-clock');
        this.scanlinesOverlay = document.getElementById('scanlines-overlay');
        this.scanlinesToggle = document.getElementById('toggle-scanlines');
        this.refreshBtn = document.getElementById('refresh-feeds-btn');
        this.sourcesBtn = document.getElementById('view-sources-btn');
        this.activeFeedsCount = document.getElementById('active-feeds-val');
        this.articleModal = document.getElementById('article-modal');
        this.sourcesModal = document.getElementById('sources-modal');
        this.closeModalBtns = document.querySelectorAll('.modal-close-btn');
    }

    bindEvents() {
        // Pestañas de categoría
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const cat = e.currentTarget.getAttribute('data-cat');
                this.setActiveCategory(cat);
            });
        });

        // Búsqueda en vivo
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.renderArticles();
        });

        // Ordenamiento
        this.sortSelect.addEventListener('change', (e) => {
            this.sortOrder = e.target.value;
            this.renderArticles();
        });

        // Toggle de líneas de escaneo CRT
        this.scanlinesToggle.addEventListener('click', () => {
            this.scanlinesActive = !this.scanlinesActive;
            this.scanlinesOverlay.classList.toggle('hidden', !this.scanlinesActive);
            this.scanlinesToggle.classList.toggle('active', this.scanlinesActive);
        });

        // Botón de refrescar feeds
        this.refreshBtn.addEventListener('click', () => {
            if (this.isLoadingFeeds) return;
            this.fetchLiveFeeds(true);
        });

        // Modal de fuentes
        this.sourcesBtn.addEventListener('click', () => {
            this.openSourcesModal();
        });

        // Cerrar modales
        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Cerrar al hacer clic en el backdrop
        [this.articleModal, this.sourcesModal].forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });

        // Cerrar con Escape
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModals();
        });
    }

    initClock() {
        const update = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            const secs = String(now.getSeconds()).padStart(2, '0');
            const utcHours = String(now.getUTCHours()).padStart(2, '0');
            const utcMins = String(now.getUTCMinutes()).padStart(2, '0');
            if (this.clockElement) {
                this.clockElement.innerHTML = `${hours}:${mins}:${secs} <span style="font-size:0.75rem; color:var(--text-muted);">(UTC ${utcHours}:${utcMins})</span>`;
            }
        };
        update();
        setInterval(update, 1000);
    }

    loadBookmarks() {
        try {
            const data = localStorage.getItem('cyberhud_saved_articles');
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    saveBookmarks() {
        try {
            localStorage.setItem('cyberhud_saved_articles', JSON.stringify(this.bookmarks));
        } catch (e) {
            console.error('Error guardando bookmarks', e);
        }
    }

    toggleBookmark(articleId, e) {
        if (e) e.stopPropagation();
        const index = this.bookmarks.indexOf(articleId);
        if (index > -1) {
            this.bookmarks.splice(index, 1);
        } else {
            this.bookmarks.push(articleId);
        }
        this.saveBookmarks();
        this.updateCategoryCounts();
        this.renderArticles();
    }

    setActiveCategory(cat) {
        this.activeCategory = cat;

        // Actualizar clases activas en botones
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-cat') === cat);
        });

        // Color temático para el canvas
        if (window.cyberBg && CATEGORIES[cat]) {
            window.cyberBg.setCategoryGlow(CATEGORIES[cat].color);
        }

        this.renderArticles();
    }

    updateCategoryCounts() {
        const counts = {
            all: this.articles.length,
            ai: this.articles.filter(a => a.category === 'ai').length,
            hardware: this.articles.filter(a => a.category === 'hardware').length,
            gaming: this.articles.filter(a => a.category === 'gaming').length,
            dev: this.articles.filter(a => a.category === 'dev').length,
            saved: this.bookmarks.length
        };

        for (const [key, count] of Object.entries(counts)) {
            const badge = document.querySelector(`.tab-count[data-count-cat="${key}"]`);
            if (badge) badge.textContent = count;
        }

        if (this.activeFeedsCount) {
            this.activeFeedsCount.textContent = `${FEEDS_CATALOG.length} FUENTES`;
        }
    }

    renderTicker() {
        if (!this.tickerContent) return;
        const topArticles = this.articles.slice(0, 10);
        let html = '';

        topArticles.forEach(item => {
            const cat = CATEGORIES[item.category] || CATEGORIES.ai;
            html += `
                <div class="ticker-item" data-id="${item.id}">
                    <span class="ticker-cat-tag" style="background:${cat.color}22; color:${cat.color}; border:1px solid ${cat.color}55;">
                        ${cat.name.split(' ')[0]}
                    </span>
                    <span>${this.escapeHtml(item.title)}</span>
                    <span style="color:var(--text-muted); font-size:0.75rem;">• ${item.source}</span>
                </div>
            `;
        });

        // Duplicar para efecto continuo de cinta
        this.tickerContent.innerHTML = html + html;

        // Clic en items de la marquesina
        this.tickerContent.querySelectorAll('.ticker-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.getAttribute('data-id');
                const article = this.articles.find(a => a.id === id);
                if (article) this.openArticleModal(article);
            });
        });
    }

    getFilteredArticles() {
        return this.articles.filter(item => {
            // Filtro por categoría
            if (this.activeCategory === 'saved') {
                if (!this.bookmarks.includes(item.id)) return false;
            } else if (this.activeCategory !== 'all' && item.category !== this.activeCategory) {
                return false;
            }

            // Filtro por búsqueda
            if (this.searchQuery) {
                const matchTitle = item.title.toLowerCase().includes(this.searchQuery);
                const matchSummary = item.summary.toLowerCase().includes(this.searchQuery);
                const matchSource = item.source.toLowerCase().includes(this.searchQuery);
                const matchTags = item.tags && item.tags.some(t => t.toLowerCase().includes(this.searchQuery));
                if (!matchTitle && !matchSummary && !matchSource && !matchTags) return false;
            }

            return true;
        }).sort((a, b) => {
            if (this.sortOrder === 'recent') {
                return (b.timestamp || 0) - (a.timestamp || 0);
            } else if (this.sortOrder === 'reading') {
                const timeA = parseInt(a.readTime) || 3;
                const timeB = parseInt(b.readTime) || 3;
                return timeB - timeA;
            } else if (this.sortOrder === 'alpha') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    }

    renderArticles() {
        if (!this.newsGrid) return;
        const filtered = this.getFilteredArticles();

        if (filtered.length === 0) {
            this.newsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📡</div>
                    <h3 class="empty-title">Sin resultados en este sector</h3>
                    <p style="color:var(--text-secondary); max-width:450px; margin:0 auto;">
                        No se encontraron registros que coincidan con "${this.escapeHtml(this.searchQuery)}" en la categoría seleccionada.
                    </p>
                </div>
            `;
            return;
        }

        let html = '';
        filtered.forEach(article => {
            const isSaved = this.bookmarks.includes(article.id);
            const cat = CATEGORIES[article.category] || CATEGORIES.ai;
            const tagsHtml = (article.tags || []).map(t => `<span class="tag-item">#${this.escapeHtml(t)}</span>`).join('');
            const articleImage = article.image || getDeterministicThemeImage(article.category, article.title);

            html += `
                <article class="news-card" data-cat="${article.category}" data-id="${article.id}">
                    <div class="corner-deco"></div>
                    
                    <div class="card-media">
                        <img src="${articleImage}" alt="${this.escapeHtml(article.title)}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
                        <div class="card-media-overlay"></div>
                        <span class="card-category-badge">
                            <span style="font-size:0.8rem;">●</span> ${cat.name}
                        </span>
                        <button class="bookmark-btn ${isSaved ? 'saved' : ''}" title="${isSaved ? 'Guardado' : 'Guardar noticia'}" data-bookmark-id="${article.id}">
                            ${isSaved ? '★' : '☆'}
                        </button>
                    </div>

                    <div class="card-body">
                        <div>
                            <h2 class="card-title">${this.escapeHtml(article.title)}</h2>
                            <p class="card-summary">${this.escapeHtml(article.summary)}</p>
                        </div>

                        <div>
                            <div class="card-tags">
                                ${tagsHtml}
                            </div>

                            <div class="card-footer">
                                <div class="card-source">
                                    <span class="card-source-dot"></span>
                                    <span>${this.escapeHtml(article.source)}</span>
                                </div>
                                <div class="card-meta-right">
                                    <span>⏱️ ${article.readTime || '3 min'}</span>
                                    <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="card-direct-link" title="Abrir noticia original en nueva pestaña">
                                        <span>LEER</span>
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        });

        this.newsGrid.innerHTML = html;

        // Bind clicks de tarjetas y marcadores
        this.newsGrid.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Si el clic fue en bookmark o en el botón de enlace directo, no abrir el modal
                if (e.target.closest('.bookmark-btn') || e.target.closest('.card-direct-link')) return;
                const id = card.getAttribute('data-id');
                const article = this.articles.find(a => a.id === id);
                if (article) this.openArticleModal(article);
            });
        });

        this.newsGrid.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-bookmark-id');
                this.toggleBookmark(id, e);
            });
        });
    }

    async fetchLiveFeeds(force = false) {
        if (this.isLoadingFeeds) return;
        this.isLoadingFeeds = true;

        if (this.refreshBtn) {
            this.refreshBtn.innerHTML = `<span>⏳</span><span>ACTUALIZANDO...</span>`;
            this.refreshBtn.classList.add('active');
        }

        // Seleccionar feeds de alta disponibilidad para consulta en tiempo real
        const sampledFeeds = [
            // AI
            FEEDS_CATALOG.find(f => f.id === 'venturebeat-ai'),
            FEEDS_CATALOG.find(f => f.id === 'theverge-ai'),
            FEEDS_CATALOG.find(f => f.id === 'openai'),
            // Hardware
            FEEDS_CATALOG.find(f => f.id === 'tomshardware'),
            FEEDS_CATALOG.find(f => f.id === 'wccftech-hw'),
            // Gaming
            FEEDS_CATALOG.find(f => f.id === 'ign'),
            FEEDS_CATALOG.find(f => f.id === 'eurogamer'),
            FEEDS_CATALOG.find(f => f.id === 'kotaku'),
            FEEDS_CATALOG.find(f => f.id === 'polygon'),
            // Dev
            FEEDS_CATALOG.find(f => f.id === 'devto'),
            FEEDS_CATALOG.find(f => f.id === 'github-blog'),
            FEEDS_CATALOG.find(f => f.id === 'hackernews')
        ].filter(Boolean);

        const newArticles = [];

        // Consultar feeds en paralelo con límite
        const promises = sampledFeeds.map(feed => fetchSingleFeed(feed));
        const results = await Promise.allSettled(promises);

        results.forEach(res => {
            if (res.status === 'fulfilled' && Array.isArray(res.value)) {
                newArticles.push(...res.value);
            }
        });

        if (newArticles.length > 0) {
            // Evitar duplicados por título
            const existingTitles = new Set(this.articles.map(a => a.title.toLowerCase().trim()));
            const uniqueIncoming = newArticles.filter(a => !existingTitles.has(a.title.toLowerCase().trim()));

            if (uniqueIncoming.length > 0) {
                this.articles = [...uniqueIncoming, ...this.articles];
                this.updateCategoryCounts();
                this.renderTicker();
                this.renderArticles();
            }
        }

        this.isLoadingFeeds = false;
        if (this.refreshBtn) {
            this.refreshBtn.innerHTML = `<span>🔄</span><span>REFRESCAR FEEDS</span>`;
            this.refreshBtn.classList.remove('active');
        }
    }

    openArticleModal(article) {
        if (!this.articleModal) return;
        const cat = CATEGORIES[article.category] || CATEGORIES.ai;
        const tagsHtml = (article.tags || []).map(t => `<span class="tag-item">#${this.escapeHtml(t)}</span>`).join('');
        const isSaved = this.bookmarks.includes(article.id);
        const articleImage = article.image || getDeterministicThemeImage(article.category, article.title);

        this.articleModal.querySelector('.modal-window').innerHTML = `
            <button class="modal-close-btn">&times;</button>
            <div class="modal-meta-top">
                <span class="card-category-badge" style="background:${cat.color}22; color:${cat.color}; border:1px solid ${cat.color}55;">
                    ${cat.name}
                </span>
                <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-muted);">
                    ID: ${article.id.slice(0, 14)}
                </span>
            </div>

            <h2 class="modal-title">${this.escapeHtml(article.title)}</h2>

            <div class="modal-details-bar">
                <span><strong>Fuente:</strong> ${this.escapeHtml(article.source)}</span>
                <span><strong>Publicado:</strong> ${article.date || 'Reciente'}</span>
                <span><strong>Lectura estimada:</strong> ${article.readTime || '3 min'}</span>
                ${article.author ? `<span><strong>Autor:</strong> ${this.escapeHtml(article.author)}</span>` : ''}
            </div>

            <div class="modal-featured-image">
                <img src="${articleImage}" alt="${this.escapeHtml(article.title)}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'">
            </div>

            <p class="modal-summary">${this.escapeHtml(article.summary)}</p>

            <div class="modal-tags">
                ${tagsHtml}
            </div>

            <div class="modal-actions">
                <button class="cyber-btn modal-bookmark-toggle ${isSaved ? 'active' : ''}">
                    ${isSaved ? '★ GUARDADO EN FAVORITOS' : '☆ GUARDAR PARA DESPUÉS'}
                </button>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="external-link-btn">
                    <span>LEER ARTÍCULO EN ${this.escapeHtml(article.source).toUpperCase()}</span>
                    <span>↗</span>
                </a>
            </div>
        `;

        this.articleModal.classList.add('active');

        // Bind boton de cerrar y favoritos dentro del modal
        this.articleModal.querySelector('.modal-close-btn').addEventListener('click', () => {
            this.closeModals();
        });

        const modalBmBtn = this.articleModal.querySelector('.modal-bookmark-toggle');
        if (modalBmBtn) {
            modalBmBtn.addEventListener('click', () => {
                this.toggleBookmark(article.id);
                const updatedSaved = this.bookmarks.includes(article.id);
                modalBmBtn.classList.toggle('active', updatedSaved);
                modalBmBtn.textContent = updatedSaved ? '★ GUARDADO EN FAVORITOS' : '☆ GUARDAR PARA DESPUÉS';
            });
        }
    }

    openSourcesModal() {
        if (!this.sourcesModal) return;

        let contentHtml = `
            <button class="modal-close-btn">&times;</button>
            <div class="modal-meta-top">
                <span class="card-category-badge" style="background:#00f3ff22; color:#00f3ff; border:1px solid #00f3ff55;">
                    SISTEMA DE FUENTES
                </span>
            </div>
            <h2 class="modal-title">Catálogo Completo de Fuentes (+44 Feeds)</h2>
            <p style="color:var(--text-secondary); margin-bottom:1.5rem; font-size:0.92rem;">
                Feeds RSS y portales oficiales conectados para monitoreo en vivo de Inteligencia Artificial, Hardware, Gaming y Programación.
            </p>
            <div class="sources-modal-body">
        `;

        FEEDS_CATALOG.forEach(feed => {
            const cat = CATEGORIES[feed.category] || CATEGORIES.ai;
            contentHtml += `
                <div class="source-item-card">
                    <div>
                        <div class="source-item-name">${this.escapeHtml(feed.name)}</div>
                        <div style="font-size:0.75rem; color:${cat.color}; font-family:var(--font-mono);">${cat.name}</div>
                    </div>
                    <a href="${feed.site}" target="_blank" rel="noopener noreferrer" class="cyber-btn" style="padding:0.3rem 0.6rem; font-size:0.78rem;">
                        VISITAR ↗
                    </a>
                </div>
            `;
        });

        contentHtml += `
            </div>
            <div style="margin-top:2rem; text-align:right;">
                <button class="cyber-btn close-sources-btn">CERRAR TERMINAL</button>
            </div>
        `;

        this.sourcesModal.querySelector('.modal-window').innerHTML = contentHtml;
        this.sourcesModal.classList.add('active');

        this.sourcesModal.querySelector('.modal-close-btn').addEventListener('click', () => this.closeModals());
        this.sourcesModal.querySelector('.close-sources-btn').addEventListener('click', () => this.closeModals());
    }

    closeModals() {
        if (this.articleModal) this.articleModal.classList.remove('active');
        if (this.sourcesModal) this.sourcesModal.classList.remove('active');
    }

    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

// Inicialización de la aplicación
window.addEventListener('DOMContentLoaded', () => {
    window.app = new NewsDashboard();
});
