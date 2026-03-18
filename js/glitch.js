const rio = document.querySelector('.rio');

function glitch() {
  const colores = [
    'hue-rotate(90deg) saturate(3)',
    'hue-rotate(180deg) saturate(5)',
    'hue-rotate(270deg) saturate(4)',
    'hue-rotate(45deg) saturate(6) brightness(1.5)',
    'none'
  ];

  const duraciones = [80, 120, 60, 150, 200];

  let i = 0;
  const intervalo = setInterval(() => {
    rio.style.filter = colores[Math.floor(Math.random() * colores.length)];
    i++;
    if (i > 6) {
      clearInterval(intervalo);
      rio.style.filter = 'none';
    }
  }, duraciones[Math.floor(Math.random() * duraciones.length)]);
}

setInterval(() => {
  if (Math.random() > 0.6) glitch();
}, 2000);