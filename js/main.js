/**
 * TranquilMindQuest - Main JavaScript
 * Mental Health & Wellness Resource Platform
 * Core functionality and interactions
 */

(function() {
    'use strict';

    // ===== GLOBAL VARIABLES =====
    let isMenuOpen = false;
    let isCrisisBannerDismissed = false;
    let scrollPosition = 0;
    let isScrolling = false;
    let mobileMenuOverlay = null;

    // ===== DOM ELEMENTS =====
    const elements = {
        header: document.querySelector('.header'),
        navMenu: document.querySelector('.nav-menu'),
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        crisisBanner: document.querySelector('.crisis-banner'),
        crisisBannerClose: document.querySelector('.crisis-banner-close'),
        scrollIndicator: document.querySelector('.scroll-indicator'),
        newsletterForm: document.querySelector('.newsletter-form'),
        skipLink: document.querySelector('.skip-link'),
        mainContent: document.querySelector('main')
    };

    // ===== INITIALIZATION =====
    function init() {
        // Check if crisis banner was previously dismissed
        checkCrisisBannerState();
        
        // Initialize event listeners
        initEventListeners();
        
        // Initialize scroll effects
        initScrollEffects();
        
        // Initialize animations
        initAnimations();
        
        // Initialize form handling
        initFormHandling();
        
        // Initialize accessibility features
        initAccessibility();
        
        // Prepare mobile navigation overlay
        createMobileMenuOverlay();

        console.log('TranquilMindQuest initialized successfully');
    }

    // ===== EVENT LISTENERS =====
    function createMobileMenuOverlay() {
        if (mobileMenuOverlay) return;

        mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
        mobileMenuOverlay.setAttribute('tabindex', '-1');
        mobileMenuOverlay.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });

        document.body.appendChild(mobileMenuOverlay);
    }

    function initEventListeners() {
        // Mobile menu toggle
        if (elements.mobileMenuToggle) {
            elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        if (elements.navMenu) {
            const navLinks = elements.navMenu.querySelectorAll('a');

            navLinks.forEach(link => {
                if (link.classList.contains('dropdown-toggle')) {
                    link.addEventListener('click', (event) => {
                        if (window.innerWidth < 768) {
                            event.preventDefault();
                        }
                    });
                    return;
                }

                link.addEventListener('click', () => {
                    if (window.innerWidth < 768 && isMenuOpen) {
                        toggleMobileMenu();
                    }
                });
            });
        }

        // Crisis banner close
        if (elements.crisisBannerClose) {
            elements.crisisBannerClose.addEventListener('click', dismissCrisisBanner);
        }

        // Scroll events
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Resize events
        window.addEventListener('resize', handleResize, { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Focus management
        document.addEventListener('focusin', handleFocusIn);
        document.addEventListener('focusout', handleFocusOut);
        
        // Click outside to close mobile menu
        document.addEventListener('click', handleClickOutside);
        
        // Prevent scroll when mobile menu is open
        document.addEventListener('touchmove', preventScrollWhenMenuOpen, { passive: false });
    }

    // ===== MOBILE MENU FUNCTIONALITY =====
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (elements.navMenu) {
            elements.navMenu.classList.toggle('active', isMenuOpen);
        }
        
        if (elements.mobileMenuToggle) {
            elements.mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
            elements.mobileMenuToggle.setAttribute('aria-label', 
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            );
            elements.mobileMenuToggle.classList.toggle('active', isMenuOpen);
        }
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('menu-open', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.toggle('active', isMenuOpen);
            mobileMenuOverlay.setAttribute('aria-hidden', (!isMenuOpen).toString());
        }
        
        // Focus management
        if (isMenuOpen) {
            const firstLink = elements.navMenu?.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }
    }

    function handleClickOutside(event) {
        if (isMenuOpen && 
            !elements.navMenu?.contains(event.target) && 
            !elements.mobileMenuToggle?.contains(event.target)) {
            toggleMobileMenu();
        }
    }

    function preventScrollWhenMenuOpen(event) {
        if (isMenuOpen) {
            event.preventDefault();
        }
    }

    // ===== SCROLL EFFECTS =====
    function initScrollEffects() {
        // Header scroll effect
        if (elements.header) {
            window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
        }
        
        // Scroll indicator
        if (elements.scrollIndicator) {
            window.addEventListener('scroll', updateScrollIndicator, { passive: true });
        }
    }

    function handleScroll() {
        if (!isScrolling) {
            requestAnimationFrame(updateScrollEffects);
            isScrolling = true;
        }
    }

    function updateScrollEffects() {
        scrollPosition = window.pageYOffset;
        
        updateHeaderOnScroll();
        updateScrollIndicator();
        updateParallaxElements();
        
        isScrolling = false;
    }

    function updateHeaderOnScroll() {
        if (elements.header) {
            const scrolled = scrollPosition > 50;
            elements.header.classList.toggle('scrolled', scrolled);
        }
    }

    function updateScrollIndicator() {
        if (elements.scrollIndicator) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            if (scrollPercent > 10) {
                elements.scrollIndicator.style.opacity = '0';
            } else {
                elements.scrollIndicator.style.opacity = '1';
            }
        }
    }

    function updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // ===== ANIMATIONS =====
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.stat-card, .technique-card, .product-card, .blog-card, .card'
        );
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            observer.observe(element);
        });
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('animate-on-scroll');
            }
        });
    }

    // ===== FORM HANDLING =====
    function initFormHandling() {
        // Newsletter form
        if (elements.newsletterForm) {
            elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }
        
        // Form validation
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    function handleNewsletterSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const email = formData.get('email');
        
        if (validateEmail(email)) {
            // Simulate newsletter signup
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            event.target.reset();
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    }

    function handleFormSubmit(event) {
        const form = event.target;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showFieldError(input, 'This field is required');
            } else {
                clearFieldError(input);
            }
        });
        
        if (!isValid) {
            event.preventDefault();
            showNotification('Please fill in all required fields.', 'error');
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFieldError(input, message) {
        clearFieldError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-xs)';
        
        input.parentNode.appendChild(errorElement);
        input.classList.add('error');
    }

    function clearFieldError(input) {
        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('error');
    }

    // ===== ACCESSIBILITY =====
    function initAccessibility() {
        // Skip link functionality
        if (elements.skipLink && elements.mainContent) {
            elements.skipLink.addEventListener('click', (event) => {
                event.preventDefault();
                elements.mainContent.focus();
                elements.mainContent.scrollIntoView();
            });
        }
        
        // ARIA live region for announcements
        createLiveRegion();
        
        // Focus trap for mobile menu
        if (elements.navMenu) {
            elements.navMenu.addEventListener('keydown', handleMenuKeydown);
        }
    }

    function createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    function announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    function handleMenuKeydown(event) {
        if (!isMenuOpen) return;
        
        const focusableElements = elements.navMenu.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        } else if (event.key === 'Escape') {
            toggleMobileMenu();
            elements.mobileMenuToggle?.focus();
        }
    }

    // ===== KEYBOARD NAVIGATION =====
    function handleKeyboardNavigation(event) {
        // Escape key closes mobile menu
        if (event.key === 'Escape' && isMenuOpen) {
            toggleMobileMenu();
            elements.mobileMenuToggle?.focus();
        }
        
        // Alt + M opens mobile menu
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            if (elements.mobileMenuToggle) {
                elements.mobileMenuToggle.click();
            }
        }
    }

    function handleFocusIn(event) {
        // Add focus indicators
        event.target.classList.add('focus-visible');
    }

    function handleFocusOut(event) {
        // Remove focus indicators
        event.target.classList.remove('focus-visible');
    }

    // ===== CRISIS BANNER =====
    function checkCrisisBannerState() {
        const dismissed = localStorage.getItem('crisisBannerDismissed');
        if (dismissed === 'true') {
            isCrisisBannerDismissed = true;
            if (elements.crisisBanner) {
                elements.crisisBanner.style.display = 'none';
            }
        } else {
            showCrisisBanner();
        }
    }

    function showCrisisBanner() {
        if (elements.crisisBanner && !isCrisisBannerDismissed) {
            elements.crisisBanner.classList.add('show');
            announceToScreenReader('Crisis support information is available');
        }
    }

    function dismissCrisisBanner() {
        if (elements.crisisBanner) {
            elements.crisisBanner.classList.remove('show');
            localStorage.setItem('crisisBannerDismissed', 'true');
            isCrisisBannerDismissed = true;
            announceToScreenReader('Crisis banner dismissed');
        }
    }

    // ===== NOTIFICATIONS =====
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: 'var(--space-md) var(--space-lg)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--bg-primary)',
            fontWeight: 'var(--font-weight-medium)',
            zIndex: 'var(--z-tooltip)',
            transform: 'translateX(100%)',
            transition: 'transform var(--transition-normal)',
            maxWidth: '400px',
            boxShadow: 'var(--shadow-lg)'
        });
        
        // Set background color based on type
        const colors = {
            success: 'var(--accent-secondary)',
            error: 'var(--error-color)',
            info: 'var(--accent-primary)',
            warning: 'var(--accent-warm)'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        announceToScreenReader(message);
    }

    // ===== UTILITY FUNCTIONS =====
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMobileMenu();
        }
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

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function optimizePerformance() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Preload critical resources
        const criticalResources = [
            './css/main.css',
            './css/dark-theme.css',
            './css/responsive.css'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // ===== ERROR HANDLING =====
    function handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);
        
        // Show user-friendly error message
        showNotification('Something went wrong. Please try again.', 'error');
        
        // Report error to analytics (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }

    // ===== ANALYTICS INTEGRATION =====
    function trackEvent(category, action, label = null) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
    window.TranquilMindQuest = {
        toggleMobileMenu,
        showNotification,
        trackEvent,
        handleError
    };

    // ===== INITIALIZE WHEN DOM IS READY =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== INITIALIZE PERFORMANCE OPTIMIZATIONS =====
    if (document.readyState === 'complete') {
        optimizePerformance();
    } else {
        window.addEventListener('load', optimizePerformance);
    }

    // ===== GLOBAL ERROR HANDLING =====
    window.addEventListener('error', (event) => {
        handleError(event.error, 'Global');
    });

    window.addEventListener('unhandledrejection', (event) => {
        handleError(event.reason, 'Promise Rejection');
    });

})();
