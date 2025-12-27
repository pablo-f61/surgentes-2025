const tituloTexto = "SURGENTES";
const textoTexto = " Colectivo artístico que trabaja en el cruce entre territorio, procesos materiales y tecnologías inestables. Su práctica se centra en la experimentación, la falla y el error como formas de conocimiento, abordando lo visible y lo oculto en los sistemas naturales, sociales y técnicos. El trabajo del colectivo se desarrolla a través de instalaciones, esculturas sonoras,  dispositivos experimentales y registros audiovisuales, poniendo en tensión las ideas de control,  eficiencia y progreso.";
     
     

let i = 0;
let j = 0;

const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");

const audio = document.getElementById("maquina");
let activado = false;

window.addEventListener("click", () => {
  if (!activado) {
    audio.play();
    activado = true;
  }
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

setTimeout(() => {
  document.querySelector(".menu").style.opacity = 1;
}, 27000);


setTimeout(() => {
  audio.pause();
  audio.currentTime = 0;
}, 25500);

escribirTitulo();