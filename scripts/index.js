// ============== Botón Arriba ==============

// llamamos a la etiqueta HTML con el id scrollArribaBtn
var scrollArribaBtn = document.getElementById('scrollArribaBtn');
var rootElement = document.documentElement;

// Creamos la función de scrollarriba
function scrollArriba() {
  // creamos el scroll al inicio del documento
  rootElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Damos la salida de la función en nuestro documento
scrollArribaBtn.addEventListener('click', scrollArriba);

// ============== Final de botón arriba ==============

// ============== Cesta entradas ==============
// Variables
const baseDeDatos = [
  {
    id: 1,
    nombre: 'El hombre del norte',
    precio: 7,
    imagen: '../assets/images/elhombre.jpg',
  },
  {
    id: 2,
    nombre: 'Dog un viaje salvaje',
    precio: 7,
    imagen: '../assets/images/dog.jpg',
  },
  {
    id: 3,
    nombre: 'Doctor strange en el multiverso de la locura',
    precio: 7,
    imagen: '../assets/images/doctor.jpg',
  },
  {
    id: 4,
    nombre: 'Jurassic World Dominion',
    precio: 7,
    imagen: '../assets/images/jurassic.jpg',
  },
];

let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonComprar = document.querySelector('#boton-comprar');

// ============== Funciones ==============

/**
 * Dibuja todos los productos a partir de la base de datos.
 */
function renderizarProductos() {
  baseDeDatos.forEach((info) => {
    // Estructura
    const miNodo = document.createElement('div');
    miNodo.classList.add('card');
    // Body
    const miNodoCardBody = document.createElement('div');
    miNodoCardBody.classList.add('card-body');
    // Titulo
    const miNodoTitle = document.createElement('h5');
    miNodoTitle.classList.add('card-title');
    miNodoTitle.textContent = info.nombre;
    // Imagen
    const miNodoImagen = document.createElement('img');
    miNodoImagen.classList.add('img-fluid');
    miNodoImagen.setAttribute('src', info.imagen);
    // Precio
    const miNodoPrecio = document.createElement('p');
    miNodoPrecio.classList.add('card-text');
    miNodoPrecio.textContent = `${info.precio}${divisa}`;
    // Boton
    const miNodoBoton = document.createElement('button');
    miNodoBoton.classList.add('btn', 'btn-primary', 'button');
    miNodoBoton.textContent = '+';
    miNodoBoton.setAttribute('marcador', info.id);
    miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    // Insertamos
    miNodoCardBody.appendChild(miNodoImagen);
    miNodoCardBody.appendChild(miNodoTitle);
    miNodoCardBody.appendChild(miNodoPrecio);
    miNodoCardBody.appendChild(miNodoBoton);
    miNodo.appendChild(miNodoCardBody);
    DOMitems.appendChild(miNodo);
  });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
  // Anyadimos el Nodo a nuestro carrito
  carrito.push(evento.target.getAttribute('marcador'));
  // Actualizamos el carrito
  renderizarCarrito();
}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = '';
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((item) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = baseDeDatos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
      return itemBaseDatos.id === parseInt(item);
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === item ? (total += 1) : total;
    }, 0);
    // Creamos el nodo del item del carrito
    const miNodo = document.createElement('li');
    miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
    // Boton de borrar
    const miBoton = document.createElement('button');
    miBoton.classList.add('btn', 'btn-danger', 'mx-5', 'button');
    miBoton.textContent = 'X';
    miBoton.style.marginLeft = '1rem';
    miBoton.dataset.item = item;
    miBoton.addEventListener('click', borrarItemCarrito);
    // Mezclamos nodos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  // Borramos todos los productos
  carrito = carrito.filter((carritoId) => {
    return carritoId !== id;
  });
  // volvemos a renderizar
  renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  // Recorremos el array del carrito
  return carrito
    .reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = baseDeDatos.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      // Los sumamos al total
      return total + miItem[0].precio;
    }, 0)
    .toFixed(2);
}

/* Varia el carrito y vuelve a dibujarlo */
function vaciarCarrito() {
  // Limpiamos los productos guardados
  carrito = [];
  // Renderizamos los cambios
  renderizarCarrito();
}

/* Comprar entradas */
function comprarEntradas() {
  if (calcularTotal() >= 1) {
    alert('¡Se han comprado sus entradas!');
  } else {
    alert('Su carro está vacio.');
  }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonComprar.addEventListener('click', comprarEntradas);

// Inicio
renderizarProductos();
renderizarCarrito();
