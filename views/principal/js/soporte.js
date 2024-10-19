const inputs = document.querySelectorAll(".input");
const form = document.getElementById('contactForm');
const modal = document.getElementById('thankYouModal');
const closeBtn = document.querySelector('.close');

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      modal.style.display = 'block';
      form.reset();
    } else {
      alert('Error al enviar el mensaje');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar el mensaje');
  }
});

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
