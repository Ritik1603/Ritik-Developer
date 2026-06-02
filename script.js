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
    initBackToTop();
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

    function openMenu() {
        menuBtn.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
        menuBtn.setAttribute('aria-label', 'Close menu');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', function() {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close when clicking outside menu content
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close on resize to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        }, 100);
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
let _faqInitialized = false;

function initFaq() {
    // Idempotent: prevent double-binding listeners on re-init
    if (_faqInitialized) return;
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function(item, index) {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        // Stable, predictable id (not random) so aria-controls stays valid
        const panelId = 'faq-panel-' + (index + 1);
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', panelId);
        question.setAttribute('type', 'button'); // safety: ensure no form submit

        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.id = panelId;
            answer.setAttribute('role', 'region');
            // Start collapsed
            answer.style.maxHeight = '0';
        }

        // Single click handler — do NOT also use inline onclick in HTML
        question.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFaq(question);
        });

        // Keyboard: Enter / Space toggle
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                // prevent the synthetic click from double-firing
                e.stopPropagation();
                toggleFaq(question);
            }
        });
    });

    _faqInitialized = true;
}

function toggleFaq(button) {
    if (!button) return;

    const faqItem = button.closest('.faq-item');
    if (!faqItem) return;

    const answer = faqItem.querySelector('.faq-answer');
    const icon = faqItem.querySelector('.faq-icon-svg');
    const isActive = faqItem.classList.contains('active');

    // Close all OTHER items (single-open behavior)
    document.querySelectorAll('.faq-item').forEach(function(item) {
        if (item === faqItem) return;
        if (!item.classList.contains('active')) return;

        item.classList.remove('active');
        const otherAnswer = item.querySelector('.faq-answer');
        const otherIcon = item.querySelector('.faq-icon-svg');
        const otherBtn = item.querySelector('.faq-question');
        if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
        }
        if (otherIcon) {
            otherIcon.style.transform = 'rotate(0deg)';
        }
        if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Toggle current
    if (!isActive) {
        faqItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        if (icon) icon.style.transform = 'rotate(45deg)';

        if (answer) {
            // Measure scrollHeight reliably.
            // Temporarily remove any max-height cap so the true height is returned
            // (works even if a CSS rule, parent visibility, or reveal animation
            // would otherwise give us 0).
            const prevMaxHeight = answer.style.maxHeight;
            const prevOverflow = answer.style.overflow;
            answer.style.maxHeight = 'none';
            answer.style.overflow = 'visible';
            const target = answer.scrollHeight;
            // restore before animating
            answer.style.maxHeight = prevMaxHeight;
            answer.style.overflow = prevOverflow;

            // Add a small safety margin for borders / sub-pixel rounding
            const finalHeight = target + 4;
            answer.style.maxHeight = finalHeight + 'px';

            // After the transition completes, switch to 'none' so dynamic
            // content (font loading, viewport changes) doesn't get clipped.
            const onEnd = function(ev) {
                if (ev.propertyName !== 'max-height') return;
                if (faqItem.classList.contains('active')) {
                    answer.style.maxHeight = 'none';
                }
                answer.removeEventListener('transitionend', onEnd);
            };
            answer.addEventListener('transitionend', onEnd);
        }
    } else {
        // Closing: if currently 'none', set the explicit height first so the
        // transition has a value to animate from.
        faqItem.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        if (icon) icon.style.transform = 'rotate(0deg)';

        if (answer) {
            if (answer.style.maxHeight === 'none' || answer.style.maxHeight === '') {
                const h = answer.scrollHeight;
                answer.style.maxHeight = h + 'px';
                // force reflow
                // eslint-disable-next-line no-unused-expressions
                answer.offsetHeight;
            }
            answer.style.maxHeight = '0';
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

                // Premium magnetic effect with smooth interpolation + subtle lift
                const targetX = x * 0.25;
                const targetY = y * 0.25 - 2; // -2px lift matches CSS hover

                btn.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.02)`;
            });

            btn.addEventListener('mouseleave', function() {
                // Smooth return to original position
                btn.style.transform = '';
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

                const nav = document.querySelector('.nav-container');
                const headerOffset = nav ? nav.offsetHeight : 72;
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

/* ========================================
   BACK TO TOP BUTTON
   Hidden at top, fades in after 300px scroll,
   smooth-scrolls to top on click.
   ======================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const SHOW_AFTER = 300;    // px scrolled before showing
    let ticking = false;

    function updateVisibility() {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (y > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
        ticking = false;
    }

    // rAF-throttled scroll listener for performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateVisibility);
            ticking = true;
        }
    }, { passive: true });

    // Initial state
    updateVisibility();

    // Click: smooth scroll to top
    btn.addEventListener('click', function() {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            window.scrollTo(0, 0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        // Move focus back to the top of the document for keyboard users
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.focus();
        } else {
            // Fallback: focus body
            document.body.setAttribute('tabindex', '-1');
            document.body.focus();
            document.body.removeAttribute('tabindex');
        }
    });
}