// Main Initialization & Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Time Synchronization (Nepal/Asia Kathmandu)
    const updateTime = () => {
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Kathmandu', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        };
        const nepalTime = now.toLocaleTimeString('en-US', options);
        const timeDisplay = document.getElementById('local-time');
        if (timeDisplay) {
            timeDisplay.innerHTML = nepalTime;
        }
    };
    
    updateTime();
    setInterval(updateTime, 10000); // Update every 10 seconds

    // 2. Smooth Anchor Scroll (Enhanced for Lenis)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                // Let Lenis handle the scrolling naturally
                lenis.scrollTo(target, {
                    offset: -50,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }
        });
    });

    // 3. Dynamic Navbar Hide/Show on Scroll
    let lastScrollTop = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > lastScrollTop && currentScroll > 200) {
            // Scrolling down
            gsap.to(navbar, { y: -150, opacity: 0, duration: 0.5, ease: "power2.out" });
        } else {
            // Scrolling up
            gsap.to(navbar, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // 4. Console Portfolio Intro (Easter Egg)
    console.log("%c Rahul Sharma — Creative Portfolio '26", "color: #6366f1; font-size: 1.2rem; font-weight: bold;");
    console.log("%c Building intentional digital products with technical precision.", "color: #94a3b8; font-style: italic;");
});
