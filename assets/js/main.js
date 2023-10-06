
// function that checks for hi-score cookie, asks for permisiion if there isn't one //

function checkCookie() {
    var scoreCookie = document.cookie;
    if (scoreCookie == "") {
        alert("This site uses a cookie to store your high score. Please click OK to accept this cookie and play the quiz.");
        document.cookie = "highScore=0; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        console.log("cookie:", scoreCookie);
    } else {
        console.log("cookie already set", scoreCookie);
        document.cookie = "highScore=0; expires=Sat, 23 Nov 1963 23:59:59 GMT; path=/";
    }
}

function askQuestion (questionArray, questionsLeft, questionToAsk) {
    
    correctPos = 0;
    console.log("playing game", questionsLeft, questionToAsk);
    if (questionsLeft > 0) {
        easierFlag = false;
        console.log("easierFlag", easierFlag);
   
    // ask a question //

    currentQuestion = document.getElementById("currentQuestion");
    currentQuestion.innerHTML = questionArray[questionToAsk].question;
    
    // randomise answers //

    answerArray = [,,];
    for (i = 0; i < 3; i++) {
        rndNum3 = Math.floor(Math.random() * 3);
        if (answerArray[rndNum3] == undefined) {
            answerArray[rndNum3] = questionArray[questionToAsk].answers[i];
            console.log("answerArray", answerArray);
        } else {
            i--;
        }
    }

    // get the correct answer //

    correctAnswer = questionArray[questionToAsk].answers[0];
    console.log("correctAnswer", correctAnswer);

    // display answers //

    correctPos = displayAnswers(answerArray, correctPos);
    console.log("THIS ONE", correctPos);

    // remove asked question from array //

    questionArray.splice(questionToAsk, 1);

    //reduce number of questions left by one //

    questionsLeft --;
}
return correctPos;
} 

function displayAnswers(answerArray, correctPos) {
    answerOne = document.getElementById("answerOne");
    answerTwo = document.getElementById("answerTwo");
    answerThree = document.getElementById("answerThree");
    answerOne.innerHTML = answerArray[0];
    answerTwo.innerHTML = answerArray[1];
    answerThree.innerHTML = answerArray[2];
    for (i=0; i < 3; i++) {
        if (answerArray[i] == correctAnswer) {
            correctPos = i;
        }
    }
    console.log("display answers function correctPos", correctPos);
    return correctPos;
}

function simplifyAnswers(correctPos) {
    
            questionToRemove = Math.floor(Math.random() * 2);
            console.log("easier button clicked", correctAnswer, "questionToRemove", questionToRemove);
            while (questionToRemove == correctPos) {
                questionToRemove = Math.floor(Math.random() * 2);
                console.log("questionToRemove", questionToRemove);
            }
            
            for (i = 0; i < 3; i++) {
                if (answerArray[i] != correctAnswer && i == questionToRemove) {
                    answerArray[i] = "";
                    console.log("answerArray", answerArray);
                }
            }

    correctPos = displayAnswers(answerArray, correctPos);        
    console.log("simplify answers function", answerArray, correctPos);
    return answerArray;
}

function setInitialScreen() {
    document.getElementById("currentQuestion").innerHTML = "Press Start to play or Rules for how to play the quiz.";
    document.getElementById("answerOne").innerHTML = "";
    document.getElementById("answerTwo").innerHTML = "";
    document.getElementById("answerThree").innerHTML = "";
    document.getElementById("countdownTimer").innerHTML = "00";
    document.getElementById("currentScore").innerHTML = "00";
    document.getElementById("highScore").innerHTML = document.cookie;
}

// set the 30 second timer function //

function setTimer() { 
    timeLeft=30
    timerRunning = setInterval(timer, 1000);
}

