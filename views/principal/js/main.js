const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line": "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line"); // Corrige el nombre de la clase
});

const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000, // Corrige 'durato' a 'duration'
};

ScrollReveal().reveal('.about__container', {
    duration: 2000,
    origin: 'bottom',
    distance: '50px',
    easing: 'ease-in-out',
    reset: true
});

// header container
ScrollReveal().reveal(".header__container .section_subheader", {
    ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
    ...scrollRevealOption,
    delay:500
});

ScrollReveal().reveal(".header__container .btn", {
    ...scrollRevealOption,
    delay: 1000,
});

// room container
ScrollReveal().reveal(".room__card", {
    ...scrollRevealOption,
    interval: 500,
});

// feature container
ScrollReveal().reveal(".feature__card", {
    ...scrollRevealOption,
    interval: 500,
});

// news container
ScrollReveal().reveal(".news__card", {
    ...scrollRevealOption,
    interval: 500,
});

const images = [  
    "/assets/header-1-choroni.jpg",  
    "/assets/header-2-choroni.jpg",  
    "/assets/header-3-choroni.jpg",  
    "/assets/header-4-choroni.jpg" 
];  

const texts = [
    "La mejor experiencia para ti",
    "Explora nuevas aventuras",
    "Conéctate con la naturaleza",
    "Descubre lugares increíbles"
];

// Definición de las animaciones
const animations = [
    "fade-in",
    "slide-in",
    "fade-in",
    "slide-in"
];

let currentIndex = 0; // Solo aquí

// Función para cambiar la imagen de fondo
function changeBackgroundImage() {  
    currentIndex = (currentIndex + 1) % images.length; // Incrementa el índice de forma cíclica  
    
    // Cambia la imagen de fondo  
    const headerElement = document.querySelector('.header');
    headerElement.style.backgroundImage = `linear-gradient(  
        rgba(15, 26, 44, 0.5),   
        rgba(15, 26, 44, 0.5)  
    ), url(${images[currentIndex]})`;

    // Cambia el texto
    const dynamicText = document.getElementById('dynamicText');
    dynamicText.className = ''; // Limpia cualquier clase anterior
    dynamicText.textContent = texts[currentIndex]; // Cambia el texto
    dynamicText.classList.add(animations[currentIndex]); // Añade la nueva animación
}

// Cambia la imagen cada 5 segundos  
setInterval(changeBackgroundImage, 5000);

// duración del spinner
window.onload = function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
    }, 2000);
};

let carouselIndex = 0; // Renombrado para evitar conflictos
const cards = document.querySelectorAll('.news__card');
const totalCards = cards.length;
const newsGrid = document.getElementById('newsGrid');

document.getElementById('next').addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % totalCards; // Incrementar el índice
    updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + totalCards) % totalCards; // Decrementar el índice
    updateCarousel();
});

function updateCarousel() {
    const offset = -carouselIndex * 300; // Cambia 300 al ancho de tu tarjeta
    newsGrid.style.transform = `translateX(${offset}px)`; // Mover el carrusel
}

// Inicializa el carrusel
updateCarousel();

//slider infinito
const slider = document.querySelector('.menu__images');

slider.addEventListener('mouseover', () => {
  slider.style.animationPlayState = 'paused';
});

slider.addEventListener('mouseout', () => {
  slider.style.animationPlayState = 'running';
});

document.querySelectorAll('.room__card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('lift');
    });
});

document.querySelectorAll('.feature__card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('lift2');
    });
});

function logout() {
    // Eliminar el historial
    window.history.pushState(null, null, '/login/index.html');
    window.history.pushState(null, null, '/login/index.html');
    window.history.go(1);
}

