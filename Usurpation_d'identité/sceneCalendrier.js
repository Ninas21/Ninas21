window.addEventListener("load", () => {
  const calendarApp = document.getElementById("calendarApp");
  const calendarAppImg = document.getElementById("calendarAppImg");
  const popupCalendar = document.getElementById("popupCalendar");
  const closeCalendarPopup = document.getElementById("closeCalendarPopup");
  const calendarGrid = document.getElementById("calendarGrid");

  if (!calendarApp || !calendarAppImg || !popupCalendar || !closeCalendarPopup || !calendarGrid) {
    console.warn("Éléments du calendrier manquants.");
    return;
  }

  // ---------- Dictionnaire des événements ----------
  const events = {
    28: {
      title: "Rendez-vous avec Laila",
      icon: "images/rdv.png",
      description: "Tout semble normal...",
      type: "normal"
    },
    29: {
      title: "Anniversaire de Laila",
      icon: "images/anniv.png",
      description: "Mais… cette date n’existe pas cette année. Un doute s’installe.",
      type: "alert"
    }
  };

  // ---------- Fonction pour créer tout le calendrier ----------
  function createCalendarGrid() {
    calendarGrid.innerHTML = "";
    const daysInFeb = 29; // année bissextile simulée

    for (let day = 1; day <= daysInFeb; day++) {
      const cell = document.createElement("div");
      cell.textContent = day;
      cell.style.cssText = `
  padding:8px; 
  border-radius:0;              /* coins carrés */
  border:2px solid #000;        /* bordure pixel */
  cursor:pointer;
  transition:0.2s; 
  background:#4C4B4A;           /* gris */
  color:#000;
  font-weight:500; 
  display:flex; 
  flex-direction:column;
  align-items:center; 
  justify-content:center;
  image-rendering: pixelated;   /* effet pixel pour icônes */
`;

      // Hover
      cell.addEventListener("mouseover", () => (cell.style.background = "#444"));
      cell.addEventListener("mouseout", () => (cell.style.background = "#222"));

      // Icônes événement
      if (events[day]) {
        const icon = document.createElement("img");
        icon.src = events[day].icon;
        icon.style.width = "24px";
        icon.style.marginTop = "5px";
        icon.style.borderRadius = "6px";
        cell.appendChild(icon);

        // Animation spéciale pour les alertes
        if (events[day].type === "alert") {
          cell.style.opacity = "0.6";
          cell.animate(
            [
              { transform: "rotate(0deg)" },
              { transform: "rotate(2deg)" },
              { transform: "rotate(-2deg)" },
              { transform: "rotate(0deg)" }
            ],
            { duration: 2000, iterations: Infinity }
          );
        }
      }

      // Clic sur la case
      cell.addEventListener("click", () => handleCalendarClick(day));
      calendarGrid.appendChild(cell);
    }
  }

  // ---------- Fonction qui gère le clic sur une date ----------
  function handleCalendarClick(day) {
    if (events[day]) {
      const evt = events[day];
      calendarGrid.innerHTML = `
        <strong>${evt.type === "alert" ? " " : " "}${evt.title}</strong><br><br>
        ${evt.icon ? `<img src="${evt.icon}" style="width:24px;vertical-align:middle;margin-right:6px;">` : ""}
        ${evt.description}<br><br>
        <button class="choice-btn" id="closeDay">Fermer</button>
      `;

      // Si alert, petite animation de popup rouge
      if (evt.type === "alert") {
        popupCalendar.animate(
          [
            { backgroundColor: "rgba(50,50,50,0.9)" },
            { backgroundColor: "rgba(150,0,0,0.4)" },
            { backgroundColor: "rgba(50,50,50,0.9)" }
          ],
          { duration: 1200, iterations: 2 }
        );
      }
    } else {
      calendarGrid.innerHTML = `
        <strong>${day} février</strong><br><br>
        Rien de particulier ce jour-là.<br><br>
        <button class="choice-btn" id="closeDay">Fermer</button>
      `;
    }

    const closeBtn = document.getElementById("closeDay");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        popupCalendar.classList.remove("show");
        createCalendarGrid(); // recrée le calendrier complet après fermeture
      });
    }
  }

  // ---------- Débloquer le calendrier ----------
  function unlockCalendarApp() {
    calendarAppImg.src = "images/calendrier.png";
    calendarApp.style.pointerEvents = "auto";
    calendarApp.style.cursor = "pointer";
    calendarApp.animate([{ transform: "scale(1.1)" }, { transform: "scale(1)" }], { duration: 600, iterations: 2 });
  }

  // ---------- Ouvrir le calendrier ----------
  calendarApp.addEventListener("click", () => {
    createCalendarGrid();
    popupCalendar.classList.add("show");
  });

  // ---------- Fermer le calendrier ----------
  closeCalendarPopup.addEventListener("click", () => popupCalendar.classList.remove("show"));

  // ---------- Déclenchement depuis le jeu ----------
  window.addEventListener("voicemailEnded", (e) => {
    const heard = e && e.detail && !!e.detail.heard;
    if (heard) unlockCalendarApp();
  });
});