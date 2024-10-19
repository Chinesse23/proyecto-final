function validateForm(event, formType) { 
    event.preventDefault(); 

    const alertBox = document.getElementById('alertBox');
    alertBox.style.display = 'none';
    let alertMessage = '';

    let username = document.getElementById('username').value;
    let email = formType !== 'login' ? document.getElementById('email').value : null;
    let password = document.getElementById('password').value;
    let confirmPassword = formType !== 'login' ? document.getElementById('confirmPassword').value : null;

    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernamePattern.test(username)) {
        alertMessage = 'El nombre de usuario debe tener entre 3 y 20 caracteres y contener solo letras y números.';
    } else if (formType !== 'login' && !emailPattern.test(email)) {
        alertMessage = 'Por favor, introduce un correo electrónico válido.';
    } else if (!passwordPattern.test(password)) {
        alertMessage = 'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra y un número.';
    } else if (formType !== 'login' && password !== confirmPassword) {
        alertMessage = 'Las contraseñas no coinciden.';
    } else {
        return true;
    }

    // Muestra el cuadro de alerta con el mensaje
    alertBox.textContent = alertMessage;
    alertBox.style.display = 'block';

    return false;
}
