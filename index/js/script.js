// script.js
let MenuItens = document.getElementById("MenuItens");
MenuItens.style.maxHeight = "0px";

function menucelular() {
  if (MenuItens.style.maxHeight === "0px") {
    MenuItens.style.maxHeight = "200px";
  } else {
    MenuItens.style.maxHeight = "0px";
  }
}

<script>
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides img').length;

function mudarSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(mudarSlide, 3000); // Troca a cada 3 segundos
</script>


