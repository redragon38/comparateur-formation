// Données des formations
const formations = [
  {
    title: "Formation Marketing Digital",
    level: "tout niveau",
    category: "Marketing Digital",
    duration: "6 mois",
    price: "2 500€",
    rating: 4.8,
    link: "#",
    badge: "popular"
  },
  {
    title: "Intelligence Artificielle & Machine Learning",
    level: "tout niveau",
    category: "IA",
    duration: "8 mois",
    price: "3 200€",
    rating: 4.9,
    link: "#",
    badge: "new"
  },
  {
    title: "Cybersécurité Avancée",
    level: "Salarié, Entreprise",
    category: "Cybersécurité",
    duration: "10 mois",
    price: "3 800€",
    rating: 4.7,
    link: "#",
    badge: "popular"
  },
  {
    title: "Data Analyst Professionnel",
    level: "tout niveau",
    category: "DATA ANALYSTE",
    duration: "7 mois",
    price: "2 900€",
    rating: 4.6,
    link: "#",
    badge: "new"
  },
  {
    title: "Anglais Professionnel",
    level: "tout niveau",
    category: "langue",
    duration: "4 mois",
    price: "1 200€",
    rating: 4.5,
    link: "#"
  },
  {
    title: "Management d'Équipe",
    level: "Salarié, Entreprise",
    category: "Management",
    duration: "5 mois",
    price: "2 100€",
    rating: 4.7,
    link: "#"
  },
  {
    title: "Photographie Professionnelle",
    level: "tout niveau or étudiant",
    category: "Photographie",
    duration: "6 mois",
    price: "1 800€",
    rating: 4.4,
    link: "#"
  },
  {
    title: "CAP Esthétique",
    level: "tout niveau or étudiant",
    category: "Esthétique",
    duration: "12 mois",
    price: "2 400€",
    rating: 4.6,
    link: "#"
  },
  {
    title: "BTS Diététique",
    level: "tout niveau or étudiant",
    category: "Diététique",
    duration: "24 mois",
    price: "4 500€",
    rating: 4.8,
    link: "#"
  },
  {
    title: "Gestionnaire de Paie",
    level: "Salarié, Entreprise",
    category: "Gestionnaire de paie",
    duration: "8 mois",
    price: "2 800€",
    rating: 4.5,
    link: "#"
  },
  {
    title: "Secrétariat Médical",
    level: "tout niveau",
    category: "Secrétariat",
    duration: "6 mois",
    price: "1 900€",
    rating: 4.3,
    link: "#"
  },
  {
    title: "Gestion de Projet Agile",
    level: "Salarié, Entreprise",
    category: "Gestion de Projet",
    duration: "5 mois",
    price: "2 600€",
    rating: 4.7,
    link: "#"
  }
];

// Variables de filtrage
let currentLevelFilter = "";
let currentCategoryFilter = "";
let currentSearchTerm = "";

// Fonction pour afficher les formations
function displayFormations(formationsToDisplay) {
  const grid = document.getElementById('coursesGrid');
  const noResults = document.getElementById('noResults');
  
  if (formationsToDisplay.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  
  noResults.style.display = 'none';
  
  grid.innerHTML = formationsToDisplay.map(formation => `
    <div class="course-card">
      <div class="course-header">
        <div>
          <h3 class="course-title">${formation.title}</h3>
        </div>
        ${formation.badge ? `<span class="badge ${formation.badge}">${formation.badge === 'new' ? 'Nouveau' : 'Populaire'}</span>` : ''}
      </div>
      
      <div class="course-meta">
        <span class="meta-item">📅 ${formation.duration}</span>
        <span class="meta-item">💰 ${formation.price}</span>
        <span class="meta-item">🎓 ${formation.level}</span>
      </div>
      
      <span class="category-tag">${formation.category}</span>
      
      <div class="course-footer">
        <div class="rating">
          ⭐ ${formation.rating}/5
        </div>
        <a href="${formation.link}" class="view-btn">Voir la formation →</a>
      </div>
    </div>
  `).join('');
  
  // Mettre à jour le compteur
  document.getElementById('totalFormations').textContent = formationsToDisplay.length;
}

// Fonction de filtrage
function filterFormations() {
  let filtered = formations;
  
  // Filtre par niveau
  if (currentLevelFilter) {
    filtered = filtered.filter(f => f.level.includes(currentLevelFilter));
  }
  
  // Filtre par catégorie
  if (currentCategoryFilter) {
    filtered = filtered.filter(f => f.category === currentCategoryFilter);
  }
  
  // Filtre par recherche
  if (currentSearchTerm) {
    filtered = filtered.filter(f => 
      f.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );
  }
  
  displayFormations(filtered);
}

// Gestion des boutons de filtre de niveau
document.getElementById('levelFilters').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('#levelFilters .filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton cliqué
    e.target.classList.add('active');
    
    // Mettre à jour le filtre
    currentLevelFilter = e.target.dataset.level;
    filterFormations();
  }
});

// Gestion des boutons de filtre de catégorie
document.getElementById('categoryFilters').addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('#categoryFilters .filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton cliqué
    e.target.classList.add('active');
    
    // Mettre à jour le filtre
    currentCategoryFilter = e.target.dataset.category;
    filterFormations();
  }
});

// Gestion de la recherche
document.getElementById('searchInput').addEventListener('input', (e) => {
  currentSearchTerm = e.target.value;
  filterFormations();
});

// Affichage initial
displayFormations(formations);