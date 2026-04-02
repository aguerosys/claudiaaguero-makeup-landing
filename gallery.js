export function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
        const img = item.querySelector('img');
        if (!img) return;

        img.addEventListener('click', () => {
            lightboxImg.src = img.src;

            const title = item.getAttribute('data-title');
            if (title) {
                lightboxTitle.textContent = title;
                lightboxCaption.classList.remove('hidden');
            } else {
                lightboxTitle.textContent = '';
                lightboxCaption.classList.add('hidden');
            }

            lightbox.classList.remove('hidden');
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
            lightboxTitle.textContent = '';
        }, 300);
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        const isOutside = e.target === lightbox;
        if (isOutside) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}
