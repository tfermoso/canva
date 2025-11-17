const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let x = 50//canvas.width + 20; // empieza fuera del canvas (a la derecha)
let y = 50//canvas.height / 2; // centrada verticalmente
let speedx = 3;
let speedy = 1;             // velocidad hacia la izquierda
let radius = 20;           // tamaño de la bola
let raquetax = 0
let raquetay = canvas.height - 10;
let raquetaWidth = 40;
document.addEventListener("keydown", moverRaqueta);

function moverRaqueta(e) {
    if(e.key=="ArrowRight"){
        console.log("derecha");
    }
}

function draw() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.fillRect(raquetax, raquetay, raquetaWidth, 10);

    ctx.closePath();
}

function update() {
    x += speedx;
    if (x + radius > canvas.width || x - radius < 0) {
        speedx *= -1;
    }
    y += speedy;
    if (y + radius > canvas.height || y - radius < 0) {
        speedy *= -1;
    }


}
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    update();
    draw();

    requestAnimationFrame(loop);
}



loop();


