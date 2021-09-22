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
retrievePlayerAnswer(object);
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

function retrieveQuestion(object) {
    console.log("Question number: " + object.questionNum); //logs 1
    const accessingQuestion = onSnapshot(doc(db, "Questions", object.topic, object.difficulty, '0' + object.topicNum + '0' + object.difficultyNum + '0' + object.questionNum), (doc) => {
        console.log("Question number: " + object.questionNum); // logs 2
        let question = document.createElement('body');
        question.textContent = doc.data().Question;
        displayQuestionResultPage.appendChild(question);
        console.log("Question number: " + object.questionNum);
    });
}

function retrievePlayerAnswer(object) {
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + object.gameNum + '- Question ' + object.playerQuestionNumber), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().playerAnswer;
        displayPlayerAnswerResultPage.appendChild(question);
    });
}

function retrieveModelAnswer(object) {
    console.log("Question number: " + object.questionNum);
    const accessingQuestion = onSnapshot(doc(db, "Questions", object.topic, object.difficulty, '0' + object.topicNum + '0' + object.difficultyNum + '0' + object.questionNum), (doc) => {
        console.log("Question number: " + object.questionNum);
        let question = document.createElement('body');
        question.textContent = doc.data().Solution;
        displayModelAnswerResultPage.appendChild(question);
        console.log("Question number: " + object.questionNum);
    });
}

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const button4 = document.querySelector('#button4');

button1.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 1);
    retrieveQuestion(object);
    retrievePlayerAnswer(object);
    retrieveModelAnswer(object);
});

button2.addEventListener('click', (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 2);
    retrieveQuestion(object);
    retrievePlayerAnswer(object);
    retrieveModelAnswer(object);
});

button3.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 3);
    retrieveQuestion(object);
    retrievePlayerAnswer(object);
    retrieveModelAnswer(object);
});

button4.addEventListener("click", (e) => {
    e.preventDefault();
    retrieveQuestionNumber(object, 4);
    retrieveQuestion(object);
    retrievePlayerAnswer(object);
    retrieveModelAnswer(object);
});
