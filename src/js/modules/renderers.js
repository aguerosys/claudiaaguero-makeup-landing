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

    container.innerHTML = services.map((service) => {
        const icon = escapeHtml(service.icon);
        const title = escapeHtml(service.title);
        const desc = escapeHtml(service.desc);
        return '<article class="service-card card gs-reveal">'
            + '<div class="service-icon"><i data-lucide="' + icon + '"></i></div>'
            + '<h3 class="card-title">' + title + '</h3>'
            + '<p class="copy-sm">' + desc + '</p>'
            + '</article>';
    }).join('');
}

export function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const star = '<i data-lucide="star" class="fill-current"></i>';
    const stars = star + star + star + star + star;

    container.innerHTML = reviews.map((review) => {
        const text = escapeHtml(review.text);
        const author = escapeHtml(review.author);
        return '<article class="review-card gs-reveal">'
            + '<div class="review-stars">' + stars + '</div>'
            + '<p class="review-text">“' + text + '”</p>'
            + '<span class="review-author">— ' + author + '</span>'
            + '</article>';
    }).join('');
}
