const canvas = document.getElementById("bg-tech");
const ctx = canvas.getContext("2d");

let particles = [];
const mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Tamanhos variados para efeito de profundidade
        this.size = Math.random() * 2 + 1; 
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebater nas bordas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interação com o mouse (atração suave)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 210, 255, 0.8)";
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
            
                ctx.strokeStyle = `rgba(0, 210, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

/* --- FINAL DA SUA ANIMAÇÃO --- */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    connect();
    requestAnimationFrame(animate);
}

init();
animate(); 

const formulario = document.getElementById("meu-formulario");
const statusEnvio = document.getElementById("status-envio");

if (formulario) {
    formulario.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const botao = document.getElementById("botao-enviar");
        const dados = new FormData(event.target);
        
        
        const containerPai = document.querySelector(".contato-container");
        
        botao.disabled = true;
        botao.innerText = "Enviando...";

        try {
            const response = await fetch("https://formspree.io/f/xgodoobj", {
                method: 'POST',
                body: dados,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
              
                containerPai.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; text-align: center;">
                        <h3 style="color: #00d2ff; margin-bottom: 10px;">Mensagem enviada com sucesso!</h3>
                        <p style="color: #fff; opacity: 0.8;">Obrigado pelo contato, responderei em breve.</p>
                    </div>
                `;
            } else {
                statusEnvio.innerHTML = "Erro ao enviar. Tente novamente.";
                statusEnvio.style.color = "#ff4c4c";
            }
        } catch (error) {
            statusEnvio.innerHTML = "Erro de conexão.";
            statusEnvio.style.color = "#ff4c4c";
        } finally {
          
            if (document.getElementById("botao-enviar")) {
                botao.disabled = false;
                botao.innerText = "Enviar Mensagem";
            }
        }
    });
}