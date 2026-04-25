const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ballX = 250, ballY = 50;
let dx = 2, dy = 2;
let r = 8;

let barX = 210;
const barW = 80, barH = 10;
const barY = canvas.height - 20;

let score = 0;
let gameOver = false;
let animationId;

const restartBtn = document.getElementById("restartBtn");

// Controls
document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && barX > 0) barX -= 20;
    if (e.key === "ArrowRight" && barX + barW < canvas.width) barX += 20;
});

// Game Loop
function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, r, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // Bar
    ctx.fillStyle = "white";
    ctx.fillRect(barX, barY, barW, barH);

    // Score
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 20);

    // Movement
    ballX += dx;
    ballY += dy;

    // Wall collision
    if (ballX < r || ballX > canvas.width - r) dx *= -1;
    if (ballY < r) dy *= -1;

    // Bar collision
    if (ballY + r >= barY && ballX > barX && ballX < barX + barW) {
        dy *= -1;
        score++;
    }

    // Game Over
    if (ballY > canvas.height) {
        endGame();
        return;
    }

    animationId = requestAnimationFrame(draw);
}

// End Game (NO backend)
function endGame() {
    gameOver = true;
    cancelAnimationFrame(animationId);

    alert("Game Over\nYour Score: " + score);

    restartBtn.style.display = "block";
}

// Restart
restartBtn.onclick = function () {
    ballX = 250;
    ballY = 50;
    dx = 2;
    dy = 2;
    score = 0;
    barX = 210;

    gameOver = false;
    restartBtn.style.display = "none";

    draw();
};

// Start
draw();
