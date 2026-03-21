const links = document.querySelectorAll(".menu a");
const preview = document.getElementById("preview");

links.forEach(link => {
  link.addEventListener("mouseenter", (e) => {
    const img = link.getAttribute("data-img");
    if (img) {
      preview.style.backgroundImage = `url(${img})`;
      preview.style.opacity = '1';
    }
  });

  link.addEventListener("mousemove", (e) => {
    preview.style.left = e.clientX + "px";
    preview.style.top = e.clientY + "px";
  });

  link.addEventListener("mouseleave", () => {
    preview.style.opacity = '0';
  });
});