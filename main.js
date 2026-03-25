import { services, gallery, reviews } from './data.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    renderServices();
    renderReviews();
    renderGallery();
    setupMobileMenu();
    setupNavbar();
    
    setTimeout(() => {
        initAnimations();
        initGallery();
    }, 100);
});

function renderServices() {
    const container = document.getElementById('services-container');
    container.innerHTML = services.map(s => `
        <div class="service-card group bg-brand-dark p-8 rounded-2xl border border-brand-beige gs-reveal">
            <div class="service-icon-wrapper w-12 h-12 rounded-full bg-brand-pink flex items-center justify-center mb-6 text-brand-gray border border-brand-beige group-hover:bg-brand-nude group-hover:text-brand-dark">
                <i data-lucide="${s.icon}" class="w-5 h-5"></i>
            </div>
            <h3 class="font-serif text-xl mb-3 font-medium text-brand-nude">${s.title}</h3>
            <p class="text-brand-gray text-sm font-light leading-relaxed">${s.desc}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderReviews() {
    const container = document.getElementById('reviews-container');
    container.innerHTML = reviews.map(r => `
        <div class="bg-brand-dark p-8 rounded-2xl shadow-sm border border-brand-beige gs-reveal">
            <div class="flex mb-4">
                ${Array(5).fill('<i data-lucide="star" class="w-4 h-4 text-brand-gold fill-brand-gold"></i>').join('')}
            </div>
            <p class="text-brand-nude italic mb-4">"${r.text}"</p>
            <p class="text-brand-gray text-sm font-medium">— ${r.author}</p>
        </div>
    `).join('');
    lucide.createIcons();
}

function renderGallery() {
    const container = document.getElementById('gallery-container');
    container.innerHTML = gallery.map(url => `
        <div class="gallery-item gs-reveal bg-brand-beige">
            <img src="${url}" alt="Trabajo de maquillaje" loading="lazy">
        </div>
    `).join('');
}

function setupMobileMenu() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        });
    });
}

function setupNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
}
