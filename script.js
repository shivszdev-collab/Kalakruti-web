const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '✕' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('show');
  if (searchBar.classList.contains('show')) searchInput.focus();
});
function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;
  document.querySelectorAll('.product-card').forEach(card => {
    const match = card.dataset.name.toLowerCase().includes(query);
    card.classList.toggle('hidden-card', !match);
    if (match) count++;
  });
  document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
  showToast(query ? `${count} collection${count === 1 ? '' : 's'} found` : 'Showing all collections');
}
document.getElementById('searchButton').addEventListener('click', filterProducts);
searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') filterProducts(); });
searchInput.addEventListener('input', () => {
  if (!searchInput.value.trim()) document.querySelectorAll('.product-card').forEach(card => card.classList.remove('hidden-card'));
});

document.querySelectorAll('.category-card').forEach(card => card.addEventListener('click', () => {
  const category = card.dataset.category;
  searchInput.value = category.replace('Traditional 6 & 9 Yard Sarees', '6 Yard & 9 Yard Sarees');
  document.querySelectorAll('.product-card').forEach(item => {
    const query = searchInput.value.toLowerCase();
    item.classList.toggle('hidden-card', !item.dataset.name.toLowerCase().includes(query.split(' ')[0]) && !item.dataset.name.toLowerCase().includes(category.toLowerCase()));
  });
}));

let enquiryCount = 0;
document.querySelectorAll('.enquire-btn').forEach(button => button.addEventListener('click', () => {
  const product = button.dataset.product;
  enquiryCount++;
  document.getElementById('cartCount').textContent = enquiryCount;
  const message = `Hello Kalakruti Textiles, I would like to enquire about ${product}. Please share available designs and prices.`;
  // Replace the number in the WhatsApp URL with the store's WhatsApp number, including country code.
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
}));
document.getElementById('year').textContent = new Date().getFullYear();
