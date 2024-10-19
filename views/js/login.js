document.getElementById('loginForm').addEventListener('submit', async (e) => {
  if (!validateLoginForm(e)) {
      return;
  }

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
          const successBox = document.getElementById('loginSuccessBox');
          if (successBox) {
              successBox.textContent = 'Login successful';
              successBox.style.display = 'block';
          }
          setTimeout(() => {
              if (data.role === 'admin') {
                  window.location.href = '/admin';
              } else {
                  window.location.href = '/';
              }
          }, 2000); // Redirige después de 2 segundos
      } else {
          const alertBox = document.getElementById('loginAlertBox');
          if (alertBox) {
              alertBox.textContent = data.message || 'Ocurrió un error desconocido.';
              alertBox.style.display = 'block';
          }
      }
  } catch (error) {
      console.error('Error:', error);
      const alertBox = document.getElementById('loginAlertBox');
      if (alertBox) {
          alertBox.textContent = 'Ocurrió un error. Por favor, intenta nuevamente.';
          alertBox.style.display = 'block';
      }
  }
});

// Inicializa ScrollReveal
ScrollReveal().reveal('.container.glass', {
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
