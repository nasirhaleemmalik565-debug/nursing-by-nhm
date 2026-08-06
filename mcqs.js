let questions = [

{
question:"Which vitamin deficiency causes Night Blindness?",
options:["Vitamin A","Vitamin C","Vitamin D","Vitamin K"],
correct:0
},

{
question:"Normal adult respiratory rate is:",
options:["8–12/min","12–20/min","20–28/min","24–30/min"],
correct:1
},

{
question:"Which chamber of the heart has the thickest wall?",
options:["Right Atrium","Left Atrium","Right Ventricle","Left Ventricle"],
correct:3
},

{
question:"The antidote for Heparin is:",
options:["Vitamin K","Protamine Sulfate","Atropine","Naloxone"],
correct:1
},

{
question:"Normal blood pH is:",
options:["7.15–7.25","7.25–7.35","7.35–7.45","7.45–7.55"],
correct:2
},

{
question:"Drug of choice for Anaphylaxis is:",
options:["Hydrocortisone","Atropine","Adrenaline","Dopamine"],
correct:2
},

{
question:"Normal adult pulse rate is:",
options:["40–60/min","60–100/min","100–120/min","120–140/min"],
correct:1
},

{
question:"The universal donor blood group is:",
options:["A+","B+","AB+","O Negative"],
correct:3
},

{
question:"The first heart sound (S1) is produced by closure of:",
options:["Aortic & Pulmonary valves","Mitral & Tricuspid valves","Aortic valve only","Pulmonary valve only"],
correct:1
},

{
question:"Which vitamin deficiency causes Scurvy?",
options:["Vitamin A","Vitamin C","Vitamin D","Vitamin K"],
correct:1
}

];

function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

let current = 0;
let score = 0;
let selected = -1;
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const progressText=document.getElementById("progressText");
const progressFill=document.getElementById("progressFill");
const timer=document.getElementById("timer");

let timeLeft=30;
let interval;

function loadQuestion(){

selected = -1;

result.innerHTML = "";
result.style.color = "black";

nextBtn.style.display = "none";

progressText.innerHTML =
"Question "+(current+1)+" / "+questions.length;

progressFill.style.width =
((current+1)/questions.length)*100+"%";

timeLeft = 30;

timer.innerHTML = "⏱️ "+timeLeft+" sec";

clearInterval(interval);

interval = setInterval(function(){

timeLeft--;

timer.innerHTML = "⏱️ "+timeLeft+" sec";

if(timeLeft<=0){

clearInterval(interval);

nextBtn.click();

}

},1000);

question.innerHTML = questions[current].question;

let shuffledOptions =
questions[current].options.map(function(text,index){

return{
text:text,
correct:index===questions[current].correct
};

});

shuffle(shuffledOptions);

options.forEach(function(option,index){

option.innerHTML =
String.fromCharCode(65+index)+". "+shuffledOptions[index].text;

option.className="option";

option.onclick=function(){

options.forEach(function(o){

o.classList.remove("selected");

});

selected=index;

option.classList.add("selected");

};

option.dataset.correct=shuffledOptions[index].correct;

});

}

shuffle(questions);

loadQuestion();

function checkAnswer(){

clearInterval(interval);

if(selected==-1){

alert("Please select an answer.");

return;

}

options.forEach(function(option){

option.onclick=null;

});

if(selected===questions[current].correct){

options[selected].classList.add("correct");

result.innerHTML="✅ Correct!";

result.style.color="green";

score++;

}
else{

options[selected].classList.add("wrong");

options[questions[current].correct].classList.add("correct");

result.innerHTML="❌ Incorrect!";

result.style.color="red";

}

nextBtn.style.display="block";

}

nextBtn.onclick=function(){

current++;

if(current<questions.length){

loadQuestion();
clearInterval(interval);

}
else{

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

<div style="text-align:center;padding:15px;">

<div style="font-size:60px;">🎉</div>

<h2 style="color:#6A1B9A;margin:10px 0;">
Quiz Completed
</h2>

<p style="font-size:20px;">Your Score</p>

<h1 style="font-size:52px;color:#6A1B9A;">
${score} / ${questions.length}
</h1>

<h2>${percentage}%</h2>

<p style="margin:20px 0;font-weight:bold;">
${message}
</p>

<button onclick="location.reload()">
🔄 Restart Quiz
</button>

<button onclick="location.href='index.html'"
style="background:#555;">
🏠 Back to Home
</button>

</div>

`;

}

};