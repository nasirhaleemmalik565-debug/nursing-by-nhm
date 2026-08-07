// =======================================
// DAILY MCQs v3.0
// Nursing by NHM
// =======================================

// ---------- SETTINGS ----------

const QUESTIONS_PER_DAY = 10;

const today = new Date().toDateString();

let quizDay =
Number(localStorage.getItem("quizDay")) || 1;

let lastCompletedDate =
localStorage.getItem("lastCompletedDate");

const totalQuizDays =
Math.ceil(questionBank.length / QUESTIONS_PER_DAY);

// ---------- NEXT QUIZ DAY ----------

if(
lastCompletedDate &&
lastCompletedDate !== today
){

quizDay++;

if(quizDay > totalQuizDays){

quizDay = 1;

}

localStorage.setItem(
"quizDay",
quizDay
);

localStorage.removeItem(
"lastCompletedDate"
);

}

// ---------- TODAY'S QUESTIONS ----------

let startIndex =
(quizDay-1) * QUESTIONS_PER_DAY;

let endIndex =
startIndex + QUESTIONS_PER_DAY;

let questions =
questionBank.slice(
startIndex,
endIndex
);

if(questions.length===0){

quizDay = 1;

localStorage.setItem(
"quizDay",
1
);

questions =
questionBank.slice(
0,
QUESTIONS_PER_DAY
);

}

// ---------- POPUP ----------

function shouldShowPopup(){

return localStorage.getItem(
"lastCompletedDate"
)===today;

}

// ---------- VARIABLES ----------

let current = 0;

let score = 0;

let selected = -1;

let timer;

let timerValue = 30;

let answered = false;

// ---------- ELEMENTS ----------

const question =
document.getElementById("question");

const options =
document.querySelectorAll(".option");

const result =
document.getElementById("result");

const progressText =
document.getElementById("progressText");

const progressFill =
document.getElementById("progressFill");

const timerBox =
document.getElementById("timer");

const quizDayBox =
document.getElementById("quizDay");

// ---------- NEXT QUESTION ----------

function nextQuestion(){

current++;

if(current < questions.length){

loadQuestion();

}
else{

showResult();

}

}

// =======================================
// LOAD QUESTION
// =======================================

function loadQuestion(){

clearInterval(timer);

answered = false;

selected = -1;

timerValue = 30;

result.innerHTML = "";

progressText.innerHTML =
"Question " +
(current + 1) +
" / " +
questions.length;

progressFill.style.width =
((current + 1) / questions.length * 100) + "%";

quizDayBox.innerHTML =
"🟣 Quiz Day " + quizDay;

question.innerHTML =
questions[current].question;

// Reset Timer Style

timerBox.style.animation = "none";

timerBox.style.color = "#D32F2F";

timerBox.innerHTML =
"⏱️ " + timerValue + " sec";

// Load Options

options.forEach(function(option,index){

option.className = "option";

option.style.pointerEvents = "auto";

option.innerHTML =
String.fromCharCode(65 + index) +
". " +
questions[current].options[index].text;

option.dataset.correct =
questions[current].options[index].correct;

option.onclick = function(){

if(answered){

return;

}

answered = true;

selected = index;

options.forEach(function(o){

o.style.pointerEvents = "none";

});

checkAnswer();

};

});

// =======================
// TIMER
// =======================

timer = setInterval(function(){

timerValue--;

timerBox.innerHTML =
"⏱️ " +
timerValue +
" sec";

// Last 5 Seconds

if(timerValue <= 5){

timerBox.style.color = "#FF9800";

}

// Last 3 Seconds

if(timerValue <= 3){

timerBox.style.color = "#F44336";

timerBox.style.animation =
"blink .8s infinite";

}

// Time Up

if(timerValue <= 0){

clearInterval(timer);

answered = true;

timerBox.innerHTML =
"⏰ Time's Up!";

result.innerHTML =
"⏰ No Answer Selected";

result.style.color =
"#F44336";

options.forEach(function(o){

o.style.pointerEvents = "none";

});

setTimeout(function(){

nextQuestion();

},1000);

}

},1000);

}

// =======================================
// CHECK ANSWER
// =======================================

function checkAnswer(){

clearInterval(timer);

if(selected==-1){

return;

}

if(
questions[current]
.options[selected]
.correct
){

options[selected]
.classList.add("correct");

result.innerHTML =
"✅ Correct!";

result.style.color =
"#2E7D32";

score++;

}
else{

options[selected]
.classList.add("wrong");

options.forEach(function(option,index){

if(
questions[current]
.options[index]
.correct
){

option.classList.add("correct");

}

});

result.innerHTML =
"❌ Incorrect!";

result.style.color =
"#C62828";

}

// Auto Next

setTimeout(function(){

nextQuestion();

},1800);

}

// =======================================
// RESULT SCREEN
// =======================================

function showResult(){

localStorage.setItem(
"lastCompletedDate",
today
);

let percentage =
Math.round(
(score/questions.length)*100
);

let message="";

if(percentage>=80){

message="🌟 Excellent!";

}
else if(percentage>=60){

message="👏 Good Job!";

}
else if(percentage>=40){

message="📚 Keep Practicing!";

}
else{

message="💪 Revise & Try Again!";

}

document.querySelector(".card").innerHTML=`

<div style="text-align:center;padding:20px;">

<div style="font-size:70px;">
🎉
</div>

<h2 style="color:#6A1B9A;margin:12px 0;">
Quiz Completed
</h2>

<p style="font-size:19px;">
Your Score
</p>

<h1 style="font-size:55px;color:#6A1B9A;">
${score} / ${questions.length}
</h1>

<h2 style="margin:12px 0;">
${percentage}%
</h2>

<p style="font-size:20px;font-weight:bold;margin-bottom:22px;">
${message}
</p>

<button onclick="location.reload()">
🔁 Restart Quiz
</button>

<button
onclick="location.href='index.html'"
style="background:#555;">
🏠 Back to Home
</button>

</div>

`;

}

// =======================================
// START AGAIN
// =======================================

function startAgain(){

document.getElementById(
"attemptPopup"
).style.display="none";

current=0;

score=0;

selected=-1;

answered=false;

loadQuestion();

}

// =======================================
// PAGE LOAD
// =======================================

window.onload=function(){

if(shouldShowPopup()){

document.getElementById(
"attemptPopup"
).style.display="flex";

}
else{

loadQuestion();

}

};

