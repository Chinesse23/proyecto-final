function validateLoginForm(event) { 
    event.preventDefault(); 

    const alertBox = document.getElementById('loginAlertBox');
    alertBox.style.display = 'none';
    let alertMessage = '';

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const usernamePattern = /^[a-zA-Z0-9]{3,20}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernamePattern.test(username)) {
        alertMessage = 'El nombre de usuario debe tener entre 3 y 20 caracteres y contener solo letras y números.';
    } else if (!passwordPattern.test(password)) {
        alertMessage = 'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra y un número.';
    } else {
        return true;
    }

    // Muestra el cuadro de alerta con el mensaje
    alertBox.textContent = alertMessage;
    alertBox.style.display = 'block';

    return false;
}
