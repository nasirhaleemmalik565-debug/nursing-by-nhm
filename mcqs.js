
// Daily Quiz Settings

const QUESTIONS_PER_DAY = 10;

// Quiz Day
const today = new Date().toDateString();

let quizDay = Number(localStorage.getItem("quizDay")) || 1;

let lastCompletedDate =
localStorage.getItem("lastCompletedDate");

if(lastCompletedDate && lastCompletedDate !== today){

quizDay++;

if(quizDay > Math.ceil(questionBank.length / QUESTIONS_PER_DAY)){

quizDay = 1;

}

localStorage.setItem("quizDay",quizDay);

localStorage.removeItem("lastCompletedDate");

}
// Starting Question
let startIndex = (quizDay - 1) * QUESTIONS_PER_DAY;

// Ending Question
let endIndex = startIndex + QUESTIONS_PER_DAY;

// Daily Questions
let questions = questionBank.slice(startIndex, endIndex);

// Safety Check
if(questions.length === 0){

quizDay = 1;

localStorage.setItem("quizDay",1);

startIndex = 0;

endIndex = QUESTIONS_PER_DAY;

questions = questionBank.slice(startIndex,endIndex);

}

let current=0;
let score=0;
let selected=-1;
let timerValue=30;
let timer;

const question=document.getElementById("question");
const options=document.querySelectorAll(".option");
const result=document.getElementById("result");
const nextBtn=document.getElementById("nextBtn");
const progressText=document.getElementById("progressText");
const progressFill=document.getElementById("progressFill");
const timerBox=document.getElementById("timer");
const quizDayBox=document.getElementById("quizDay");

function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

function loadQuestion(){

selected=-1;

result.innerHTML="";

result.style.color="black";

nextBtn.style.display="none";

progressText.innerHTML=
"Question "+(current+1)+" / "+questions.length;

progressFill.style.width=
((current+1)/questions.length*100)+"%";

quizDayBox.innerHTML="🟣 Quiz Day "+quizDay;
question.innerHTML=questions[current].question;

options.forEach(function(option,index){

option.className="option";

option.innerHTML=
String.fromCharCode(65+index)+". "+questions[current].options[index].text;

option.dataset.correct=questions[current].options[index].correct;
option.onclick=function(){

options.forEach(function(o){

o.classList.remove("selected");

});

selected=index;

option.classList.add("selected");

};

});

clearInterval(timer);

timerValue=30;

timerBox.innerHTML="⏱️ "+timerValue+" sec";

timer=setInterval(function(){

timerValue--;

timerBox.innerHTML="⏱️ "+timerValue+" sec";

if(timerValue<=0){

clearInterval(timer);

checkAnswer();

}

},1000);

}

function checkAnswer(){

clearInterval(timer);

if(selected==-1){

alert("Please select an answer.");

loadQuestion();

return;

}

if(options[selected].dataset.correct=="true"){

options[selected].classList.add("correct");

result.innerHTML="✅ Correct!";

result.style.color="green";

score++;

}
else{

options[selected].classList.add("wrong");

options.forEach(function(option){

if(option.dataset.correct=="true"){

option.classList.add("correct");

}

});

result.innerHTML="❌ Incorrect!";

result.style.color="red";

}

nextBtn.style.display="block";

}

nextBtn.onclick=function(){

current++;

if(current<questions.length){

loadQuestion();

}
else{
localStorage.setItem("lastCompletedDate",today);
let percentage=Math.round((score/questions.length)*100);

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

<div style="font-size:60px;">🎉</div>

<h2 style="color:#6A1B9A;margin:10px 0;">
Quiz Completed
</h2>

<p style="font-size:20px;">
Your Score
</p>

<h1 style="font-size:52px;color:#6A1B9A;">
${score} / ${questions.length}
</h1>

<h2 style="margin:10px 0;">
${percentage}%
</h2>

<p style="font-size:20px;font-weight:bold;margin-bottom:25px;">
${message}
</p>

<button onclick="location.reload()">
Restart Quiz
</button>

<button
onclick="location.href='index.html'"
style="background:#555;">
Back to Home
</button>

</div>

`;

}

};

loadQuestion();