// the actual timer function //
function timer() {
    if (timeLeft <0) {
        document.getElementById("countdownTimer").innerHTML = "00";
        endGame();

    } else if (timeLeft >= 10) {
        document.getElementById("countdownTimer").innerHTML = timeLeft;
    } else {
        document.getElementById("countdownTimer").innerHTML = "0" + timeLeft;
    }
    console.log(timeLeft);
    timeLeft --;
}

// end game function //

function endGame() {
    console.log("end game", timerRunning);
    clearInterval(timerRunning);
    console.log("after clear interval", timerRunning);
    console.log("endgame function, you lose!"); 
    setInitialScreen();
    playQuiz(true);
}

function playQuiz(playingGame) {
    
    console.log("playQuiz function", playingGame);
    if (playingGame) {
        console.log("clearing event listeners!!!!");
        document.querySelectorAll('button').forEach(b=>b.removeEventListener('click', answerSelected));
    }

    // variables defined before game starts //

    var playingGame = false; // is a game in progress? //
    var easierFlag = false;  // has the simplify button been clicked? //
    var answerButtons;       // array of answer buttons //
            // sets the timer running //
    var questionsLeft = 42; // number of questions left to ask //
    var questionToAsk = Math.floor(Math.random() * 42); // random number to select question to be asked at start of quiz//
    var currentScore = 0;   // current score //
    var highScore = 0;    // high score //
    var answerArray = [,,]; // initial array to hold answers //
    var correctPos;        // position of correct answer in answerArray //
    
    // array of questions and answers fetched from json file //

    let questionArray = [];
    fetch("./assets/questions.json")
    .then(res => {
        return res.json();
    }).then (jsonQuestions => {
        console.log(jsonQuestions);
        questionArray = jsonQuestions;
    })
    .catch(err => {
        console.error(err);
    });
    
    // modal to display rules of the game //

    var rulesModal = document.getElementById("rulesModal");
    var rulesBtn = document.getElementById("buttonRules");
    var rulesSpan = document.getElementsByClassName("close")[0];
    rulesBtn.onclick = function() {
    console.log(playingGame);
    if (playingGame) {
        return;
    } else {
        rulesModal.style.display = "block";
    }
    
    rulesSpan.onclick = function() {
        rulesModal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == rulesModal) {
            rulesModal.style.display = "none";
            }
        }
    }

    document.querySelectorAll('button').forEach(b=>b.addEventListener('click', answerSelected));

    

    function answerSelected(event){
        answerButtons = document.getElementsByClassName("questionButton");

        //event.target is the button that was clicked //

        var button = event.target;
        var buttonPressed = button.innerText;

        // what happens when the start button is clicked //

        if (buttonPressed == "Start") {
            console.log("start button clicked", playingGame);
            if (playingGame == false) {
                playingGame = true;
                console.log("game started =", playingGame);
                setTimer();
                questionToAsk = Math.floor(Math.random() * questionsLeft); // random number to select question to be asked //
                correctPos = askQuestion(questionArray, questionsLeft, questionToAsk);
                
            }

        // what happens when the simplify button is clicked //

        } else if (buttonPressed == "Simplify") {
            console.log("easier button clicked", playingGame, easierFlag, correctPos);
            if (playingGame && !easierFlag){
                easierFlag = true;
                answerArray = simplifyAnswers(correctPos);
            }

        // what happens when an answer button is clicked //
    
        } else {
            for (i=0; i<3; i++) {
                if (buttonPressed == answerButtons[i].innerText) {
                    console.log("answer",answerButtons[i].innerText,"clicked",  correctPos);
                    if (correctPos == i && playingGame) {
                        currentScore ++;
                        console.log("correct answer", currentScore);
                        contGame();
                    } else if (correctPos != i && answerArray[i] != "" && playingGame) {
                        console.log("wrong answer", answerArray[i], correctPos);
                        endGame();
                    }
                }
            }
        }
    } 

    

}


const pause = setTimeout(checkCookie, 500);
setInitialScreen();
playQuiz();