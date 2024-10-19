// JavaScript para el carrusel de imágenes
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 3; // Velocidad de desplazamiento
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Mapa interactivo con Leaflet y OpenStreetMap
    const map = L.map('map').setView([10.4877, -67.6125], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const lugares = [
        { coords: [10.4877, -67.6125], name: 'Playa Grande' },
        { coords: [10.5020, -67.6080], name: 'Chuao' },
        { coords: [10.4800, -67.6200], name: 'Puerto Escondido' },
        { coords: [10.4900, -67.6150], name: 'Senderismo en la selva' }
    ];

    lugares.forEach(lugar => {
        L.marker(lugar.coords)
            .bindPopup(`<h3>${lugar.name}</h3>`)
            .addTo(map);
    });

    // Carrusel de testimonios
    let currentTestimonio = 0;
    const testimonios = document.querySelectorAll('.testimonio');
    const totalTestimonios = testimonios.length;

    function showTestimonio(index) {
        testimonios.forEach((testimonio, i) => {
            testimonio.classList.remove('active');
            if (i === index) {
                testimonio.classList.add('active');
            }
        });
    }

    function moveCarousel(direction) {
        currentTestimonio += direction;
        if (currentTestimonio < 0) {
            currentTestimonio = totalTestimonios - 1;
        } else if (currentTestimonio >= totalTestimonios) {
            currentTestimonio = 0;
        }
        showTestimonio(currentTestimonio);
    }

    document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.next').addEventListener('click', () => moveCarousel(1));

    // Mostrar el primer testimonio al cargar la página
    showTestimonio(currentTestimonio);
});
