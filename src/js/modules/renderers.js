function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

export function renderServices(services) {
    const container = document.getElementById('services-container');
    if (!container) return;

    container.innerHTML = services.map((service) => `
        <article class="service-card card gs-reveal">
            <div class="service-icon">
                <i data-lucide="${escapeHtml(service.icon)}"></i>
            </div>
            <h3 class="card-title">${escapeHtml(service.title)}</h3>
            <p class="copy-sm">${escapeHtml(service.desc)}</p>
        </article>
    `).join('');
}

export function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const stars = Array.from({ length: 5 }, () => '<i data-lucide="star" class="fill-current"></i>').join('');

    container.innerHTML = reviews.map((review) => `
        <article class="review-card card gs-reveal">
            <div class="review-stars">${stars}</div>
            <p class="copy">“${escapeHtml(review.text)}”</p>
            <p class="pill">${escapeHtml(review.author)}</p>
        </article>
    `).join('');
}
