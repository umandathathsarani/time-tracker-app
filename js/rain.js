const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;
const symbols = ['🐞', '🐈‍⬛'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height; 
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -50; 
        this.size = Math.random() * 15 + 20; 
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.speedY = Math.random() * 2 + 2;
        this.speedX = (Math.random() - 0.5) * 1.5; 
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
    }

    update(cardBounds) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        this.speedY += 0.05; 

        if (cardBounds) {

            const pad = 10; 
            if (
                this.x > cardBounds.left - pad && 
                this.x < cardBounds.right + pad && 
                this.y > cardBounds.top - pad && 
                this.y < cardBounds.bottom + pad
            ) {
                this.speedY = -this.speedY * 0.5; 
                this.y = cardBounds.top - pad; 

                if (this.x < cardBounds.left + (cardBounds.width / 2)) {
                    this.speedX -= 1;
                } else {
                    this.speedX += 1;
                }
            }
        }

        if (this.y > canvas.height + 50 || this.x < -50 || this.x > canvas.width + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.font = `${this.size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {

    if (document.body.getAttribute('data-theme') === 'secret') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const timerCard = document.querySelector('.timer-card');
        const cardBounds = timerCard ? timerCard.getBoundingClientRect() : null;

        particles.forEach(particle => {
            particle.update(cardBounds);
            particle.draw();
        });
    }

    requestAnimationFrame(animate);
}

animate();