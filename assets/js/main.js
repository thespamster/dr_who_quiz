
// game variables //

var correctPos;        // of answer //
var timeLeft;           // on timer //
var incorrectPos;      // of wrong answer //
var highlightedButton1; // turn button green //
var highlightedButton2; // turn button red //
var answerButtons;       // array of answer buttons //
var currentScore = 0;   // current score //
var highScore = 0;    // high score //
var questionsLeft = 42; // number of questions left to ask //
var questionToAsk = Math.floor(Math.random() * 42); // random start question //
var playingGame = false; // game in progress? //
var easierFlag = false;  // simplify button been clicked? //
var playSound = true;   // sound effects enabled/disabled //
var answerArray = []; // answer array //
var questionArray = []; // question array //
var displayedAnswerArray =[]; // the order that answers are displayed in //
var hideDiv = document.getElementById("answer-button-pos"); // the div that contains the answer buttons and answer spans //
var soundButton; // the sound on or off //
var startButton;  // ???? //
var quitButton; // ???? //
var previousHighScore; // if someone quits with a high score, this is the score to display //

// game sounds. royalty free. credit in readme. //

var correctAnswerSound = new Audio("assets/sounds/correct.wav");
var incorrectAnswerSound = new Audio("assets/sounds/incorrect.wav");
var standardButtonClickSound = new Audio("assets/sounds/click.wav");
var simplifyButtonSound = new Audio("assets/sounds/easy.wav");
var countdownSound = new Audio("assets/sounds/timer.wav");
var newHighScoreSound = new Audio("assets/sounds/clapping.wav");
var endGameSound = new Audio("assets/sounds/fail.wav");
var crowdBooingSound = new Audio("assets/sounds/booing.wav");

// create question array //

function createQuestionArray() {
  questionArray = [];
  fetch("./assets/questions.json")
  .then((res) => {
    return res.json();
  }).then ((jsonQuestions) => {
    questionArray = jsonQuestions;
    console.log(questionArray); // REMOVE THIS //
  })
  .catch((err) => {
    console.error(err);
  });
}

// check for high score cookie //
function checkCookie() {
  hiScoreCookie = document.cookie;
  console.log("cookie", hiScoreCookie); // REMOVE THIS //
  if (hiScoreCookie === "") {
    alert("This site uses a cookie to store your high score. Please click OK to accept this cookie and play the quiz.");
    document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
    highScore = 0;
    console.log("cookie:", hiScoreCookie); // REMOVE THIS //
  } else {
    partScoreCookie = document.cookie.split("=");
    setHiScore = partScoreCookie[1];
    console.log("setHiScore", setHiScore); // REMOVE THIS //
    getNumber = parseInt(setHiScore);
    console.log("getNumber", getNumber); // REMOVE THIS //
    highScore = getNumber;
    previousHighScore = highScore;
    console.log("previousHighScore =", previousHighScore); // REMOVE THIS //
    if (highScore < 10) {
      document.getElementById("highScore").innerHTML = "Best 0"+highScore;
    } else {
      document.getElementById("highScore").innerHTML = "Best "+highScore;
    }
  }
}

// toggle sound on/off //

function toggleSound() {
  soundButton = document.getElementById("buttonSound");
  if (playSound) {
    playSound = false;
    soundButton.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true">';
    countdownSound.pause();
    crowdBooingSound.pause();
    newHighScoreSound.pause();
  } else {
    playSound = true;
    soundButton.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>';
    if (playingGame) {
      countdownSound.play();
    }
  }
  console.log("toggleSound", playSound, "timeLeft ", timeLeft, "playingGame", playingGame); // REMOVE THIS //
}

// switch between start/quit being shown //

function startQuitDisplayed() {
  startButton = document.getElementById("buttonStart");
  quitButton = document.getElementById("buttonQuit");
  if (playingGame) {
    startButton.innerHTML = "";
    quitButton.innerHTML = "QUIT";
  } else {
    startButton.innerHTML = "START";
    quitButton.innerHTML = "";
  }
}

// set event timers for buttons //

document.querySelectorAll("button").forEach((b)=>b.addEventListener("click", answerSelected));

