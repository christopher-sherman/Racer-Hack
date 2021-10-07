var importantData = {
  data: undefined,
}
let questionNumber = 1;

var userCode;
async function submitData() {
  var input = codeeditor.getValue();
  var codeinput = "";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    //   "code": "public class program{public static void main(String [] args){System.out.println(5+5+6);}}",
    //   "language": "java",
    //   "input": ""
    "clientId": "257c384d0a9dc61c4e594df248d345e9",
    "clientSecret": "6d270be2cf9ef39cae48043c15654d535c9dfc543e0f0d78e59a926b22bc8c38",
    "script": input,
    "language": "cpp",
    "versionIndex": "0",
    "stdin": codeinput
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute", requestOptions);

  // var importantData = {
  //   data: await response.json()
  // }
  importantData.data = await response.json();
  console.log(importantData.data.output);
  console.log(output);
  if (response) {
    //loading screen
  }
  show(importantData);
  // writeUserOutput(importantData, gamePryoperties)
}

// THIS FUNCTION WILL CHECK THE ANSWERS. USERCODE IS THE OUTPUT FROM THE CONSOLE
function show(importantData, userCode) {
  document.getElementById("output").innerHTML = importantData.data.output; //output string
  userCode = hidden.textContent || hidden.innerText;
  if (questionNumber === 1)
    userCode = "3,6,9,12";
  if (questionNumber === 2)
    userCode = "3";
  if (questionNumber === 3)
    userCode = "9";
  if (questionNumber === 4)
    userCode = "452.16";
  // const accessingHint = onSnapshot(doc(db, "Questions", gameProperties.topic, gameProperties.difficulty, '0' + gameProperties.topicNum + '0' + gameProperties.difficultyNum + '0' + gameProperties.questionNum), (doc) => {
  //   userCode = doc.data().Solution;
  // })


  if (importantData.data.output.normalize() === userCode.normalize()) //checking if string matches solution
  {
    console.log(importantData.data.output);
    console.log(output.data);
    document.getElementsByClassName("hidden2").value = "1";
    var x = document.getElementById("snackbarCorrect");
    // Add the "show" class to DIV
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1500);
    console.log('Yes');
    questionNumber++;
  } else {
    var x = document.getElementById("snackbarWrong");
    // Add the "show" class to DIV
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1500);
    console.log('No');
  }
}

function writeUserOutput(importantData, gameProperties) {
  console.log(importantData.data.output);
  const accessingHint = onSnapshot(doc(db, "Player", "Player 1", 'Past Attempts', 'Game ' + gameProperties.gameNum + '- Question ' + gameProperties.playerQuestionNumber), {
    playerOutput: importantData.data.output
  }, { merge: true });
}