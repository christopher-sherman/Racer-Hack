const displayQuestion = document.querySelector('#text');
const wrongUser = document.querySelector('#wrongUser');
var Player = "False";
var userInputName = "";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
    getFirestore,
    query,
    where,
    collection,
    getDocs,
    setDoc,
    onSnapshot,
    doc
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChVP88vGhW1JGU2aH1befAeAyZLG30aFY",
    authDomain: "test-viking.firebaseapp.com",
    projectId: "test-viking",
    storageBucket: "test-viking.appspot.com",
    messagingSenderId: "676279524815",
    appId: "1:676279524815:web:0807d7e2d4e7da40cc06ba",
    measurementId: "G-7X4CH4NJCW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function yes() {
    const playerRef = query(collection(db, "Player"), where("Username", "==", userInputName));
    const querySnapshot = await getDocs(playerRef);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        Player = doc.id;
    });
    const accessingQuestion = onSnapshot(doc(db, "Player", Player), (doc) => {
        console.log(doc.data().Username);
        console.log(doc.data().Score);
    })
    if(Player === "False"){
        displayQuestion.uname.value = '';
        displayQuestion.psw.value = '';
        console.log('Wrong username or password');
    }
    else
        window.location.pathname = "WebVersion/index.html";
}

displayQuestion.addEventListener('submit', (e) => {
    e.preventDefault();
    userInputName = displayQuestion.uname.value;
    yes();
    console.log(Player);

})

export { Player };