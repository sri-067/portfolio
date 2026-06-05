document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const glowBg = document.querySelector('.glow-bg');
    const scrollProgressBar = document.getElementById('scrollProgress');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // 1. Mobile Hamburger Menu Toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close mobile menu when clicking a link or button
        navLinks.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // 2. Global Section Scroll Helper
    window.scrollToSection = function(id) {
        const element = document.getElementById(id);
        if (element) {
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

    // 3. Intersection Observer for Entering Animations, Nav Link Highlights, and Section Progress
    const glowClasses = {
        'hero': 'glow-hero',
        'journey': 'glow-journey',
        'works': 'glow-works',
        'arsenal': 'glow-arsenal',
        'initiate': 'glow-initiate'
    };

    const progressPercentages = {
        'hero': 20,
        'journey': 40,
        'works': 60,
        'arsenal': 80,
        'initiate': 100
    };

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -45% 0px', // Trigger when section is in view focus
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
                    glowBg.className = 'glow-bg ' + glowClasses[id];
                }

                // Snap scroll progress bar to active section's percentage
                if (scrollProgressBar && progressPercentages[id]) {
                    scrollProgressBar.style.width = `${progressPercentages[id]}%`;
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
