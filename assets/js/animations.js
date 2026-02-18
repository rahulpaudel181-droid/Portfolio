// GSAP Animations & Smooth Scroll Integration
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation Timeline
    const heroTl = gsap.timeline();
    heroTl.from("#hero-availability", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from("#hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    }, "-=0.5")
    .from("#hero-content", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8")
    .from("#navbar", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1");

    // Section Reveal Animations
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Marquee Continuous Animation
    const marquee = document.querySelector('.marquee-content');
    if (marquee) {
        gsap.to(marquee, {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "none"
        });
    }

    // Parallax Effect for About Section Image
    const aboutImg = document.querySelector('#about img');
    if (aboutImg) {
        gsap.to(aboutImg, {
            scrollTrigger: {
                trigger: '#about',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -50,
            scale: 1.2,
            ease: "none"
        });
    }

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
});
