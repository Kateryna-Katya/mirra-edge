document.addEventListener("DOMContentLoaded", () => {

  // 1. Инициализация иконок (Lucide)
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. Настройка GSAP + Lenis
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
  });

  // Связка кадров Lenis и GSAP
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 3. Анимации (GSAP)
  // Анимация Hero
  const heroTl = gsap.timeline();
  heroTl.from('.hero__title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__buttons', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__visual', { scale: 0.9, opacity: 0, duration: 1.2 }, '-=1');

  // Анимация секций
  const sections = document.querySelectorAll('.section-title, .feature-card, .metric-card, .blog-card, .contact__container, .step-card, .innovation__wrapper');

  sections.forEach((section) => {
      gsap.fromTo(section,
          { y: 50, opacity: 0, visibility: 'hidden' },
          {
              scrollTrigger: {
                  trigger: section,
                  start: "top 85%",
                  toggleActions: "play none none reverse"
              },
              y: 0, opacity: 1, visibility: 'visible', duration: 0.8, ease: "power2.out",
              onStart: () => { section.style.visibility = 'visible'; }
          }
      );
  });

  window.addEventListener("load", () => {
      ScrollTrigger.refresh();
  });

  // 4. Мобильное Меню
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.header__link');
  const body = document.body;

  const toggleMenu = () => {
      if (!nav || !burger) return;
      nav.classList.toggle('is-active');
      burger.classList.toggle('is-active');
      body.classList.toggle('no-scroll');
  };

  if (burger) burger.addEventListener('click', toggleMenu);
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (nav.classList.contains('is-active')) toggleMenu();
      });
  });

  // 5. Валидация формы
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
      const num1 = Math.floor(Math.random() * 5) + 1;
      const num2 = Math.floor(Math.random() * 5) + 1;
      const captchaLabel = document.getElementById('captchaLabel');
      const captchaInput = document.getElementById('captchaInput');

      if (captchaLabel) captchaLabel.textContent = `Сколько будет ${num1} + ${num2}?`;

      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          let isValid = true;
          const statusDiv = document.querySelector('.form-status');

          document.querySelectorAll('.form-group input').forEach(inp => inp.classList.remove('error'));
          document.querySelectorAll('.form-checkbox').forEach(box => box.classList.remove('error'));

          // Валидация полей
          const name = document.getElementById('name');
          if (name && name.value.trim().length < 2) { name.classList.add('error'); isValid = false; }

          const email = document.getElementById('email');
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('error'); isValid = false; }

          const phone = document.getElementById('phone');
          if (phone && (phone.value.length < 8 || !/^[0-9]+$/.test(phone.value))) { phone.classList.add('error'); isValid = false; }

          // Капча
          if (captchaInput && parseInt(captchaInput.value) !== (num1 + num2)) {
              captchaInput.classList.add('error'); isValid = false;
              statusDiv.textContent = 'Ошибка в примере'; statusDiv.style.color = '#ef4444';
          }

          // Чекбокс
          const policyCheckbox = document.getElementById('policy');
          if (!policyCheckbox.checked) {
              policyCheckbox.closest('.form-checkbox').classList.add('error'); isValid = false;
          }

          if (isValid) {
              const btn = contactForm.querySelector('button[type="submit"]');
              const originalText = btn.textContent;
              btn.textContent = 'Отправка...';
              btn.disabled = true;

              setTimeout(() => {
                  btn.textContent = originalText;
                  btn.disabled = false;
                  contactForm.reset();
                  statusDiv.textContent = 'Спасибо! Мы свяжемся с вами.';
                  statusDiv.className = 'form-status success';
                  statusDiv.style.color = '#10b981';
                  if (captchaInput) captchaInput.value = '';
              }, 1500);
          } else {
              if (!statusDiv.textContent || statusDiv.textContent === 'Спасибо! Мы свяжемся с вами.') {
                   statusDiv.textContent = 'Проверьте ошибки.'; statusDiv.style.color = '#ef4444';
              }
          }
      });

      // Снятие ошибки с чекбокса
      const policyCheckbox = document.getElementById('policy');
      if (policyCheckbox) {
          policyCheckbox.addEventListener('change', function() {
              if (this.checked) this.closest('.form-checkbox').classList.remove('error');
          });
      }
  }

  // 6. Cookie Popup
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptBtn = document.getElementById('acceptCookies');

  if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => { cookiePopup.classList.add('is-visible'); }, 2000);
  }
  if (acceptBtn) {
      acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookiesAccepted', 'true');
          cookiePopup.classList.remove('is-visible');
      });
  }
});