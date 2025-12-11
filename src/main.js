/* script.js */

// 1. Инициализация плавного скролла (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Логика Мобильного Меню
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.header__link');
    const contactBtn = document.querySelector('.header__nav .btn'); // Если кнопка внутри навигации

    // Функция переключения меню
    const toggleMenu = () => {
        nav.classList.toggle('is-active');
        burger.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
        
        // Меняем иконку: если открыто - крестик (X), если закрыто - меню
        const icon = burger.querySelector('svg');
        if (burger.classList.contains('is-active')) {
             // Используем Lucide API для смены иконки или просто меняем атрибут data-lucide (требует перерисовки)
             // Простой вариант: анимация CSS rotation уже есть, визуально достаточно.
        }
    };

    // Клик по бургеру
    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    // Закрытие меню при клике на ссылку (чтобы скроллило к секции)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });
});

// Инициализация иконок
lucide.createIcons();