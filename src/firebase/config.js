import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    
    apiKey: "AIzaSyAyI-JbHBNXn803zeNA2q3yL57sp7XVYV8",
    authDomain: "prog3-proyectofinal.firebaseapp.com",
    projectId: "prog3-proyectofinal",
    storageBucket: "prog3-proyectofinal.appspot.com",
    messagingSenderId: "587981359570",
    appId: "1:587981359570:web:319d7e63005c5e255ae00b"

};
  
  app.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();