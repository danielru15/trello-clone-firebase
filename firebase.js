// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp ,getApp, getApps} from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGDAKb_1KygSCm9Ndo6hvtRGAPxCwFkcQ",
  authDomain: "whatsappclone-91256.firebaseapp.com",
  projectId: "whatsappclone-91256",
  storageBucket: "whatsappclone-91256.appspot.com",
  messagingSenderId: "888789166310",
  appId: "1:888789166310:web:6da7eed961ee9a43367327"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth(app);

export {app,db,storage , auth}