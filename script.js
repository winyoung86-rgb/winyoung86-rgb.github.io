/**
 * Neo-Brutalist Portfolio - JavaScript
 * Animations, interactions, and functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initMobileMenu();
    initSmoothScroll();
    initResumeFilters();
    initScrollAnimations();
    initNavHighlight();
    initContactForm();
    // [1.1] Hero enhancements
    initHeroGlow();
    // [1.2] Nav enhancements
    initNavScroll();
    // [1.3] Card enhancements
    initMagneticButtons();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Resume Section Filters
 */
function initResumeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resumeCards = document.querySelectorAll('.resume-card');

    if (!filterBtns.length || !resumeCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards with animation
            resumeCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-10px)';

                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add stagger effect to grid children
                if (entry.target.classList.contains('animate-stagger')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, i) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(30px)';

                        setTimeout(() => {
                            child.style.transition = 'all 0.5s ease';
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, i * 100);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and grids
    const animateElements = document.querySelectorAll(
        '.section-header, .about-card, .timeline, .projects-grid, .skills-grid, .insights-grid, .contact-form, .contact-info'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });

    // Add stagger class to grids
    document.querySelectorAll('.projects-grid, .skills-grid, .insights-grid').forEach(grid => {
        grid.classList.add('animate-stagger');
    });
}

/**
 * Navigation Active State on Scroll
 */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Add active style - [1.2] Updated to pill indicator
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--dark);
            background: var(--primary);
            padding: 0.25rem 0.75rem;
            margin: -0.25rem -0.75rem;
        }
        .nav-link.active::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Contact Form Handler
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<span>sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success state
        submitBtn.innerHTML = '<span>sent!</span><i class="fas fa-check"></i>';
        submitBtn.style.background = 'var(--primary)';
        submitBtn.style.color = 'var(--dark)';

        // Reset form
        form.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
        }, 3000);
    });
}

/**
 * [1.1] Mouse-follow Glow Effect
 */
function initHeroGlow() {
    const wrapper = document.querySelector('.hero-image-wrapper');
    const glow = document.querySelector('.hero-glow');

    if (!wrapper || !glow) return;

    wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });
}

/**
 * [1.2] Nav Scroll Effects - backdrop blur + shrink
 */
function initNavScroll() {
    const nav = document.querySelector('.nav');

    if (!nav) return;

    // Scroll detection for blur + shrink
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

/**
 * [1.3] Magnetic Button Effect
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.submit-btn, .social-link');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Typing Effect for Hero (optional enhancement)
 */
function initTypingEffect() {
    const element = document.querySelector('.hero-label');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.visibility = 'visible';

    let i = 0;
    const speed = 50;

    function typeWriter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start after a delay
    setTimeout(typeWriter, 500);
}

/**
 * Add hover sound effect (optional - uncomment to enable)
 */
/*
function initHoverSounds() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .insight-card');

    const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
    hoverSound.volume = 0.1;

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(() => {});
        });
    });
}
*/

/**
 * Parallax effect for hero section
 */
function initParallax() {
    const heroLayers = document.querySelectorAll('.hero-bg-layer, .hero-bg-layer-2');

    if (!heroLayers.length) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        heroLayers.forEach((layer, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            layer.style.transform = `translateY(${rate * direction * 0.5}px)`;
        });
    });
}

// Initialize parallax on load
window.addEventListener('load', initParallax);

/**
 * Add glitch effect on logo hover
 */
function initGlitchEffect() {
    const logo = document.querySelector('.nav-logo');

    if (!logo) return;

    logo.addEventListener('mouseenter', () => {
        logo.style.animation = 'glitch 0.3s ease';
    });

    logo.addEventListener('animationend', () => {
        logo.style.animation = '';
    });

    // Add glitch keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, -2px); }
            80% { transform: translate(2px, 2px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize glitch effect
initGlitchEffect();

/**
 * Console Easter Egg
 */
console.log(`
%c[WY] %cNeo-Brutalist Portfolio
%c━━━━━━━━━━━━━━━━━━━━━━━━━━
%cBuilt with purpose.
Designed with intention.
Powered by coffee & code.

Want to connect? Let's talk AI & automation.
`,
'color: #7AA8A3; font-weight: bold; font-size: 20px;',
'color: #2D4542; font-weight: bold; font-size: 16px;',
'color: #C87D56;',
'color: #526B67; font-size: 12px;'
);
