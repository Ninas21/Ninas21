const introDuration = 5000;

window.addEventListener("load", () => {
  const notif = document.getElementById("notification");
  const notif2 = document.getElementById("notification2");
  const popup = document.getElementById("popup");
  const popup2 = document.getElementById("popup2");
  const closePopup = document.getElementById("closePopup");
  const closePopup2 = document.getElementById("closePopup2");
  const popup2Text = document.getElementById("popup2-text");
  const ignoreBtn = document.getElementById("ignoreBtn");
  const replyBtn = document.getElementById("replyBtn");
  const chatBar = document.getElementById("chatBar");
  const chatInput = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendBtn");
  const galleryApp = document.getElementById("galleryApp");
  const galleryAppImg = document.getElementById("galleryAppImg");
  const galleryContent = document.getElementById("galleryContent");

  // Galerie bloquée au départ
  galleryApp.style.pointerEvents = "none";
  galleryApp.style.cursor = "not-allowed";
  galleryAppImg.style.filter = "grayscale(100%)";

  let conversationStep = 0;
  let waitingChoice = false;

  // --- Notifications ---
  setTimeout(() => {
    document.body.classList.add("no-bars");
    setTimeout(() => notif.classList.add("show"), 1000);
    setTimeout(() => notif2.classList.add("show"), 6000);
  }, introDuration);

  notif.addEventListener("click", () => popup.classList.add("show"));
  notif2.addEventListener("click", () => popup2.classList.add("show"));
  closePopup.addEventListener("click", () => popup.classList.remove("show"));
  closePopup2.addEventListener("click", () => popup2.classList.remove("show"));

  // --- Boutons de popup2 ---
  ignoreBtn.addEventListener("click", () => {
    popup2Text.textContent = "Message déplacé dans les spams.";
    disablePopupButtons();
    setTimeout(() => popup2.classList.remove("show"), 1200);
  });

  replyBtn.addEventListener("click", () => {
    disablePopupButtons();
    startConversation();
  });

  function disablePopupButtons() {
    ignoreBtn.disabled = true;
    replyBtn.disabled = true;
    ignoreBtn.style.opacity = "0.6";
    replyBtn.style.opacity = "0.6";
  }

  // --- Début conversation ---
  function startConversation() {
    popup2Text.textContent = 'Laila : "Hey toi !"';
    setTimeout(() => showChoices(["?"], handleFirstReply), 1500);
  }

 // --- Étape 1 ---
function handleFirstReply(choice) {
  popup2Text.textContent = `Toi : "${choice}"`;

  setTimeout(() => {
    popup2Text.textContent = 'Laila : "On peut parler ?"';

    // --> Nouveau choix ajouté ici
    setTimeout(() => {
      const replyChoices = [
        "Je pense que vous vous êtes trompée de personne.",
        "Qui êtes-vous ?",
        "C’est une blague ?",
        "Pourquoi tu m’écris ?"
      ];
      popup2Text.textContent = "Que veux-tu répondre ?";
      showChoices(replyChoices, handleSecondReply);
    }, 3000);
  }, 1500);
}

// --- Étape 1 bis ---
function handleSecondReply(choice) {
  popup2Text.textContent = `Toi : "${choice}"`;
  setTimeout(() => {
    popup2Text.textContent =
      'Laila : "C\'est Laila, je tenais à parler avec toi pour mon anniversaire. J\'aimerais aussi, si tu l\'acceptes, qu\'on s\'explique."';
    setTimeout(() => showEmotionChoices(), 3000);
  }, 1500);
}

  // --- Étape 2 : choix gentil / méchant ---
  function showEmotionChoices() {
    const gentil = [
      "Tu m'as manqué...",
      "Je suis heureux(se) d'avoir de tes nouvelles.",
      "Je ne t'en veux pas.",
      "Je suis soulagé(e) que tu sois en vie.",
      "Je suis content(e) de te reparler."
    ];
    const mechant = [
      "Pourquoi tu reviens maintenant ?",
      "Tu crois qu'on oublie comme ça ?",
      "T'as du culot de me reparler.",
      "T'es vraiment sans gêne.",
      "Je ne veux rien savoir de toi."
    ];

    popup2Text.textContent = "Choisis comment répondre :";
    showDualChoices("Gentil", gentil, "Méchant", mechant, handleEmotionChoice);
  }

  function handleEmotionChoice(choice, isGentil) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      if (isGentil) {
        popup2Text.textContent = 'Laila : "Tu m\'as manqué aussi..."';
      } else {
        popup2Text.textContent = 'Laila : "Tu as raison... Je m\'attendais à cette réaction."';
      }

      setTimeout(() => showLastChoices(), 3000);
    }, 1500);
  }

  // --- Étape 3 : dernière réponse ---
  function showLastChoices() {
    const lastChoices = [
      "J'espère que ce n'est pas une blague.",
      "Rire d'une disparition n'est vraiment pas drôle."
    ];
    popup2Text.textContent = "Que veux-tu dire ?";
    showChoices(lastChoices, handleLastChoice);
  }

  function handleLastChoice(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent =
        'Laila : "Désolée de revenir comme une fleur... C’est bien moi. J’ai perdu mon ancien tel, voilà mon nouveau numéro."';
      setTimeout(() => unlockGallery(), 3000);
    }, 1500);
  }

  // --- Création des boutons de choix ---
  function showChoices(choices, callback) {
    waitingChoice = true;
    chatBar.innerHTML = "";
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "8px";

    choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.style.padding = "4px";
      btn.style.borderRadius = "8px";
      btn.style.border = "none";
      btn.style.cursor = "pointer";
      btn.style.background = "#3b82f6";
      btn.style.color = "white";
      btn.addEventListener("click", () => {
        if (waitingChoice) {
          waitingChoice = false;
          chatBar.innerHTML = "";
          callback(choice);
        }
      });
      container.appendChild(btn);
    });
    chatBar.appendChild(container);
    chatBar.style.display = "flex";
  }

  // --- Choix double (gentil / méchant) ---
  function showDualChoices(labelA, arrA, labelB, arrB, callback) {
    chatBar.innerHTML = "";

    const title = document.createElement("p");
    title.textContent = "Réponds selon ton humeur :";
    title.style.fontWeight = "bold";
    chatBar.appendChild(title);

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.gap = "10px";

    const colA = document.createElement("div");
    const colB = document.createElement("div");

    const label1 = document.createElement("h4");
    label1.textContent = labelA;
    const label2 = document.createElement("h4");
    label2.textContent = labelB;

    colA.appendChild(label1);
    colB.appendChild(label2);

    arrA.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      styleChoiceButton(btn);
      btn.addEventListener("click", () => {
        chatBar.innerHTML = "";
        callback(choice, true);
      });
      colA.appendChild(btn);
    });

    arrB.forEach((choice) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      styleChoiceButton(btn);
      btn.style.background = "#ef4444";
      btn.addEventListener("click", () => {
        chatBar.innerHTML = "";
        callback(choice, false);
      });
      colB.appendChild(btn);
    });

    container.appendChild(colA);
    container.appendChild(colB);
    chatBar.appendChild(container);
    chatBar.style.display = "flex";
  }

  function styleChoiceButton(btn, color = "#3b82f6") {
  btn.style.display = "block";
  btn.style.marginTop = "8px";
  btn.style.padding = "7px 9px"; // taille du bouton
  btn.style.fontSize = "16px"; // taille du texte
  btn.style.fontWeight = "60";
  btn.style.border = "none";
  btn.style.borderRadius = "10px";
  btn.style.cursor = "pointer";
  btn.style.background = color; // couleur du fond (bleu par défaut)
  btn.style.color = "white";
  btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  btn.style.transition = "all 0.3s ease";
  btn.addEventListener("mouseover", () => (btn.style.transform = "scale(1.05)"));
  btn.addEventListener("mouseout", () => (btn.style.transform = "scale(1)"));
}

  // --- Débloquer la galerie ---
  function unlockGallery() {
    popup2.classList.remove("show");
    galleryAppImg.src = "images/galerie-pixel3.png"; // image couleur
    galleryApp.style.pointerEvents = "auto";
    galleryApp.style.cursor = "pointer";
    galleryAppImg.style.filter = "none";

    let galleryOpen = false;
    galleryApp.addEventListener("click", () => {
      galleryOpen = !galleryOpen;
      galleryContent.style.display = galleryOpen ? "flex" : "none";
    });
  }
});