function answerSelected(event){
  var button = event.target;
  var buttonPressed = button.innerText;
  event.preventDefault();
  answerButtons = document.getElementsByClassName("answerButton");

  //event.target is the button that was clicked //

  console.log("js42: button pressed is", buttonPressed, playingGame, easierFlag); // REMOVE THIS //

  // what happens when the start button is clicked //

  if (buttonPressed === "START") {
    newHighScoreSound.pause();
    newHighScoreSound.currentTime = 0;
    crowdBooingSound.pause();
    crowdBooingSound.currentTime = 0;
    if (playSound) {
      standardButtonClickSound.play();
    }
    console.log("start button clicked", playingGame); // REMOVE THIS //
    if (playingGame === false) {
      hideDiv.style.visibility = "visible";
      playingGame = true;
      startQuitDisplayed();
      console.log("game started =", playingGame); // REMOVE THIS //
      setTimer();
      questionToAsk = Math.floor(Math.random() * questionsLeft);
      askQuestion();
    }

  // what happens when the simplify button is clicked //

  } else if (buttonPressed === "SIMPLIFY") {
    console.log("easier button clicked", playingGame, easierFlag, correctPos); // REMOVE THIS //
    if (playingGame && !easierFlag){ // CHANGE THIS do not need two if statements //
      if (playSound) {
        standardButtonClickSound.play();
        simplifyButtonSound.play();
      }
      easierFlag = true;
      simplifyAnswers();
    }

  // what happens when the quit button is clicked //

  } else if (buttonPressed === "QUIT") {
    if (playingGame === true) {
      playingGame = false;
      startQuitDisplayed();
      currentScore = 0;
      if (highScore > previousHighScore) {
        highScore = previousHighScore;
        if (highScore < 10) {
          document.getElementById("highScore").innerHTML = "Best 0"+highScore;
        } else {
          document.getElementById("highScore").innerHTML = "Best "+highScore;
        }
      }
      countdownSound.pause();
      countdownSound.currentTime = 0;
      crowdBooingSound.pause();
      crowdBooingSound.currentTime = 0;
      newHighScoreSound.pause();
      newHighScoreSound.currentTime = 0;
      if (playSound) {
        endGameSound.play();
      }
      playGame = false;
      timeLeft = 0;
      startButton.innerHTML = "";
      quitButton.innerHTML = "";
      setTimeout(endGame, 1500); 
    }

  // what happens when an answer button is clicked //

  } else {
    for (i=0; i<3; i++) {
      if (buttonPressed === answerButtons[i].innerText) {
        console.log("answer",answerButtons[i].innerText,"clicked",  correctPos); // REMOVE THIS //
        if (correctPos === i && playingGame) {
          incorrectPos = -1;
          if (playSound) {
            correctAnswerSound.play();
          }
          highlightAnswers();
          quitButton.innerHTML = "";
          setTimeout(contGame, 1500);
        } else if (correctPos !== i && answerArray[i] !== "" && playingGame) {
          console.log("wrong answer", answerArray[i], correctPos); // REMOVE THIS //
          incorrectPos = i;
          if (playSound) {
            incorrectAnswerSound.play();
          }
          highlightAnswers();
          playingGame = false;
          quitButton.innerHTML = "";
          setTimeout(endGame, 1500); 
        }
      }
    }
  }
}

