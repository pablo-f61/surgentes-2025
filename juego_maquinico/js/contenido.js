/* =========================
   SELECCIONES
========================= */

const textos = document.querySelectorAll("p");
const codigo = document.querySelector(".codigo");
const sirena = document.getElementById("sirena-agua");
const finalAgua = document.getElementById("final-agua");

/* =========================
   AUDIO – PREPARACIÓN
========================= */

// Arranca en silencio
sirena.volume = 0;

// Habilita audio con el primer click (requisito del navegador)
document.addEventListener(
  "click",
  () => {
    sirena.volume = 0;
    sirena.play();
  },
  { once: true }
);

/* =========================
   RESTOS MAQUÍNICOS
========================= */

const restosMaquina = [
  "x��ZKo�F�",
  "CMP R1, #0x0A",
  "0x004F JMP_GT",
  "���0�Z|5�",
  "RUTA NO DISPONIBLE",
  "SIGNAL CLIPPED"
];

let indiceMaquina = 0;
let pasoMaquina = 0;

/* =========================
   GLITCH DE TEXTO
========================= */

function duplicarLetra(l) {
  return l + l;
}

function glitchTexto(elemento) {
  const original = elemento.textContent;
  let resultado = "";

  for (let i = 0; i < original.length; i++) {
    if ((i + pasoMaquina) % 12 === 0) {
      resultado += duplicarLetra(original[i]);
    } else {
      resultado += original[i];
    }
  }

  elemento.textContent = resultado;
  pasoMaquina++;
}

function intervenirSecuencial() {
  if (indiceMaquina < textos.length) {
    glitchTexto(textos[indiceMaquina]);
    indiceMaquina++;
  }
}

function inyectarResto(elemento) {
  const texto = elemento.textContent;
  const resto = restosMaquina[indiceMaquina % restosMaquina.length];

  elemento.textContent =
    texto.slice(0, Math.floor(texto.length * 0.85)) +
    "\n" +
    resto;

  indiceMaquina++;
}

/* =========================
   TIEMPOS NARRATIVOS
========================= */

// 45s — lectura humana
setTimeout(() => {
  textos.forEach((t, i) => {
    setTimeout(() => inyectarResto(t), i * 7000);
  });
}, 45000);

// 1:15 — entra el glitch progresivo
setTimeout(() => {
  setInterval(intervenirSecuencial, 12000);
}, 75000);

// 1:30 — colapso visual + audio + video
setTimeout(() => {
  // Desenfoque de texto
  document.querySelectorAll(".opaco").forEach(el => {
    el.style.filter = "blur(1px)";
  });

  // Fondo negro
  document.body.style.backgroundColor = "black";

  // Aparece el video
  if (finalAgua) {
    finalAgua.style.opacity = 1;
  }

  // Arranca el sonido
  sirena.play();

  // Fade in del audio
  let v = 0;
  const fade = setInterval(() => {
    v += 0.02;
    sirena.volume = Math.min(v, 0.6);
    if (v >= 0.6) clearInterval(fade);
  }, 200);

}, 90000);