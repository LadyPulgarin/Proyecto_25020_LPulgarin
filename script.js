//hamburguesa menu
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });


  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
});



function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// cargo mis productos

let productosCargados = [];

function cargarProductos() {
  fetch('productos.json')
    .then(res => res.json())
    .then(data => {
      productosCargados = data;
      const contenedor = document.getElementById('contenedor-productos');
      contenedor.innerHTML = '';

      data.forEach(producto => {
        contenedor.innerHTML += crearProductoHTML(producto);
      });

      adjuntarEventosAgregarCarrito();
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
    });
}

function crearProductoHTML(producto) {
  return `
    <div class="col-lg-3 col-md-6 col-sm-6 mb-4">
      <div class="producto_carrito">
        <img src="${producto.image}" alt="${producto.nombre}" class="image-fluid">
        <div class="producto-descripcion">
            <span>${producto.categoria}</span>
            <h5>${producto.nombre}</h5>
            <h4>$${producto.precio}</h4>
        </div>
        <button class="carrito-btn " data-id="${producto.id}">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div> 
    </div> 
  `;
}

function adjuntarEventosAgregarCarrito() {
  const botones = document.querySelectorAll('.carrito-btn');
  botones.forEach(btn => {
    btn.addEventListener('click', function () {
      const id = parseInt(this.dataset.id);
      agregarAlCarrito(id);
    });
  });
}

function agregarAlCarrito(id) {
  const producto = productosCargados.find(p => p.id === id);
  if (!producto) return;

  let carrito = obtenerCarrito();
  const index = carrito.findIndex(p => p.id === id);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(carrito);


  Swal.fire({
    title: 'Producto agregado!',
    text: `"${producto.nombre}" fue añadido al carrito.`,
    icon: 'success',
    confirmButtonText: 'Ok',
    timer: 1500,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    background: '#fff',
    color: '#333'
  });
}




// agrego comentarios
// se consume api.



function cargarComentarios() {
  fetch('https://jsonplaceholder.typicode.com/comments?_limit=6')
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('contenedor-comentarios');
      if (!contenedor) return;

      data.forEach((comentario, index) => {
        const div = document.createElement('div');
        div.className = 'col-md-4';

        const fotoId = (index % 70) + 1; // hay 70 imágenes distintas
        const imagenUrl = `https://i.pravatar.cc/150?img=${fotoId}`;

        div.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <div class="card-body text-center">
              <img src="${imagenUrl}" class="rounded-circle mb-3" width="80" height="80" alt="foto cliente">
              <h5 class="card-title">${comentario.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${comentario.email}</h6>
              <p class="card-text">${comentario.body}</p>
            </div>
          </div>
        `;

        contenedor.appendChild(div);
      });
    })
    .catch(err => {
      console.error('Error cargando reseñas:', err);
    });
}



document.addEventListener('DOMContentLoaded', () => {
  cargarProductos(); 
  cargarComentarios(); 
});


document.addEventListener('DOMContentLoaded', cargarProductos);
