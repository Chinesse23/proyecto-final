document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        let index = 0;
        setInterval(() => {
            const images = carousel.querySelectorAll('img');
            images.forEach((img, i) => {
                img.style.transform = `translateX(-${index * 100}%)`;
            });
            index = (index + 1) % images.length;
        }, 3000);
    });

    const modal = document.getElementById('modal');
    const resultModal = document.getElementById('result-modal');
    const closeModalButtons = document.querySelectorAll('.close');
    const reserveButtons = document.querySelectorAll('.reserve-btn');
    const reservationForm = document.getElementById('reservation-form');
    const resultMessage = document.getElementById('result-message');

    function resetForm() {
        reservationForm.reset();
    }

    function calculatePrice() {
        const basePrice = 50;
        const adults = parseInt(document.getElementById('adults').value) || 0;
        const children = parseInt(document.getElementById('children').value) || 0;
        const totalPrice = basePrice + (adults * 10) + (children * 5);
        document.getElementById('price').value = `$${totalPrice}`;
    }

    reserveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const posadaId = button.getAttribute('data-posada');
            let posadaName = '';
            switch (posadaId) {
                case 'turpial':
                    posadaName = 'Posada Turpial';
                    break;
                case 'ranchos':
                    posadaName = 'Los Ranchos de Chano';
                    break;
                case 'garcia':
                    posadaName = 'Posada Las Garcia';
                    break;
            }
            resetForm(); // Reinicia el formulario
            document.getElementById('posada').value = posadaName; // Establece el nombre de la posada
            document.getElementById('price').value = '$50'; // Establece el precio base
            modal.style.display = 'block';
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
            resultModal.style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == resultModal) {
            resultModal.style.display = 'none';
        }
    };

    reservationForm.addEventListener('input', calculatePrice);

    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const dates = document.getElementById('dates').value;
        const posada = document.getElementById('posada').value;
        const rooms = document.getElementById('rooms').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;

        if (name && email && dates && posada && rooms && adults && children) {
            resultMessage.textContent = 'Su reserva ha sido exitosa';
        } else {
            resultMessage.textContent = 'Ha habido un problema con su reserva';
        }

        modal.style.display = 'none';
        resultModal.style.display = 'block';
    });

    const stars = document.querySelectorAll('.star');
    const commentButton = document.querySelector('.submit-comment');
    const commentTextarea = document.getElementById('comment');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            star.classList.toggle('selected');
        });
    });

    commentButton.addEventListener('click', () => {
        const selectedStars = document.querySelectorAll('.star.selected');
        const comment = commentTextarea.value;

        if (selectedStars.length > 0 && comment) {
            const starValues = Array.from(selectedStars).map(star => star.getAttribute('data-value')).join(', ');
            alert(`Valoración: ${starValues} estrellas\nComentario: ${comment}`);
            // Aquí puedes manejar el envío del comentario y la valoración al servidor
            commentTextarea.value = '';
            stars.forEach(s => s.classList.remove('selected'));
        } else {
            alert('Por favor, selecciona una valoración y escribe un comentario.');
        }
    });

    paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '50.00'
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Enviar los detalles de la transacción a tu servidor
            fetch('/api/transaccion', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                transactionId: details.id,
                amount: details.purchase_units[0].amount.value,
                currency: details.purchase_units[0].amount.currency_code,
                status: details.status
              })
            });
          });
        }
    }).render('#paypal-button-container');
});
