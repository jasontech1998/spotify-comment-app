import * as firebase from "firebase/app";
import "firebase/database";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_ID,
  authDomain: "podspot-ede01.firebaseapp.com",
  databaseURL: "https://podspot-ede01.firebaseio.com",
  projectId: "podspot-ede01",
  storageBucket: "podspot-ede01.appspot.com",
  messagingSenderId: "59114392853",
  appId: "1:59114392853:web:87563044e9d8b277036d1c",
  measurementId: "G-TWQT9Z2SBR"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
export const database = firebase.database();