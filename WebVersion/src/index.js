 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
 import { getFirestore, collection, getDocs,setDoc, onSnapshot, doc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyChVP88vGhW1JGU2aH1befAeAyZLG30aFY",
   authDomain: "test-viking.firebaseapp.com",
   projectId: "test-viking",
   storageBucket: "test-viking.appspot.com",
   messagingSenderId: "676279524815",
   appId: "1:676279524815:web:0807d7e2d4e7da40cc06ba",
   measurementId: "G-7X4CH4NJCW"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 const retrieveQns = onSnapshot(doc(db, "Questions", "Arrays", "Easy", "cborE7qGvxFUAdCbu9wh"), (doc) => {
    //console.log("Question: ", doc.data().Question);
    question.innerHTML = "<p>" + doc.data().Question + "</p>";
});
const retrieveAns = onSnapshot(doc(db, "Questions", "Arrays", "Easy", "cborE7qGvxFUAdCbu9wh"), (doc) => {
    //to be removed to hide answer from console
    //console.log("Answer: ", doc.data().Solution);
    hidden.innerHTML = doc.data().Solution;
});

var send = hidden2.textContent || hidden2.innerText;
if(send === "1"){  //write to Firebase
await setDoc(doc(db, "UserCode", "Code"), {
    correctCode: document.getElementById("codeeditor").value //input for code editor
  }, { merge: true });  
}
