document.getElementById('recoverForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const alertBox = document.getElementById('alertBox');

    try {
        const response = await fetch('/api/auth/', {  // Ajustamos la ruta aquí
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
            alertBox.textContent = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
            alertBox.classList.add('success');
        } else {
            alertBox.textContent = data.message || 'Ocurrió un error. Por favor, intenta nuevamente.';
            alertBox.classList.remove('success');
        }
        alertBox.style.display = 'block';
    } catch (error) {
        alertBox.textContent = 'Ocurrió un error. Por favor, intenta nuevamente.';
        alertBox.style.display = 'block';
    }
});
