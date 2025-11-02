const codeInput = document.getElementById("codeInput");
const splash = document.querySelector(".splash");

function validerCode() {
  const code = codeInput.value.trim();
  if (code === "404") {
    splash.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = "game.html";
    }, 900);
  } else {
    codeInput.style.borderColor = "#ef4444";
    codeInput.classList.add("shake");
    setTimeout(() => {
      codeInput.classList.remove("shake");
      codeInput.style.borderColor = "rgba(255,255,255,0.4)";
    }, 600);
  }
}

codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && codeInput.value.trim() !== "") {
    validerCode();
  }
});
