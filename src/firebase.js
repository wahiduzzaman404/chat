/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvLEpTcNrDR1lE6Xjukyqfet8njVdPY6I",
    authDomain: "chat-49721.firebaseapp.com",
    projectId: "chat-49721",
    storageBucket: "chat-49721.appspot.com",
    messagingSenderId: "504301396447",
    appId: "1:504301396447:web:aa2142b01f1a43afece46a"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();