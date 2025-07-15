const boutonMenu = document.querySelector('#bouton-menu img');
const popup = document.querySelector('#popup');
const closeButton = document.querySelector('#popup-content img');

boutonMenu.addEventListener('click', () => {
    popup.classList.add('visible');
    popup.classList.remove('hidden');
});

popup.addEventListener('click', () => {
    popup.classList.remove('visible');
    popup.classList.add('hidden');
});