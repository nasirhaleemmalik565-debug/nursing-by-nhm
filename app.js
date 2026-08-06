function toggleFav(btn){

    const icon = btn.querySelector(".material-icons-outlined");

    btn.classList.toggle("active");

    if(btn.classList.contains("active")){

        icon.textContent="favorite";

    }else{

        icon.textContent="favorite_border";

    }

}