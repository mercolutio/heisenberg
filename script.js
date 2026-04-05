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

// Multi-step contact form
const form = document.getElementById('kontakt-form');
const formSuccess = document.getElementById('form-success');

let currentStep = 1;

function goToStep(next) {
  const prevEl = document.getElementById('step-' + currentStep);
  const nextEl = document.getElementById('step-' + next);
  const progressSteps = form.querySelectorAll('.form-progress-step');
  const progressLines = form.querySelectorAll('.form-progress-line');

  prevEl.classList.remove('active');
  nextEl.classList.add('active');
  currentStep = next;

  progressSteps.forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 < currentStep) s.classList.add('done');
    if (i + 1 === currentStep) s.classList.add('active');
  });
  progressLines.forEach((l, i) => {
    l.classList.toggle('done', i + 1 < currentStep);
  });

  form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Step 1 → 2
document.getElementById('next-1').addEventListener('click', () => {
  const checked = form.querySelectorAll('input[name="services"]:checked');
  const err = document.getElementById('step1-error');
  if (checked.length === 0) { err.classList.add('visible'); return; }
  err.classList.remove('visible');
  goToStep(2);
});

// Step 2 → 1
document.getElementById('back-2').addEventListener('click', () => goToStep(1));

// Step 2 → 3
document.getElementById('next-2').addEventListener('click', () => goToStep(3));

// Step 3 → 2
document.getElementById('back-3').addEventListener('click', () => goToStep(2));

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const privacy = form.querySelector('#privacy').checked;
  const err = document.getElementById('step3-error');

  if (!name || !email || !privacy) {
    err.classList.add('visible');
    return;
  }
  err.classList.remove('visible');

  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Wird gesendet…';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('step-3').classList.remove('active');
    form.querySelector('.form-progress').style.display = 'none';
    formSuccess.classList.add('visible');
    form.reset();
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
