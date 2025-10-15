// ==========================================================
//   COMMENTS SCRIPT (Frontend-only, LocalStorage-based)
//   Funktioniert auf GitHub Pages & lokal (file://)
// ==========================================================




// ----------------------------------------------------------
//   START – Automatisch nach DOM-Ladevorgang ausführen
// ----------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
	const wonder = document.body.dataset.wonder;  // z. B. "Chichen Itza"
	const localKey = `comments_${wonder.toLowerCase().replace(/\s+/g, "_")}`;

	
	initCommentForm(wonder, localKey);  // Formular aktivieren
	initPrivacyModal();         // DSGVO-Modal aktivieren
});



// ----------------------------------------------------------
//   DISPLAY COMMENTS – Zeigt alle Kommentare im Container an
// ----------------------------------------------------------
function displayComments(localKey) {
  const comments = JSON.parse(localStorage.getItem(localKey)) || [];
  const container = document.getElementById("commentsList");

  container.innerHTML = "";
  comments.forEach((c) => {
    const div = document.createElement("div");
    div.className = "comment-item";
    div.innerHTML = `
      <strong>${c.name}</strong> <em>(${c.date})</em><br>
      <p>${c.text}</p>
    `;
    container.appendChild(div);
  });
}

// ----------------------------------------------------------
//   DEFAULT COMMENTS – Je Weltwunder eigene Start-Kommentare
// ----------------------------------------------------------
function getDefaultComments(wonder) {
  const defaults = {
    "Chichen Itza": [
      { name: "Anna", text: "Ein faszinierender Ort voller Geschichte!", date: "2025-10-01" },
      { name: "Leon", text: "Die Pyramide ist beeindruckend – war mein Highlight in Mexiko!", date: "2025-10-03" }
    ],
    "Machu Picchu": [
      { name: "Sophie", text: "Kaum zu glauben, dass das alles von Hand gebaut wurde.", date: "2025-10-02" },
      { name: "David", text: "Die Aussicht war atemberaubend!", date: "2025-10-04" }
    ],
    "Kolosseum": [
      { name: "Maria", text: "Ich liebe Rom – das Kolosseum ist ein Muss!", date: "2025-09-30" },
      { name: "Jonas", text: "Man spürt dort die Geschichte richtig.", date: "2025-10-05" }
    ],
    "Taj Mahal": [
      { name: "Priya", text: "So schön, dass man kaum glauben kann, es sei echt.", date: "2025-10-01" },
      { name: "Lukas", text: "Die Symmetrie des Gebäudes ist unglaublich.", date: "2025-10-06" }
    ],
    "Petra": [
      { name: "Nina", text: "Die Felsenstadt war noch beeindruckender, als ich dachte!", date: "2025-10-02" },
      { name: "Ali", text: "Ein echtes Weltwunder – und das zu Recht.", date: "2025-10-04" }
    ],
    "Christusstatue": [
      { name: "Helena", text: "Die Aussicht von dort oben ist einfach nur wow!", date: "2025-10-03" },
      { name: "Carlos", text: "Rio ist ohne die Statue nicht denkbar.", date: "2025-10-05" }
    ],
    "Chinesische Mauer": [
      { name: "Ming", text: "Endlos und beeindruckend – ein Stück Weltgeschichte!", date: "2025-10-01" },
      { name: "Sarah", text: "Ich konnte gar nicht aufhören zu laufen.", date: "2025-10-06" }
    ]
  };

  // Fallback, falls ein Name nicht exakt übereinstimmt
  return defaults[wonder] || [
    { name: "Gast", text: "Noch keine Kommentare vorhanden.", date: "2025-10-01" }
  ];
}

// ----------------------------------------------------------
//   SAVE COMMENT – Speichert neuen Kommentar im LocalStorage
// ----------------------------------------------------------
function saveComment(localKey) {

	const nameInput = document.getElementById("commentName");
    const textInput = document.getElementById("commentText");
    const dsgvoCheckbox = document.getElementById("privacy");
    //const errorBox = document.getElementById("commentError");

    //errorBox.textContent = "";

    if (!nameInput.value.trim() || !textInput.value.trim()) {
      //errorBox.textContent = "Bitte alle Felder ausfüllen.";
      return;
    }

    if (!dsgvoCheckbox.checked) {
      //errorBox.textContent = "Bitte stimmen Sie den Datenschutzbestimmungen zu.";
      return;
    }
	
	const comments = JSON.parse(localStorage.getItem(localKey)) || [];

    const newComment = { name: nameInput.value.trim(),
                         text: textInput.value.trim(), 
                         date: new Date().toISOString().split("T")[0]
                         };
  
  // Neuen Kommentar OBEN einfügen
  comments.unshift(newComment);
  
  // Zurück in LocalStorage speichern
  localStorage.setItem(localKey, JSON.stringify(comments));
  
  // Kommentare neu anzeigen
  displayComments(localKey);
  
  // Formular leeren
  document.getElementById("commentForm").reset();
}


// ----------------------------------------------------------
//   RESET FUNCTION – Löscht alle Kommentare für das Weltwunder
// ----------------------------------------------------------
function resetComments(localKey, wonder) {
  if (confirm(`Alle Kommentare zu "${wonder}" löschen und zurücksetzen?`)) {
    const defaults = getDefaultComments(wonder);
    localStorage.setItem(localKey, JSON.stringify(defaults));
    displayComments(localKey);
    alert("Kommentare wurden auf Standardwerte zurückgesetzt.");
  }
}

// ----------------------------------------------------------
//  INIT COMMENT FORM – Aktiviert Formular + DSGVO-Prüfung
// ----------------------------------------------------------
function initCommentForm(wonder, localKey) {
	const form = document.getElementById("commentForm");
	if (!form) return;

	// Falls keine Kommentare vorhanden sind → Default-Kommentare setzen
	if (!localStorage.getItem(localKey)) {
		const defaults = getDefaultComments(wonder);
		localStorage.setItem(localKey, JSON.stringify(defaults));
	}
	
	// Kommentare aus localStorage anzeigen
	displayComments(localKey);  	

	// Formular-Event für neue Kommentare
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		saveComment(localKey);
	});
  
	// Reset-Button (falls vorhanden) aktivieren
	const resetBtn = document.getElementById("resetComments");
	if (resetBtn) {
		resetBtn.addEventListener("click", () => resetComments(localKey, wonder));
	}
  
}

// ----------------------------------------------------------
// INIT PRIVACY MODAL – DSGVO-Fenster initialisieren
// ----------------------------------------------------------
function initPrivacyModal() {
  const modal = document.getElementById("privacyModal");
  const openBtn = document.getElementById("openPrivacyModal");
  const closeBtn = document.querySelector(".privacy-modal-close");

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}


