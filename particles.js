/**
 * particles.js - CyberHUD Canvas Particle & Grid Engine
 * Gráficos interactivos de alto rendimiento estilo Sci-Fi / Cyberpunk
 */

class CyberBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.gridLines = [];
        this.mouse = { x: -1000, y: -1000, radius: 140 };
        this.isActive = true;
        this.particleCount = 65;
        this.themeColor = '#00f3ff';

        this.init();
        this.bindEvents();
        this.animate();
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        // Ajustar cantidad de partículas según el tamaño de la pantalla
        if (this.width < 768) {
            this.particleCount = 35;
        } else {
            this.particleCount = 75;
        }
    }

    createParticles() {
        this.particles = [];
        const colors = ['#00f3ff', '#ff9900', '#ff007f', '#00ff66'];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                baseColor: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.6 + 0.2,
                pulse: Math.random() * Math.PI,
                pulseSpeed: 0.02 + Math.random() * 0.03
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createParticles();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        // Pausar render si la pestaña está en segundo plano para ahorrar recursos
        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
            if (this.isActive) this.animate();
        });
    }

    drawCyberGrid() {
        const ctx = this.ctx;
        const gridSize = 60;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.03)';
        ctx.lineWidth = 1;

        // Líneas verticales
        for (let x = 0; x < this.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        // Líneas horizontales
        for (let y = 0; y < this.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    animate() {
        if (!this.isActive) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Fondo de cuadrícula HUD tenue
        this.drawCyberGrid();

        // Actualizar y dibujar partículas
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            // Rebotar en bordes
            if (p.x < 0 || p.x > this.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.height) p.vy *= -1;

            // Interacción con el cursor del mouse (repulsión suave)
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.mouse.radius) {
                const force = (this.mouse.radius - dist) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                p.x -= Math.cos(angle) * force * 3;
                p.y -= Math.sin(angle) * force * 3;
            }

            // Pulso de resplandor
            p.pulse += p.pulseSpeed;
            const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.2;

            // Dibujar partícula
            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(0.9, currentAlpha));
            ctx.fill();
            ctx.restore();

            // Dibujar líneas de conexión entre partículas cercanas
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const connDx = p.x - p2.x;
                const connDy = p.y - p2.y;
                const connDist = Math.sqrt(connDx * connDx + connDy * connDy);
                const maxDist = 120;

                if (connDist < maxDist) {
                    const lineAlpha = (1 - connDist / maxDist) * 0.25;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = lineAlpha;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    setCategoryGlow(color) {
        this.themeColor = color;
    }
}

// Iniciar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
    window.cyberBg = new CyberBackground('cyber-canvas');
});
