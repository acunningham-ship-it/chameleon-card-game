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
function accentAt(p) {
  const seg = (PALETTE.length - 1) * Math.max(0, Math.min(1, p));
  const i = Math.min(Math.floor(seg), PALETTE.length - 2);
  const t = seg - i;
  const a = PALETTE[i], b = PALETTE[i + 1];
  return `rgb(${lerp(a[0], b[0], t)},${lerp(a[1], b[1], t)},${lerp(a[2], b[2], t)})`;
}
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
    if (!reduceMotion) h.style.setProperty('--accent', accentAt(p));
    progressBar.style.width = (p * 100) + '%';
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
  instagram: 'https://instagram.com/', // TODO: real handle
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
