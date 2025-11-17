const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let x = 50//canvas.width + 20; // empieza fuera del canvas (a la derecha)
let y = 50//canvas.height / 2; // centrada verticalmente
let speed = 3;             // velocidad hacia la izquierda
let radius = 20;           // tamaño de la bola


function draw() {
    ctx.beginPath();
    ctx.arc(x, y, radius,0 ,Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
