document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('storyboardContainer');
    const slides = document.querySelectorAll('.slide');
    const activeIndexEl = document.getElementById('activeIndex');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const glowBg = document.querySelector('.glow-bg');

    // 1. Translate Vertical Scroll to Horizontal Scroll
    container.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // 2. Scroll to Specific Slide (exposed globally)
    function scrollToSlide(index) {
        const width = container.clientWidth;
        container.scrollTo({
            left: index * width,
            behavior: 'smooth'
        });
    }
    window.scrollToSlide = scrollToSlide;

    // 3. Navigation Controls Clicking
    prevBtn.addEventListener('click', () => {
        const width = container.clientWidth;
        const currentIndex = Math.round(container.scrollLeft / width);
        if (currentIndex > 0) {
            scrollToSlide(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        const width = container.clientWidth;
        const currentIndex = Math.round(container.scrollLeft / width);
        if (currentIndex < slides.length - 1) {
            scrollToSlide(currentIndex + 1);
        }
    });

    // 4. Update Scroll State (Active slide, Indicators, Buttons)
    function updateActiveState() {
        const scrollLeft = container.scrollLeft;
        const width = container.clientWidth;
        const currentIndex = Math.round(scrollLeft / width);

        // Update active slide class to trigger entry animations
        slides.forEach((slide, idx) => {
            if (idx === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update indicator counter (01 / 05)
        if (activeIndexEl) {
            activeIndexEl.textContent = String(currentIndex + 1).padStart(2, '0');
        }

        // Update bottom progress bar width
        if (progressBar) {
            const progressPercent = ((currentIndex + 1) / slides.length) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }

        // Enable/Disable arrow navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === slides.length - 1;
        }
    }

    container.addEventListener('scroll', updateActiveState);
    window.addEventListener('resize', updateActiveState);

    // Initial load call to set indicators correctly
    updateActiveState();

    // 5. Ambient Glowing Parallax Background Effect
    document.addEventListener('mousemove', (e) => {
        if (glowBg) {
            const xOffset = (e.clientX / window.innerWidth - 0.5) * 35;
            const yOffset = (e.clientY / window.innerHeight - 0.5) * 35;
            glowBg.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
    });

    // 6. Direct Wheel Scrolling inside Projects Carousel
    const projectsCarousel = document.querySelector('.projects-carousel');
    if (projectsCarousel) {
        projectsCarousel.addEventListener('wheel', (e) => {
            if (window.innerWidth > 768) {
                const canScrollLeft = projectsCarousel.scrollLeft > 0;
                const canScrollRight = projectsCarousel.scrollLeft < (projectsCarousel.scrollWidth - projectsCarousel.clientWidth);
                
                // If the carousel can scroll in the requested direction, prevent main container scroll
                if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
                    e.stopPropagation();
                    projectsCarousel.scrollLeft += e.deltaY;
                }
            }
        }, { passive: false });
    }
});
