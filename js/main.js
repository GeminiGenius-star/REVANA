// Revana shared script — reveal animations, mobile nav toggle, form submit.

// Scroll-reveal
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
}

// Mobile hamburger menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// Inquiry / booking form (Formspree)
const form = document.querySelector('.form-wrapper form');
const formSuccess = document.getElementById('formSuccess');
if (form && formSuccess) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalLabel = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
      } else {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    } catch (err) {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });
}
