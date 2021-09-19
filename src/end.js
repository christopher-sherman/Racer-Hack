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

let gameNum = 1;
let playerQuestionNumber = 1;
let topic;
let difficulty;
let topicNum = 1;
let difficultyNum = 1;
let questionNum = 1;

retrieveQuestionNumber();
retrieveQuestion();
retrievePlayerAnswer();
retrieveModelAnswer();

function retrieveQuestionNumber() {
    const gettingQuestion = onSnapshot(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + gameNum + '- Question ' + playerQuestionNumber), (doc) => {
        let gettingPlayerQuestion = doc.data().playerQuestion;
        let secondZero = gettingPlayerQuestion.indexOf("0", 1);
        let thirdZero = gettingPlayerQuestion.indexOf("0", secondZero + 1);
        let currentPosition;
        if (thirdZero - secondZero === 1) {
            topicNum = gettingPlayerQuestion.substr(1, thirdZero - 1);
            currentPosition = thirdZero;
        } else if (thirdZero - secondZero !== 1) {
            topicNum = gettingPlayerQuestion.substr(1, secondZero - 1);
            currentPosition = secondZero;
        }
        difficultyNum = gettingPlayerQuestion.substr(currentPosition + 1, 1);
        currentPosition = currentPosition + 2;
        questionNum = gettingPlayerQuestion.substr(currentPosition + 1, gettingPlayerQuestion.length - currentPosition);
        allocateTopic(topicNum);
        allocateDifficulty(difficultyNum);
        console.log("Topic Number: " + topicNum);
        console.log("Difficulty Num: " + difficultyNum);
        console.log("Question Number: " + questionNum);
        console.log("Topic: " + topic);
        console.log("Difficulty: " + difficulty);
    });
}

function allocateTopic(num) {
    console.log("Number: " + num); // num = 1
    switch (num) {
        case 1:
            topic = "Arrays";
            break;
        case 2:
            topic = "Functions";
            break;
        case 3:
            topic = "Operators";
            break;
    }
    console.log(topic); // logs undefined
}

function allocateDifficulty(num) {
    switch (num) {
        case 1:
            difficulty = "Easy";
            break;
        case 2:
            difficulty = "Medium";
            break;
        case 3:
            difficulty = "Hard";
            break;
    }
}

function retrieveQuestion() {
    console.log("Topic Number:" + topicNum);
    console.log("Difficulty Num:" + difficultyNum);
    console.log("Question Number: " + questionNum);
    const accessingQuestion = onSnapshot(doc(db, "Questions", "Arrays", "Easy", '0' + topicNum + '0' + difficultyNum + '0' + questionNum), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().Question;
        displayQuestionResultPage.appendChild(question);
        console.log(displayQuestionResultPage)
    });
}

function retrievePlayerAnswer() {
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + gameNum + '- Question ' + playerQuestionNumber), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().playerAnswer;
        displayPlayerAnswerResultPage.appendChild(question);
        console.log(displayPlayerAnswerResultPage)
    });
}

function retrieveModelAnswer() {
    const accessingQuestion = onSnapshot(doc(db, "Questions", "Arrays", "Easy", '0' + topicNum + '0' + difficultyNum + '0' + questionNum), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().Solution;
        displayModelAnswerResultPage.appendChild(question);
        console.log(displayModelAnswerResultPage)
    });
}
