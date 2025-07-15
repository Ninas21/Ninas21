const textElement = document.getElementById('text');
const typingSound = document.getElementById('typing-sound');
const text = "L'enfance est le monde du possible, l'adolescence est le monde du doute, et la vieillesse est le monde de la mémoire.";
const imageContainer = document.getElementById('image-container');

// Vérifie que l'audio est prêt avant utilisation
let audioReady = false;

// Initialiser l'audio uniquement après interaction utilisateur
function initializeAudio() {
    if (!audioReady) {
        typingSound.play().then(() => {
            typingSound.pause(); // Arrête immédiatement après avoir démarré
            typingSound.currentTime = 0; // Réinitialise au début
            audioReady = true;
            console.log("Audio prêt et chargé !");
        }).catch(error => {
            console.log("Interaction utilisateur requise :", error);
        });
    }
}

// Ajoute un événement pour déclencher l'initialisation de l'audio
document.body.addEventListener('click', initializeAudio);
document.body.addEventListener('keydown', initializeAudio);

// Démarrage de l'effet d'intro
window.onload = function () {
    setTimeout(() => {
        imageContainer.style.display = 'none'; // Cache l'image après un délai
        document.getElementById('content').style.display = 'block'; // Affiche le texte
        startTypingEffect(); // Démarre l'effet de saisie
    }, 7000); // 7 secondes d'affichage pour l'image
};

// Fonction pour commencer l'effet d'écriture
function startTypingEffect() {
    if (audioReady) {
        typingSound.loop = true; // Active la boucle
        typingSound.play().catch((error) => console.error("Erreur de lecture de l'audio :", error));
    }

    textElement.textContent = ""; // Réinitialise le texte
    let currentIndex = 0;

    function typeNextLetter() {
        if (currentIndex < text.length) {
            textElement.textContent += text[currentIndex];
            currentIndex++;
            setTimeout(typeNextLetter, 100); // Ajoute la lettre suivante après 100 ms
        } else {
            if (audioReady) {
                typingSound.pause(); // Arrête l'audio une fois l'écriture terminée
                typingSound.currentTime = 0; // Réinitialise l'audio
            }
            setTimeout(fadeOutText, 3000); // Fait disparaître le texte après 3 secondes
        }
    }

    typeNextLetter();
}

// Fonction pour faire disparaître le texte
function fadeOutText() {
    textElement.style.animation = "fadeOut 2s ease-out forwards";
    setTimeout(redirectToAnotherPage, 2000); // Redirige après la disparition
}

// Redirection vers une autre page
function redirectToAnotherPage() {
    window.location.href = 'exposition.html';
}