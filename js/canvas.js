const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let x = 50//canvas.width + 20; // empieza fuera del canvas (a la derecha)
let y = 50//canvas.height / 2; // centrada verticalmente
let speedx = 3;
let speedy = 1;             // velocidad hacia la izquierda
let radius = 20;           // tamaño de la bola
let raquetax = 0
let raquetay = canvas.height - 10;
let raquetaWidth = 70;
let velocidadRaqueta = 8;
let vidas = 10;

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
    //Pinto la bola
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    //Pinto raqueta
    ctx.fillStyle = "blue";
    ctx.fillRect(raquetax, raquetay, raquetaWidth, 10);

    //Pinto marcador
    ctx.font = "20px Arial";
    ctx.fillText(`Vidas: ${vidas}`,canvas.width-100,20);
    ctx.closePath();
}

function update() {

    // Movimiento
    x += speedx;
    y += speedy;

    // Rebote en paredes laterales
    if (x + radius > canvas.width || x - radius < 0) {
        speedx *= -1;
    }

    // Rebote en el techo
    if (y - radius < 0) {
        speedy *= -1;
    }

    // ----------- COLISIÓN CON LA RAQUETA -----------
    if (
        y + radius >= raquetay &&          // llega a la altura de la raqueta
        x >= raquetax &&                   // está sobre el borde izquierdo
        x <= raquetax + raquetaWidth       // está sobre el borde derecho
    ) {
        speedy *= -1;                      // rebota hacia arriba
        y = raquetay - radius;             // evitar que se quede "pegada"
    }

    // ----------- COLISIÓN CON EL FONDO (perder) -----------
    if (y + radius > canvas.height) {
        console.log("Has perdido!");
        vidas--;
        // Reiniciar la bola
        x = 50;
        y = 50;
        speedx = 3;
        speedy = 1;
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (vidas >= 0) {
        update();
        draw();
    }
    requestAnimationFrame(loop);
}



loop();


