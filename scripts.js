
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.hamburger');
  const navMenu = document.getElementById('menu');
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    menuToggle.classList.toggle('active');
  });
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('active');
      }
    });
  });
});
const animateElements = document.querySelectorAll('.animate-scroll');
const isVisible = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
};
const checkVisibility = () => {
  animateElements.forEach((el) => {
    if (isVisible(el)) {
      el.classList.add('is-visible');
    } else {
      el.classList.remove('is-visible');
    }
  });
};
window.addEventListener('scroll', checkVisibility);
document.addEventListener('DOMContentLoaded', checkVisibility);
const projectImages = document.querySelectorAll('.project-image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
projectImages.forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  });
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target === closeBtn) {
    lightbox.style.display = 'none';
  }
});
