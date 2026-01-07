


const tituloTexto = "SURGENTES";
const textoTexto = "Colectivo artístico que trabaja en el cruce entre territorio, procesos materiales y tecnologías inestables. Su práctica se centra en la experimentación, la falla y el error como formas de conocimiento, abordando lo visible y lo oculto en los sistemas naturales, sociales y técnicos. El trabajo del colectivo se despliega mediante instalaciones, esculturas sonoras, dispositivos experimentales y acciones performáticas registradas, donde el cuerpo interviene como herramienta y como superficie, produciendo imágenes que no representan sino que perforan, tensando las ideas de control, eficiencia y progreso.";
     
     

let i = 0;
let j = 0;

function iniciarTexto() {
  i = 0;
  j = 0;
  titulo.textContent = "";
  texto.textContent = "";
  escribirTitulo();
}

const portal = document.getElementById("portal");
const main = document.querySelector("main");

const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");

const audio = document.getElementById("maquina");
let activado = false;

  portal.addEventListener("click", () => {
  portal.style.opacity = 0;
  portal.style.pointerEvents = "none";

  main.style.opacity = 1;
  main.style.pointerEvents = "auto";

  audio.currentTime = 0;
  audio.play();

  // acá llamás a la función que inicia el tipeo
  iniciarTexto();

setTimeout(() => {
  document.querySelector(".menu").style.opacity = 1;
}, 35000);

setTimeout(() => {
  audio.pause();
  audio.currentTime = 0;
}, 35000);

});


function escribirTitulo() {
  if (i < tituloTexto.length) {
    titulo.textContent += tituloTexto[i];
    i++;
    setTimeout(escribirTitulo, 120);
  } else {
    setTimeout(escribirTexto, 500);
  }
}

function escribirTexto() {
  if (j < textoTexto.length) {
    texto.textContent += textoTexto[j];
    j++;
    setTimeout(escribirTexto, 40);
  }
}





