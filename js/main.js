/* ===================================
   CLEANX - Main JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initContactForm();
});

/* --- Navbar --- */
function initNavbar() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click (mobile)
    menu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // Active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    const required = ['nombre', 'email', 'mensaje'];
    const missing = required.filter(field => !data[field]?.trim());

    if (missing.length) {
      showFormMessage('Por favor, completá todos los campos obligatorios.', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormMessage('Por favor, ingresá un email válido.', 'error');
      return;
    }

    // Simulate submission
    const submitBtn = form.querySelector('.form__submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
      showFormMessage('¡Gracias por contactarnos! Te responderemos a la brevedad.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
    }, 1000);
  });
}

function showFormMessage(text, type) {
  let msg = document.querySelector('.form__message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'form__message';
    const form = document.getElementById('contactForm');
    form.appendChild(msg);
  }

  msg.textContent = text;
  msg.style.padding = '0.75rem 1rem';
  msg.style.borderRadius = '0.5rem';
  msg.style.marginTop = '1rem';
  msg.style.fontWeight = '500';
  msg.style.fontSize = '0.875rem';

  if (type === 'success') {
    msg.style.backgroundColor = '#dcfce7';
    msg.style.color = '#166534';
    msg.style.border = '1px solid #bbf7d0';
  } else {
    msg.style.backgroundColor = '#fef2f2';
    msg.style.color = '#991b1b';
    msg.style.border = '1px solid #fecaca';
  }

  setTimeout(() => {
    msg.remove();
  }, 5000);
}
