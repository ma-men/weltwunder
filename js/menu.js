// JavaScript Document

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("side-menu");

  // Öffnen/schließen bei Klick
  hamburger.addEventListener("mouseenter", () => {
    menu.classList.toggle("open");
  });
  
  hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
});

  // Menü automatisch schließen, wenn Maus den Bereich verlässt
  menu.addEventListener("mouseleave", () => {
    menu.classList.remove("open");
  });
});