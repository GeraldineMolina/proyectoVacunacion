
import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
    apiKey: "AIzaSyCGmCXnxTCzIWPFGDwY0JN3E6kp2y49Jjw",
    authDomain: "crudvacunacion.firebaseapp.com",
    projectId: "crudvacunacion",
    storageBucket: "crudvacunacion.appspot.com",
    messagingSenderId: "550090309385",
    appId: "1:550090309385:web:51b9624b5a2335510e1dd8",
    measurementId: "G-HM2C4G9XMF"
    };
  // Initialize Firebase
    const fb = firebase.initializeApp(firebaseConfig);
    /*firebase.analytics();*/
    
    export const db = fb.firestore();
