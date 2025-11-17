const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// -----------------------
// Variables iniciales
// -----------------------
let x = 50;
let y = 50;
let speedx = 5;
let speedy = 2;
let radius = 20;

let raquetax = 0;
let raquetay;              // se calcula al ajustar el canvas
let raquetaWidth = 70;
let velocidadRaqueta = 15;

let vidas = 10;
let rebotes = 0;

// -----------------------
// Ajuste de canvas y raqueta
// -----------------------
function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Colocar raqueta en el fondo de la pantalla
    raquetay = canvas.height - 20;

    // Mantener la raqueta dentro de los límites
    if (raquetax + raquetaWidth > canvas.width) {
        raquetax = canvas.width - raquetaWidth;
    }
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);

// -----------------------
// Controles de teclado
// -----------------------
document.addEventListener("keydown", moverRaqueta);

function moverRaqueta(e) {
    if (e.key === "ArrowRight") {
        if (raquetax + raquetaWidth < canvas.width)
            raquetax += velocidadRaqueta;
    }
    if (e.key === "ArrowLeft") {
        if (raquetax > 0)
            raquetax -= velocidadRaqueta;
    }
}

// -----------------------
// Dibujo en pantalla
// -----------------------
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
    ctx.fillStyle = "black";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";

    ctx.fillText(`Vidas: ${vidas}`, canvas.width - 10, 10);
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width - 10, 40);

    ctx.closePath();
}

// -----------------------
// Actualización lógica
// -----------------------
function update() {

    // Mover bola
    x += speedx;
    y += speedy;

    // Paredes laterales
    if (x + radius > canvas.width || x - radius < 0) {
        speedx *= -1;
    }

    // Techo
    if (y - radius < 0) {
        speedy *= -1;
    }

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

    // Fondo (pierdes vida)
    if (y + radius > canvas.height) {
        vidas--;

        // Reiniciar bola
        x = canvas.width / 2;
        y = canvas.height / 4;
        speedx = 5;
        speedy = 2;
    }
}

// -----------------------
// GAME OVER
// -----------------------
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

// -----------------------
// Loop principal
// -----------------------
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
