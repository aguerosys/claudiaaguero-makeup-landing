export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const revealElements = document.querySelectorAll('.gs-reveal');

    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                y: 40, 
                opacity: 0 
            }, 
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}
