const lyrics = [
    "You are not alone",
    "I'll be there",
    "In the morning light",
    "Just beat it",
    "Wanna be startin' somethin'",
    "Don't stop 'til you get enough",
    "Smooth Criminal",
    "Billie Jean",
    "Thriller",
    "Black or White",
    "Cheater",
    "Blood is on the dance floor"
];


const chansons = document.getElementById('chansons');

function createWord() {
    const mot = document.createElement('div');
    mot.className = 'mot';
    mot.textContent = lyrics[Math.floor(Math.random() * lyrics.length)];
    
    // Positionner le mot
    mot.style.left = Math.random() * window.innerWidth + 'px';
    
    // Durée de l'animation
    const duration = Math.random() * 3 + 2; 
    mot.style.animationDuration = duration + 's';

    chansons.appendChild(mot);

    // Enlever le mot après l'animation
    setTimeout(() => {
        mot.remove();
    }, duration * 1000);
}



// Créer des mots toutes les 500 ms
setInterval(() => {
    createWord();
    
}, 500);


