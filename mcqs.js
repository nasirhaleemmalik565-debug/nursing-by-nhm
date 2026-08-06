let questions = [

{
question:"Which vitamin deficiency causes Night Blindness?",
options:[
{text:"Vitamin A",correct:true},
{text:"Vitamin C",correct:false},
{text:"Vitamin D",correct:false},
{text:"Vitamin K",correct:false}
]
},

{
question:"Normal adult respiratory rate is:",
options:[
{text:"8–12/min",correct:false},
{text:"12–20/min",correct:true},
{text:"20–28/min",correct:false},
{text:"24–30/min",correct:false}
]
},

{
question:"Which chamber of the heart has the thickest wall?",
options:[
{text:"Right Atrium",correct:false},
{text:"Left Atrium",correct:false},
{text:"Right Ventricle",correct:false},
{text:"Left Ventricle",correct:true}
]
},

{
question:"The antidote for Heparin is:",
options:[
{text:"Vitamin K",correct:false},
{text:"Protamine Sulfate",correct:true},
{text:"Atropine",correct:false},
{text:"Naloxone",correct:false}
]
},

{
question:"Normal blood pH is:",
options:[
{text:"7.15–7.25",correct:false},
{text:"7.25–7.35",correct:false},
{text:"7.35–7.45",correct:true},
{text:"7.45–7.55",correct:false}
]
},

{
question:"Drug of choice for Anaphylaxis is:",
options:[
{text:"Hydrocortisone",correct:false},
{text:"Atropine",correct:false},
{text:"Adrenaline",correct:true},
{text:"Dopamine",correct:false}
]
},

{
question:"Normal adult pulse rate is:",
options:[
{text:"40–60/min",correct:false},
{text:"60–100/min",correct:true},
{text:"100–120/min",correct:false},
{text:"120–140/min",correct:false}
]
},

{
question:"The universal donor blood group is:",
options:[
{text:"A+",correct:false},
{text:"B+",correct:false},
{text:"AB+",correct:false},
{text:"O Negative",correct:true}
]
},

{
question:"The first heart sound (S1) is produced by closure of:",
options:[
{text:"Aortic & Pulmonary valves",correct:false},
{text:"Mitral & Tricuspid valves",correct:true},
{text:"Aortic valve only",correct:false},
{text:"Pulmonary valve only",correct:false}
]
},

{
question:"Which vitamin deficiency causes Scurvy?",
options:[
{text:"Vitamin A",correct:false},
{text:"Vitamin C",correct:true},
{text:"Vitamin D",correct:false},
{text:"Vitamin K",correct:false}
]
}

];

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
function shuffle(array){

for(let i=array.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[array[i],array[j]]=[array[j],array[i]];

}

return array;

}

shuffle(questions);

function loadQuestion(){

selected=-1;

result.innerHTML="";

result.style.color="black";

nextBtn.style.display="none";

progressText.innerHTML=
"Question "+(current+1)+" / "+questions.length;

progressFill.style.width=
((current+1)/questions.length*100)+"%";

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