// Initialize Firebase and retrieve user information
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = { /* Your Firebase config */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check user authentication
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('username').textContent = user.displayName || user.email;
        document.getElementById('gameLinks').classList.remove('hidden');
    } else {
        document.getElementById('username').textContent = 'Guest';
        document.getElementById('gameLinks').classList.add('hidden');
    }
});

// Game setup and logic (e.g., card matching)
const gameBoard = document.getElementById("game-board");
let firstCard, secondCard, lockBoard = false, score = 0;

// Add card setup and game logic here...

// Function to submit score to Firebase
function submitScore() {
    const user = auth.currentUser;
    if (user) {
        const scoreRef = firebase.database().ref('highScores/' + user.uid);
        scoreRef.set(score);
        alert('Score submitted!');
    } else {
        alert('You must be signed in to submit a score.');
    }
}

document.getElementById('submitScore').addEventListener('click', submitScore);
