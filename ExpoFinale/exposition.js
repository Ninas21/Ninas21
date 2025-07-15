const events = [
    {
        trigger: 5,
        action: () => startDialogue([
            { speaker: "girl", text: "Quelque chose approche..." },
            { speaker: "grandma", text: "Je ne sais pas ce que c'est..." },
            { speaker: "girl", text: "Reste sur tes gardes !" }
        ])
    }
];

let currentDialogueIndex = 0;

function startDialogue(dialogues) {
    const dialogueBox = document.getElementById('dialogue');
    const speakerImage = document.getElementById('speaker-image');
    const dialogueContainer = document.getElementById('dialogue-container');

    showDialogue(dialogues[currentDialogueIndex]);

    dialogueBox.addEventListener('click', function nextDialogue() {
        currentDialogueIndex++;

        if (currentDialogueIndex < dialogues.length) {
            showDialogue(dialogues[currentDialogueIndex]);
        } else {
            dialogueContainer.style.visibility = 'hidden';
            currentDialogueIndex = 0;
            dialogueBox.removeEventListener('click', nextDialogue);
        }
    });

    function showDialogue(dialogue) {
        dialogueContainer.style.visibility = 'visible';
        typeText(dialogue.text);

        if (dialogue.speaker === 'girl') {
            speakerImage.style.backgroundImage = "url('Images/girl-1.png')";
        } else if (dialogue.speaker === 'grandma') {
            speakerImage.style.backgroundImage = "url('Images/grandma-1.png')";
        }
    }

    function typeText(text) {
        let i = 0;
        dialogueBox.textContent = "";
        const typingInterval = setInterval(() => {
            dialogueBox.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(typingInterval);
            }
        }, 50);
    }
}

function preloadImages(frames) {
    frames.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

const girlFrames = [
    "Images/frame1.png",
    "Images/frame2.png",
    "Images/frame3.png",
    "Images/frame4.png",
];

const grandmaFrames = [
    "Images/frame1 (1).png",
    "Images/frame2 (2).png",
];

preloadImages(girlFrames);
preloadImages(grandmaFrames);

const girlSprite = document.getElementById("girl-sprite");
const grandmaSprite = document.getElementById("grandma-sprite");

const totalGirlFrames = girlFrames.length;
const totalGrandmaFrames = grandmaFrames.length;

let lastScrollPosition = 0;

function updateAnimation() {
    const scrollPosition = window.scrollX;

    const direction = scrollPosition > lastScrollPosition ? 1 : -1;
    lastScrollPosition = scrollPosition;

    const girlFrameIndex = Math.floor((scrollPosition / window.innerWidth) * totalGirlFrames) % totalGirlFrames;
    const grandmaFrameIndex = Math.floor((scrollPosition / window.innerWidth) * totalGrandmaFrames) % totalGrandmaFrames;

    girlSprite.src = girlFrames[girlFrameIndex];
    grandmaSprite.src = grandmaFrames[grandmaFrameIndex];

    resetScrollStopTimer();
}

let scrollStopTimer;
function resetScrollStopTimer() {
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
        girlSprite.src = "Images/girl-1.png";
        grandmaSprite.src = "Images/grandma.png";
    }, 150);
}

window.addEventListener("scroll", () => {
    updateAnimation();
});

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollX;

    events.forEach(event => {
        if (!event.triggered && scrollPosition >= event.trigger) {
            event.action();
            event.triggered = true;
        }
    });
});