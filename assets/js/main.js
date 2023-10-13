
// global variables //

var playingGame = false; // is a game in progress? //
var easierFlag = false;  // has the simplify button been clicked? //
var answerButtons;       // array of answer buttons //
var questionsLeft = 42; // number of questions left to ask //
var questionToAsk = Math.floor(Math.random() * 42); // random number to select question to be asked at start of quiz//
var currentScore = 0;   // current score //
var highScore = 0;    // high score //
let answerArray = [,,]; // initial array to hold answers //
var correctPos;        // position of correct answer in answerArray //
let questionArray = []; // array of questions //
var incorrectPos;      // position of incorrect answer in answerArray //
var highlightedButton1; // button to be highlighted when correct answer selected //
var highlightedButton2; // button to be highlighted when incorrect answer selected //

// set event timers for buttons //

document.querySelectorAll('button').forEach(b=>b.addEventListener('click', answerSelected));

    function answerSelected(event){
        event.preventDefault()
        answerButtons = document.getElementsByClassName("questionButton");

        //event.target is the button that was clicked //

        var button = event.target;
        var buttonPressed = button.innerText;
        console.log("BUTTON PRESSED is", buttonPressed, playingGame, easierFlag);

        // what happens when the start button is clicked //

        if (buttonPressed == "Start") {
            console.log("start button clicked", playingGame);
            if (playingGame == false) {
                playingGame = true;
                console.log("game started =", playingGame);
                setTimer();
                questionToAsk = Math.floor(Math.random() * questionsLeft); // random number to select question to be asked //
                askQuestion(questionArray, questionsLeft, questionToAsk);  
            }

        // what happens when the simplify button is clicked //

        } else if (buttonPressed == "Simplify") {
            console.log("easier button clicked", playingGame, easierFlag, correctPos);
            if (playingGame && !easierFlag){
                easierFlag = true;
                simplifyAnswers();
            }

        // what happens when an answer button is clicked //
    
        } else {
            for (i=0; i<3; i++) {
                if (buttonPressed == answerButtons[i].innerText) {
                    console.log("answer",answerButtons[i].innerText,"clicked",  correctPos);
                    if (correctPos == i && playingGame) {
                        incorrectPos = -1; // set incorrectPos to -1 to indicate correct answer //
                        highlightAnswers();
                        setTimeout(contGame, 1500);
                    } else if (correctPos != i && answerArray[i] != "" && playingGame) {
                        console.log("wrong answer", answerArray[i], correctPos);
                        incorrectPos = i; // set incorrectPos to i to indicate incorrect answer //
                        highlightAnswers();
                        setTimeout(endGame, 4000);
                        mainGameSection();
                    }
                }
            }
        }
    } 

// function that checks for hi-score cookie, asks for permisiion if there isn't one //

function checkCookie() {
    console.log("cookie", document.cookie);
    if (scoreCookie == "") {
        alert("This site uses a local cookie to store your high score. Please click OK to accept this cookie and play the quiz.");
        document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
        highScore = 0;
        console.log("cookie:", document.cookie);
    } else {
        scoreCookie = document.cookie.split('=');
        tempScore = scoreCookie[1];
        console.log("tempScore", tempScore);
        if ( tempScore !== undefined) {
        tS = tempScore.split(';');
        console.log("tS", tS[0]);
        console.log("cookie already set", document.cookie, "TEMP", tempScore);
        highScore = tS[0];
        if (highScore < 10) {
            document.getElementById("highScore").innerHTML = "High Score 0"+highScore;
            } else {
            document.getElementById("highScore").innerHTML = "High Score "+highScore;
            }
        } else {
        console.log("cookie set but has no value");
        highScore = 0;
        document.getElementById("highScore").innerHTML = "High Score 0"+highScore;
        document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
        }
    }   
}

function askQuestion () {
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

    displayAnswers();
    console.log("THIS ONE", correctPos);

    // remove asked question from array //

    questionArray.splice(questionToAsk, 1);

    //reduce number of questions left by one //

    questionsLeft --;
    } else {
        console.log("NO MORE QUESTIONS LEFT");
        clearInterval(timerRunning);
        if (currentScore === 84) {
            alert("Wow, have you got access to the Matrix? You got all the questions right. You win! No need to play again.");
        }
        setInitialScreen();
        if (currentScore === highScore) {
            document.getElementById("currentQuestion").innerHTML = "Congratulations, you have a new high score of " + currentScore + "! Play again to see if you can beat it.";
            document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
            document.cookie = "highScore="+highScore+"; expires=Sat, 23 Nov 3000 12:00:00 UTC";
        }
        playingGame = false; // is a game in progress? //
        easierFlag = false;  // has the simplify button been clicked? //     
        questionsLeft = 42; // number of questions left to ask //
        questionToAsk = Math.floor(Math.random() * 42); // random number to select question to be asked at start of quiz//
        currentScore = 0;   // current score //
        answerArray = [,,]; // initial array to hold answers //
        console.log("resetting to allow a new game to start");
    } 
}

