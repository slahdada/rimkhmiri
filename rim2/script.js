/* ===== SCRIPT JS ===== */

// ---- LANGUAGE TOGGLE ----
let currentLang = 'fr';

function toggleLang() {
  currentLang = currentLang === 'fr' ? 'ar' : 'fr';
  applyLang();
}

function applyLang() {
  const isAr = currentLang === 'ar';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar', isAr);

  // Update lang button text
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = isAr ? 'FR' : 'عربي';

  // Translate all elements with data-fr / data-ar
  document.querySelectorAll('[data-fr]').forEach(el => {
    const text = el.getAttribute(isAr ? 'data-ar' : 'data-fr');
    if (text) {
      // If element has children tags (like icons), only update the text node
      if (el.querySelector('i, img, span')) {
        // find text nodes and update safely
        el.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = ' ' + text;
          }
        });
        // If no text node found, update innerText but preserve icons
        const spans = el.querySelectorAll('span[data-fr], span[data-ar]');
        if (spans.length === 0 && !el.querySelector('span')) {
          // just set inner html if safe
        }
      } else {
        el.innerHTML = text;
      }
    }
  });

  // Specifically handle elements with nested [data-fr] spans
  document.querySelectorAll('span[data-fr], p[data-fr], h1[data-fr], h2[data-fr], h3[data-fr], h4[data-fr], li[data-fr], a[data-fr], div[data-fr]').forEach(el => {
    const key = isAr ? 'data-ar' : 'data-fr';
    const val = el.getAttribute(key);
    if (val && !el.querySelector('[data-fr]')) {
      el.innerHTML = val;
    }
  });
}

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ---- MOBILE MENU ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ---- HERO PARTICLES ----
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 80 + 20;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

// ---- SCROLL REVEAL ----
function revealOnScroll() {
  const elements = document.querySelectorAll(
    '.product-card, .service-card, .news-card, .news-mini, .contact-card, .cat-card, .wimg, .why-text, .stat'
  );
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ---- SMOOTH ANCHOR SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- COPY IMAGES FROM ARTIFACT DIR ----
// Map image sources to artifact paths as fallbacks (handled by onerror in HTML)

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  revealOnScroll();
  applyLang(); // ensure initial state
});
