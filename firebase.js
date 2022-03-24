// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWu-RGFr-R6XtFZkrmbUcVVbTIkLlbo8I",
  authDomain: "pokemonauction-59828.firebaseapp.com",
  projectId: "pokemonauction-59828",
  storageBucket: "pokemonauction-59828.appspot.com",
  messagingSenderId: "71849779247",
  appId: "1:71849779247:web:8ed2516325e8c6a532e6da",
  measurementId: "G-1140E002FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

async function getAuctions(db) {
  const auctions = collection(db, 'auctions')
  const snap = await getDocs(auctions)
  const list = snap.docs.map(doc => doc.data())
  return list
}

getAuctions()