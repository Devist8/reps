import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBLGnhWNspnEWGMZojO6eTKdUE8FpBtFg0",
    authDomain: "reps-699b0.firebaseapp.com",
    databaseURL: "https://reps-699b0.firebaseio.com",
    projectId: "reps-699b0",
    storageBucket: "reps-699b0.appspot.com",
    messagingSenderId: "468770503396",
    appId: "1:468770503396:web:3c7b5eed6f0761acc64af1",
    measurementId: "G-8N3ZVE943C",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
