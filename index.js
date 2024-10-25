// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
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

// Check user authentication status
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('username').textContent = user.displayName || user.email;
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('sign-in-container').classList.add('hidden');
    } else {
        document.getElementById('username').textContent = 'Guest';
        document.getElementById('user-info').classList.add('hidden');
        document.getElementById('sign-in-container').classList.remove('hidden');
    }
});

// Sign up function
document.getElementById('signUpBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log('User signed up:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error signing up:', error.message);
        });
});

// Sign in function
document.getElementById('signInBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log('User signed in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error signing in:', error.message);
        });
});

// Log out function
document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Error signing out:', error.message);
    });
});
