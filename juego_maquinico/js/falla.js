const textos = document.querySelectorAll("p");
const colores = document.querySelector("codigo");
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

function glitchTexto(elemento) {
  let original = elemento.textContent;
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

function duplicarLetra(l) {
  return l + l;
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
    texto.slice(0, Math.floor(texto.length * 0.9)) +
    "\n" +
    resto;

  indiceMaquina++;
}

setTimeout(() => {
  textos.forEach((t, i) => {
    setTimeout(() => inyectarResto(t), i * 6000);
  });
}, 30000); // 1 minuto completo de lectura humana

setTimeout(() => {
  setInterval(intervenirSecuencial, 12000);
}, 60000);

setTimeout(() => {
  document.querySelector(".log").style.filter = "blur(1px)";
}, 12000);

setTimeout(() => {
  document.querySelector(".opaco").style.filter = "blur(1px)";
}, 12000);

setTimeout(() => {
  document.getElementById("final-agua").style.opacity = 1;
}, 80000);