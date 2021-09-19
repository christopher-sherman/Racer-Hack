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

const displayQuestion = document.querySelector('#display-question');
const displayResults = document.querySelector('#results-page');
const nextButton = document.querySelector('#next-question');
const hintButton = document.querySelector('#show-hint');
const finishButton = document.querySelector('#game-end');
const reviewQuestions = document.querySelector('#review-questions');

let gameNum = 1;
let topicNum = 1;
let difficultyNum = 1;
let playerQuestionNumber = 1;
let showHint = 0;
let questionNum;
let topic;
let difficulty;
let checkingQuestion = [];
let questionsDisplayed = 1;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// const retrieveQns = onSnapshot(doc(db, "Questions", "Arrays", "Easy", '0' + topic + '0' + difficulty + '0' + questionNum), (doc) => {
//     console.log("Question: ", doc.data().Question);
//     question.innerHTML = "<p>" + doc.data().Question + "</p>";
// });
const retrieveAns = onSnapshot(doc(db, "Questions", "Arrays", "Easy", "010101"), (doc) => {
    //to be removed to hide answer from console
    //console.log("Answer: ", doc.data().Solution);
    hidden.innerHTML = doc.data().Solution;
});
// const q = query(collection(db, "Questions","Arrays","Easy"), where("Solution", "==", "[1,2,3,4,5,6,7,8,9]"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });
var send = hidden2.textContent || hidden2.innerText;
if (send === "1") {  //write to Firebase
    await setDoc(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + gameNum + '- Question ' + playerQuestionNumber), {
        playerAnswer: document.getElementById("codeeditor").value, //input for code editor
        playerQuestion: '0' + topicNum + '0' + difficultyNum + '0' + questionNum
    }, {merge: true});
}


// Siew Hean

function checkSoreAndDisplayQuestions() {
    const checkingScore = onSnapshot(doc(db, "Player", "Player 1"), (doc) => {
        let playerScore = doc.data().Score;
        if (playerScore < 700) {
            allocatingQuestions(1, "Easy");
        }
        if (playerScore >= 700 && playerScore < 3000) {
            allocatingQuestions(2, "Medium");
        }
        if (playerScore >= 3000) {
            allocatingQuestions(3, "Hard");
        }
    });
}

function outputQuestion() {
    checkSoreAndDisplayQuestions();
    console.log("Topic : " + topic);
    console.log("Difficulty: " + difficulty);
    console.log("Topic Number: " + topicNum);
    console.log("Difficulty Number: " + difficultyNum);
    console.log("Question Number: " + questionNum);
    const accessingQuestion = onSnapshot(doc(db, "Questions", "Arrays", "Easy", '0' + topicNum + '0' + difficultyNum + '0' + questionNum), (doc) => {
        let question = document.createElement('body');
        question.textContent = doc.data().Question;
        if (questionNum === 1)
            displayQuestion.appendChild(question);
        if (questionNum > 1) {
            displayQuestion.replaceWith(question);
        }
        console.log("Question: " + questionsDisplayed);
    })
}

function randomNumberGenerator(min, max) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.floor(randomNum);
}

function allocateTopic(num) {
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
}

function checkForDuplicates(question, checkingQuestion2) {
    let duplicates;
    let total = 0;
    do {
        duplicates = false;
        for (let i = 1; i < questionsDisplayed; i++) { // Check the for loops
            if (checkingQuestion2[i] === question) {
                duplicates = true;
                console.log(question);
                break;
            }
            console.log("Check 2");
        }
        if (duplicates === true) {
            console.log("Check 3");
            questionNum = randomNumberGenerator(1, 5);
            topicNum = randomNumberGenerator(1, 4);
            topic = allocateTopic(topicNum);
            question = '0' + topicNum + '0' + difficultyNum + '0' + questionNum;
        }
        console.log("Check 4");
        total++;
    }
    while (duplicates === true);
}

function allocatingQuestions(difficultNum, difficult) {
    topicNum = randomNumberGenerator(1, 4);
    topic = allocateTopic(topicNum);
    questionNum = randomNumberGenerator(1, 5);
    let beforeChecking = '0' + topicNum + '0' + difficultyNum + '0' + questionNum;
    if (questionsDisplayed > 1)
        checkForDuplicates(beforeChecking, checkingQuestion);
    checkingQuestion[questionsDisplayed - 1] = '0' + topicNum + '0' + difficultyNum + '0' + questionNum;
    console.log("Checking Question: " + checkingQuestion);
    difficulty = difficult;
    console.log("Score: Less than 700");
    console.log("Topic: " + topic);
    questionsDisplayed++;
}

outputQuestion();

nextButton.addEventListener('submit', (e) => {
    e.preventDefault();
    playerQuestionNumber++;
    showHint--;
    console.log("");
    outputQuestion(questionNum);
});

hintButton.addEventListener('submit', (e) => {
    e.preventDefault();
    if (showHint === 0) {
        const accessingHint = onSnapshot(doc(db, "Questions", topic, difficulty, '0' + topicNum + '0' + difficultyNum + '0' + questionNum), (doc) => {
            // let li = document.createElement('body');
            let question = document.createElement('body');
            question.textContent = doc.data().Hint;
            // li.appendChild(question);
            displayQuestion.appendChild(question);
        })
        showHint++;
    }
});

finishButton.addEventListener('submit', (e) => {
    e.preventDefault();
});

displayResults.addEventListener('submit', (e) => {
    e.preventDefault();
});

reviewQuestions.addEventListener('submit', (e) => {
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
