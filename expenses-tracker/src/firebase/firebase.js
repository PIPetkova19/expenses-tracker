import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";//!

const firebaseConfig = {
    apiKey: "AIzaSyCbbNokkBhhg2JvoW76linxJIYprDuer6g",
    authDomain: "expenses-tracker-aeaca.firebaseapp.com",
    projectId: "expenses-tracker-aeaca",
    storageBucket: "expenses-tracker-aeaca.firebasestorage.app",
    messagingSenderId: "481906841202",
    appId: "1:481906841202:web:0afe9492c043e24fec54eb",
    measurementId: "G-PF9D0CDZBV"
};

// Инициализиране на Firebase приложението с конфигурацията
const app = initializeApp(firebaseConfig);
// Инстанция на Authentication (за login, signin, logout и т.н.)
const auth = getAuth(app);

 const db = getFirestore(app); //!
export { app, auth, db };//!
