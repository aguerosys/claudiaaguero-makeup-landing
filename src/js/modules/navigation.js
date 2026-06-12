export function initNavigation() {
    const header = document.getElementById('navbar');
    const toggleButton = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!header || !toggleButton || !mobileMenu) return;

    const syncHeaderState = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    toggleButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-open');
    });

    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-open');
        });
    });

    window.addEventListener('scroll', syncHeaderState, { passive: true });
    syncHeaderState();
}
