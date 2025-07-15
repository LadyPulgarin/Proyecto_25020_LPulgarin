// validar datos de formulario



document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formulario');
  const estado = document.getElementById('estado');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevenir recarga

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let errores = [];

    if (nombre.length < 2) errores.push("El nombre debe tener al menos 2 caracteres.");
    if (apellido.length < 2) errores.push("El apellido debe tener al menos 2 caracteres.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errores.push("El email no es válido.");
    if (mensaje.length < 5) errores.push("El mensaje debe ser más largo.");

    if (errores.length > 0) {
      estado.textContent = errores.join(" | ");
      estado.style.color = "red";
      return;
    }

    const formData = {
      nombre,
      apellido,
      email,
      mensaje
    };

    try {
      const respuesta = await fetch("https://formspree.io/f/xzzvplgw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (respuesta.ok) {
        estado.textContent = "¡Gracias por tu comentario, tu mensaje fue enviado";
        estado.style.color = "green";
        form.reset();
      } else {
        estado.textContent = "Hubo un error al enviar el formulario.";
        estado.style.color = "red";
      }

    } catch (error) {
      estado.textContent = "Error de red. Inténtalo más tarde.";
      estado.style.color = "red";
    }
  });
});
