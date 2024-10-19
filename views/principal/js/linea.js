// Recupera los datos del localStorage
const arrival = localStorage.getItem('arrival');
const departure = localStorage.getItem('departure');
const guests = localStorage.getItem('guests');

// Función para verificar disponibilidad (simulada)
function checkAvailability(arrival, departure, guests) {
// Aquí puedes agregar la lógica para verificar la disponibilidad real
// Por ahora, vamos a simular la disponibilidad
    return {
        'Posada Turpial': true,
        'Los Ranchos de Chano': false,
        'Posada Las Garcías': true
    };
}

// Verifica la disponibilidad
const availability = checkAvailability(arrival, departure, guests);

// Muestra la disponibilidad en la página
const availabilityDiv = document.getElementById('availability');
for (const [posada, isAvailable] of Object.entries(availability)) {
    const posadaDiv = document.createElement('div');
    posadaDiv.textContent = `${posada}: ${isAvailable ? 'Disponible' : 'No Disponible'}`;
    availabilityDiv.appendChild(posadaDiv);
}