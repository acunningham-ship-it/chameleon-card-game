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

/* --- links ---
   This is a CONCEPT redesign. The live store runs on Shopify; to make it real,
   point these at the actual Shopify product / cart / permalink URLs (and the real
   Instagram + contact). For now buy buttons open the existing store so the page
   is clickable end-to-end. */
const STORE = {
  base: 'https://chameleoncardgame.com',
  // TODO: replace with real Shopify cart-permalink URLs, e.g.
  //   single: 'https://chameleoncardgame.com/cart/VARIANT_ID:1'
  single: 'https://chameleoncardgame.com',
  double: 'https://chameleoncardgame.com',
  five: 'https://chameleoncardgame.com',
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
