// ═══════════════════════════════════════════════════════════════
//   RIM KHMIRI — ADVERTISING PAGE SCRIPT
// ═══════════════════════════════════════════════════════════════

// ── DICTIONNAIRE DE TRADUCTIONS ─────────────────────────────────
const TRANSLATIONS = {
  fr: {
    nav_home: 'Accueil', nav_about: 'À Propos', nav_gallery: 'Galerie',
    nav_contact: 'Contact', nav_cta: 'Me Rejoindre',
    hero_title1: 'Formation', hero_title3: 'Certifiée 🇹🇳',
    hero_subtitle: 'Spécialiste certifiée par l\'État Tunisien · Extensions cils & sourcils\nRejoignez la formation et maîtrisez les techniques professionnelles.',
    hero_cta_video: 'Voir le Reel', hero_cta_form: 'S\'inscrire à la Formation →',
    vid_label: '— Vidéo Principale —', vid_title: 'Le Reel', vid_title2: 'Original',
    vid_sub: '38 secondes d\'élégance, de confiance et de professionnalisme authentique',
    about_verified: 'Compte Vérifié ✓', about_label: '— À Propos —', about_title: 'Artiste Du',
    about_desc1: 'Rim Khmiri est une spécialiste certifiée par l\'État Tunisien dans les soins esthétiques des cils et sourcils. Avec une maîtrise professionnelle des techniques d\'extension et de mise en forme, elle forme la nouvelle génération d\'esthéticiennes.',
    about_desc2: 'Titulaire de son diplôme SmartPRO — Certificat de Formation Professionnelle, elle propose des formations certifiantes en: extension de cils, teinture & laminage de sourcils.',
    gal_label: '— Galerie —', gal_title: 'Moments', gal_title2: 'Clés',
    gal_sub: 'Visuel, authenticité et impact — captures de l\'essence du contenu de Rim Khmiri',
    feat_label: '— Pourquoi Suivre —', feat_title: 'Points', feat_title2: 'Forts',
    cta_label: '— Rejoindre —', cta_title: 'Rejoignez la', cta_title2: 'Formation',
    cta_title3: 'Rmouch & Hawajib !',
    cta_desc: 'Inscrivez-vous à la formation certifiante de Rim Khmiri — techniques professionnelles, kit fourni, et diplôme reconnu par l\'État Tunisien. Lancez votre carrière dans la beauté dès aujourd\'hui.',
    cta_btn: 'Voir le Reel',
  },
  en: {
    nav_home: 'Home', nav_about: 'About', nav_gallery: 'Gallery',
    nav_contact: 'Contact', nav_cta: 'Join Now',
    hero_title1: 'Training Program', hero_title3: 'Certified 🇹🇳',
    hero_subtitle: 'State-certified specialist in Tunisia · Lash & Brow Extensions\nJoin the training and master professional techniques.',
    hero_cta_video: 'Watch the Reel', hero_cta_form: 'Register for Training →',
    vid_label: '— Main Video —', vid_title: 'The Reel', vid_title2: 'Original',
    vid_sub: '38 seconds of elegance, confidence and authentic professionalism',
    about_verified: 'Verified Account ✓', about_label: '— About —', about_title: 'Artist of',
    about_desc1: 'Rim Khmiri is a specialist certified by the Tunisian State in aesthetic care for lashes and brows. With professional mastery of extension and shaping techniques, she trains the next generation of beauty specialists.',
    about_desc2: 'Holder of her SmartPRO diploma — Professional Training Certificate, she offers certified training in: lash extensions, brow tinting & lamination.',
    gal_label: '— Gallery —', gal_title: 'Key', gal_title2: 'Moments',
    gal_sub: 'Visual, authenticity and impact — captures of the essence of Rim Khmiri\'s content',
    feat_label: '— Why Follow —', feat_title: 'Key', feat_title2: 'Strengths',
    cta_label: '— Join —', cta_title: 'Join the', cta_title2: 'Training',
    cta_title3: 'Rmouch & Hawajib !',
    cta_desc: 'Enroll in Rim Khmiri\'s certified training — professional techniques, kit included, and diploma recognized by the Tunisian State. Launch your beauty career today.',
    cta_btn: 'Watch the Reel',
  }
};

