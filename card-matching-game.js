const gameBoard = document.getElementById('game-board');
const userScore = document.getElementById('userScore');
let score = 0;
let selectedCards = [];
let matchedPairs = 0;
const totalPairs = 8; // Adjust based on the number of pairs in your game

function createBoard() {
    const cards = [];
    for (let i = 0; i < totalPairs; i++) {
        cards.push(i, i); // Push two of each number
    }

    shuffle(cards);
    cards.forEach((cardValue) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', cardValue);
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}

function handleCardClick(event) {
    const card = event.target;
    if (selectedCards.length < 2 && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        selectedCards.push(card);
        
        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = selectedCards;
    
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score += 10;
        matchedPairs++;
        userScore.textContent = score;

        if (matchedPairs === totalPairs) {
            alert('You win!');
            submitScore(auth.currentUser.email, score); // Store score to Firebase
            resetGame();
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    selectedCards = [];
}

function resetGame() {
    gameBoard.innerHTML = '';
    score = 0;
    userScore.textContent = score;
    matchedPairs = 0;
    createBoard();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});
