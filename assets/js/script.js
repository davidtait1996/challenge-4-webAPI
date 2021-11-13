var startButton = document.querySelector('.start');
var highScoresButton = document.querySelector('.high-score');
var timerEl = document.querySelector('.timer');
var mainEl = document.querySelector('.main');
var score = 0;

var questions = [ {
  question: "What is hutch's favorite color?",
  answer: ["blue", "green", "black", "yellow"],
  correct: 0
}]

var startGame = function() {
  var timeLeft = 60;
  startButton.remove();
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    if(timeLeft >= 0){
      timerEl.textContent = "Timer : " + timeLeft;
      timeLeft--;
    } else {

    }
  }, 1000);

  displayQuestion(1);



};

var displayQuestion = function(num) {
  var questionAreaEl = document.createElement("div");
  questionAreaEl.classList.add("questionArea" + num);
  var questionTitleEl = document.createElement("h2");
  questionTitleEl.textContent = "Question " + num + " : " + questions[num-1].question;

  orderedListEl = document.createElement("ol");

  for(var i=0; i < 4; i++){
    var answer = document.createElement("li");
    answer.classList.add("answer"+i);
    answer.textContent = questions[num-1].answer[i];
    orderedListEl.appendChild(answer);
  }

  questionAreaEl.appendChild(questionTitleEl);
  questionAreaEl.appendChild(orderedListEl);
  mainEl.appendChild(questionAreaEl);

  questionAreaEl.addEventListener("click", function(event) {
    var element = event.target;
    if(element.getAttribute("class") === ("answer"+questions[num-1].correct)){
      console.log("you got the answer right");
      return true;
    } else {
      console.log("you got the answer wrong");
      return false;
      
    }
  });



  console.log(mainEl);
}



startButton.addEventListener("click", startGame);