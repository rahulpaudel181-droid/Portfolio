// UI & Interactions: Custom Cursor, Mobile Menu, Magnetic Effects
document.addEventListener('DOMContentLoaded', () => {
    // 1. Dual Cursor System (Desktop)
    const cursor = document.querySelector('.custom-cursor');
    const outline = document.querySelector('.custom-cursor-outline');

    if (cursor && outline) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;

            // Dot cursor (Direct move)
            gsap.to(cursor, {
                x: clientX - 5,
                y: clientY - 5,
                duration: 0.1,
                ease: "none"
            });

            // Outline cursor (Lagging follow)
            gsap.to(outline, {
                x: clientX - 20,
                y: clientY - 20,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Interactive states for links/buttons
        const interactiveElements = document.querySelectorAll('a, button, .group');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(outline, {
                    scale: 2,
                    backgroundColor: "rgba(99, 102, 241, 0.2)",
                    borderColor: "rgba(99, 102, 241, 0.4)",
                    duration: 0.3
                });
                gsap.to(cursor, { scale: 0, duration: 0.2 });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(outline, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    duration: 0.3
                });
                gsap.to(cursor, { scale: 1, duration: 0.2 });
            });
        });
    }

    // 2. Mobile Menu Toggle
    const mobileTrigger = document.getElementById('mobile-menu-trigger');
    const mobileClose = document.getElementById('mobile-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-item');

    const toggleMenu = (isOpen) => {
        if (isOpen) {
            mobileMenu.classList.remove('pointer-events-none');
            mobileMenu.classList.add('opacity-100');
            gsap.from(".mobile-nav-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        } else {
            mobileMenu.classList.add('pointer-events-none');
            mobileMenu.classList.remove('opacity-100');
        }
    };

    mobileTrigger?.addEventListener('click', () => toggleMenu(true));
    mobileClose?.addEventListener('click', () => toggleMenu(false));
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

    // 3. Magnetic Navbar Buttons (Subtle)
    const magneticItems = document.querySelectorAll('.nav-link, .magnetic');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const bound = item.getBoundingClientRect();
            const x = e.clientX - bound.left - bound.width / 2;
            const y = e.clientY - bound.top - bound.height / 2;
            
            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });

    // Initialize Lucide Icons
    lucide.createIcons();
});
