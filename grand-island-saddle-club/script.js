const dialog = document.querySelector('#detail-dialog');
const body = document.querySelector('#dialog-body');
let opener;
const callButton = '<a class="button" href="tel:+13083825063">Call (308) 382-5063</a>';
const content = {
  reservation: `<p class="eyebrow">Your next evening starts here</p><h2 id="dialog-title">Reserve a Table</h2><p>Reservations are available to current club members. Please call the club to reserve your table.</p>${callButton}`,
  membership: `<p class="eyebrow">Grand Island Saddle Club</p><h2 id="dialog-title">Member information</h2><p>The Saddle Club welcomes members and their guests. For membership information or help with your member account, please contact the club.</p>${callButton}`,
  menu: `<p class="eyebrow">From our kitchen</p><h2 id="dialog-title">Classics, done right.</h2><p>Fresh-cut steaks. Seafood favorites. The dishes that bring everyone back to the table.</p><ul class="menu-categories"><li>Steaks &amp; Prime Rib</li><li>Seafood &amp; Supper Club Favorites</li><li>Appetizers, Salads &amp; Desserts</li></ul><p>Please call for the current menu and dining specials.</p>${callButton}`,
  private: `<p class="eyebrow">Bring your people together</p><h2 id="dialog-title">A room for your occasion.</h2><p>Family celebrations, business dinners and evenings worth sharing.</p><ul class="menu-categories"><li>Lakeside — up to 100 guests · Lake views</li><li>Fireplace — up to 40 guests · A cozy setting</li></ul><p>Contact the club to discuss your gathering and room availability.</p>${callButton}`,
  lakeside: `<p class="eyebrow">Private dining</p><h2 id="dialog-title">Lakeside</h2><img src="assets/lakeside.png" alt="Lakeside dining room"><p>Up to 100 guests · Lake views</p><p>Contact the club to discuss your occasion and room availability.</p>${callButton}`,
  fireplace: `<p class="eyebrow">Private dining</p><h2 id="dialog-title">Fireplace</h2><img src="assets/fireplace.png" alt="Fireplace dining room"><p>Up to 40 guests · A cozy setting</p><p>Contact the club to discuss your occasion and room availability.</p>${callButton}`,
  story: `<p class="eyebrow">Part of Grand Island since 1945</p><h2 id="dialog-title">Rooted in tradition.<br>Ready to welcome you.</h2><p>The Saddle Club began with a shared love of horses and a place to gather. Over the years, that spirit grew into a private supper club built around good food and familiar faces.</p>`
};
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    opener = button;
    body.innerHTML = content[button.dataset.dialog];
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));

// Mobile navigation stays in the document flow and closes after selection.
const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('#main-navigation');
const mobileLayout = window.matchMedia('(max-width: 760px)');
function setNavigation(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mainNavigation.classList.toggle('is-open', open);
}
menuToggle.addEventListener('click', () => setNavigation(menuToggle.getAttribute('aria-expanded') !== 'true'));
mainNavigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setNavigation(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setNavigation(false);
    menuToggle.focus({preventScroll: true});
  }
});
mobileLayout.addEventListener('change', () => setNavigation(false));
