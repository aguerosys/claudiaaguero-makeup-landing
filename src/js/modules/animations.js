function animateReveals(scope = document) {
    const revealElements = scope.querySelectorAll('.gs-reveal:not([data-animated])');

    revealElements.forEach((element) => {
        element.setAttribute('data-animated', 'true');

        gsap.fromTo(
            element,
            {
                y: 36,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.95,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 88%'
                }
            }
        );
    });
}

function animateHeroDetails() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline.from('.hero-copy > *', { y: 32, opacity: 0, duration: 0.7, stagger: 0.08 });
}

export function initAnimations(retries = 0) {
    if (typeof gsap === 'undefined' || !gsap.registerPlugin) {
        if (retries < 20) {
            setTimeout(() => initAnimations(retries + 1), 150);
        }
        return;
    }

    gsap.registerPlugin(ScrollTrigger);
    animateReveals();
    animateHeroDetails();
}

export function refreshAnimations(scope = document) {
    if (typeof gsap === 'undefined' || !gsap.registerPlugin) {
        return;
    }

    animateReveals(scope);
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}
