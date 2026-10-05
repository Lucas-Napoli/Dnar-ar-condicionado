const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
const desktopQuery = window.matchMedia('(min-width: 901px)');
desktopQuery.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const heroVideo = document.querySelector('.hero-video');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (heroVideo) {
  function updateHeroPlayback() {
    if (reducedMotionQuery.matches) {
      heroVideo.pause();
      heroVideo.autoplay = false;
    } else {
      heroVideo.autoplay = true;
      heroVideo.play().catch(() => {
        // A imagem de capa permanece quando a reprodução automática é bloqueada.
      });
    }
  }
  reducedMotionQuery.addEventListener('change', updateHeroPlayback);
  updateHeroPlayback();
}
