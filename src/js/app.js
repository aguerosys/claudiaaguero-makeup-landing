import { siteData } from './data/content.js';
import { initAnimations, refreshAnimations } from './modules/animations.js';
import { initGallery } from './modules/gallery.js';
import { initNavigation } from './modules/navigation.js';
import { renderReviews, renderServices } from './modules/renderers.js';

const API_BASE_URL = 'https://api.claudiaaguero.com.ar';

document.addEventListener('DOMContentLoaded', async () => {
    renderServices(siteData.services);
    renderReviews(siteData.reviews);
    await initGallery({
        apiBaseUrl: API_BASE_URL,
        fallbackItems: siteData.galleryFallback
    });
    initNavigation();
    initAnimations();
    
    // Crear iconos de Lucide después de que todo esté listo
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Refrescar animaciones una vez más para asegurar que todas estén iniciadas
    refreshAnimations();
});
