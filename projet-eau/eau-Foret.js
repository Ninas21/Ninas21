let level = 0;

const texts = [
  "La forêt est silencieuse. Les arbres ont soif.",
  "L’eau tombe doucement sur la terre.",
  "Les racines se réveillent.",
  "Les feuilles retrouvent leur couleur.",
  "La forêt respire à nouveau."
];

const aliveForest = document.querySelector(".alive");
const text = document.getElementById("text");
const btn = document.getElementById("waterBtn");
const bucket = document.getElementById("bucket");
const rain = document.getElementById("rain");

function startRain() {
  rain.innerHTML = "";
  rain.style.opacity = 1;

  for (let i = 0; i < 60; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = (0.5 + Math.random()) + "s";
    drop.style.opacity = Math.random();
    rain.appendChild(drop);
  }

  setTimeout(() => {
    rain.style.opacity = 0;
    rain.innerHTML = "";
  }, 800);
}

function waterForest() {
  if (level < 4) {
    level++;
    startRain();
    aliveForest.style.opacity = level * 0.25;
    text.textContent = texts[level];
  }

  if (level === 4) {
    btn.textContent = "Observer le silence";
  }
}

btn.addEventListener("click", waterForest);
bucket.addEventListener("click", waterForest);