// ── comunidad.js ──

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── CONFIGURACIÓN FIREBASE ──
const firebaseConfig = {
  apiKey: "AIzaSyDMqtDGrGCEu7vLVVcMXYlBXU2GtBeTBTE",
  authDomain: "surgentes-cuenca.firebaseapp.com",
  projectId: "surgentes-cuenca",
  storageBucket: "surgentes-cuenca.firebasestorage.app",
  messagingSenderId: "785634473407",
  appId: "1:785634473407:web:d96f6c631fa808f85c1d0a",
  measurementId: "G-K72R91VS5C"
};

// ── CONFIGURACIÓN CLOUDINARY ──
const CLOUD_NAME    = "dpd9wmrn2";
const UPLOAD_PRESET = "fotos-cuenca";

// ── PALABRAS PROHIBIDAS ──
const PALABRAS_PROHIBIDAS = [
  "puta","puto","mierda","culo","forro","pelotudo","boludo","concha",
  "carajo","cago","cagar","pija","chota","hdp","hijo de puta",
  "bastardo","idiota","estupido","imbécil","gilipollas","coño"
];

function contienePalabraProhibida(texto) {
  const lower = texto.toLowerCase();
  return PALABRAS_PROHIBIDAS.some(p => lower.includes(p));
}

// ── INICIALIZAR FIREBASE ──
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── REFERENCIAS AL DOM ──
const inputDesc   = document.getElementById("input-desc");
const inputFoto   = document.getElementById("input-foto");
const fotoPreview = document.getElementById("foto-preview");
const btnEnviar   = document.getElementById("btn-enviar");
const statusMsg   = document.getElementById("status-msg");
const galeriaGrid = document.getElementById("galeria-grid");
const galeriaEmpty = document.getElementById("galeria-empty");

// ── VISTA PREVIA AL SELECCIONAR FOTO ──
inputFoto.addEventListener("change", () => {
  const file = inputFoto.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      fotoPreview.src = e.target.result;
      fotoPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// ── SUBIR FOTO A CLOUDINARY ──
async function subirFotoCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) throw new Error("Error al subir la imagen a Cloudinary");
  const data = await res.json();
  return data.secure_url;
}

// ── GUARDAR EN FIRESTORE ──
async function guardarEnFirestore(descripcion, urlFoto) {
  await addDoc(collection(db, "fotos-comunidad"), {
    descripcion,
    urlFoto,
    fecha: serverTimestamp()
  });
}

// ── MOSTRAR MENSAJE DE ESTADO ──
function setStatus(msg, tipo) {
  statusMsg.textContent = msg;
  statusMsg.className   = "status-msg " + tipo;
}

// ── ENVIAR FORMULARIO ──
btnEnviar.addEventListener("click", async () => {
  const desc = inputDesc.value.trim();
  const file = inputFoto.files[0];

  // Validaciones
  if (!desc) {
    setStatus("Escribí una descripción breve.", "err");
    return;
  }
  if (!file) {
    setStatus("Seleccioná una fotografía.", "err");
    return;
  }
  if (contienePalabraProhibida(desc)) {
    setStatus("Tu texto contiene palabras no permitidas. Por favor revisalo.", "err");
    return;
  }

  btnEnviar.disabled = true;
  setStatus("Subiendo fotografía...", "");

  try {
    const urlFoto = await subirFotoCloudinary(file);
    await guardarEnFirestore(desc, urlFoto);

    setStatus("¡Fotografía publicada! Gracias por contribuir.", "ok");

    // Limpiar formulario
    inputDesc.value = "";
    inputFoto.value = "";
    fotoPreview.style.display = "none";

    // Recargar galería
    cargarGaleria();

  } catch (err) {
    console.error(err);
    setStatus("Hubo un error al publicar. Intentá de nuevo.", "err");
  } finally {
    btnEnviar.disabled = false;
  }
});

// ── CARGAR GALERÍA DESDE FIRESTORE ──
async function cargarGaleria() {
  galeriaEmpty.textContent = "Cargando fotografías...";
  galeriaEmpty.style.display = "block";

  try {
    const q    = query(collection(db, "fotos-comunidad"), orderBy("fecha", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      galeriaEmpty.textContent = "Todavía no hay fotografías. ¡Sé el primero en subir una!";
      return;
    }

    galeriaEmpty.style.display = "none";

    // Limpiar grilla antes de cargar
    galeriaGrid.innerHTML = "";

    snap.forEach(doc => {
      const d    = doc.data();
      const item = document.createElement("div");
      item.className = "galeria-item";

      const fecha = d.fecha
        ? new Date(d.fecha.seconds * 1000).toLocaleDateString("es-AR", {
            day: "2-digit", month: "long", year: "numeric"
          })
        : "";

      item.innerHTML = `
        <img src="${d.urlFoto}" alt="Fotografía de la comunidad" loading="lazy">
        <div class="galeria-item-info">
          <p class="galeria-item-desc">${d.descripcion}</p>
          ${fecha ? `<p class="galeria-item-meta">${fecha}</p>` : ""}
        </div>
      `;

      galeriaGrid.appendChild(item);
    });

  } catch (err) {
    console.error(err);
    galeriaEmpty.textContent = "Error al cargar las fotografías.";
  }
}

// ── CARGAR GALERÍA AL INICIAR ──
cargarGaleria();
