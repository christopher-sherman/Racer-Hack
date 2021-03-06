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

// Import player profile
// import { Player } from './start.js';
// Player;

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

const displayQuestion = document.querySelector('#display-question');
const nextButton = document.querySelector('#next-question');
const hintButton = document.querySelector('#show-hint');
const finishButton = document.querySelector('#game-end');
const timer = document.querySelector('#txt');

const gameProperties = {
    gameNum: 1,
    topicNum: 1,
    difficultyNum: 1,
    playerQuestionNumber: 1,
    showHint: 0,
    questionNum: 1,
    topic: "",
    difficulty: "",
    checkingQuestion: [],
    questionsDisplayed: 1,
    start: 1
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var send = hidden2.textContent || hidden2.innerText;
// await setDoc(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + gameProperties.gameNum + '- Question ' + gameProperties.playerQuestionNumber), {
await setDoc(doc(db, "Player", "Player 1", 'Past Attempts', 'Game 1- Question 1'), {
    playerAnswer: document.getElementById("codeeditor").value, //input for code editor
    playerQuestion: '010101'
    // playerQuestion: '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum
}, { merge: true });


// Siew Hean

function allocateTopic(gameProperties) {
    if (gameProperties.topicNum === 1)
        gameProperties.topic = "Arrays";
    if (gameProperties.topicNum === 2)
        gameProperties.topic = "Functions";
    if (gameProperties.topicNum === 3)
        gameProperties.topic = "Operators";
}

function allocatingQuestions(difficult, gameProperties) {
    gameProperties.topicNum = randomNumberGenerator(1, 4);
    allocateTopic(gameProperties);
    gameProperties.questionNum = randomNumberGenerator(1, 5);
    let beforeChecking = '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum;
    if (gameProperties.questionsDisplayed > 1)
        checkForDuplicates(beforeChecking, gameProperties);
    gameProperties.checkingQuestion[gameProperties.questionsDisplayed - 1] = '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum;
    console.log("Checking Question: " + gameProperties.checkingQuestion);
    gameProperties.difficulty = difficult;
    console.log("Topic: " + gameProperties.topic);
    console.log("Question number: " + gameProperties.questionNum);
    console.log("Difficulty: " + gameProperties.difficulty);
    gameProperties.questionsDisplayed++;
}

function checkForDuplicates(question, gameProperties) {
    let duplicates;
    let total = 0;
    do {
        duplicates = false;
        for (let i = 1; i < gameProperties.questionsDisplayed; i++) { // Check the for loops
            if (gameProperties.checkingQuestion[i] === question) {
                duplicates = true;
                console.log(question);
                break;
            }
        }
        if (duplicates === true) {
            console.log("Check 3");
            gameProperties.questionNum = randomNumberGenerator(1, 5);
            gameProperties.topicNum = randomNumberGenerator(1, 4);
            allocateTopic(gameProperties.topicNum);
            question = '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum;
        }
        total++;
    }
    while (duplicates === true);
}

function checkScoreAndDisplayQuestions(gameProperties) {
    const checkingScore = onSnapshot(doc(db, "Player", "Player 1"), (doc) => {
        let playerScore = doc.data().Score;
        if (playerScore < 700) {
            allocatingQuestions("Easy", gameProperties);
        }
        if (playerScore >= 700 && playerScore < 3000) {
            allocatingQuestions("Medium", gameProperties);
        }
        if (playerScore >= 3000) {
            allocatingQuestions("Hard", gameProperties);
        }
    });
}

function outputQuestion(gameProperties) {
    console.log("Topic: " + gameProperties.topic);
    console.log("Difficulty: " + gameProperties.difficulty);
    console.log("Topic Number: " + gameProperties.topicNum);
    console.log("Difficulty Number: " + gameProperties.difficultyNum);
    console.log("Question Number: " + gameProperties.questionNum);
    const accessingQuestion = onSnapshot(doc(db, "Player", "Player 2", 'Past Attempts', 'Game 1- Question ' + gameProperties.playerQuestionNumber), (doc) => {
        console.log('Test');
        let question = document.createElement('body');
        question.textContent = doc.data().Question;
        //displayQuestion.append((gameProperties.playerQuestionNumber), question);
        console.log("Question: " + gameProperties.questionsDisplayed);
        document.getElementById("display-question").innerHTML = gameProperties.playerQuestionNumber + ": " + doc.data().Question;
    })
}

function randomNumberGenerator(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.floor(randomNum);
}

function checkingAnswer(gameProperties) {
    const accessingQuestion = onSnapshot(doc(db, "Questions", gameProperties.topic, gameProperties.difficulty, '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum), (doc) => {
        let question = document.createElement('body');
        question = doc.data().Question;
    })
}

function scoringSystem(gameProperties) {
    const accessingQuestion = onSnapshot(doc(db, "Questions", gameProperties.topic, gameProperties.difficulty, '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum), (doc) => {
    })
}

function checkSolution() {
    const accessingHint = onSnapshot(doc(db, "Questions", gameProperties.topic, gameProperties.difficulty, '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum), (doc) => {
        userCode = doc.data().Solution;
    })
}

function recordTag() {

}

scoringSystem(gameProperties);
if (gameProperties.start === 1) {
    checkScoreAndDisplayQuestions(gameProperties);
    outputQuestion(gameProperties);
    gameProperties.start++;
    // checkingAnswer(gameProperties);
}

nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    gameProperties.playerQuestionNumber++;
    gameProperties.showHint = 0;
    console.log("");
    // show(importantData,gameProperties);
    checkScoreAndDisplayQuestions(gameProperties);
    outputQuestion(gameProperties);


    // Unity Call

});

hintButton.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gameProperties.showHint === 0) {
        const accessingHint = onSnapshot(doc(db, "Player", "Player 2", 'Past Attempts', 'Game 1- Question ' + gameProperties.playerQuestionNumber), (doc) => {
            let hint = document.createElement('body');
            hint.textContent = doc.data().Hint;
            displayQuestion.append(hint);
        })
        gameProperties.showHint++;
    }
});

finishButton.addEventListener('submit', (e) => {
    e.preventDefault();
});

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("game-end");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}