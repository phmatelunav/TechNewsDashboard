/**
 * particles.js - Ambient Constellation Engine
 * Fondo ambiental sutil, minimalista y elegante
 */

class AmbientBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, radius: 100 };
        this.isActive = true;
        this.particleCount = 45;
        this.accentColor = 'rgba(99, 102, 241, ';

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
        this.particleCount = this.width < 768 ? 25 : 45;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.5 + 0.8,
                alpha: Math.random() * 0.35 + 0.1,
                pulse: Math.random() * Math.PI,
                pulseSpeed: 0.015 + Math.random() * 0.02
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

        document.addEventListener('visibilitychange', () => {
            this.isActive = !document.hidden;
            if (this.isActive) this.animate();
        });
    }

    animate() {
        if (!this.isActive) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // Actualizar y dibujar partículas sutiles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;

            // Repulsión muy suave del cursor
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.mouse.radius) {
                const force = (this.mouse.radius - dist) / this.mouse.radius;
                p.x -= (dx / dist) * force * 1.5;
                p.y -= (dy / dist) * force * 1.5;
            }

            p.pulse += p.pulseSpeed;
            const currentAlpha = Math.max(0.08, p.alpha + Math.sin(p.pulse) * 0.1);

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
            ctx.fill();
            ctx.restore();

            // Conexiones finas y tenues entre partículas
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const connDx = p.x - p2.x;
                const connDy = p.y - p2.y;
                const connDist = Math.sqrt(connDx * connDx + connDy * connDy);
                const maxDist = 130;

                if (connDist < maxDist) {
                    const lineAlpha = (1 - connDist / maxDist) * 0.08;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }

    setCategoryGlow(color) {
        // Mantiene la sobriedad sin luces estridentes
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.ambientBg = new AmbientBackground('cyber-canvas');
});
