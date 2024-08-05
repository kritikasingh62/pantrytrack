import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
//import { getFirestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // Import Auth

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUAmmxpuROcgTGJgvLihAltuuH96apxOE",
  authDomain: "pantry-tracker-8ef56.firebaseapp.com",
  projectId: "pantry-tracker-8ef56",
  storageBucket: "pantry-tracker-8ef56.appspot.com",
  messagingSenderId: "240561990882",
  appId: "1:240561990882:web:42fc9a4737d2d53fa902bb",
  measurementId: "G-705KEEDPRD"
};

let app; let analytics; let db
if(typeof window != undefined){
  app = initializeApp(firebaseConfig);
  analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
  db = getFirestore(app)
}
// Initialize Firebase
export {app, analytics, db}
//const app = initializeApp(firebaseConfig);
//export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
//export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Export Auth
