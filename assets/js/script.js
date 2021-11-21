var startButton = document.querySelector('.start');
var highScoresButton = document.querySelector('.high-score');
var timerEl = document.querySelector('.timer');
var mainEl = document.querySelector('.main');
var questionEl = document.querySelector('.question');
var answersEl = document.querySelector('.answers');
var resultEl = document.querySelector('.result');
var scoreEl = document.querySelector('.score');
var score = 0;
var currentQuestion = 0;
var timeLeft = 20;

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
  question: "What is hutch's favorite color?",
  answer: ["blue", "green", "black", "yellow"],
  correct: 0
},
{
  question: "Does hutch like wet or dry food?",
  answer: ["Wet", "Dry", "Both", "Neither"],
  correct: 1
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
      timerEl.remove();
    }
  }, 1000);

  displayQuestion(currentQuestion); 

  scoreEl.textContent = "Score: " + score;
};

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

var displayQuestion = function(num) {
  questionEl.classList.add("questionArea" + num);
  var questionTitleEl = document.createElement("h2");
  console.log(num);
  questionTitleEl.textContent = "Question " + (num+1) + " : " + questions[num].question;


  for(var i=0; i < 4; i++){
    var answer = document.createElement("li");
    answer.classList.add("answer"+i);
    answer.textContent = questions[num].answer[i];
    answersEl.appendChild(answer);
  }

  questionEl.appendChild(questionTitleEl);
  questionEl.appendChild(answersEl);

}



startButton.addEventListener("click", startGame);

answersEl.addEventListener("click", function(event){  
  var element = event.target;
  if(element.getAttribute("class") === ("answer"+questions[currentQuestion].correct)){
    console.log("you got the answer right");
    score += 1;
    scoreEl.textContent = "Score: " + score;
    resultEl.textContent = "You got the answer right";
  } else {
    console.log("you got the answer wrong");
    timeLeft -= 10;
    resultEl.textContent = "You got the answer wrong";
  }
  console.log(score);


  console.log("length", questions.length);
  if(currentQuestion < questions.length-1){
    deleteQuiz(currentQuestion);
    currentQuestion++;
    console.log("current question", currentQuestion);
    displayQuestion(currentQuestion);
  } else if ((currentQuestion === questions.length-1) || (timeLeft === 0)) {
    localStorage.setItem("highScore", score);
    questionEl.remove();
    answersEl.remove();
    timerEl.remove();
  }
});