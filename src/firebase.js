// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase";
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDofvS-aKOaJ2fE_zsshQPP42LcxJKgk0Q",
    authDomain: "clone-158cc.firebaseapp.com",
    projectId: "clone-158cc",
    storageBucket: "clone-158cc.appspot.com",
    messagingSenderId: "535818573791",
    appId: "1:535818573791:web:7508db5e30477fb74bd66a",
    measurementId: "G-23318W7YZN"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };