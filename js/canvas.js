const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Detectar si es móvil
const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// -------------------------------
// Bloquear scroll en móvil
// -------------------------------
if (esMovil) {
    document.body.addEventListener("touchmove", (e) => {
        e.preventDefault();
    }, { passive: false });
}

// -------------------------------
// Variables iniciales del juego
// -------------------------------
let x = 50;
let y = 50;
let speedx = 5;
let speedy = 2;
let radius = 20;

let raquetax = 0;
let raquetay;
let raquetaWidth = 70;
let velocidadRaqueta = 15;

let vidas = 10;
let rebotes = 0;

// -------------------------------
// Ajustar tamaño del canvas
// -------------------------------
function ajustarCanvas() {

    if (esMovil) {
        // MÓVIL → pantalla completa
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    } else {
        // ESCRITORIO → 50% ancho y 80% alto
        canvas.width = window.innerWidth * 0.5;
        canvas.height = window.innerHeight * 0.8;
    }

    // Colocar raqueta al fondo
    raquetay = canvas.height - 20;

    // Mantener límites
    if (raquetax + raquetaWidth > canvas.width) {
        raquetax = canvas.width - raquetaWidth;
    }
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// -------------------------------
// CONTROLES PC (teclado)
// -------------------------------
if (!esMovil) {
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            raquetax += velocidadRaqueta;
        }
        if (e.key === "ArrowLeft") {
            raquetax -= velocidadRaqueta;
        }

        // límites
        if (raquetax < 0) raquetax = 0;
        if (raquetax + raquetaWidth > canvas.width) {
            raquetax = canvas.width - raquetaWidth;
        }
    });
}

// -------------------------------
// CONTROLES MÓVIL (táctiles)
// -------------------------------
if (esMovil) {
    canvas.addEventListener("touchstart", moverRaquetaToque);
    canvas.addEventListener("touchmove", moverRaquetaToque);

    function moverRaquetaToque(e) {
        const toque = e.touches[0];
        const xToque = toque.clientX;

        raquetax = xToque - raquetaWidth / 2;

        // límites
        if (raquetax < 0) raquetax = 0;
        if (raquetax + raquetaWidth > canvas.width) {
            raquetax = canvas.width - raquetaWidth;
        }
    }
}

// -------------------------------
// Dibujo del juego
// -------------------------------
function draw() {
    ctx.beginPath();

    // Bola
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // Raqueta
    ctx.fillStyle = "blue";
    ctx.fillRect(raquetax, raquetay, raquetaWidth, 10);

    // Marcador
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";

    ctx.fillText(`Vidas: ${vidas}`, canvas.width - 10, 10);
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width - 10, 40);

    ctx.closePath();
}

// -------------------------------
// Lógica del juego
// -------------------------------
function update() {
    x += speedx;
    y += speedy;

    // paredes laterales
    if (x + radius > canvas.width || x - radius < 0) {
        speedx *= -1;
    }

    // techo
    if (y - radius < 0) {
        speedy *= -1;
    }

    // raqueta
    if (
        y + radius >= raquetay &&
        x >= raquetax &&
        x <= raquetax + raquetaWidth
    ) {
        speedy *= -1;
        y = raquetay - radius;
        rebotes++;
    }

    // fondo
    if (y + radius > canvas.height) {
        vidas--;
        x = canvas.width / 2;
        y = canvas.height / 4;
        speedx = 5;
        speedy = 2;
    }
}

// -------------------------------
// GAME OVER
// -------------------------------
function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width / 2, canvas.height / 2 + 50);
}

// -------------------------------
// BUCLE PRINCIPAL
// -------------------------------
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (vidas <= 0) {
        gameOver();
        return;
    }

    update();
    draw();

    requestAnimationFrame(loop);
}

loop();