let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];

  // Mettre à jour tous les éléments data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.documentElement.setAttribute('lang', lang);

  // Forcer le curseur personnalisé à rester visible et actif
  const cursorEl = document.getElementById('cursor');
  const followerEl = document.getElementById('cursorFollower');
  if (cursorEl) { cursorEl.style.display = 'block'; cursorEl.style.visibility = 'visible'; }
  if (followerEl) { followerEl.style.display = 'block'; followerEl.style.visibility = 'visible'; }

  // Marquer le bouton actif
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Sauvegarder la préférence
  localStorage.setItem('rk_lang', lang);
}

// ── TOGGLE THÈME ─────────────────────────────────────────────────
function toggleTheme() {
  const root = document.documentElement;
  const icon = document.querySelector('.theme-icon');
  const isLight = root.getAttribute('data-theme') === 'light';

  if (isLight) {
    root.removeAttribute('data-theme');
    icon.textContent = '☀️';
    localStorage.setItem('rk_theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    icon.textContent = '🌙';
    localStorage.setItem('rk_theme', 'light');
  }
}

// Restaurer préférences au chargement
(function restorePrefs() {
  const savedTheme = localStorage.getItem('rk_theme');
  const savedLang = localStorage.getItem('rk_lang');
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = '🌙';
  }
  if (savedLang && TRANSLATIONS[savedLang]) {
    setTimeout(() => setLang(savedLang), 0);
  }
})();


// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .gallery-card, .feature-card, .video-container').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    follower.style.width = '56px';
    follower.style.height = '56px';
    follower.style.opacity = '0.5';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.opacity = '1';
  });
});

// ── Navbar Scroll ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Particle Canvas ─────────────────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5
      ? `rgba(168,85,247,${this.opacity})`
      : `rgba(236,72,153,${this.opacity})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── Stat Counter Animation ─────────────────────────────────────
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'));
  if (!target) return;
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 40);
}

// ── Intersection Observer — AOS + counters ─────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      // trigger count if stat-number
      const counters = entry.target.querySelectorAll ? entry.target.querySelectorAll('.stat-number[data-target]') : [];
      counters.forEach(animateCount);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Trigger counters when hero is visible
const heroSection = document.getElementById('hero');
if (heroSection) {
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number[data-target]').forEach(animateCount);
        heroObs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  heroObs.observe(heroSection);
}

// ── Gallery Lightbox ──────────────────────────────────────────
const galleryCards = document.querySelectorAll('.gallery-card');
galleryCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('.gallery-img');
    if (!img) return;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9998;
      background:rgba(0,0,0,0.92);
      display:flex; align-items:center; justify-content:center;
      cursor:zoom-out; backdrop-filter:blur(12px);
      animation: fadeIn 0.3s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = `
      max-width:90vw; max-height:90vh;
      border-radius:16px;
      box-shadow:0 32px 80px rgba(0,0,0,0.8);
      animation: scaleIn 0.3s ease;
    `;
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);

    // Inject keyframes for lightbox if not present
    if (!document.getElementById('lightboxStyles')) {
      const style = document.createElement('style');
      style.id = 'lightboxStyles';
      style.textContent = `
        @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { transform:scale(0.9); } to { transform:scale(1); } }
      `;
      document.head.appendChild(style);
    }

    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.remove(); }, { once: true });
  });
});

// ── Video Placeholder click ────────────────────────────────────
const playBtn = document.getElementById('playVideoBtn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    // If a real video element exists, play it; otherwise show info
    const vid = document.getElementById('mainVideo');
    if (vid) {
      vid.style.display = 'block';
      vid.play();
      playBtn.style.display = 'none';
    } else {
      // Pulse animation to indicate "coming soon" or link to Facebook
      playBtn.style.transform = 'scale(1.2)';
      setTimeout(() => { playBtn.style.transform = 'scale(1)'; }, 300);
    }
  });
}

// ── Smooth Nav active state ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });

// ── Tilt effect on gallery cards ───────────────────────────────
galleryCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c✨ Rim Khmiri — Formation Rmouch & Hawajib', 'color:#a855f7; font-size:1.1rem; font-weight:bold;');
