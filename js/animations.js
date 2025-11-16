/**
 * TranquilMindQuest - Animations JavaScript
 * Advanced animations and micro-interactions
 * Optimized for performance and accessibility
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const config = {
        animationDuration: 300,
        staggerDelay: 50,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };

    // ===== ANIMATION STATE =====
    let animationQueue = [];
    let isAnimating = false;
    let intersectionObserver = null;

    // ===== INITIALIZATION =====
    function init() {
        if (config.reducedMotion) {
            console.log('Reduced motion preference detected, animations disabled');
            return;
        }

        initIntersectionObserver();
        initScrollAnimations();
        initHoverAnimations();
        initLoadingAnimations();
        initParticleEffects();
        initBreathingAnimation();
        
        console.log('Animations initialized');
    }

    // ===== INTERSECTION OBSERVER =====
    function initIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        intersectionObserver = new IntersectionObserver(handleIntersection, options);
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(
            '.stat-card, .technique-card, .product-card, .blog-card, .card, .hero-content'
        );
        
        animatableElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            intersectionObserver.observe(element);
        });
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                intersectionObserver.unobserve(entry.target);
            }
        });
    }

    // ===== ELEMENT ANIMATIONS =====
    function animateElement(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        const delay = parseInt(element.dataset.delay) || 0;
        
        setTimeout(() => {
            element.classList.add(`animate-${animationType}`);
            element.classList.remove('animate-on-scroll');
            
            // Add stagger effect for grouped elements
            if (element.parentElement.classList.contains('animate-stagger')) {
                addStaggerEffect(element);
            }
        }, delay);
    }

    function addStaggerEffect(element) {
        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);
        const staggerDelay = index * config.staggerDelay;
        
        element.style.animationDelay = `${staggerDelay}ms`;
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Parallax effects
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            window.addEventListener('scroll', () => {
                updateParallax(element);
            }, { passive: true });
        });

        // Scroll-triggered animations
        window.addEventListener('scroll', throttle(handleScrollAnimations, 16), { passive: true });
    }

    function updateParallax(element) {
        const speed = parseFloat(element.dataset.parallax) || 0.5;
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        
        element.style.transform = `translateY(${rate}px)`;
    }

    function handleScrollAnimations() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Update scroll progress
        updateScrollProgress(scrolled);
        
        // Update hero parallax
        updateHeroParallax(scrolled);
        
        // Update floating elements
        updateFloatingElements(scrolled);
    }

    function updateScrollProgress(scrolled) {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;
        
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    function updateHeroParallax(scrolled) {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }

    function updateFloatingElements(scrolled) {
        const floatingElements = document.querySelectorAll('.floating');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const rate = Math.sin(scrolled * 0.01 + index) * 10;
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    // ===== HOVER ANIMATIONS =====
    function initHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.card, .stat-card, .technique-card, .product-card, .blog-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', handleCardHover);
            card.addEventListener('mouseleave', handleCardLeave);
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', handleButtonHover);
            button.addEventListener('mouseleave', handleButtonLeave);
        });

        // Link hover effects
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });
    }

    function handleCardHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    function handleCardLeave(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    }

    function handleButtonHover(event) {
        const button = event.currentTarget;
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 20px rgba(88, 166, 255, 0.4)';
    }

    function handleButtonLeave(event) {
        const button = event.currentTarget;
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '';
    }

    function handleLinkHover(event) {
        const link = event.currentTarget;
        link.style.textDecorationThickness = '2px';
        link.style.textUnderlineOffset = '2px';
    }

    function handleLinkLeave(event) {
        const link = event.currentTarget;
        link.style.textDecorationThickness = '';
        link.style.textUnderlineOffset = '';
    }

    // ===== LOADING ANIMATIONS =====
    function initLoadingAnimations() {
        // Skeleton loading for cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            addSkeletonLoading(card);
        });

        // Progress indicators
        const progressElements = document.querySelectorAll('[data-progress]');
        progressElements.forEach(element => {
            animateProgress(element);
        });

        // Counter animations
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }

    function addSkeletonLoading(element) {
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
        `;
        
        element.appendChild(skeleton);
        
        // Remove skeleton after content loads
        setTimeout(() => {
            skeleton.remove();
        }, 1000);
    }

    function animateProgress(element) {
        const target = parseInt(element.dataset.progress) || 0;
        const duration = 2000;
        const startTime = performance.now();
        
        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = `${current}%`;
            element.style.width = `${current}%`;
            
            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        }
        
        requestAnimationFrame(updateProgress);
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
        const duration = 2000;
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[\d]/g, '');
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            element.textContent = `${current.toLocaleString()}${suffix}`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // ===== PARTICLE EFFECTS =====
    function initParticleEffects() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        createParticleField(hero);
    }

    function createParticleField(container) {
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = createParticle();
            container.appendChild(particle);
            particles.push(particle);
        }
        
        // Animate particles
        animateParticles(particles);
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        
        Object.assign(particle.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: 'rgba(88, 166, 255, 0.3)',
            borderRadius: '50%',
            left: `${x}%`,
            top: `${y}%`,
            pointerEvents: 'none',
            animation: `float ${duration}s infinite linear`
        });
        
        return particle;
    }

    function animateParticles(particles) {
        particles.forEach((particle, index) => {
            const delay = index * 0.1;
            particle.style.animationDelay = `${delay}s`;
        });
    }

    // ===== BREATHING ANIMATION =====
    function initBreathingAnimation() {
        const breathingElement = document.querySelector('.breathing-circle');
        if (!breathingElement) return;
        
        startBreathingAnimation(breathingElement);
    }

    function startBreathingAnimation(element) {
        const duration = 4000; // 4 seconds for full breath cycle
        let isInhaling = true;
        
        function breathe() {
            if (isInhaling) {
                element.style.transform = 'scale(1.1)';
                element.style.opacity = '0.8';
            } else {
                element.style.transform = 'scale(1)';
                element.style.opacity = '0.6';
            }
            
            isInhaling = !isInhaling;
            
            setTimeout(breathe, duration / 2);
        }
        
        breathe();
    }

    // ===== MICRO-INTERACTIONS =====
    function initMicroInteractions() {
        // Ripple effect for buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', createRippleEffect);
        });

        // Magnetic effect for cards
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', handleMagneticEffect);
            element.addEventListener('mouseleave', resetMagneticEffect);
        });

        // Typing animation for text
        const typingElements = document.querySelectorAll('.typing-animation');
        typingElements.forEach(element => {
            startTypingAnimation(element);
        });
    }

    function createRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        Object.assign(ripple.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
            pointerEvents: 'none'
        });
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    function handleMagneticEffect(event) {
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const deltaX = (mouseX - centerX) * 0.1;
        const deltaY = (mouseY - centerY) * 0.1;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }

    function resetMagneticEffect(event) {
        const element = event.currentTarget;
        element.style.transform = 'translate(0, 0)';
    }

    function startTypingAnimation(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--accent-primary)';
        
        let index = 0;
        const typingSpeed = 100;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, typingSpeed);
            } else {
                element.style.borderRight = 'none';
            }
        }
        
        type();
    }

    // ===== CSS ANIMATIONS =====
    function addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-20px);
                }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                }
                40% {
                    transform: translateY(-10px);
                }
                60% {
                    transform: translateY(-5px);
                }
            }
            
            .animate-fadeInUp {
                animation: fadeInUp 0.6s ease-out;
            }
            
            .animate-fadeInLeft {
                animation: fadeInLeft 0.6s ease-out;
            }
            
            .animate-fadeInRight {
                animation: fadeInRight 0.6s ease-out;
            }
            
            .animate-scaleIn {
                animation: scaleIn 0.6s ease-out;
            }
            
            .animate-pulse {
                animation: pulse 2s infinite;
            }
            
            .animate-bounce {
                animation: bounce 2s infinite;
            }
            
            .skeleton {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                animation: skeleton-loading 1.5s infinite;
            }
            
            .skeleton-line {
                height: 12px;
                background: var(--bg-tertiary);
                margin-bottom: 8px;
                border-radius: 4px;
            }
            
            .skeleton-line.short {
                width: 60%;
            }
            
            @keyframes skeleton-loading {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(100%);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // ===== UTILITY FUNCTIONS =====
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function optimizeAnimations() {
        // Use transform and opacity for better performance
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
        
        // Clean up will-change after animation
        document.addEventListener('animationend', (event) => {
            event.target.style.willChange = 'auto';
        });
    }

    // ===== ACCESSIBILITY CONSIDERATIONS =====
    function enhanceAccessibility() {
        // Respect reduced motion preference
        if (config.reducedMotion) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }
        
        // Pause animations on focus
        document.addEventListener('focusin', pauseAnimations);
        document.addEventListener('focusout', resumeAnimations);
    }

    function pauseAnimations() {
        document.documentElement.style.setProperty('--animation-play-state', 'paused');
    }

    function resumeAnimations() {
        document.documentElement.style.setProperty('--animation-play-state', 'running');
    }

    // ===== EXPORT FUNCTIONS =====
    window.Animations = {
        animateElement,
        addStaggerEffect,
        createRippleEffect,
        startTypingAnimation,
        config
    };

    // ===== INITIALIZE =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addCSSAnimations();
            init();
            initMicroInteractions();
            optimizeAnimations();
            enhanceAccessibility();
        });
    } else {
        addCSSAnimations();
        init();
        initMicroInteractions();
        optimizeAnimations();
        enhanceAccessibility();
    }

})();
