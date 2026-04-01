// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-cta)');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinkEls.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === current || (current === '' && href === '#')) {
      link.classList.add('active');
    }
  });
});

// Contact form
const form = document.getElementById('kontakt-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const privacy = form.querySelector('#privacy').checked;

  if (!name || !email || !privacy) {
    if (!privacy) {
      form.querySelector('#privacy').focus();
    }
    return;
  }

  // Simulate submission
  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('visible');
    form.reset();
    btn.textContent = 'Kostenlos anfragen →';
    btn.disabled = false;
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 900);
});

// Animate stats on scroll
const stats = document.querySelectorAll('.stat-number');

const animateStat = (el) => {
  const target = parseFloat(el.textContent.replace('.', '').replace(',', '.'));
  const isFloat = el.textContent.includes('.');
  let start = 0;
  const duration = 1400;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    if (isFloat) {
      el.textContent = value.toLocaleString('de-DE');
    } else {
      el.textContent = value.toLocaleString('de-DE');
    }
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('de-DE');
  };
  requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStat(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.why-card, .service-card, .service-card-sm, .about-feature, .hero-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  fadeObserver.observe(el);
});
