// Variables
let currentIndex = 0;
const cuentos = document.querySelectorAll('.cuento');
const totalCuentos = cuentos.length;
const carruselInner = document.querySelector('.carrusel-inner');
let intervalo = null;

// Calcular el ancho dinámico del cuento (incluye padding y gap)
function getCuentoWidth() {
    const cuento = cuentos[0];
    const style = window.getComputedStyle(cuento);
    const width = parseFloat(style.width) + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return width + 15; // Sumar el gap de 15px
}

let cuentoWidth = getCuentoWidth();

// Función para el narrador
function saludar() {
    const mensaje = document.getElementById("mensaje-bienvenida");
    const audio = document.getElementById("audio-bienvenida");
    if (!audio.paused) return;
    mensaje.textContent = "¡Hola! Bienvenido a nuestro mundo de mitos y leyendas.";
    audio.play();
    audio.onended = stopCarousel;
    startCarousel();
}

// Actualizar posición del carrusel
function updateCarousel() {
    carruselInner.style.transform = `translateX(-${currentIndex * cuentoWidth}px)`;
}

// Carrusel automático con reinicio al inicio
function startCarousel() {
    stopCarousel();
    intervalo = setInterval(() => {
        currentIndex++;
        if (currentIndex >= totalCuentos) {
            currentIndex = 0; // Regresar al primer cuento
            updateCarousel();
        } else {
            updateCarousel();
        }
    }, 3000);
}

function stopCarousel() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

// Iniciar carrusel al cargar
updateCarousel(); // Mostrar "La Mocuana" al inicio
startCarousel();

// Botones de navegación
document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = totalCuentos - 1; // Ir al último si retrocede desde el primero
    }
    updateCarousel();
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalCuentos) {
        currentIndex = 0; // Regresar al primero
    }
    updateCarousel();
});

// Pausar al pasar el mouse
carruselInner.addEventListener("mouseenter", stopCarousel);
carruselInner.addEventListener("mouseleave", startCarousel);

// Recalcular ancho al cambiar tamaño de pantalla
window.addEventListener("resize", () => {
    cuentoWidth = getCuentoWidth();
    updateCarousel();
});