//define the variable from the html that we need to target

var quizContainer = document.querySelector("#quizContainer");
var timerElement = document.querySelector(".timerCount");
var startButton = document.querySelector("#startBtn");
var homeContainer = document.querySelector('#home');
var highScoreLink = document.querySelector('.highScore');

var timerCount= 15;
var currentQuestionIndex= 0; 

//define question
var question = [
    {
        title: '1. Which of the following is NOT a JS Type?',
        alternative: ['String', 'Boolean', 'Body'],
        correctAnswer: 2
    }
    ,
    {
        title: "2. Which Javascript syntax is incorrect?",
        alternative: ["var timerCount;","(.timerCount)","timerCount = 0;" ],
        correctAnswer: 1
    },     
    {
        title: "3. Inside which HTML element do we put the JavaScript? ",
        alternative: ["<script>","<javascript>","<js>" ],
        correctAnswer: 0
    }     
];
console.log(question);

//target the start button so that the quiz begins
//once the button is clicked - the first question populates within the quiz window 

function startQuiz() {
    homeContainer.style.display = "none"; 
    quizContainer.style.display = "block";
    yourNextButton.style.display = "block";
    startTimer();
    renderQuestion();
};

startButton.addEventListener('click', startQuiz);

// Call a function to start the timer 
// Function that will display one question 
// Function that checks if the answer is wrong or correct

function startTimer (){
    var timerInterval = setInterval(function(){
        timerElement.textContent = timerCount;
        timerCount--;
        if (timerCount === -1 || question.length === currentQuestionIndex){
            clearInterval(timerInterval);
            submitScreen();
        } 
        }, 1000)
};

//display our question and populates the html elements with Javascript
function renderQuestion() {
 
    var titleDiv = document.getElementById('title');
    titleDiv.textContent = question[currentQuestionIndex].title;
    var alts = document.querySelectorAll('.alternative');
    
    alts.forEach (function (element, index) {
        element.textContent = question[currentQuestionIndex].alternative[index];
        element.addEventListener('click', checkQuestion); 
        //calling the one below for all the alternative individually so that they move into each other
    });
};

// checks the question to see if its wrong or right
function checkQuestion(event){
    var questionResponce = document.getElementById('response');
    questionResponce.textContent="";
   var htmlNum = parseInt(event.target.dataset.altnum);
   event.stopPropagation();
    console.log(htmlNum)
    console.log(event.target.dataset.altnum)
    
    if ( htmlNum === question[currentQuestionIndex].correctAnswer) {
        questionResponce.textContent = "Correct!";
        questionResponce.style.display = "block";
        questionResponce.style.color = "rgb(166, 211, 5)";
        questionResponce.style.textDecoration = "rgb(166, 211, 5) wavy 2px overline";
        console.log("correct");
    } else {
        questionResponce.textContent = "Wrong!";
        questionResponce.style.display = "block";
        questionResponce.style.color = "red";
        questionResponce.style.textDecoration = "red wavy 2px overline";
        console.log("wrong");
    }  
    
};

// create another button that clicks you into the next question 
var yourNextButton = document.querySelector('#nextBtn');

yourNextButton.addEventListener('click', function(){

   currentQuestionIndex++ 
   if (currentQuestionIndex === 3) {
    yourNextButton.style.opacity = "0.5";
    yourNextButton.disable = true;
    submitButton.style.display = "block";
    return;
    }
   renderQuestion();
})

//once youre done taking the quiz you will be taken to a final screen 
var resultsDiv = document.querySelector('#results');
var submitButton = document.querySelector('#submitBtn');

function submitScreen (){
    quizContainer.style.display = "none";
    resultsDiv.style.display = "block";
    yourNextButton.style.display = "none";
    submitButton.style.display = "none";
    renderUsersInitals();
    
};

submitButton.addEventListener('click', submitScreen);

// local storage 

var userInitialSpan = document.querySelector('#userId');
var formLogButton = document.querySelector("#formSubmit");
var msgDiv = document.querySelector("#msg");

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }

function renderUsersInitals(){
    var userContent = localStorage.getItem('initials-text');
    userInitialSpan.textContent = userContent;
    console.log(userContent);
};

formLogButton.addEventListener("click", function(event) {
    event.preventDefault();
    var inUserValue = document.querySelector('#initials-text').value;

    if (inUserValue === "") {
        displayMessage("error", "Initials cannot be left blank");
    } else {
        displayMessage("success", "Registered successfully");

     localStorage.setItem("initials-text", inUserValue);
     renderUsersInitals();
    }
});

// if user click on high score - this will show
function activateHighScore(){
    homeContainer.style.display = "none"; 
    submitScreen ()
};



highScoreLink.addEventListener("click",activateHighScore);

var restartQuizButton = document.getElementById('restartBtn');

function restartQuiz () {
    resultsDiv.style.display = "none";
    homeContainer.style.display = "block"; 
    
}

restartQuizButton.addEventListener("click", restartQuiz);

// var scores = 0;

// function renderAnswer(){
//     var scoreCount = document.getElementById('#scores');
//     scoreCount.textContent= "";
//     if (htmlNum === question[currentQuestionIndex].correctAnswer){
//         score ++;
//     } 
// }

// FUTURE FUNCTIONALITIES: 
// create a parameter that if the user gets a question wrong -10 secs are deductive from the overall time
//create a local storage function that allows the user to see their score after they submit 
// allow the user to see the previous scores or highscores 