function displayAnswers() {
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
}

function simplifyAnswers() {
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

displayAnswers();        
console.log("simplify answers function", answerArray, correctPos);
   
}

// how the pregame screen looks after the first game has ended //

function setInitialScreen() {
    document.getElementById("currentQuestion").innerHTML = "Press Start to play or Rules for how to play the quiz.";
    document.getElementById("answerOne").innerHTML = "";
    document.getElementById("answerTwo").innerHTML = "";
    document.getElementById("answerThree").innerHTML = "";
    document.getElementById("countdownTimer").innerHTML = "00";
    document.getElementById("currentScore").innerHTML = "Current Score 00";
    if (highScore < 10) {
        document.getElementById("highScore").innerHTML = "High Score 0"+highScore;
    } else {
        document.getElementById("highScore").innerHTML = "High Score "+highScore;
    }
    
}

// set the 30 second timer function //

function setTimer() { 
    timeLeft=30
    timerRunning = setInterval(timer, 1000);
    console.log("timer running", timerRunning); 
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
    if (currentScore === highScore) {
        document.getElementById("currentQuestion").innerHTML = "Congratulations, you have a new high score of " + currentScore + "! Play again to see if you can beat it.";
        document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
        document.cookie = "highScore="+highScore+"; expires=Sat, 23 Nov 3000 12:00:00 UTC";
    }
    
    playingGame = false; // is a game in progress? //
    easierFlag = false;  // has the simplify button been clicked? //     
    questionsLeft = 42; // number of questions left to ask //
    questionToAsk = Math.floor(Math.random() * 42); // random number to select question to be asked at start of quiz//
    currentScore = 0;   // current score //
    answerArray = [,,]; // initial array to hold answers //
    console.log("resetting to allow a new game to start");
}

function contGame() {
    if (easierFlag) {
        currentScore ++;
    } else {
        currentScore +=2;
    }
    if (currentScore > highScore) {
        highScore = currentScore;
        // document.cookie = "highScore," + highScore + "; expires=Sat, 23 Nov 9999 23:59:59 GMT; path=/"; //
        // console.log("cookie set", document.cookie); //
        if (highScore < 10) {
            document.getElementById("highScore").innerHTML = "High Score 0"+highScore;
        } else {
            document.getElementById("highScore").innerHTML = "High Score "+highScore;
        }
        
    }
    console.log("current score", currentScore);
    scoreDisplay = document.getElementById("currentScore");
    if (currentScore < 10) {
        scoreDisplay.innerHTML = "Current Score 0" + currentScore;
    } else {
        scoreDisplay.innerHTML = "Current Score "+currentScore;
    }
    questionToAsk = Math.floor(Math.random() * questionsLeft);
    setTimer();
    askQuestion();
}

// highlight correct(in green)  and incorrect(in red) answers //

function highlightAnswers() {
    if (incorrectPos == -1) {
        clearInterval(timerRunning);
        highlightedButton1 = answerButtons[correctPos]
        highlightedButton1.style.backgroundColor = "green";
        highlightedButton2 = answerButtons[correctPos]
        setTimeout (resetButtonColour, 1000);
    } else {
        clearInterval(timerRunning);
        highlightedButton1 = answerButtons[correctPos]
        highlightedButton1.style.backgroundColor = "green";
        highlightedButton2 = answerButtons[incorrectPos]
        highlightedButton2.style.backgroundColor = "red";
        setTimeout (resetButtonColour, 3000);
    }
}

function resetButtonColour() {
    highlightedButton1.style.backgroundColor = "black";
    highlightedButton2.style.backgroundColor = "black";  
}

// main game section //

function mainGameSection() {

    // array of questions and answers fetched from json file //
        
    questionArray = [];
        fetch("./assets/questions.json")
        .then(res => {
            return res.json();
        }).then (jsonQuestions => {
            questionArray = jsonQuestions;
            console.log(questionArray);
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
}

setTimeout(checkCookie, 500);
mainGameSection();