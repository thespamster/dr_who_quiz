
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

function askQuestion() {
    console.log("ask question function");

}

function playQuiz() {

    // variables defined before game starts //

    var playingGame = false; // is a game in progress? //
    var answerButtons;       // array of answer buttons //
    var timeLeft;            // time left on the timer //
    var timerRunning;        // sets the timer running //
    var questionsLeft = 42;
    var questionToAsk = Math.floor(Math.random() * 42);
    var currentScore = 0;
    var highScore = 0;

    // array of questions and answers fetched from json file //

    let questionArray = [];
    fetch("./assets/questions.json")
    .then(res => {
        return res.json();
    }).then (jsonQuestions => {
        console.log(jsonQuestions);
        questionArray = jsonQuestions;
        console.log(questionArray[41].question, questionArray[41].answers[0]);
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
                askQuestion();
            }

        // what happens when the simplify button is clicked //

        } else if (buttonPressed == "Simplify") {
            console.log("easier button clicked");
            if (playingGame) {
                simplifyAnswers();
            }

        // what happens when an answer button is clicked //
    
        } else {
            for (i=0; i<3; i++) {
                if (buttonPressed == answerButtons[i].innerText) {
                    console.log("answer",answerButtons[i].innerText,"clicked");
                }
            }
        }
    }

    // set the 30 second timer function //

    function setTimer() {
        timeLeft = 30; 
        timerRunning = setInterval(timer, 1000);
    }

    // the actual timer function //
    function timer() {
        if (timeLeft == -1) {
            document.getElementById("countdownTimer").innerHTML = "00";
            clearInterval(timerRunning);
            endGame();
    
        } else if (timeLeft >= 10) {
            document.getElementById("countdownTimer").innerHTML = timeLeft;
        } else {
            document.getElementById("countdownTimer").innerHTML = "0" + timeLeft;
        }
        console.log(timeLeft);
        timeLeft --;
    }

    // simplifies answers by removing one incorrect answer //

    function simplifyAnswers() {
        console.log("simplify answers function");
    }

    // end game function //

    function endGame() {
        playingGame = false;
        console.log("game over loser");  
    }

}


const pause = setTimeout(checkCookie, 500);
playQuiz();