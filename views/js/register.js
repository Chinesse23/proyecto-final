document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(e, 'register')) {
        return;
    }

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const role = window.location.pathname.includes('/registro-admin') ? 'admin' : 'user';
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password, role }),
        });
        const data = await response.json();
        if (response.ok) {
            const successBox = document.getElementById('successBox');
            successBox.textContent = 'Registro exitoso';
            successBox.style.display = 'block';

            setTimeout(() => {
                window.location.href = window.location.origin + '/api/auth/login';
            }, 2000); // Redirige después de 2 segundos
        } else {
            const alertBox = document.getElementById('alertBox');
            alertBox.textContent = data.message || 'Ocurrió un error desconocido.';
            alertBox.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        const alertBox = document.getElementById('alertBox');
        alertBox.textContent = 'Ocurrió un error. Por favor, intenta nuevamente.';
        alertBox.style.display = 'block';
    }
});

// Inicializa ScrollReveal
ScrollReveal().reveal('.container.register-glass', {
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'ease-in-out'
});
// Puedes agregar más elementos para que se revelen, si lo deseas.
ScrollReveal().reveal('.top-header', {
    origin: 'top',
    distance: '30px',
    duration: 800,
    delay: 300
});
ScrollReveal().reveal('.input-field', {
    origin: 'left',
    distance: '30px',
    duration: 800,
    interval: 200 // Diferencia de tiempo entre cada elemento
});
ScrollReveal().reveal('.bottom', {
    origin: 'bottom',
    distance: '30px',
    duration: 800,
    delay: 300
});
