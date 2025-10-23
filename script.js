function reveal(type) {
  const popup = document.getElementById("popup");
  let message = "";

  switch (type) {
    case "memory":
      message = "Remember our late-night talks? You made me feel like the luckiest person alive.";
      break;
    case "compliment":
      message = "You’re stronger than you know, and more beautiful than you believe.";
      break;
    case "challenge":
      message = "Today, text me one thing you’re proud of. I’ll celebrate it with you.";
      break;
  }

  popup.innerText = message;
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 140, y: 350, width: 20, height: 20 };
let boosts = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "#ffcccb";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBoosts() {
  ctx.fillStyle = "#f0f";
  boosts.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 10, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateBoosts() {
  boosts.forEach((b) => b.y += 2);
  boosts = boosts.filter((b) => b.y < canvas.height);
}

function checkCollision() {
  boosts.forEach((b, i) => {
    if (
      b.x > player.x &&
      b.x < player.x + player.width &&
      b.y > player.y &&
      b.y < player.y + player.height
    ) {
      boosts.splice(i, 1);
      score += 1;
      document.getElementById("score").innerText = "Score: " + score;
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBoosts();
  updateBoosts();
  checkCollision();
  requestAnimationFrame(gameLoop);
}

setInterval(() => {
  boosts.push({ x: Math.random() * 280 + 10, y: 0 });
}, 1000);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
});

gameLoop();
