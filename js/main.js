document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const glowBg = document.querySelector('.glow-bg');
    const scrollProgressBar = document.getElementById('scrollProgress');

    // 1. Global Section Scroll Helper
    window.scrollToSection = function(id) {
        const element = document.getElementById(id);
        if (element) {
            // Find navbar height to offset scroll
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 70;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // 2. Top Reading Progress Indicator
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${scrolled}%`;
        }
    });

    // 3. Intersection Observer for Entering Animations, Nav Link Highlights, and Glow Transitions
    const glowClasses = {
        'hero': 'glow-hero',
        'journey': 'glow-journey',
        'works': 'glow-works',
        'arsenal': 'glow-arsenal',
        'initiate': 'glow-initiate'
    };

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Trigger when section is in view focus
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Add active class for transition animations
                entry.target.classList.add('active');

                // Highlight correct navbar link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Transition ambient glow class
                if (glowBg && glowClasses[id]) {
                    // Reset class and apply correct glow class
                    glowBg.className = 'glow-bg ' + glowClasses[id];
                }
            }
        });
    }, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);
    });

    // 4. Parallax Mouse Glow Effect
    document.addEventListener('mousemove', (e) => {
        if (glowBg) {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 40;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 40;
            glowBg.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
    });

    // 5. Resume Modal Controls
    window.openResumeModal = function() {
        const modal = document.getElementById('resumeModal');
        if (modal) modal.classList.add('show');
    };

    window.closeResumeModal = function() {
        const modal = document.getElementById('resumeModal');
        if (modal) modal.classList.remove('show');
    };
});
