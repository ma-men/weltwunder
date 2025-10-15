// JavaScript Document

document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const totalSlides = slides.length;
  
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  //const counter = document.querySelector('.slide-counter');

  const modal = document.getElementById('img-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close-img-modal');

  // --- Sicherheitscheck ---
  if (slides.length === 0) {
    console.error("Keine Slides gefunden! Bitte prüfe die HTML-Struktur.");
    return;
  }
  
  
  function showSlide(index) {
    dots.forEach(dot => dot.classList.remove("active"));
  
	slides.forEach((s, i) => {
		s.classList.toggle('active', i === index);
		currentSlide = index;
	});

	// Dots aktualisieren
	dots.forEach((dot, i) => {
		dot.classList.toggle('active', i === index);
	});
}

  // --- Weiter / Zurück Steuerung ---
  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides; //  springt bei Ende zurück auf 0
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides; //  springt bei Anfang auf letztes Bild
    showSlide(prev);
  }
  
  document.querySelector('.next').addEventListener('click', nextSlide);	
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // --- Automatische Wiedergabe ---
  let slideTimer = setInterval(nextSlide, 5000); // 5 Sekunden

  // --- Buttons ---
  if (next) next.addEventListener('click', () => {
    clearInterval(slideTimer);
    nextSlide();
    slideTimer = setInterval(nextSlide, 5000);
  });

  if (prev) prev.addEventListener('click', () => {
    clearInterval(slideTimer);
    prevSlide();
    slideTimer = setInterval(nextSlide, 5000);
  });

  // --- Modal für Großansicht ---
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // --- Start ---
  showSlide(currentSlide);
});
