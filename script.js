document.addEventListener('DOMContentLoaded', () => {

    const scrollElements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    const canvas = document.getElementById('embers-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let leaves = [];

        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 100;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.sway = Math.random() * 0.5 - 0.25; 
                this.swayAngle = Math.random() * Math.PI * 2;
            }

            update() {
                this.y -= this.speedY;
                this.swayAngle += 0.03;
                this.x += Math.sin(this.swayAngle) * this.sway;

                if (this.y < -10) {
                    this.y = canvas.height + 10;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Leaf {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.size = Math.random() * 8 + 6;
                this.speedY = Math.random() * 1 + 0.5;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.sway = Math.random() * 0.8 - 0.4;
                this.swayAngle = Math.random() * Math.PI * 2;
                this.opacity = Math.random() * 0.6 + 0.4;
            }

            update() {
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;
                this.swayAngle += 0.02;
                this.x += Math.sin(this.swayAngle) * this.sway;

                if (this.y > canvas.height + 20) {
                    this.y = -20;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.beginPath();
                ctx.fillStyle = `rgba(85, 107, 47, ${this.opacity})`;
                ctx.moveTo(0, -this.size);
                ctx.quadraticCurveTo(this.size / 2, 0, 0, this.size);
                ctx.quadraticCurveTo(-this.size / 2, 0, 0, -this.size);
                ctx.fill();
                ctx.restore();
            }
        }

        const createElements = () => {
            particles = [];
            leaves = [];
            const particleCount = window.innerWidth < 768 ? 25 : 50;
            const leafCount = window.innerWidth < 768 ? 10 : 15;

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
            for (let i = 0; i < leafCount; i++) {
                leaves.push(new Leaf());
            }
        };
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            leaves.forEach(l => {
                l.update();
                l.draw();
            });

            requestAnimationFrame(animate);
        };
        
        setupCanvas();
        createElements();
        animate();

        window.addEventListener('resize', () => {
            setupCanvas();
            createElements();
        });
    }
});