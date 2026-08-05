document.addEventListener("DOMContentLoaded", () => {

console.log("Nursing by NHM Loaded");

const cards = document.querySelectorAll(".card");

cards.forEach(card=>{
card.addEventListener("click",()=>{
card.style.transform="scale(.96)";
setTimeout(()=>{
card.style.transform="scale(1)";
},150);
});
});

});

// ==========================
// FAVORITES
// ==========================

document.querySelectorAll(".fav-btn").forEach(btn => {

    btn.addEventListener("click", function(){

        this.classList.toggle("active");

        if(this.classList.contains("active")){
            this.innerHTML = "❤️";
        }else{
            this.innerHTML = "♡";
        }

    });

});