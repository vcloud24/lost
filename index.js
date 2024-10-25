import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GithubAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyALeb3KmDnQ9r35ZBJvSYX3tpc4jhaubc4",
    authDomain: "vcloud-d8808.firebaseapp.com",
    projectId: "vcloud-d8808",
    storageBucket: "vcloud-d8808.appspot.com",
    messagingSenderId: "783418329755",
    appId: "1:783418329755:web:2703e0f5ffcc278d48943e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// GitHub Sign-In
const signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => console.log("Signed in as:", result.user.displayName))
        .catch(error => console.error("Sign-in error:", error));
});

// Load and Display High Scores
async function loadHighScores() {
    const scoresRef = collection(db, "scores");
    const snapshot = await getDocs(scoresRef);
    const scores = snapshot.docs.map(doc => doc.data()).sort((a, b) => b.score - a.score).slice(0, 3);
    const highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = scores.map(score => `<li>${score.name}: ${score.score}</li>`).join("");
}

loadHighScores();
