const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ballX = 250, ballY = 50;
let dx = 2, dy = 2;
let r = 8;

let barX = 210;
const barW = 80, barH = 10;
const barY = canvas.height - 20;

let score = 0;

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && barX > 0) barX -= 20;
    if (e.key === "ArrowRight" && barX + barW < canvas.width) barX += 20;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ballX, ballY, r, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillRect(barX, barY, barW, barH);

    ctx.fillText("Score: " + score, 10, 20);

    ballX += dx;
    ballY += dy;

    if (ballX < r || ballX > canvas.width - r) dx *= -1;
    if (ballY < r) dy *= -1;

    if (ballY + r >= barY && ballX > barX && ballX < barX + barW) {
        dy *= -1;
        score++;
    }

    if (ballY > canvas.height) {
        endGame();
        return;
    }

    requestAnimationFrame(draw);
}

function endGame() {
    fetch("/score", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({score: score})
    })
    .then(res => res.json())
    .then(data => {
        alert(
            "Game Over\nYour Score: " + data.your_score +
            "\nHigh Score: " + data.high_score
        );
        location.reload();
    });
}

draw();
