/* ===========================
   EDINTERN - Global JavaScript
   =========================== */

/* ── Slider ── */
(function () {
  const slides = document.querySelectorAll('.ed-slide');
  const dotsWrap = document.querySelector('.ed-slider-dots');
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap && dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.ed-slider-dots .dot')[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    document.querySelectorAll('.ed-slider-dots .dot')[current]?.classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 4000);
  }

  slides[0].classList.add('active');
  resetTimer();
})();


/* ── Internship Form Validation ── */
(function () {
  const form = document.getElementById('internForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    showToast('✓ Internship application submitted successfully!', 'success');
    form.reset();
    form.classList.remove('was-validated');
  });
})();


/* ── Job Application Form Validation ── */
(function () {
  const form = document.getElementById('jobForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    showToast('✓ Job application submitted successfully!', 'success');
    form.reset();
    form.classList.remove('was-validated');
  });
})();


/* ── Login Form ── */
(function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
      showToast('✓ Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'index.html'; }, 1800);
    } else {
      showToast('✗ Invalid credentials. Please try again.', 'danger');
      document.getElementById('password').value = '';
    }
  });
})();


/* ── Toast Notification ── */
function showToast(message, type = 'success') {
  // Remove existing
  const existing = document.getElementById('ed-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'ed-toast';
  toast.innerHTML = message;

  const colors = {
    success: 'linear-gradient(135deg, #1a2e6c, #2a4098)',
    danger:  'linear-gradient(135deg, #b91c1c, #dc2626)'
  };

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   colors[type] || colors.success,
    color:        '#fff',
    padding:      '.9rem 1.6rem',
    borderRadius: '10px',
    fontFamily:   "'DM Sans', sans-serif",
    fontWeight:   '500',
    fontSize:     '.95rem',
    boxShadow:    '0 8px 30px rgba(0,0,0,.25)',
    zIndex:       '9999',
    opacity:      '0',
    transform:    'translateY(20px)',
    transition:   'all .35s cubic-bezier(.4,0,.2,1)'
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ── Active nav link highlight ── */
(function () {
  const links = document.querySelectorAll('.ed-navbar .nav-link');
  const page  = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
})();
