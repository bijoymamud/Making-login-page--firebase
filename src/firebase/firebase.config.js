// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuJbdv7SWGQ7FqNGlhFhUPINtnelMWkJ4",
    authDomain: "email-password-auth-bb3a1.firebaseapp.com",
    projectId: "email-password-auth-bb3a1",
    storageBucket: "email-password-auth-bb3a1.appspot.com",
    messagingSenderId: "745412543187",
    appId: "1:745412543187:web:2efa1cef48db7a26e78a26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;