// IndiceZeroVoiceMail.js
window.addEventListener("load", () => {
  const popup2 = document.getElementById("popup2");
  const popup2Text = document.getElementById("popup2-text");
  const choicesContainer = document.getElementById("choicesContainer");
  const chatBar = document.getElementById("chatBar");
  const voicemailApp = document.getElementById("voicemailApp");
  const voicemailAppImg = document.getElementById("voicemailAppImg");

  // sécurité minimale
  if (!popup2 || !popup2Text || !choicesContainer || !chatBar) {
    console.error("Un ou plusieurs éléments requis pour le voicemail sont manquants.");
    return;
  }

  // helper pour choices (local)
  function showChoices(choices, callback) {
    choicesContainer.innerHTML = "";
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.className = "choice-btn";
      btn.addEventListener("click", () => {
        choicesContainer.innerHTML = "";
        if (chatBar) chatBar.style.display = "none";
        callback(choice);
      });
      choicesContainer.appendChild(btn);
    });
    if (chatBar) chatBar.style.display = "flex";
  }

  // simulate fake reaction (refuse flow)
  function simulateFakeReaction() {
    if (popup2) popup2.classList.remove("show");
    setTimeout(() => {
      if (popup2) popup2.classList.add("show");
      popup2Text.textContent = `Toi : "Wow, quelle histoire de fou..."`;
      setTimeout(() => {
        popup2Text.textContent = "Que veux-tu dire ?";
        const choices = [
          "Je comprends mieux maintenant pourquoi tu as dû fuir.",
          "T’as dû avoir sacrément peur. Ça fait froid dans le dos."
        ];
        showChoices(choices, handlePostFakeReaction);
      }, 900);
    }, 400);
  }

  function handlePostFakeReaction(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Écoute, on fait avec les moyens du bord haha. J’ai pris le premier téléphone trouvé chez mes grands-parents."';
      setTimeout(() => {
        const nextChoices = [
          "D’accord, je vois.",
          "Excuse-moi encore pour tout à l’heure, je n’aurais jamais pensé que tu traversais ça."
        ];
        showChoices(nextChoices, handleLailaForgiveness);
      }, 2200);
    }, 900);
  }

  function handleLailaForgiveness(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Mais moi qui suis désolée… J’aurais dû savoir que tu étais de confiance. C’est pourquoi je veux qu’on se revoie, en cachette de mes parents et de la protection policière. Une soirée le 28 février ?"';
      setTimeout(() => {
        // Notifier le reste de l'app (game.js) qu'on peut débloquer le calendrier
        window.dispatchEvent(new CustomEvent("voicemailEnded", { detail: { heard: false } }));
      }, 3000);
    }, 900);
  }

  // Lors du click sur voicemailApp on insère le player
  if (voicemailApp) {
    voicemailApp.addEventListener("click", () => {
      if (popup2) popup2.classList.add("show");
      // Remplace le contenu textuel par le player audio + boutons
      popup2Text.innerHTML = `
        <strong>Laila t’a envoyé un vocal :</strong><br><br>
        <audio id="vocalPlayer" controls style="width:100%;">
          <source src="audio/rire.mp3" type="audio/mpeg">
          Ton navigateur ne supporte pas la lecture audio.
        </audio>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button id="refuseAudio" class="choice-btn bad">Ne pas écouter</button>
          <button id="closeAudio" class="choice-btn">Fermer</button>
        </div>
        <p style="margin-top:8px;"><em>(Si tu écoutes, la suite du scénario se déclenchera après la fin du vocal.)</em></p>
      `;

      // récupérer éléments dynamiques
      const player = document.getElementById("vocalPlayer");
      const refuseBtn = document.getElementById("refuseAudio");
      const closeBtn = document.getElementById("closeAudio");

      // bouton refuser -> on simule la réaction et dispatch
      if (refuseBtn) {
        refuseBtn.addEventListener("click", () => {
          if (popup2) popup2.classList.remove("show");
          setTimeout(simulateFakeReaction, 500);
          // dispatch pour informer le reste de l'app (calendrier peut se débloquer)
          window.dispatchEvent(new CustomEvent("voicemailEnded", { detail: { heard: false } }));
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          if (popup2) popup2.classList.remove("show");
        });
      }

      if (player) {
        // si l'utilisateur a cliqué play et que la lecture finit -> dispatch heard:true
        player.addEventListener("ended", () => {
          // Ferme popup et affiche la suite courte, puis dispatch
          if (popup2) popup2.classList.remove("show");
          setTimeout(() => {
            if (popup2) popup2.classList.add("show");
            popup2Text.textContent = 'Laila (vocal) : "Merci d’avoir écouté... Je vais t’écrire la suite, mais sois prudente. On se voit le 28 comme prévu."';
            // dispatch l'info (heard: true)
            // Ferme popup et affiche la suite courte, puis dispatch
if (popup2) popup2.classList.remove("show");
setTimeout(() => {
  if (popup2) popup2.classList.add("show");
  popup2Text.textContent = 'Laila (vocal) : "Merci d’avoir écouté... Je vais t’écrire la suite, mais sois prudente. On se voit le 28 comme prévu."';
  setTimeout(() => {
    popup2Text.textContent = 'Laila : "Une nouvelle app calendrier s’est débloquée."';
    // C’est ici qu’on débloque le calendrier pour de vrai
    window.dispatchEvent(new CustomEvent("voicemailEnded", { detail: { heard: true } }));
  }, 3000); // délai avant d'annoncer le déblocage
}, 700);
          }, 700);
        });

        // optionnel : si erreur de lecture -> afficher message
        player.addEventListener("error", (e) => {
          console.warn("Erreur de lecture audio", e);
          popup2Text.innerHTML += "<p style='color:#c00;margin-top:8px;'>Impossible de lire le fichier audio.</p>";
        });
      } else {
        popup2Text.innerHTML += `<p style="color:#c00;margin-top:8px;">Le lecteur audio n'a pas pu être créé.</p>`;
      }
    });
  } else {
    console.warn("voicemailApp introuvable — click impossible.");
  }
});

window.addEventListener("load", () => {
  const popup2 = document.getElementById("popup2");
  const popup2Text = document.getElementById("popup2-text");
  const choicesContainer = document.getElementById("choicesContainer");
  const chatBar = document.getElementById("chatBar");
  const voicemailApp = document.getElementById("voicemailApp");
  const voicemailAppImg = document.getElementById("voicemailAppImg");

  if (!popup2 || !popup2Text || !choicesContainer || !chatBar) {
    console.error("Un ou plusieurs éléments requis pour le voicemail sont manquants.");
    return;
  }

  // Affiche les choix dynamiques
  function showChoices(choices, callback) {
    choicesContainer.innerHTML = "";
    choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.className = "choice-btn";
      btn.addEventListener("click", () => {
        choicesContainer.innerHTML = "";
        if (chatBar) chatBar.style.display = "none";
        callback(choice);
      });
      choicesContainer.appendChild(btn);
    });
    if (chatBar) chatBar.style.display = "flex";
  }

  // SCÉNARIO EN CAS DE REFUS
  function simulateFakeReaction() {
    if (popup2) popup2.classList.remove("show");
    setTimeout(() => {
      if (popup2) popup2.classList.add("show");
      popup2Text.textContent = `Toi : "Wow, quelle histoire de fou..."`;
      setTimeout(() => {
        popup2Text.textContent = "Que veux-tu dire ?";
        const choices = [
          "Je comprends mieux maintenant pourquoi tu as dû fuir.",
          "T’as dû avoir sacrément peur. Ça fait froid dans le dos."
        ];
        showChoices(choices, handlePostFakeReaction);
      }, 1000);
    }, 500);
  }

  function handlePostFakeReaction(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Écoute, on fait avec les moyens du bord haha. J’ai pris le premier téléphone trouvé chez mes grands-parents."';
      setTimeout(() => {
        const nextChoices = [
          "D’accord, je vois.",
          "Excuse-moi encore pour tout à l’heure, je n’aurais jamais pensé que tu traversais ça."
        ];
        showChoices(nextChoices, handleLailaForgiveness);
      }, 2200);
    }, 900);
  }

  function handleLailaForgiveness(choice) {
    popup2Text.textContent = `Toi : "${choice}"`;
    setTimeout(() => {
      popup2Text.textContent = 'Laila : "Mais moi qui suis désolée… J’aurais dû savoir que tu étais de confiance. C’est pourquoi je veux qu’on se revoie, en cachette de mes parents et de la protection policière. Une soirée le 28 février ?"';
      // Débloque calendrier ici (la vraie fin du scénario)
      setTimeout(() => {
        popup2Text.textContent = 'Laila : "Une nouvelle app calendrier s’est débloquée."';
        window.dispatchEvent(new CustomEvent("voicemailEnded", { detail: { heard: false } }));
      }, 4000);
    }, 900);
  }

  // SCÉNARIO EN CAS D'ÉCOUTE 
  if (voicemailApp) {
    voicemailApp.addEventListener("click", () => {
      if (popup2) popup2.classList.add("show");
      popup2Text.innerHTML = `
        <strong>Laila t’a envoyé un vocal :</strong><br><br>
        <audio id="vocalPlayer" controls style="width:100%;">
          <source src="audio/rire.mp3" type="audio/mpeg">
          Ton navigateur ne supporte pas la lecture audio.
        </audio>
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button id="refuseAudio" class="choice-btn bad">Ne pas écouter</button>
          <button id="closeAudio" class="choice-btn">Fermer</button>
        </div>
        <p style="margin-top:8px;"><em>(Si tu écoutes, la suite du scénario se déclenchera à la fin du vocal.)</em></p>
      `;

      const player = document.getElementById("vocalPlayer");
      const refuseBtn = document.getElementById("refuseAudio");
      const closeBtn = document.getElementById("closeAudio");

      if (refuseBtn) {
        refuseBtn.addEventListener("click", () => {
          if (popup2) popup2.classList.remove("show");
          setTimeout(simulateFakeReaction, 500);
          // on ne débloque PAS le calendrier ici
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", () => {
          if (popup2) popup2.classList.remove("show");
        });
      }

      if (player) {
        player.addEventListener("ended", () => {
          if (popup2) popup2.classList.remove("show");
          setTimeout(() => {
            if (popup2) popup2.classList.add("show");
            popup2Text.textContent = 'Laila (vocal) : "Merci d’avoir écouté... Je vais t’écrire la suite, mais sois prudente. On se voit le 28 comme prévu."';
            setTimeout(() => {
              popup2Text.textContent = 'Laila : "Une nouvelle app calendrier s’est débloquée."';
              // Débloque ici à la fin du vocal
              window.dispatchEvent(new CustomEvent("voicemailEnded", { detail: { heard: true } }));
            }, 4000);
          }, 700);
        });
      }
    });
  } else {
    console.warn("voicemailApp introuvable — click impossible.");
  }
});
