const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');
const navLinks = [...nav.querySelectorAll('a')];

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function closeMenu() {
  header.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55%', threshold: 0 });

sections.forEach((section) => observer.observe(section));
document.querySelector('#year').textContent = new Date().getFullYear();

const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImg');
const modalNum = document.getElementById('modalNum');
const modalTitle = document.getElementById('modalTitle');
const modalEn = document.getElementById('modalEn');
const modalDesc = document.getElementById('modalDesc');
const modalGallery = document.getElementById('modalGallery');
const modalClose = document.querySelector('.modal-close');
const gridArticles = document.querySelectorAll('.product-grid article');
let lastFocused = null;

function openProduct(article) {
  lastFocused = document.activeElement;
  const img = article.querySelector('img');
  const num = article.querySelector('span');
  const title = article.querySelector('h3');
  const en = article.querySelector('p');
  const desc = article.dataset.desc || '';

  modalImg.src = img.src;
  modalImg.alt = img.alt;
  modalNum.textContent = num.textContent;
  modalTitle.textContent = title.textContent;
  modalEn.textContent = en.textContent;
  modalDesc.textContent = desc;
  let gallery = [];
  try { gallery = JSON.parse(article.dataset.gallery || '[]'); } catch (e) { gallery = []; }
  if (gallery.length) {
    modalGallery.innerHTML = gallery.map((src, i) => `<figure><img src="${src}" alt="資料 ${i + 1}"><figcaption>資料 ${i + 1}</figcaption></figure>`).join('');
    modalGallery.style.display = 'grid';
  } else {
    modalGallery.innerHTML = '';
    modalGallery.style.display = 'none';
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeProduct() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

gridArticles.forEach((article) => {
  article.addEventListener('click', () => openProduct(article));
  article.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProduct(article); }
  });
});

modalClose.addEventListener('click', closeProduct);
modal.addEventListener('click', (e) => { if (e.target === modal) closeProduct(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeProduct(); });