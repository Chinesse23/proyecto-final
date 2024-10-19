document.addEventListener('DOMContentLoaded', async function() {
    let fechas;
    async function fetchData() {
        try {
            const response = await fetch('/api/clases/clases');
            if (!response.ok) throw new Error('Error al obtener los datos');
            fechas = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
    
    await fetchData();
    
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        events: fechas,
        eventClick: function(info) {
            const action = prompt("¿Qué quieres hacer con este evento? (edit/delete)", "edit");
            if (action === "delete") {
                if (confirm("¿Seguro que quieres eliminar este evento?")) {
                    fetch(`/api/clases/${info.event.id}`, { method: 'DELETE' })
                        .then(() => {
                            info.event.remove();
                            alert("Evento eliminado exitosamente");
                        })
                        .catch(err => alert("Error al eliminar el evento"));
                }
            } else if (action === "edit") {
                const newTitle = prompt("Introduce un nuevo título para el evento", info.event.title);
                const newDescription = prompt("Introduce una nueva descripción para el evento", info.event.extendedProps.description);
                if (newTitle && newDescription) {
                    fetch(`/api/clases/${info.event.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ title: newTitle, description: newDescription, start: info.event.startStr })
                    })
                    .then(() => {
                        info.event.setProp('title', newTitle);
                        info.event.setExtendedProp('description', newDescription);
                        alert("Evento actualizado exitosamente");
                    })
                    .catch(err => alert("Error al actualizar el evento"));
                }
            }
        },
        selectable: true,
        select: function(info) {
            const title = prompt('Introduce el título del evento:');
            const description = prompt('Introduce la descripción del evento:');
            if (title && description) {
                fetch('/api/clases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, start: info.startStr, description })
                })
                .then(response => response.json())
                .then(data => {
                    calendar.addEvent({
                        id: data.clase._id,
                        title: data.clase.title,
                        start: data.clase.start,
                        description: data.clase.description
                    });
                    alert("Evento creado exitosamente");
                })
                .catch(err => alert("Error al crear el evento"));
            }
            calendar.unselect();
        }
    });
    calendar.render();

    // ScrollReveal Configurations
    ScrollReveal().reveal('.featured-classes', { duration: 1000, origin: 'left', distance: '100px' });
    ScrollReveal().reveal('.calendar', { duration: 1000, origin: 'right', distance: '100px' });
    ScrollReveal().reveal('.instructors', { duration: 1000, origin: 'bottom', distance: '100px' });
    ScrollReveal().reveal('.contact-form', { duration: 1000, origin: 'top', distance: '100px' });
    ScrollReveal().reveal('.gallery', { duration: 1000, scale: 0.85 });

    // Carousel Functionality
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const carouselContainer = document.querySelector('.carousel-container');
    let index = 0;
    prev.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : carouselContainer.children.length - 1;
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    });
    next.addEventListener('click', () => {
        index = (index < carouselContainer.children.length - 1) ? index + 1 : 0;
        carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    });
});

function limitCheckboxes() {
    const checkboxes = document.querySelectorAll('input[name="classes"]:checked');
    if (checkboxes.length > 3) {
        alert('Solo puedes seleccionar hasta 3 clases.');
        checkboxes[checkboxes.length - 1].checked = false;
    }
}

// Form submission handling
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.classes = formData.getAll('classes'); // Ensure all selected classes are included
    const feedback = document.getElementById('feedback');
    try {
        const response = await fetch('/api/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            feedback.textContent = 'Inscripción exitosa. Revisa tu correo para la confirmación.';
            feedback.className = 'feedback success';
        } else {
            feedback.textContent = 'Hubo un error en la inscripción. Inténtalo de nuevo.';
            feedback.className = 'feedback error';
        }
    } catch (error) {
        feedback.textContent = 'Hubo un error en la inscripción. Inténtalo de nuevo.';
        feedback.className = 'feedback error';
    }
    feedback.style.display = 'block';
});
