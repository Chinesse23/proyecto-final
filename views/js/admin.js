document.addEventListener('DOMContentLoaded', () => {
    loadPosadas();
    loadActividades();
    loadVentas();
    loadVentasChart();

    // Apply ScrollReveal
    ScrollReveal().reveal('.content section', {
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out'
    });

    // Initialize FullCalendar
    initCalendar();
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.querySelector('.content');
    const arrow = document.getElementById('arrow');
    sidebar.classList.toggle('hidden');
    content.classList.toggle('expanded');
    if (sidebar.classList.contains('hidden')) {
        arrow.innerHTML = '&#9654;'; // Flecha hacia la derecha
    } else {
        arrow.innerHTML = '&#9664;'; // Flecha hacia la izquierda
    }
}

function initCalendar() {
    fetch('/api/clases/clases')
        .then(response => response.json())
        .then(data => {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                editable: true,
                events: data,
                eventClick: handleEventClick,
                selectable: true,
                select: handleDateSelect
            });
            calendar.render();
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function initCalendar() {
    fetch('/api/clases/clases')
        .then(response => response.json())
        .then(data => {
            const calendarEl = document.getElementById('calendar');
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                editable: true,
                events: data,
                eventClick: handleEventClick,
                selectable: true,
                select: handleDateSelect
            });
            calendar.render();
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function handleEventClick(info) {
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
}

function handleDateSelect(info) {
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
            const calendar = info.view.calendar;
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
    info.view.calendar.unselect();
}

function loadPosadas() {
    fetch('/posadas')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#posadasTable tbody');
            tableBody.innerHTML = '';
            data.forEach(posada => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${posada.nombre}</td>
                    <td>${posada.direccion}</td>
                    <td>${posada.contacto}</td>
                    <td>
                        <button onclick="editPosada('${posada._id}')">Editar</button>
                        <button onclick="deletePosada('${posada._id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar posadas:', error));
}

function addPosada() {
    const nombre = prompt('Nombre de la posada:');
    const direccion = prompt('Dirección de la posada:');
    const contacto = prompt('Contacto de la posada:');
    const informacion = prompt('Información de la posada:');

    const nuevaPosada = { nombre, direccion, contacto, informacion };

    fetch('/posadas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaPosada)
    })
    .then(() => loadPosadas())
    .catch(error => console.error('Error al agregar posada:', error));
}

function editPosada(id) {
    const nombre = prompt('Nuevo nombre de la posada:');
    const direccion = prompt('Nueva dirección de la posada:');
    const contacto = prompt('Nuevo contacto de la posada:');
    const informacion = prompt('Nueva información de la posada:');

    const posadaActualizada = { nombre, direccion, contacto, informacion };

    fetch(`/posadas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(posadaActualizada)
    })
    .then(() => loadPosadas())
    .catch(error => console.error('Error al editar posada:', error));
}

function deletePosada(id) {
    fetch(`/posadas/${id}`, { method: 'DELETE' })
        .then(() => loadPosadas())
        .catch(error => console.error('Error al eliminar posada:', error));
}

function loadActividades() {
    fetch('/actividades')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#actividadesTable tbody');
            tableBody.innerHTML = '';
            data.forEach(actividad => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${actividad.nombre}</td>
                    <td>${new Date(actividad.fecha).toLocaleDateString()}</td>
                    <td>${actividad.participantes}</td>
                    <td>
                        <button onclick="editActividad('${actividad._id}')">Editar</button>
                        <button onclick="deleteActividad('${actividad._id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar actividades:', error));
}

function addActividad() {
    const nombre = prompt('Nombre de la actividad:');
    const fecha = prompt('Fecha de la actividad (YYYY-MM-DD):');
    const participantes = prompt('Número de participantes:');

    const nuevaActividad = { nombre, fecha, participantes };

    fetch('/actividades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaActividad)
    })
    .then(() => loadActividades())
    .catch(error => console.error('Error al agregar actividad:', error));
}

function editActividad(id) {
    const nombre = prompt('Nuevo nombre de la actividad:');
    const fecha = prompt('Nueva fecha de la actividad (YYYY-MM-DD):');
    const participantes = prompt('Nuevo número de participantes:');

    const actividadActualizada = { nombre, fecha, participantes };

    fetch(`/actividades/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actividadActualizada)
    })
    .then(() => loadActividades())
    .catch(error => console.error('Error al editar actividad:', error));
}

function deleteActividad(id) {
    fetch(`/actividades/${id}`, { method: 'DELETE' })
        .then(() => loadActividades())
        .catch(error => console.error('Error al eliminar actividad:', error));
}

function loadVentas() {
    fetch('/api/transaccion')
        .then(response => response.json())
        .then(transactions => {
            const tableBody = document.querySelector('#ventasTable tbody');
            tableBody.innerHTML = '';
            transactions.forEach(transaction => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transaction.customerName}</td>
                    <td>${transaction.amount}</td>
                    <td>${transaction.currency}</td>
                    <td>${transaction.status}</td>
                    <td>${new Date(transaction.createdAt).toLocaleString()}</td>
                    <td>
                        <button onclick="editTransaction('${transaction._id}')">Editar</button>
                        <button onclick="deleteTransaction('${transaction._id}')">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar transacciones:', error));
}

function addTransaction() {
    const customerName = prompt('Nombre del cliente:');
    const amount = prompt('Monto de la transacción:');
    const currency = prompt('Moneda de la transacción:');
    const status = prompt('Estado de la transacción:');

    const newTransaction = { customerName, amount, currency, status };

    fetch('/api/transaccion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTransaction)
    })
    .then(() => loadVentas())
    .catch(error => console.error('Error al agregar transacción:', error));
}

function editTransaction(id) {
    const customerName = prompt('Nuevo nombre del cliente:');
    const amount = prompt('Nuevo monto de la transacción:');
    const currency = prompt('Nueva moneda de la transacción:');
    const status = prompt('Nuevo estado de la transacción:');

    const updatedTransaction = { customerName, amount, currency, status };

    fetch(`/api/transaccion/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTransaction)
    })
    .then(() => loadVentas())
    .catch(error => console.error('Error al editar transacción:', error));
}

function deleteTransaction(id) {
    fetch(`/api/transaccion/${id}`, {
        method: 'DELETE'
    })
    .then(() => loadVentas())
    .catch(error => console.error('Error al eliminar transacción:', error));
}

function loadVentasChart() {
    fetch('/ventas')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('ventasChart').getContext('2d');
            const ventasChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels, // Etiquetas de las posadas
                    datasets: [{
                        label: 'Ventas',
                        data: data.ventas, // Datos de ventas reales
                        backgroundColor: [
                            'rgba(46, 139, 87, 0.2)', // Verde oscuro
                            'rgba(143, 188, 143, 0.2)', // Verde claro
                            'rgba(60, 179, 113, 0.2)' // Verde medio
                        ],
                        borderColor: [
                            'rgba(46, 139, 87, 1)',
                            'rgba(143, 188, 143, 1)',
                            'rgba(60, 179, 113, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar datos de ventas:', error));
}

function logout() {
    // Eliminar el historial
    window.history.pushState(null, null, '/login/index.html');
    window.history.pushState(null, null, '/login/index.html');
    window.history.go(1);
}
