// dibujo el carrito en la nueva pagina

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function renderCarrito() {
  const contenedor = document.getElementById('carrito-contenedor');
  contenedor.innerHTML = '';

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
    return;
  }

  // creo cada producto en mi html nuevo dependiedo de lo cargado

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.className = "card mb-3 p-3 shadow-sm";

    item.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-2">
          <img src="${producto.image}" class="img-fluid rounded" alt="${producto.nombre}">
        </div>
        <div class="col-md-10">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <div class="input-group mb-2" style="max-width: 150px;">
            <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${producto.id}, -1)">-</button>
            <input type="text" class="form-control text-center" value="${producto.cantidad}" disabled>
            <button class="btn btn-outline-secondary" onclick="cambiarCantidad(${producto.id}, 1)">+</button>
          </div>
          <p class="card-text">Subtotal: $${producto.precio * producto.cantidad}</p>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </div>
      </div>
    `;
    contenedor.appendChild(item);
  });
}

function cambiarCantidad(id, cambio) {
  const carrito = obtenerCarrito();
  const index = carrito.findIndex(p => p.id === id);

  if (index !== -1) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) {
      carrito.splice(index, 1);
    }
    guardarCarrito(carrito);
    renderCarrito();
  }
}

function eliminarProducto(id) {
  const carrito = obtenerCarrito().filter(p => p.id !== id);
  guardarCarrito(carrito);
  renderCarrito();
}

document.addEventListener('DOMContentLoaded', renderCarrito);



