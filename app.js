function toggleFav(btn){

    const icon = btn.querySelector(".material-icons-outlined");

    btn.classList.toggle("active");

    if(btn.classList.contains("active")){

        icon.textContent="favorite";

    }else{

        icon.textContent="favorite_border";

    }

}

// ===============================
// Navigation Drawer
// ===============================

function openDrawer(){

document.getElementById("drawer")
.classList.add("active");

document.getElementById("overlay")
.classList.add("active");

}

function closeDrawer(){

document.getElementById("drawer")
.classList.remove("active");

document.getElementById("overlay")
.classList.remove("active");

}