function askQuestion() {
  correctPos = 0;
  console.log("playing game", questionsLeft, questionToAsk); // REMOVE THIS //
  if (questionsLeft > 0) {
    easierFlag = false;
    console.log("easierFlag", easierFlag); // REMOVE THIS //

    // ask a question //

    console.log("QUESTION PROBLEM IS HERE", questionToAsk); // REMOVE THIS //
    currentQuestion = document.getElementById("currentQuestion");
    currentQuestion.innerHTML = questionArray[questionToAsk].question;

    // randomise answers //

    answerArray = [];
    for (i = 0; i < 3; i++) {
      rndNum3 = Math.floor(Math.random() * 3);
      if (answerArray[rndNum3] === undefined) {
        answerArray[rndNum3] = questionArray[questionToAsk].answers[i];
        console.log("answerArray", answerArray); // REMOVE THIS //
      } else {
        i--;
      }
    }

    // get the correct answer //

    correctAnswer = questionArray[questionToAsk].answers[0];
    console.log("correctAnswer", correctAnswer); // REMOVE THIS //

    // display answers //

    displayAnswers();
    console.log("THIS ONE", correctPos); // REMOVE THIS //

    // remove asked question from array //

    questionArray.splice(questionToAsk, 1);

    //reduce number of questions left by one //

    questionsLeft --;
  } else {
    console.log("NO MORE QUESTIONS LEFT"); // REMOVE THIS //
    clearInterval(timerRunning);
    if (currentScore === 84) {
      alert("Wow, have you got access to the Matrix? You got all the questions right. You win! No need to play again.");
    }
    setInitialScreen();
    playingGame = false;
    easierFlag = false;
    questionsLeft = 42;
    questionToAsk = Math.floor(Math.random() * 42);
    currentScore = 0;
    answerArray = [];
    timeLeft = 0;
    endGame();
    console.log("resetting to allow a new game to start"); // REMOVE THIS //
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
    if (answerArray[i] === correctAnswer) {
      correctPos = i;
    }
  }
  console.log("display answers function correctPos", correctPos); // REMOVE THIS //
}

function simplifyAnswers() {
  questionToRemove = Math.floor(Math.random() * 2);
  console.log("easier button clicked", correctAnswer, "questionToRemove", questionToRemove); // REMOVE THIS //
  while (questionToRemove === correctPos) {
    questionToRemove = Math.floor(Math.random() * 2);
    console.log("questionToRemove", questionToRemove);
  }
  for (i = 0; i < 3; i++) {
    if (answerArray[i] !== correctAnswer && i === questionToRemove) {
      answerArray[i] = "";
      console.log("answerArray", answerArray); // REMOVE THIS //
    }
  }
  displayAnswers();
  console.log("simplify answers function", answerArray, correctPos); // REMOVE THIS //
}

// how the pregame screen looks after the first game has ended //

function setInitialScreen() {
  document.getElementById("currentQuestion").innerHTML = "Press Start to play or Rules for how to play the quiz.";
  document.getElementById("answerOne").innerHTML = "";
  document.getElementById("answerTwo").innerHTML = "";
  document.getElementById("answerThree").innerHTML = "";
  document.getElementById("countdownTimer").innerHTML = "00";
  document.getElementById("currentScore").innerHTML = "Score 00";
  console.log("setInitialScreen", hideDiv); // REMOVE THIS //
  hideDiv.style.visibility = "hidden";
}

// set the 30 second timer function //

function setTimer() {
  timerMusic = setTimeout(timerSound, 1000);
  timeLeft = 30;
  timerRunning = setInterval(timer, 1000);
  console.log("timer running", timerRunning);
}

function timerSound() {
  if (playSound) {
  countdownSound.play();
  }
}

// the actual timer function //

function timer() {
  if (timeLeft < 0) {
    countdownSound.pause();
    countdownSound.currentTime = 0;
    if (playSound) {
      endGameSound.play();
    }
    document.getElementById("countdownTimer").innerHTML = "00";
    playingGame = false;
    timeLeft = 0;
    // startQuitDisplayed(); //
    endGame();
  } else if (timeLeft >= 10) {
    document.getElementById("countdownTimer").innerHTML = timeLeft;
  } else {
    document.getElementById("countdownTimer").innerHTML = "0" + timeLeft;
    quitButton.innerHTML = "";
  }
  console.log(timeLeft); // REMOVE THIS //
  timeLeft --;
}

// what happens at the end of a game //

