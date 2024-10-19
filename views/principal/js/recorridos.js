// Inicializar ScrollReveal
ScrollReveal().reveal('header', { delay: 200 });
ScrollReveal().reveal('nav', { delay: 400 });
ScrollReveal().reveal('main', { delay: 600 });
ScrollReveal().reveal('section', { delay: 800 });
ScrollReveal().reveal('footer', { delay: 1000 });

// scripts.js
let currentIndex = 0;
const historiaContent = [
    "Choroní fue fundado en 1616 por colonizadores españoles. Durante la época colonial, se convirtió en un importante puerto para el comercio de cacao y café, productos muy valorados en Europa. En 1816, Simón Bolívar se reunió en Choroní con varios héroes de la independencia, lo que subraya la importancia histórica del lugar.",
    "En el siglo XVIII, Choroní se convirtió en un centro de producción de cacao, compitiendo con otras regiones como Chuao. Las familias caraqueñas valoraban mucho el cacao de Choroní por su sabor y aroma.",
    "Hoy en día, Choroní es conocido por sus playas paradisíacas, su rica historia y su vibrante cultura local. Es un destino turístico popular que ofrece una experiencia auténtica y relajante."
    // Agrega más contenido histórico aquí
];

document.getElementById('next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % historiaContent.length;
    document.getElementById('historia-content').innerText = historiaContent[currentIndex];
});

document.getElementById('prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + historiaContent.length) % historiaContent.length;
    document.getElementById('historia-content').innerText = historiaContent[currentIndex];
});
