/* ========================================
   RITIK WEB SOLUTIONS - JAVASCRIPT
   Premium Animations & Interactions
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedBackground();
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
    initScrollNav();
    initServiceCardGlow();
});

/* ========================================
   ANIMATED BACKGROUND MESH
   ======================================== */
function initAnimatedBackground() {
    const body = document.body;
    const canvas = document.createElement('div');
    canvas.className = 'animated-bg-mesh';
    canvas.innerHTML = `
        <div class="gradient-orb gradient-orb-1"></div>
        <div class="gradient-orb gradient-orb-2"></div>
        <div class="gradient-orb gradient-orb-3"></div>
    `;
    body.appendChild(canvas);

    // Add noise overlay
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    body.appendChild(noise);

    // Parallax effect for orbs
    let ticking = false;
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            requestAnimationFrame(function() {
                const orbs = document.querySelectorAll('.gradient-orb');
                orbs.forEach((orb, index) => {
                    const speed = 0.02 + (index * 0.01);
                    const x = (e.clientX - window.innerWidth / 2) * speed;
                    const y = (e.clientY - window.innerHeight / 2) * speed;
                    orb.style.transform = `translate(${x}px, ${y}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

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
   ENHANCED MOUSE FOLLOWER
   ======================================== */
function initMouseFollower() {
    const mouseFollower = document.getElementById('mouseFollower');
    if (!mouseFollower) return;

    // Only enable on desktop
    if (window.innerWidth > 768) {
        let lastX = 0, lastY = 0;

        document.addEventListener('mousemove', function(e) {
            requestAnimationFrame(function() {
                // Smooth interpolation for following effect
                const x = lastX + (e.clientX - lastX) * 0.15;
                const y = lastY + (e.clientY - lastY) * 0.15;

                mouseFollower.style.left = x + 'px';
                mouseFollower.style.top = y + 'px';

                lastX = x;
                lastY = y;
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
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
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

    const duration = 2500; // 2.5 seconds for premium feel
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Premium easing function - ease out expo
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeOutExpo * target);

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

    const answer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon-svg');
    const isActive = faqItem.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(function(item) {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            const otherIcon = item.querySelector('.faq-icon-svg');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
            }
            if (otherIcon) {
                otherIcon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
        if (answer) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }
        if (icon) {
            icon.style.transform = 'rotate(45deg)';
        }
    } else {
        faqItem.classList.remove('active');
        if (answer) {
            answer.style.maxHeight = '0';
        }
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

/* ========================================
   ENHANCED MAGNETIC BUTTONS
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

                // Premium magnetic effect with smooth interpolation
                const targetX = x * 0.25;
                const targetY = y * 0.25;

                btn.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', function() {
                // Smooth return to original position
                btn.style.transform = 'translate(0, 0) scale(1)';
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
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();

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
   NAVIGATION SCROLL STATE
   ======================================== */
function initScrollNav() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
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
            link.classList.remove('active');

            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/* ========================================
   SERVICE CARD GLOW EFFECT
   ======================================== */
function initServiceCardGlow() {
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
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
console.log('%c Ritik Web Solutions', 'font-size: 28px; font-weight: bold; color: #3b82f6; text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);');
console.log('%cPremium Web Development Agency', 'font-size: 16px; color: #8b5cf6;');
console.log('%cBuilt with passion and precision.', 'font-size: 12px; color: #6b7280;');