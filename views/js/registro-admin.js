document.getElementById('registerAdminForm').addEventListener('submit', async (e) => {
    if (!validateForm(e, 'register')) {
        return;
    }

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const role = 'admin';
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
            alert('Registro exitoso');
            window.location.href = window.location.origin + '/api/auth/login';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
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
