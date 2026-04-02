import { services, gallery, reviews } from './data.js';
import { initAnimations } from './animations.js';
import { initGallery } from './gallery.js';

const API_BASE_URL = 'http://localhost:8585';

document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    renderServices();
    renderReviews();
    await renderGallery();
    setupMobileMenu();
    setupNavbar();

    initAnimations();
    initGallery();
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

async function renderGallery() {
    const container = document.getElementById('gallery-container');
    const toggleWrapper = document.getElementById('gallery-toggle');
    const toggleBtn = document.getElementById('gallery-toggle-btn');
    const INITIAL_LIMIT = 8;

    let urls = gallery.map(url => ({ url, alt: 'Trabajo de maquillaje', title: '' }));

    try {
        const res = await fetch(`${API_BASE_URL}/api/works`, { headers: { 'Accept': 'application/json' } });
        console.log('Fetch response:', res);
        if (!res.ok) throw new Error('Request failed');
        const json = await res.json();
        const data = Array.isArray(json?.data) ? json.data : [];
        if (data.length > 0) {
            urls = data.map(item => ({
                url: item.url,
                alt: item.alt || 'Trabajo de maquillaje',
                title: item.title || item.alt || ''
            }));
        }
    } catch (error) {

        console.error('Error fetching gallery data, using fallback:', error);
    }

    const buildItem = (item, index) => `
        <div class="gallery-item gs-reveal bg-brand-border shadow-sm ${index >= INITIAL_LIMIT ? 'gallery-extra hidden' : ''}" data-title="${item.title}">
            <img src="${item.url}" alt="${item.alt}" loading="lazy">
        </div>
    `;

    container.innerHTML = urls.map((item, i) => buildItem(item, i)).join('');

    if (urls.length > INITIAL_LIMIT) {
        toggleWrapper.classList.remove('hidden');
        lucide.createIcons();

        let expanded = false;
        toggleBtn.addEventListener('click', () => {
            expanded = !expanded;
            const extras = container.querySelectorAll('.gallery-extra');

            if (expanded) {
                extras.forEach(el => el.classList.remove('hidden'));
                toggleBtn.querySelector('span').textContent = 'Ver menos';
                toggleBtn.querySelector('i').style.transform = 'rotate(180deg)';
                initAnimations();
            } else {
                extras.forEach(el => el.classList.add('hidden'));
                toggleBtn.querySelector('span').textContent = 'Ver m\u00e1s trabajos';
                toggleBtn.querySelector('i').style.transform = 'rotate(0deg)';
                document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
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
