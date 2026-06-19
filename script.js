/* ============ Chameleon — concept redesign ============ */

// --- current year in footer ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- mobile nav toggle ---
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// --- scroll reveal ---
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// --- chameleon: shift the accent color through the 6 game colors as you scroll ---
const PALETTE = [
  [255, 77, 94],   // red
  [255, 138, 61],  // orange
  [255, 206, 61],  // yellow
  [47, 208, 127],  // green
  [61, 155, 255],  // blue
  [155, 93, 229],  // purple
];
const lerp = (a, b, t) => Math.round(a + (b - a) * t);
// darkened counterparts — used wherever the accent is TEXT (each ≥4.5:1 on white, WCAG AA)
const PALETTE_TEXT = [
  [183, 18, 42],   // dark red
  [171, 88, 0],    // dark orange
  [115, 84, 0],    // dark yellow
  [0, 126, 72],    // dark green
  [0, 89, 194],    // dark blue
  [98, 44, 171],   // dark purple
];
function mix(pal, p) {
  const seg = (pal.length - 1) * Math.max(0, Math.min(1, p));
  const i = Math.min(Math.floor(seg), pal.length - 2);
  const t = seg - i;
  const a = pal[i], b = pal[i + 1];
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}
const rgbAt = (p) => mix(PALETTE, p);
const textRgbAt = (p) => mix(PALETTE_TEXT, p);
const progressBar = document.getElementById('progress');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    if (!reduceMotion) {
      const [r, g, b] = rgbAt(p);
      const [tr, tg, tb] = textRgbAt(p);
      h.style.setProperty('--accent', `rgb(${r},${g},${b})`);
      h.style.setProperty('--accent-wash', `rgba(${r},${g},${b},0.10)`);
      h.style.setProperty('--accent-soft', `rgba(${r},${g},${b},0.22)`);
      h.style.setProperty('--accent-text', `rgb(${tr},${tg},${tb})`);
      progressBar.style.width = (p * 100) + '%';
    }
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* --- links ---
   This is a CONCEPT redesign. The live store runs on Shopify; to make it real,
   point these at the actual Shopify product / cart / permalink URLs (and the real
   Instagram + contact). For now buy buttons open the existing store so the page
   is clickable end-to-end. */
const STORE = {
  base: 'https://chameleoncardgame.com',
  single: 'https://chameleoncardgame.com/products/chameleon-playing-cards',
  double: 'https://chameleoncardgame.com/products/chameleon-card-game-2-decks',
  five: 'https://chameleoncardgame.com/products/chameleon-card-game-5-decks',
  instagram: 'https://www.instagram.com/chameleoncardgame',
  contact: 'https://chameleoncardgame.com/pages/contact',
};

document.querySelectorAll('[data-buy]').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(STORE[btn.dataset.buy] || STORE.base, '_blank', 'noopener');
  })
);
document.querySelectorAll('[data-link]').forEach((a) =>
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(STORE[a.dataset.link] || STORE.base, '_blank', 'noopener');
  })
);
