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

function nextQuestion() {

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
        displayQuestion.append((gameProperties.playerQuestionNumber), question);
        console.log("Question: " + gameProperties.questionsDisplayed);
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

function timedCount() {
    clearTimeout(timedCount);
    clearInterval(timedCount);
    t = setTimeout(timedCount, 1000);
    // console.log(t - 28);
}

function checkSolution() {
    const accessingHint = onSnapshot(doc(db, "Questions", gameProperties.topic, gameProperties.difficulty, '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum), (doc) => {
        userCode = doc.data().Solution;
    })
}

timedCount();

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
    timedCount();
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


let Question = [];
Question[0] = ["Arrays", "Easy", "010101", "Display the following array in reverse order. [9,8,7,6,5,4,3,2,1]", "Hint: Transfer the values into a new array", "1,2,3,4,5,6,7,8,9", "Arrays", 100];
Question[1] = ["Arrays", "Easy", "010102", "Find the sum of the respective index for both of the arrays and display the result in the new array. [1,2,3,4], [2,4,6,8]", "Hint: Add up the respective index 0,1,2,3 and display the values in a new array", "3,6,9,12", "Arrays", 100];
Question[2] = ["Arrays", "Easy", "010103", "Find the largest element in the given array [1,2,3,4,5]", "Hint: Use loops and relational operators", "5", "Arrays", 100];
Question[3] = ["Arrays", "Easy", "010104", "Multiply the respective index and display the result in the new array. [1,2,3,4], [2,4,6,8]", "Hint: Multiply the respective index 0,1,2,3 and display the values in a new array", "2,8,18,32", "Arrays", 100];
Question[4] = ["Arrays", "Medium", "010201", "Calculate the average of numbers in the array [9,4,23,34,90]", "Hint: Try using a for loop to add the numbers", "32", "Arrays", 300];
Question[5] = ["Arrays", "Medium", "010202", "Print out the 3rd element in the array using a pointer [5,4,7,3,1,8]", "Hint: You can use *(number+2)", "7", "Arrays", 300];
Question[6] = ["Arrays", "Medium", "010203", "Print out the index of the value 8 in the following array [3,9,5,8,2,7]", "Hint: Use relational operators to find the value 8", "3", "Arrays", 300];
Question[7] = ["Arrays", "Medium", "010204", "Print the biggest three numbers in the following array [1,2,3,4,5]", "Hint: Compare the values with the biggest 3 array", "5", "Arrays", 300];
Question[8] = ["Arrays", "Hard", "010301", "Using a pointer, find the sum of the 3rd and 5th index in the array [10,4,7,8,2,11,4,9]", "Hint: To point to the first index, use example: *number", "19", "Arrays", 500];
Question[9] = ["Arrays", "Hard", "010302", "Sort the following array in ascending order [7,3,8,2,9,10]", "Hint: Compare the value next to each other. If needed, swap the number", "10,9,8,7,3,2", "Arrays", 500];
Question[10] = ["Arrays", "Hard", "010303", "Pass the following array into a function and print the largest number of the array [4,5,6,7,8,9]", "Hint: You can pass the array directly into a function", "9", "Arrays", 500];
Question[11] = ["Arrays", "Hard", "010304", "Sort the array in ascending order using bubble sort [10,9,8,7,6]", "Hint: Compare the values next to each other and swap if needed", "6,7,8,9,10", "Arrays", 500];
Question[12] = ["Functions", "Easy", "020101", "Program to find the size of int, float, double and char within a function and print out the values within the function","Hint: Use the sizeof operator to find out the size","4","Functions",100];
Question[13] = ["Functions", "Easy", "020102", "Display prime numbers between two intervals 9 to 48 using functions and print out the values within the function","Hint: Find out which numbers are prime using relational operators","11,13,17,19,23,29,31,37,41,43,47","Functions",100];
Question[14] = ["Functions", "Easy", "020103", "Program a function to find the remainder of 48 when divided by 5 within a function and print out the values within the function","Hint: Initialize 2 variables to store the values of the remainder","3","Functions",100];
Question[15] = ["Functions", "Easy", "020104", "Check whether 89 is a prime number by creating a function and print out from that function. Print true if 89 is a prime number and false if it is not","Hint: Set the function to be void and print out the result","True","Functions",100];
Question[16] = ["Functions", "Medium", "020201", "Pass in the numbers 5, 10, 89 into a function and return the value of the smallest number","Hint: Use the correct return type","5","Functions",300];
Question[17] = ["Functions", "Medium", "020202", 1,2,3,"Functions",300];
Question[18] = ["Functions", "Medium", "020203", 1,2,3,"Functions",300];
Question[19] = ["Functions", "Medium", "020204", 1,2,3,"Functions",300];
Question[20] = ["Functions", "Hard", "020301", 1,2,3,"Functions",500];
Question[21] = ["Functions", "Hard", "020302", 1,2,3,"Functions",500];
Question[22] = ["Functions", "Hard", "020303", 1,2,3,"Functions",500];
Question[23] = ["Functions", "Hard", "020304", 1,2,3,"Functions",500];
Question[24] = ["Operators", "Easy", "030101", "Program to find the size of int, float, double and char within a function and print out the values within the function","Hint: Use the sizeof operator to find out the size","4","Operators",100];
Question[25] = ["Operators", "Easy", "030102", "Display prime numbers between two intervals 9 to 48 using functions and print out the values within the function","Hint: Find out which numbers are prime using relational operators","11,13,17,19,23,29,31,37,41,43,47","Operators",100];
Question[26] = ["Operators", "Easy", "030103", "Program a function to find the remainder of 48 when divided by 5 within a function and print out the values within the function","Hint: Initialize 2 variables to store the values of the remainder","3","Operators",100];
Question[27] = ["Operators", "Easy", "030104", "Check whether 89 is a prime number by creating a function and print out from that function. Print true if 89 is a prime number and false if it is not","Hint: Set the function to be void and print out the result","True","Operators",100];
Question[28] = ["Operators", "Medium", "030201", "Pass in the numbers 5, 10, 89 into a function and return the value of the smallest number","Hint: Use the correct return type","5","Operators",300];
Question[29] = ["Operators", "Medium", "030202", 1,2,3,"Operators",300];
Question[30] = ["Operators", "Medium", "030203", 1,2,3,"Operators",300];
Question[31] = ["Operators", "Medium", "030204", 1,2,3,"Operators",300];
Question[32] = ["Operators", "Hard", "030301", 1,2,3,"Operators",500];
Question[33] = ["Operators", "Hard", "030302", 1,2,3,"Operators",500];
Question[34] = ["Operators", "Hard", "030303", 1,2,3,"Operators",500];
Question[35] = ["Operators", "Hard", "030304", 1,2,3,"Operators",500];