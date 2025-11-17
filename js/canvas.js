// -----------------------------------------
// CONFIGURACIÓN CANVAS
// -----------------------------------------
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function ajustarCanvas() {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = window.innerWidth * 0.5;
        canvas.height = window.innerHeight * 0.8;
    }
}
ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// -----------------------------------------
// VARIABLES PRINCIPALES DEL JUEGO
// -----------------------------------------
let x = 150;
let y = 150;
let speedx = 6;
let speedy = 3;
let radius = 70;

// Raqueta
let raquetax = 0;
let raquetay = canvas.height - 25;
let raquetaWidth = 120;
let velocidadRaqueta = 15;

// Juego
let vidas = 10;
let rebotes = 0;

// -----------------------------------------
// CONTROLES PC
// -----------------------------------------
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && raquetax + raquetaWidth < canvas.width)
        raquetax += velocidadRaqueta;

    if (e.key === "ArrowLeft" && raquetax > 0)
        raquetax -= velocidadRaqueta;
});

// -----------------------------------------
// CONTROLES MÓVIL
// -----------------------------------------
canvas.addEventListener("touchstart", (e) => {
    const touchX = e.touches[0].clientX;
    raquetax = touchX - raquetaWidth / 2;
});

// -----------------------------------------
// SPRITE FIREBALL (8 FRAMES)
// -----------------------------------------
const fireball = new Image();
fireball.src = "img/fireball.png";

let fireFrames = 6;
let frameWidth = 0;
let frameHeight = 0;

let currentFrame = 0;
let frameTick = 0;
let frameSpeed = 5;

// Obtener tamaño REAL del sprite
fireball.onload = () => {
    console.log("ANCHO SPRITE:", fireball.width);
    console.log("ALTO SPRITE:", fireball.height);

    frameWidth = fireball.width / fireFrames;
    frameHeight = fireball.height;

    console.log("FRAME WIDTH:", frameWidth);
    console.log("FRAME HEIGHT:", frameHeight);
};

// -----------------------------------------
// DIBUJAR
// -----------------------------------------
function draw() {

    // ----- FIREBALL ANIMADA -----
    if (frameWidth > 0) {

        // Avanzar frame
        frameTick++;
        if (frameTick >= frameSpeed) {
            currentFrame = (currentFrame + 1) % fireFrames;
            frameTick = 0;
        }

        const sx = currentFrame * frameWidth;
        const sy = 0;

        ctx.drawImage(
            fireball,
            sx, sy,
            frameWidth, frameHeight,
            x - radius,
            y - radius,
            radius * 2,
            radius * 2
        );
    } else {
        // Si la imagen no cargó aún, dibuja un círculo
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    // ----- RAQUETA -----
    ctx.fillStyle = "blue";
    ctx.fillRect(raquetax, raquetay, raquetaWidth, 20);

    // ----- MARCADORES -----
    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    ctx.fillText(`Vidas: ${vidas}`, 20, 30);
    ctx.fillText(`Rebotes: ${rebotes}`, 20, 60);
}

// -----------------------------------------
// ACTUALIZAR
// -----------------------------------------
function update() {

    // Movimiento bola
    x += speedx;
    y += speedy;

    // Paredes laterales
    if (x + radius > canvas.width || x - radius < 0)
        speedx *= -1;

    // Techo
    if (y - radius < 0)
        speedy *= -1;

    // Colisión con raqueta
    if (
        y + radius >= raquetay &&
        x >= raquetax &&
        x <= raquetax + raquetaWidth
    ) {
        speedy *= -1;
        y = raquetay - radius;
        rebotes++;
    }

    // Fondo → perder vida
    if (y - radius > canvas.height) {
        vidas--;
        x = 150;
        y = 150;
        speedx = 6;
        speedy = 3;
    }
}

// -----------------------------------------
// GAME OVER
// -----------------------------------------
function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width / 2, canvas.height / 2 + 60);
}

// -----------------------------------------
// LOOP PRINCIPAL
// -----------------------------------------
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
