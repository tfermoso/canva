const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let x = 50;
let y = 50;
let speedx = 5;
let speedy = 2;
let radius = 20;

let raquetax = 0;
let raquetay = canvas.height - 10;
let raquetaWidth = 70;
let velocidadRaqueta = 15;

let vidas = 10;
let rebotes = 0;

document.addEventListener("keydown", moverRaqueta);

function moverRaqueta(e) {
    if (e.key == "ArrowRight") {
        if (raquetax + raquetaWidth < canvas.width)
            raquetax += velocidadRaqueta;
    }
    if (e.key == "ArrowLeft") {
        if (raquetax > 0)
            raquetax -= velocidadRaqueta;
    }
}

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
    ctx.fillText(`Vidas: ${vidas}`, canvas.width - 120, 20);
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width - 120, 50);

    ctx.closePath();
}

function update() {
    // Movimiento
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

        rebotes++; // <-- SUMA REBOTE
    }

    // Fondo (pierdes vida)
    if (y + radius > canvas.height) {
        vidas--;

        // Reiniciar bola
        x = 50;
        y = 50;
        speedx = 5;
        speedy = 3;
    }
}

function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Rebotes: ${rebotes}`, canvas.width / 2, canvas.height / 2 + 40);
}

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
