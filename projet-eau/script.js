const canvas = document.getElementById("waterCanvas");
const ctx = canvas.getContext("2d");

// Gestion nette du canvas
const ratio = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * ratio;
canvas.height = window.innerHeight * ratio;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
ctx.scale(ratio, ratio);

let drops = [];
let ripples = [];

// Créer une goutte régulièrement
setInterval(() => {
  drops.push({
    x: Math.random() * window.innerWidth,
    y: -50,
    speed: 2.5
  });
}, 1200);

// Goutte nette cartoon
function drawDrop(drop) {
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.bezierCurveTo(
    drop.x - 10, drop.y + 18,
    drop.x - 10, drop.y + 36,
    drop.x, drop.y + 48
  );
  ctx.bezierCurveTo(
    drop.x + 10, drop.y + 36,
    drop.x + 10, drop.y + 18,
    drop.x, drop.y
  );

  ctx.fillStyle = "#5FD3FF"; // couleur claire
  ctx.fill();

  ctx.strokeStyle = "#EAFBFF"; // contour net
  ctx.lineWidth = 2;
  ctx.stroke();

  // reflet net
  ctx.beginPath();
  ctx.arc(drop.x - 4, drop.y + 16, 3, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
}

// Animation principale
function animate() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // fond eau
  ctx.fillStyle = "#0b3c5d";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // gouttes
  drops.forEach((drop, index) => {
    drawDrop(drop);
    drop.y += drop.speed;

    if (drop.y > window.innerHeight * 0.6) {
      ripples.push({
        x: drop.x,
        y: drop.y + 40,
        radius: 0,
        alpha: 1
      });
      drops.splice(index, 1);
    }
  });

  // ondes
  ripples.forEach((ripple, index) => {
    ctx.beginPath();
    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,255,255,${ripple.alpha})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    ripple.radius += 2;
    ripple.alpha -= 0.02;

    if (ripple.alpha <= 0) {
      ripples.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();