import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyDOHFOfq7K_VxcbzdfU99qINHiG29jZvyc",
  authDomain: "notepad-rachael.firebaseapp.com",
  projectId: "notepad-rachael",
  storageBucket: "notepad-rachael.appspot.com",
  messagingSenderId: "1062736678577",
  appId: "1:1062736678577:web:bc44a01c68073170389c90",
  measurementId: "G-7Y5G89QFTK"
};

// Initialize Firebase and Firebase Authentication
//const app = initializeApp(firebaseConfig);
const firebaseAuth = firebase.initializeApp(firebaseConfig)
const auth = getAuth(firebaseAuth)

export {firebase, auth}
