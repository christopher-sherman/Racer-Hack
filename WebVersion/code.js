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


    var data = await response.json();
    console.log(data);
    if (response) {
        //loading screen
    }
    show(data);
}

function show(data) {

    document.getElementById("output").innerHTML = data.output; //output string
    userCode = hidden.textContent || hidden.innerText;

    if (data.output.normalize() === userCode.normalize()) //checking if string matches solution
    {
        document.getElementsByClassName("hidden2").value = "1";
        var x = document.getElementById("snackbarCorrect");
        // Add the "show" class to DIV
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 1500);
    } else {
        var x = document.getElementById("snackbarWrong");
        // Add the "show" class to DIV
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 1500);
    }
};
