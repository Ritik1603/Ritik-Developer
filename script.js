/* ========================================
   RITIK WEB SOLUTIONS - JAVASCRIPT
   Premium Animations & Interactions
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules with null checks
    initLoader();
    initScrollProgress();
    initMouseFollower();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initFaq();
    initMagneticButtons();
    initSmoothScroll();
    initParallax();
    updateActiveNav();
});

/* ========================================
   LOADER
   ======================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Hide loader after page fully loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
            // Trigger initial reveal animations
            triggerInitialReveal();
        }, 1500);
    });
}

function triggerInitialReveal() {
    // Activate hero section animations immediately
    const heroReveals = document.querySelectorAll('#hero .reveal');
    heroReveals.forEach(function(el, index) {
        setTimeout(function() {
            el.classList.add('active');
        }, index * 150);
    });

    // Activate stagger children in stats section
    const statsStagger = document.querySelectorAll('#stats .stagger-children');
    statsStagger.forEach(function(el) {
        setTimeout(function() {
            el.classList.add('active');
        }, 800);
    });
}

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        scrollProgress.style.width = scrollPercent + '%';
    });
}

/* ========================================
   MOUSE FOLLOWER (Gradient Effect)
   ======================================== */
function initMouseFollower() {
    const mouseFollower = document.getElementById('mouseFollower');
    if (!mouseFollower) return;

    // Only enable on desktop
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            requestAnimationFrame(function() {
                mouseFollower.style.left = e.clientX + 'px';
                mouseFollower.style.top = e.clientY + 'px';
            });
        });

        // Hide when mouse leaves window
        document.addEventListener('mouseleave', function() {
            mouseFollower.style.opacity = '0';
        });

        document.addEventListener('mouseenter', function() {
            mouseFollower.style.opacity = '1';
        });
    }
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const staggerElements = document.querySelectorAll('.stagger-children');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(function(el) { observer.observe(el); });
    staggerElements.forEach(function(el) { observer.observe(el); });
}

/* ========================================
   ANIMATED COUNTERS
   ======================================== */
function initCounters() {
    const counters = document.querySelectorAll('.counter-value');
    if (counters.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const targetAttr = counter.getAttribute('data-target');
                const target = targetAttr ? parseInt(targetAttr, 10) : 0;
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(function(counter) { observer.observe(counter); });
}

function animateCounter(element, target) {
    if (!element) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/* ========================================
   FAQ ACCORDION
   ======================================== */
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(question);
            }
        });
    });
}

function toggleFaq(button) {
    if (!button) return;

    const faqItem = button.parentElement;
    if (!faqItem) return;

    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    if (buttons.length === 0) return;

    // Only enable on desktop
    if (window.innerWidth > 768) {
        buttons.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Subtle magnetic effect
                btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    if (anchors.length === 0) return;

    anchors.forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   PARALLAX EFFECT (Subtle)
   ======================================== */
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-element');
    if (floatingElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrollY = window.scrollY;

                floatingElements.forEach(function(el, index) {
                    const speed = 0.05 + (index * 0.02);
                    const yOffset = scrollY * speed;
                    el.style.transform = 'translateY(' + (-yOffset) + 'px)';
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   NAVIGATION ACTIVE STATE
   ======================================== */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        let current = '';

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('text-white');
            link.classList.add('text-gray-400');

            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('text-white');
                link.classList.remove('text-gray-400');
            }
        });
    });
}

/* ========================================
   ACCESSIBILITY IMPROVEMENTS
   ======================================== */

// Handle reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-duration', '0ms');
}

// Focus visible for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/* ========================================
   CONSOLE EASTER EGG
   ======================================== */
console.log('%c Ritik Web Solutions', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cPremium Web Development Agency', 'font-size: 14px; color: #8b5cf6;');
console.log('%cBuilt with passion and precision.', 'font-size: 12px; color: #6b7280;');
