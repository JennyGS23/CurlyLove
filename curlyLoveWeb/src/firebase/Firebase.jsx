import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDMLMoUjE9361rkgkuWxjYmXO7P4LFB-Sk",
    authDomain: "curlylove23-af3d8.firebaseapp.com",
    projectId: "curlylove23-af3d8",
    storageBucket: "curlylove23-af3d8.firebasestorage.app",
    messagingSenderId: "343384346521",
    appId: "1:343384346521:web:a3fbce3f8929a37bb38d08",
    measurementId: "G-TCJ4SME4VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword };
