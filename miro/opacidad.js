const nota = document.querySelector(".nota-archivo");
nota.style.opacity = 0;

setTimeout(() => {
  nota.style.transition = "opacity 2s";
  nota.style.opacity = 0.6;
}, 20000);