  const mail = document.getElementById("mail");
  const copiado = document.getElementById("copiado");

  mail.addEventListener("click", () => {
    const texto = mail.innerText;

    navigator.clipboard.writeText(texto).then(() => {
      copiado.classList.add("visible");

      setTimeout(() => {
        copiado.classList.remove("visible");
      }, 1500);
    });
  });