function endGame() {
  console.log("end game", timerRunning, currentScore, highScore);
  clearInterval(timerRunning);
  console.log("after clear interval", timerRunning); // REMOVE THIS //
  console.log("ENDgame function, you lose!");  // REMOVE THIS //
  console.log("ENDGAME ", currentScore, highScore); // REMOVE THIS //
  setInitialScreen();
  if (currentScore === 0) {
    document.getElementById("currentQuestion").innerHTML = "You got none right. Prepare to be taken to Shada for the rest of eternity. Or try again. It's up to you.";
    if (playSound) {
    crowdBooingSound.play();
    }
  } else if (currentScore === highScore) {
    if (playSound) {
      prevHighScore = highScore;
      newHighScoreSound.play();
    }
    document.getElementById("currentQuestion").innerHTML = "Congratulations! You have a new high score of " + currentScore + ". Play again to see if you can beat it.";
    document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
    document.cookie = "highScore="+highScore+"; expires=Sat, 23 Nov 3000 12:00:00 UTC";
  } else if (currentScore <10 && currentScore !== highScore) {
    document.getElementById("currentQuestion").innerHTML = "You scored 0"+currentScore+". You probably need to reverse the polarity of the neutron flow, or at least have another go.";
  } else if (currentScore >=10 && currentScore !== highScore) {
    document.getElementById("currentQuestion").innerHTML = "You scored "+currentScore+". Well done, worthy of a reward. Would you like a jelly baby? Press START to play again.";
  } 
  easierFlag = false;
  questionsLeft = 42;
  questionToAsk = Math.floor(Math.random() * 42);
  currentScore = 0;
  answerArray = [];
  createQuestionArray();
  setTimeout(startQuitDisplayed, 2500);
  console.log("resetting to allow a new game to start"); // REMOVE THIS //
}

function contGame() {
  if (easierFlag) {
    currentScore ++;
  } else {
    currentScore +=2;
  }
  if (currentScore > highScore) {
    highScore = currentScore;
    if (highScore < 10) {
      document.getElementById("highScore").innerHTML = "Best 0"+highScore;
    } else {
      document.getElementById("highScore").innerHTML = "Best "+highScore;
    }
  }
  console.log("current score", currentScore); // REMOVE THIS //
  scoreDisplay = document.getElementById("currentScore");
  if (currentScore < 10) {
    scoreDisplay.innerHTML = "Score 0" + currentScore;
  } else {
    scoreDisplay.innerHTML = "Score "+currentScore;
  }
  questionToAsk = Math.floor(Math.random() * questionsLeft);
  setTimer();
  askQuestion();
  quitButton.innerHTML = "QUIT";
}

// highlight correct(in green)  and incorrect(in red) answers //

function highlightAnswers() {
  countdownSound.pause();
  countdownSound.currentTime = 0;
  displayedAnswerArray = document.getElementsByClassName("answer-style");
  if (incorrectPos === -1) {
    clearInterval(timerRunning);
    displayedAnswerArray[correctPos].style.backgroundColor = "green";
    displayedAnswerArray[correctPos].style.color = "white";
    setTimeout (resetButtonColour, 1000);
  } else {
    clearInterval(timerRunning);
    displayedAnswerArray[correctPos].style.backgroundColor = "green";
    displayedAnswerArray[correctPos].style.color = "white";
    if (incorrectPos !== -1) {
    displayedAnswerArray[incorrectPos].style.backgroundColor = "red";
    displayedAnswerArray[incorrectPos].style.color = "white";
    setTimeout (resetButtonColour, 2500);
    }
  }
}

function resetButtonColour() {
  displayedAnswerArray[correctPos].style.backgroundColor = "white";
  displayedAnswerArray[correctPos].style.color = "black";
  if (incorrectPos !== -1) {
  displayedAnswerArray[incorrectPos].style.backgroundColor ="white";
  displayedAnswerArray[incorrectPos].style.color = "black";
}
}

// main game section //

function mainGameSection() {
  var rulesModal = document.getElementById("rulesModal");
  var rulesBtn = document.getElementById("buttonRules");
  var rulesSpan = document.getElementsByClassName("close")[0];
  createQuestionArray();

  // modal to display rules of the game //

  rulesBtn.onclick = function() {
    if (playSound) {
      standardButtonClickSound.play();
    }
    console.log(playingGame); // REMOVE THIS //
    if (playingGame) {
      return;
    } else {
      rulesModal.style.display = "block";
    }
    rulesSpan.onclick = function() {
      rulesModal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === rulesModal) {
        rulesModal.style.display = "none";
      }
    }
  }
}

// start the game //

setTimeout(checkCookie, 500);
hideDiv.style.visibility = "hidden";
mainGameSection();