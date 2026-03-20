
// Seleccionamos los elementos del HTML
const rio = document.querySelector('.rio'); // la imagen del río
const audioNormal = document.getElementById('audio-normal'); // audio de fondo
const audioGlitch = document.getElementById('audio-glitch'); // audio glitch

let glitchActivo = false; // controla si el glitch está corriendo
let intervaloGlitch = null; // guarda el intervalo para poder detenerlo

// Escuchamos todos los clics en la página
document.addEventListener('click', () => {
  if (!glitchActivo) {
    // Si no está activo — arrancamos todo
    iniciarTodo();
  } else {
    // Si está activo — paramos todo
    detenerTodo();
  }
});

function iniciarTodo() {
  glitchActivo = true;
  audioNormal.play(); // arranca el audio normal
  // arranca el intervalo que dispara el glitch al azar
  intervaloGlitch = setInterval(() => {
    if (Math.random() > 0.6) glitch();
  }, 900);
}

function detenerTodo() {
  glitchActivo = false;
  clearInterval(intervaloGlitch); // detiene el intervalo
  rio.style.filter = 'none'; // saca el filtro de color del río
  audioNormal.pause();
  audioNormal.currentTime = 0; // rebobina el audio normal
  audioGlitch.pause();
  audioGlitch.currentTime = 0; // rebobina el audio glitch
}

function glitch() {
  if (!glitchActivo) return; // si no está activo no hace nada
  
  // colores que va a tomar el río al glitchear
  const colores = [
    'hue-rotate(90deg) saturate(3)',
    'hue-rotate(180deg) saturate(5)',
    'hue-rotate(270deg) saturate(4)',
    'hue-rotate(45deg) saturate(6) brightness(1.5)',
    'none'
  ];
  
  // duraciones random del efecto en milisegundos
  const duraciones = [80, 120, 60, 150, 200];

  // pausa el audio normal y arranca el glitch
  audioNormal.pause();
  audioGlitch.currentTime = 0;
  audioGlitch.play();

  let i = 0;
  const intervalo = setInterval(() => {
    // cambia el color del río al azar
    rio.style.filter = colores[Math.floor(Math.random() * colores.length)];
    i++;
    if (i > 6) {
      clearInterval(intervalo); // termina el glitch visual
      rio.style.filter = 'none'; // vuelve el río a normal
      audioGlitch.pause();
      if (glitchActivo) audioNormal.play(); // vuelve el audio normal
    }
  }, duraciones[Math.floor(Math.random() * duraciones.length)]);
}