const canvas = document.getElementById('glitter-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 200; 

const colors = [
    '255, 215, 0',    
    '192, 192, 192',  
    '255, 255, 255',  
    '183, 110, 121'   
];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Glitter {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2.5 + 0.5;
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.life = Math.random() * Math.PI * 2; 
        this.twinkleSpeed = Math.random() * 0.05 + 0.02;
    }

    update(cardBoundsArray) {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life += this.twinkleSpeed;

        if (cardBoundsArray && cardBoundsArray.length > 0) {
            const pad = 5;
            for (let bounds of cardBoundsArray) {
                if (
                    this.x > bounds.left - pad && 
                    this.x < bounds.right + pad && 
                    this.y > bounds.top - pad && 
                    this.y < bounds.bottom + pad
                ) {
                    this.speedY = -this.speedY * 0.5; 
                    this.y = bounds.top - pad;

                    if (this.x < bounds.left + (bounds.width / 2)) {
                        this.speedX -= 0.5; 
                    } else {
                        this.speedX += 0.5;
                    }
                    break; 
                }
            }
        }

        if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
        }
    }

    draw() {
        const opacity = Math.abs(Math.sin(this.life)) * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = `rgba(${this.baseColor}, ${opacity})`;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Glitter());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cards = document.querySelectorAll('.timer-card, .alarm-card, .clock-card');
    const cardBoundsArray = Array.from(cards).map(card => card.getBoundingClientRect());

    particles.forEach(particle => {
        particle.update(cardBoundsArray);
        particle.draw();
    });

    requestAnimationFrame(animate);
}

animate();