window.addEventListener("load", () => {
  const popup2 = document.getElementById("popup2");
  const popup2Text = document.getElementById("popup2-text");
  const calendarApp = document.getElementById("calendarApp");
  const calendarAppImg = document.getElementById("calendarAppImg");

  if (!popup2 || !popup2Text || !calendarApp || !calendarAppImg) {
    console.warn("Certains éléments du calendrier sont manquants dans le DOM.");
    return;
  }

  let calendarOpen = false; // état ouvert/fermé

  function unlockCalendarApp() {
    popup2Text.textContent = " Une nouvelle application s’est débloquée : Calendrier.";
    calendarAppImg.src = "images/calendrier.png";
    calendarApp.style.pointerEvents = "auto";
    calendarApp.style.cursor = "pointer";

    calendarApp.animate([{ transform: "scale(1.1)" }, { transform: "scale(1)" }], {
      duration: 600,
      iterations: 2,
    });
  }

  function createCalendarGrid() {
    const grid = document.getElementById("calendarGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const daysInFeb = 29; // année bissextile simulée
    for (let day = 1; day <= daysInFeb; day++) {
      const cell = document.createElement("div");
      cell.textContent = day;
      cell.style.cssText = `
        padding:8px; border-radius:10px; cursor:pointer;
        transition:0.2s; background:#222; color:#fff;
        font-weight:500; display:flex; flex-direction:column;
        align-items:center; justify-content:center;
      `;

      cell.addEventListener("mouseover", () => (cell.style.background = "#444"));
      cell.addEventListener("mouseout", () => (cell.style.background = "#222"));

      if (day === 28) {
        const icon = document.createElement("img");
        icon.src = "images/rdv.png";
        icon.style.width = "24px";
        icon.style.marginTop = "5px";
        icon.style.borderRadius = "6px";
        cell.appendChild(icon);
      }

      if (day === 29) {
        const icon = document.createElement("img");
        icon.src = "images/anniv.png";
        icon.style.width = "24px";
        icon.style.marginTop = "5px";
        icon.style.borderRadius = "6px";
        cell.appendChild(icon);
        cell.style.opacity = "0.6";

        cell.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(2deg)" },
            { transform: "rotate(-2deg)" },
            { transform: "rotate(0deg)" },
          ],
          { duration: 2000, iterations: Infinity }
        );
      }

      cell.addEventListener("click", () => handleCalendarClick(day));
      grid.appendChild(cell);
    }
  }

  function handleCalendarClick(day) {
    if (day === 28) {
      popup2Text.innerHTML = `
        <strong> 28 février</strong><br><br>
        <img src="images/rdv.png" style="width:24px;vertical-align:middle;margin-right:6px;">
        Rendez-vous prévu avec Laila.<br>
        <em>Tout semble normal...</em><br><br>
        <button class="choice-btn" id="closeDay">Fermer</button>
      `;
    } else if (day === 29) {
      popup2Text.innerHTML = `
        <strong> 29 février</strong><br><br>
        <img src="images/anniv.png" style="width:24px;vertical-align:middle;margin-right:6px;">
        Anniversaire de Laila.<br>
        <em>Mais… cette date n’existe pas cette année.<br>
        Un doute s’installe.<br>
        Qui est vraiment Laila ?</em><br><br>
        <button class="choice-btn bad" id="closeDay">Fermer</button>
      `;
      popup2.animate(
        [
          { backgroundColor: "rgba(50,50,50,0.9)" },
          { backgroundColor: "rgba(150,0,0,0.4)" },
          { backgroundColor: "rgba(50,50,50,0.9)" },
        ],
        { duration: 1200, iterations: 2 }
      );
    } else {
      popup2Text.innerHTML = `
        <strong>${day} février</strong><br><br>
        Rien de particulier ce jour-là.<br><br>
        <button class="choice-btn" id="closeDay">Fermer</button>
      `;
    }

    const closeBtn = document.getElementById("closeDay");
    closeBtn?.addEventListener("click", () => popup2.classList.remove("show"));
  }

  // Déblocage après réception du voicemail
  window.addEventListener("voicemailEnded", (e) => {
    if (e?.detail?.heard) unlockCalendarApp();
  });

  // Ouvrir/fermer calendrier au clic
  calendarApp.addEventListener("click", () => {
    calendarOpen = !calendarOpen;

    if (calendarOpen) {
      popup2.classList.add("show");
      popup2Text.innerHTML = `
        <strong> Calendrier – Février</strong><br><br>
        <div id="calendarGrid" style="
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          margin-top: 10px;
          text-align: center;
        "></div>
        <p style="margin-top:10px;font-size:0.9em;opacity:0.8;">
          Clique sur une date pour voir plus d’infos.
        </p>
      `;
      setTimeout(createCalendarGrid, 50); // attendre le DOM
    } else {
      popup2.classList.remove("show");
    }
  });
});
