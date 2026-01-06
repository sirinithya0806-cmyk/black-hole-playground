// ⭐ Star field background
const stars = [];

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * 500,
    y: Math.random() * 500,
    r: Math.random() * 1.5
  });
}

function drawStars() {
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

const slider = document.getElementById("mass");
const output = document.getElementById("output");
const timeText = document.getElementById("time");
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function drawSpacetimeGrid(strength) {
  ctx.strokeStyle = "#333";

  for (let x = 0; x <= canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.quadraticCurveTo(
      250,
      250 + strength,
      x,
      canvas.height
    );
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(
      250 + strength,
      250,
      canvas.width,
      y
    );
    ctx.stroke();
  }
}

function drawBlackHole(radius) {
  ctx.beginPath();
  ctx.arc(250, 250, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  const mass = slider.value;
  const rs = schwarzschildRadius(mass);

  //const visualRadius = Math.min(80, rs / 5e8);
  const visualRadius = 10 + mass * 2;
  const timeFactor = timeDilation(rs * 3, rs);

  drawSpacetimeGrid(visualRadius * 2);
  drawBlackHole(visualRadius);

  output.innerText =
    `Event Horizon (Schwarzschild Radius): ${(rs / 1000).toFixed(2)} km`;

  timeText.innerText =
    `Time Flow Near Black Hole: ${(timeFactor * 100).toFixed(2)}% of normal time`;
}

slider.addEventListener("input", update);
update();
