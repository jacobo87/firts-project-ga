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
