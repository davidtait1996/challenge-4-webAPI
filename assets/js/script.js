var startButton = document.querySelector('.start');
var highScoresButton = document.querySelector('.high-score');
var timerEl = document.querySelector('.timer');
var mainEl = document.querySelector('.main');
var questionEl = document.querySelector('.question');
var answersEl = document.querySelector('.answers');
var resultEl = document.querySelector('.result');
var scoreEl = document.querySelector('.score');
var finishEl = document.querySelector('.finish');
var finishButtonEl = document.createElement("button");
var initialsEl = document.createElement("input");
var highScoresEl = document.querySelector('.high-score-screen');
var score = 0;
var currentQuestion = 0;
var timeLeft = 60;
var gameEnded = false;

var questions = [ {
  question: "What is hutch's favorite color?",
  answer: ["blue", "green", "black", "yellow"],
  correct: 0
},

{
  question: "Does hutch like wet or dry food?",
  answer: ["Wet", "Dry", "Both", "Neither"],
  correct: 1
},
{
  question: "Where does he like to sleep?",
  answer: ["Couch", "Bed", "Cat tree", "Bathroom sink"],
  correct: 1
},
{
  question: "What flavor of food does he like?",
  answer: ["Tuna", "Beef", "Salmon", "Chicken"],
  correct: 3
},
{
  question: "Where did I adopt him from?",
  answer: ["Humane Society", "Street", "Best Friends", "A friend"],
  correct: 2
}
];

var startGame = function() {
  startButton.remove();
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    if(timeLeft >= 0){
      timerEl.textContent = "Timer : " + timeLeft;
      timeLeft--;
    } else {
      clearInterval(timeInterval);
      if(gameEnded === false){
        endGame();
      }

    }
  }, 1000);

  displayQuestion(currentQuestion); 

  scoreEl.textContent = "Score: " + score;
};

var displayQuestion = function(num) {
  questionEl.classList.add("questionArea" + num);
  var questionTitleEl = document.createElement("h2");
  questionTitleEl.textContent = "Question " + (num+1) + " : " + questions[num].question + " Press on text to submit your answer.";


  for(var i=0; i < 4; i++){
    var answer = document.createElement("li");
    answer.classList.add("answer"+i);
    answer.textContent = questions[num].answer[i];
    answersEl.appendChild(answer);
  }

  questionEl.appendChild(questionTitleEl);
  questionEl.appendChild(answersEl);

}

var deleteQuiz = function(num) {
  var questionChildCount = questionEl.childElementCount;
  for(var i=0; i < questionChildCount; i++){
    questionEl.removeChild(questionEl.childNodes[0]);
  }

  var answersChildCount = answersEl.childElementCount;
  if(num === 0){
    answersEl.removeChild(answersEl.childNodes[0]);
  }
  for(var j=0; j < answersChildCount; j++){
    answersEl.removeChild(answersEl.childNodes[0]);
  }

  questionEl.classList.remove("questionArea"+num);
}

var clearScreen = function() {
  questionEl.remove();
  answersEl.remove();
  timerEl.remove();
  resultEl.remove();
  scoreEl.remove();
}

var endGame = function() {

  clearScreen();

  if(localStorage.getItem("highScore") === null){
    var currentHighScore = 0;
  } else {
    var currentHighScore = localStorage.getItem("highScore");
  }


  var finishTitleEl = document.createElement("h2");
  finishTitleEl.textContent = "All done!";
  var finishScoreEl = document.createElement("p");
  finishScoreEl.textContent = "Your ending score was " + score + ". The current high score is " + currentHighScore + ". Enter your intials to save your high score if you got a higher score.";
  var finishFormEl = document.createElement("form");
  initialsEl.setAttribute("type","text");
  
  finishButtonEl.setAttribute("class", "submitScore");
  finishButtonEl.textContent = "Submit score";


  finishFormEl.appendChild(initialsEl);

  finishEl.appendChild(finishTitleEl);
  finishEl.appendChild(finishScoreEl);
  finishEl.appendChild(finishFormEl);
  finishEl.appendChild(finishButtonEl);
}

startButton.addEventListener("click", startGame);

answersEl.addEventListener("click", function(event){  
  var element = event.target;
  if(element.getAttribute("class") === ("answer"+questions[currentQuestion].correct)){
    score += 1;
    scoreEl.textContent = "Score: " + score;
    resultEl.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    resultEl.textContent = "Wrong!";
  }

  if(currentQuestion < questions.length-1){
    deleteQuiz(currentQuestion);
    currentQuestion++;
    displayQuestion(currentQuestion);
  } else if (currentQuestion === questions.length-1) {
    endGame();
    gameEnded = true;
  }
});

finishButtonEl.addEventListener("click", function(){
  currentHighScore = localStorage.getItem("highScore");
  if(currentHighScore < score){
    localStorage.setItem("initials", initialsEl.value);
    localStorage.setItem("highScore", score);
  }

});

highScoresButton.addEventListener("click", function(){
  clearScreen();
  startButton.remove();
  finishEl.remove();

  var highScoreTitleEl = document.createElement("h2");
  highScoreTitleEl.textContent = "High Score";
  var highScoreTextEl = document.createElement("p");

  if(localStorage.getItem("highScore") === null){
    var currentHighScore = 0;
  } else {
    var currentHighScore = localStorage.getItem("highScore");
  }

  if(localStorage.getItem("initials") === null){
    var currentInitials = "No high score yet";
  } else {
    var currentInitials = localStorage.getItem("initials");
  }

  highScoreTextEl.textContent = currentInitials + ": " + currentHighScore;



  highScoresEl.appendChild(highScoreTitleEl);
  highScoresEl.appendChild(highScoreTextEl);
});