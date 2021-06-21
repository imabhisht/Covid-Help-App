import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDshTa6Df17xf4Yv-ro_0e4S0AMqwbTaG0",
    authDomain: "covid-9a3dc.firebaseapp.com",
    projectId: "covid-9a3dc",
    storageBucket: "covid-9a3dc.appspot.com",
    messagingSenderId: "346247782091",
    appId: "1:346247782091:web:6e08751262219effc8454e"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider};