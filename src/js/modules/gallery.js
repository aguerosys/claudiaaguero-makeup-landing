import { refreshAnimations } from './animations.js';

const INITIAL_LIMIT = 8;
const galleryState = {
    works: {
        sectionId: 'galeria',
        containerId: 'gallery-container',
        toggleId: 'gallery-toggle',
        toggleLabelId: 'gallery-toggle-label',
        toggleIconId: 'gallery-toggle-icon',
        moreLabel: 'Ver más trabajos',
        lessLabel: 'Ver menos trabajos',
        items: [],
        isExpanded: false
    },
    products: {
        sectionId: 'productos',
        containerId: 'products-container',
        toggleId: 'products-toggle',
        toggleLabelId: 'products-toggle-label',
        toggleIconId: 'products-toggle-icon',
        moreLabel: 'Ver más productos',
        lessLabel: 'Ver menos productos',
        items: [],
        isExpanded: false
    }
};
let handlersBound = false;

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function normalizeItem(item) {
    return {
        url: item.url,
        alt: item.alt || 'Trabajo de maquillaje',
        title: item.title || item.alt || '',
        type: item.type || item.kind || item.category || 'work'
    };
}

function classifyItems(items) {
    return items.reduce((accumulator, current) => {
        const normalizedItem = normalizeItem(current);
        const normalizedType = String(normalizedItem.type).trim().toLowerCase();

        if (normalizedType.includes('prod')) {
            accumulator.products.push(normalizedItem);
        } else {
            accumulator.works.push(normalizedItem);
        }

        return accumulator;
    }, { works: [], products: [] });
}

async function resolveGalleryItems(apiBaseUrl, fallbackItems) {
    try {
        const response = await fetch(`${apiBaseUrl}/api/works`, {
            headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const payload = await response.json();
        const apiItems = Array.isArray(payload?.data) ? payload.data : [];

        if (apiItems.length > 0) {
            return classifyItems(apiItems);
        }
    } catch (error) {
        console.error('Error fetching gallery data, using fallback:', error);
    }

    return {
        works: (fallbackItems.works || []).map(normalizeItem),
        products: (fallbackItems.products || []).map(normalizeItem)
    };
}

function renderGallerySection(sectionKey) {
    const section = galleryState[sectionKey];
    const container = document.getElementById(section.containerId);
    const toggle = document.getElementById(section.toggleId);
    const toggleLabel = document.getElementById(section.toggleLabelId);
    const toggleIcon = document.getElementById(section.toggleIconId);

    if (!container || !toggle || !toggleLabel || !toggleIcon) return;

    container.innerHTML = section.items.map((item, index) => `
        <article class="gallery-item gs-reveal ${!section.isExpanded && index >= INITIAL_LIMIT ? 'hidden' : ''}" data-title="${escapeHtml(item.title)}">
            <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.alt)}" loading="lazy">
        </article>
    `).join('');

    const hasMoreThanLimit = section.items.length > INITIAL_LIMIT;
    toggle.classList.toggle('is-visible', hasMoreThanLimit);
    toggleLabel.textContent = section.isExpanded ? section.lessLabel : section.moreLabel;
    toggleIcon.style.transform = section.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';

    refreshAnimations(container);
}

function renderAllGalleries() {
    renderGallerySection('works');
    renderGallerySection('products');
}

function bindInteractions() {
    if (handlersBound) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCaption || !lightboxClose) {
        return;
    }

    document.addEventListener('click', (event) => {
        const item = event.target.closest('.gallery-item');
        const toggleButton = event.target.closest('[data-gallery-key]');

        if (toggleButton) {
            const sectionKey = toggleButton.getAttribute('data-gallery-key');
            const section = galleryState[sectionKey];

            if (!section) {
                return;
            }

            section.isExpanded = !section.isExpanded;
            renderGallerySection(sectionKey);

            if (!section.isExpanded) {
                document.getElementById(section.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            return;
        }

        if (!item) return;

        const image = item.querySelector('img');
        if (!image) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        const title = item.dataset.title?.trim();
        if (title) {
            lightboxTitle.textContent = title;
            lightboxCaption.hidden = false;
        } else {
            lightboxTitle.textContent = '';
            lightboxCaption.hidden = true;
        }

        lightbox.classList.remove('hidden');
        requestAnimationFrame(() => {
            lightbox.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
            lightboxTitle.textContent = '';
            lightboxCaption.hidden = false;
        }, 280);
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    handlersBound = true;
}

export async function initGallery({ apiBaseUrl, fallbackItems }) {
    const resolvedItems = await resolveGalleryItems(apiBaseUrl, fallbackItems);

    galleryState.works.items = resolvedItems.works;
    galleryState.products.items = resolvedItems.products;
    galleryState.works.isExpanded = false;
    galleryState.products.isExpanded = false;

    renderAllGalleries();
    bindInteractions();
}
