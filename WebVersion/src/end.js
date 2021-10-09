// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
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

const displayQuestionResultPage = document.querySelector('#display-question-result-page');
const displayPlayerAnswerResultPage = document.querySelector('#display-player-answer-result-page');
const displayModelAnswerResultPage = document.querySelector('#display-model-answer-result-page');

const object = {
    gameNum: 1,
    playerQuestionNumber: 2,
    topic: "Arrays",
    difficulty: "Easy",
    topicNum: "1",
    difficultyNum: "1",
    questionNum: "1"
}
let playerQuestionNumber = 1;
retrieveQuestionNumber(object, playerQuestionNumber);
allocateTopic(object);
allocateDifficulty(object);
retrieveQuestion(object);
retrievePlayerAnswer(object, 1);
retrieveModelAnswer(object);

function retrieveQuestionNumber(object, questionNumber) {
    const gettingQuestion = onSnapshot(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + object.gameNum + '- Question ' + questionNumber), (doc) => {
        let gettingPlayerQuestion = doc.data().playerQuestion;
        let secondZero = gettingPlayerQuestion.indexOf("0", 1);
        let thirdZero = gettingPlayerQuestion.indexOf("0", secondZero + 1);
        let currentPosition;
        if (thirdZero - secondZero === 1) {
            object.topicNum = gettingPlayerQuestion.substr(1, thirdZero - 1);
            currentPosition = thirdZero;
        } else if (thirdZero - secondZero !== 1) {
            object.topicNum = gettingPlayerQuestion.substr(1, secondZero - 1);
            currentPosition = secondZero;
        }
        object.difficultyNum = gettingPlayerQuestion.substr(currentPosition + 1, 1);
        currentPosition = currentPosition + 2;
        object.questionNum = gettingPlayerQuestion.substr(currentPosition + 1, gettingPlayerQuestion.length - currentPosition);
        // console.log(object.questionNum);
    });
}

function allocateTopic(num) {
    switch (num) {
        case "1":
            num.topic = "Arrays";
            break;
        case "2":
            num.topic = "Functions";
            break;
        case "3":
            num.topic = "Operators";
            break;
    }
}

function allocateDifficulty(num) {
    switch (num) {
        case "1":
            num.difficulty = "Easy";
            break;
        case "2":
            num.difficulty = "Medium";
            break;
        case "3":
            num.difficulty = "Hard";
            break;
    }
}

function retrieveQuestion(object, questionNumber) {
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 2", 'Past Attempts', 'Game 1- Question ' + questionNumber), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().Question;
        //displayQuestionResultPage.appendChild(question);
        document.getElementById('display-question-result-page').innerHTML = doc.data().Question;
    });
}

function retrievePlayerAnswer(questionNumber) {
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 2", 'Past Attempts', 'Game 1- Question ' + questionNumber), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().playerAnswer;
        //displayPlayerAnswerResultPage.appendChild(question);
        document.getElementById('display-player-answer-result-page').innerHTML = doc.data().playerAnswer;
    });
}

function retrieveModelAnswer(object, questionNumber) {
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 2", 'Past Attempts', 'Game 1- Question ' + questionNumber), (doc) => {        
        console.log("Question number: " + object.questionNum);
        let question = document.createElement('body');
        question.textContent = doc.data().Solution;
        //displayModelAnswerResultPage.appendChild(question);
        document.getElementById('display-model-answer-result-page').innerHTML = doc.data().Solution;
    });
}

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');

button1.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 1);
    retrieveQuestion(object, 1);
    retrievePlayerAnswer(1);
    retrieveModelAnswer(object, 1);
});

button2.addEventListener('click', (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 2);
    retrieveQuestion(object, 2);
    retrievePlayerAnswer(2);
    retrieveModelAnswer(object, 2);
});

button3.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 3);
    retrieveQuestion(object, 3);
    retrievePlayerAnswer(3);
    retrieveModelAnswer(object, 3);
});

button4.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 4);
    retrieveQuestion(object, 4);
    retrievePlayerAnswer(4);
    retrieveModelAnswer(object, 4);
});
