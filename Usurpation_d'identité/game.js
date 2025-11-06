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
  const choicesContainer = document.getElementById("choicesContainer");
  const galleryApp = document.getElementById("galleryApp");
  const galleryAppImg = document.getElementById("galleryAppImg");
  const galleryContent = document.getElementById("galleryContent");

  const spamAppImg = document.getElementById("spamAppImg");
  const spamApp = document.getElementById("spamApp");

  const voicemailApp = document.getElementById("voicemailApp");
  const voicemailAppImg = document.getElementById("voicemailAppImg");
  const calendarApp = document.getElementById("calendarApp");
  const calendarAppImg = document.getElementById("calendarAppImg");

  const choiceText = document.getElementById("choice-text");
  const dropdownArrow = document.getElementById("dropdownArrow");
  const choiceHeader = document.querySelector(".choice-header");

  let waitingChoice = false;

  if (!notif || !notif2 || !popup || !popup2 || !popup2Text || !ignoreBtn || !replyBtn || !chatBar || !choicesContainer || !galleryApp || !galleryAppImg || !choiceText || !dropdownArrow || !choiceHeader) {
    console.error("Un ou plusieurs éléments DOM requis sont manquants. Vérifie ton HTML.");
    return;
  }

  const introMessage = `Laila... Ah oui, c'était son anniversaire à peu près à cette période...
Déjà un an que tu m'as abandonné dans ce trou paumé.
J'espère au moins que tu vas bien. Toute la ville invente ces folles rumeurs sur toi,
mais je sais qu'ils disent n'importe quoi comme d'habitude.
Et ça justifie bien ton départ de cette ville pourrie.
Joyeux anniversaire ma vieille, tu me manques.`;

  function typeInDropdown(message, speed = 30, callback = null) {
    choiceText.textContent = "";
    let i = 0;
    function typeChar() {
      if (i < message.length) {
        choiceText.textContent += message[i++];
        const container = choiceText.parentElement;
        if (container) container.scrollTop = container.scrollHeight;
        setTimeout(typeChar, speed);
      } else if (callback) callback();
    }
    typeChar();
  }

  // Débloque Spam
  function unlockSpam() {
    spamAppImg.classList.add("active");
    spamApp.style.pointerEvents = "auto";
    spamApp.style.cursor = "pointer";
    spamAppImg.src = "images/spam2.png";
  }

  // Clique sur Spam
  spamApp.addEventListener("click", () => {
    if (!spamAppImg.classList.contains("active")) return;
    popup2.classList.add("show");
    popup2Text.textContent = "Le message est dans vos spams. Veux-tu répondre ?";

    const buttonsDiv = document.getElementById("popup2-buttons");
    buttonsDiv.innerHTML = `
      <button id="yesBtn">Oui</button>
      <button id="noBtn">Non</button>
    `;

    document.getElementById("yesBtn").addEventListener("click", () => {
      buttonsDiv.innerHTML = "";
      startConversation(); // démarre la discussion immédiatement
    });

    document.getElementById("noBtn").addEventListener("click", () => {
      buttonsDiv.innerHTML = "";
      popup2.classList.remove("show");
    });
  });

  // Notification buttons
  ignoreBtn.addEventListener("click", () => {
    popup2Text.textContent = "Message déplacé dans les spams.";
    disablePopupButtons();
    setTimeout(() => {
      popup2.classList.remove("show");
      unlockSpam();
    }, 1200);
  });

  replyBtn.addEventListener("click", () => {
    disablePopupButtons();
    startConversation(); // démarre la discussion directement
  });

  function disablePopupButtons() {
    ignoreBtn.disabled = true;
    replyBtn.disabled = true;
    ignoreBtn.style.opacity = "0.6";
    replyBtn.style.opacity = "0.6";
  }

  function openDropdown() {
    const container = choiceText.parentElement;
    if (!container) return;
    container.classList.add("open");
    dropdownArrow.classList.add("open");
    choiceText.style.maxHeight = "200px";
  }

  choiceHeader.addEventListener("click", () => {
    const textContainer = choiceText.parentElement;
    const isOpen = dropdownArrow.classList.contains("open");
    if (!textContainer) return;
    if (isOpen) {
      dropdownArrow.classList.remove("open");
      textContainer.style.maxHeight = "0";
    } else {
      dropdownArrow.classList.add("open");
      textContainer.style.maxHeight = "200px";
    }
  });

  // Bloque apps au départ
  if (galleryApp) { galleryApp.style.pointerEvents = "none"; galleryApp.style.cursor = "not-allowed"; }
  if (galleryAppImg) galleryAppImg.style.filter = "grayscale(100%)";
  if (voicemailApp) { voicemailApp.style.pointerEvents = "none"; voicemailApp.style.cursor = "not-allowed"; }
  if (voicemailAppImg) voicemailAppImg.style.filter = "grayscale(100%)";
  if (calendarApp && calendarAppImg) { calendarApp.style.pointerEvents = "none"; calendarApp.style.cursor = "not-allowed"; calendarAppImg.style.filter = "grayscale(100%)"; }

  setTimeout(() => {
    document.body.classList.add("no-bars");
    setTimeout(() => notif.classList.add("show"), 1000);
    setTimeout(() => notif2.classList.add("show"), 6000);
  }, introDuration);

  // Popups
  notif.addEventListener("click", () => popup.classList.add("show"));
  notif2.addEventListener("click", () => popup2.classList.add("show"));
  if (closePopup) closePopup.addEventListener("click", () => popup.classList.remove("show"));
  if (closePopup2) closePopup2.addEventListener("click", () => popup2.classList.remove("show"));

  // CONVERSATION
  function startConversation() {
    popup2.classList.add("show");
    popup2Text.textContent = 'Laila : "Hey toi !"';
    setTimeout(() => showChoices(["?"], handleFirstReply), 1500);
  }

  function handleFirstReply(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "On peut parler ?"';
      setTimeout(() => {
        const replyChoices = [
          "Je pense que vous vous êtes trompée de personne.",
          "Qui êtes-vous ?",
          "C’est une blague ?",
          "Pourquoi tu m’écris ?"
        ];
        popup2Text.textContent = "Que veux-tu répondre ?";
        showChoices(replyChoices, handleSecondReply);
      }, 1500);
    }, 1500);
  }

  function handleSecondReply(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "C\'est Laila, je tenais à parler avec toi pour mon anniversaire. J\'aimerais aussi, si tu l\'acceptes, qu\'on s\'explique."';
      setTimeout(() => showEmotionChoices(), 3000);
    }, 1500);
  }

  function showEmotionChoices() {
    const gentil = [
      "Tu m'as manqué...",
      "Je suis heureuse d'avoir de tes nouvelles.",
      "Je ne t'en veux pas.",
      "Je suis soulagée que tu sois en vie.",
      "Je suis contente de te reparler."
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
      popup2Text.textContent = isGentil ? 'Laila : "Tu m\'as manqué aussi..."' : 'Laila : "Tu as raison... Je m\'attendais à cette réaction."';
      setTimeout(() => showLastChoices(), 3000);
    }, 1500);
  }

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
      popup2Text.textContent = 'Laila : "Désolée de revenir comme une fleur... C’est bien moi. J’ai perdu mon ancien tel, voilà mon nouveau numéro."';
      setTimeout(() => unlockGallery(), 3000);
    }, 1500);
  }

  // UTILITAIRES CHOIX
  function showChoices(choices, callback) {
    waitingChoice = true;
    choicesContainer.innerHTML = "";
    choices.forEach(choice => {
      const btn = document.createElement("button");
      const text = (typeof choice === "string") ? choice : (choice.text || "");
      const cls = (typeof choice === "object" && choice.class) ? choice.class : "";
      btn.textContent = text;
      btn.className = "choice-btn " + cls;
      btn.addEventListener("click", () => {
        if (!waitingChoice) return;
        waitingChoice = false;
        choicesContainer.innerHTML = "";
        callback(text);
      });
      choicesContainer.appendChild(btn);
    });
    if (chatBar) chatBar.style.display = "flex";
  }

  function showDualChoices(labelA, arrA, labelB, arrB, callback) {
    choicesContainer.innerHTML = "";
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.gap = "10px";

    const colA = document.createElement("div");
    const colB = document.createElement("div");
    const label1 = document.createElement("h4"); label1.textContent = labelA;
    const label2 = document.createElement("h4"); label2.textContent = labelB;
    colA.appendChild(label1); colB.appendChild(label2);

    arrA.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice; btn.className = "choice-btn";
      btn.addEventListener("click", () => callback(choice, true));
      colA.appendChild(btn);
    });
    arrB.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice; btn.className = "choice-btn bad";
      btn.addEventListener("click", () => callback(choice, false));
      colB.appendChild(btn);
    });

    container.appendChild(colA); container.appendChild(colB);
    choicesContainer.appendChild(container);
    if (chatBar) chatBar.style.display = "flex";
  }

  // GALERIE
  function unlockGallery() {
    popup2.classList.remove("show");
    if (galleryAppImg) galleryAppImg.src = "images/galerie-pixel3.png";
    if (galleryApp) { galleryApp.style.pointerEvents = "auto"; galleryApp.style.cursor = "pointer"; }
    if (galleryAppImg) galleryAppImg.style.filter = "none";

    let galleryOpen = false;
    if (galleryApp) {
      galleryApp.addEventListener("click", () => {
        galleryOpen = !galleryOpen;
        if (galleryContent) galleryContent.style.display = galleryOpen ? "flex" : "none";
        if (galleryOpen) startGalleryConversation();
      }, { once: false });
    }
  }

  function startGalleryConversation() {
    popup2.classList.add("show");
    popup2Text.textContent = "Tu regardes les photos de Laila...";
    setTimeout(() => {
      popup2Text.textContent = "Que veux-tu dire ?";
      const firstChoices = [
        "Wow donc c’est vraiment toi",
        "Tu n’as pas changé",
        "Toujours aussi belle"
      ];
      showChoices(firstChoices, handleGalleryReply);
    }, 1200);
  }

  function handleGalleryReply(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Oui haha, toi aussi tu n’as pas changé, toujours aussi gentille."';
      setTimeout(() => {
        popup2Text.textContent = 'Toi : "Mais Laila... J’ai une question."';
        setTimeout(() => {
          popup2Text.textContent = 'Laila : "Oui, dis-moi ?"';
          setTimeout(() => {
            popup2Text.textContent = 'Toi : "Je suis contente de ton retour, mais où étais-tu bon sang ? Avec ces histoires de disparitions, on s’est vraiment fait du souci pour toi."';
            setTimeout(() => {
              popup2Text.textContent = 'Laila : "J’avais besoin de prendre l’air, je t’avoue. Je suis partie à la campagne, car ça n’allait pas bien."';
              setTimeout(() => {
                showChoices(
                  [
                    { text: "Ne pas accepter son explication", class: "reject" },
                    { text: "Accepter son explication", class: "accept" }
                  ],
                  handleExplanationChoice
                );
              }, 1400);
            }, 1400);
          }, 1400);
        }, 1400);
      }, 1400);
    }, 1400);
  }

  function handleExplanationChoice(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      if (choice === "Accepter son explication") {
        const acceptChoices = [
          "Je pensais qu’on était de bonnes amies, pourquoi ne m’avoir rien dit ?",
          "Je suis désolée de ne pas m’en être rendu compte."
        ];
        showChoices(acceptChoices, handleAfterReaction);
      } else {
        const rejectChoices = [
          "Tu peux dire ça aux autres mais pas à moi.",
          "Ça n’a pas de sens ce que tu dis, tu détestes la campagne, Laila."
        ];
        showChoices(rejectChoices, handleAfterReaction);
      }
    }, 700);
  }

  function handleAfterReaction(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Il y a une autre raison... Tout a commencé un jour où je rentrais du travail. Une énorme dispute a éclaté avec ma mère. C’est devenu violent. Ça s’est répété à plusieurs reprises, j’ai dû prendre des précautions et m’éloigner."';
      setTimeout(() => {
        const newMessage = `Laila confie qu’elle a dû fuir un danger.
Elle dit qu’on est la première personne à qui elle reparle.
Elle demande de garder le secret, même pour le reste de sa famille et autres amis.
Elle propose d’envoyer un vocal, car tout expliquer par message serait trop long.`;
        openDropdown();
        typeInDropdown(newMessage, 25, () => {
          popup2Text.textContent = 'Toi : "Oui, tu peux me faire confiance."';
          setTimeout(() => unlockVoicemail(), 1500);
        });
      }, 1800);
    }, 700);
  }

  function unlockVoicemail() {
    popup2Text.textContent = 'Laila : "Merci... Je t’envoie un vocal alors."';
    if (voicemailAppImg) voicemailAppImg.src = "images/voiceMail.png";
    if (voicemailApp) { voicemailApp.style.pointerEvents = "auto"; voicemailApp.style.cursor = "pointer"; }
    if (voicemailAppImg) voicemailAppImg.style.filter = "none";
  }

  window.addEventListener("voicemailEnded", (e) => {
    const heard = e && e.detail && !!e.detail.heard;
    console.log("game.js a reçu voicemailEnded:", heard);
    unlockCalendarApp();
  });

  function unlockCalendarApp() {
    if (!calendarApp || !calendarAppImg) return;
    popup2.classList.add("show");
    popup2Text.textContent = " Une nouvelle application est apparue sur ton écran : Calendrier.";
    calendarAppImg.src = "images/calendrier.png";
    calendarApp.style.pointerEvents = "auto";
    calendarApp.style.cursor = "pointer";
    calendarAppImg.style.filter = "none";

    if (!calendarApp._listenerAdded) {
      calendarApp._listenerAdded = true;
      let open = false;
      calendarApp.addEventListener("click", () => {
        open = !open;
        if (open) {
          popup2.classList.add("show");
          popup2Text.innerHTML = `
            <strong>Calendrier</strong><br><br>
             <strong>28 février</strong> — Rendez-vous prévu avec Laila<br>
             <strong>29 février</strong> — Anniversaire de Laila (année bissextile)<br><br>
            <em>Un détail étrange... le 29 février n’apparaît que certaines années.</em>
          `;
        } else {
          popup2.classList.remove("show");
        }
      });
    }
  }

  // Lancer intro
  setTimeout(() => {
    openDropdown();
    typeInDropdown(introMessage);
  }, 500);
});

 //  DÉBLOCAGE BANQUE ET MOTEUR DE RECHERCHE 
  window.debloquerBanqueEtRecherche = function () {
    const banqueApp = document.getElementById("banqueApp");
    const moteurApp = document.getElementById("searchApp");

    if (banqueApp) {
      const banqueImg = banqueApp.querySelector("img");
      banqueApp.style.pointerEvents = "auto";
      banqueApp.style.cursor = "pointer";
      if (banqueImg) {
        banqueImg.src = "images/banque.png";
        banqueImg.style.filter = "none";
      }
    }

    if (moteurApp) {
      const moteurImg = moteurApp.querySelector("img");
      moteurApp.style.pointerEvents = "auto";
      moteurApp.style.cursor = "pointer";
      if (moteurImg) {
        moteurImg.src = "images/recherche.png";
        moteurImg.style.filter = "none";
      }
    }

    // Affiche une notification visuelle pour signaler le déblocage
    const notif = document.createElement("div");
    notif.className = "system-notif";
    notif.textContent = " Nouvelle activité suspecte détectée : IBAN inconnu (Karl BAUDIN)";
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 5000);
  };
