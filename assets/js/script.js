var startButton = document.querySelector('.start');
var highScoresButton = document.querySelector('.high-score');
var timerEl = document.querySelector('.timer');
var mainEl = document.querySelector('.main');
var questionEl = document.querySelector('.question');
var answersEl = document.querySelector('.answers');
var score = 0;
var currentQuestion = 0;
var timeLeft = 60;

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

    }
  }, 1000);

  displayQuestion(currentQuestion); 
};

var deleteQuiz = function(num) {
  var questionChildCount = questionEl.childElementCount;
  for(var i=0; i < questionChildCount; i++){
    questionEl.removeChild(questionEl.childNodes[0]);
    console.log(questionEl);
  }

  var answersChildCount = answersEl.childElementCount;
  if(num === 0){
    answersEl.removeChild(answersEl.childNodes[0]);
  }
  for(var j=0; j < answersChildCount; j++){
    console.log("answers childnode0", answersEl.childNodes[0]);
    answersEl.removeChild(answersEl.childNodes[0]);
  }

  questionEl.classList.remove("questionArea"+num);
}

var displayQuestion = function(num) {
  questionEl.classList.add("questionArea" + num);
  var questionTitleEl = document.createElement("h2");
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

questionEl.addEventListener("click", function(event){  
  var element = event.target;
  if(element.getAttribute("class") === ("answer"+questions[currentQuestion].correct)){
    console.log("you got the answer right");
    score += 1;
  } else {
    console.log("you got the answer wrong");
    timeLeft -= 10;
  }

  if(currentQuestion < questions.length){
    deleteQuiz(currentQuestion);
    currentQuestion++;
    displayQuestion(currentQuestion);
  }
});