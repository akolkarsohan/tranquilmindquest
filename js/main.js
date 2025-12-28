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
    
    // ===== CONSTANTS =====
    const SCROLL_THRESHOLD = 50; // Pixels to scroll before header changes
    const SCROLL_INDICATOR_THRESHOLD = 10; // Percentage of page scrolled before hiding indicator
    const PARALLAX_DEFAULT_SPEED = 0.5; // Default parallax speed multiplier
    const NOTIFICATION_DISPLAY_TIME = 5000; // Milliseconds to show notification
    const NOTIFICATION_ANIMATION_TIME = 300; // Milliseconds for notification animation

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

        // Initialize dropdown behavior
        initDropdownBehavior();

        if (elements.navMenu) {
            const navLinks = elements.navMenu.querySelectorAll('a');

            navLinks.forEach(link => {
                if (link.classList.contains('dropdown-toggle')) {
                    return; // Already handled above
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
            const scrolled = scrollPosition > SCROLL_THRESHOLD;
            elements.header.classList.toggle('scrolled', scrolled);
        }
    }

    function updateScrollIndicator() {
        if (elements.scrollIndicator) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            if (scrollPercent > SCROLL_INDICATOR_THRESHOLD) {
                elements.scrollIndicator.style.opacity = '0';
            } else {
                elements.scrollIndicator.style.opacity = '1';
            }
        }
    }

    function updateParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || PARALLAX_DEFAULT_SPEED;
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
    // Rate limiting configuration
    let lastNewsletterSubmissionTime = 0;
    const MIN_SUBMISSION_INTERVAL = 2000; // 2 seconds between submissions
    
    function initFormHandling() {
        // Newsletter form
        if (elements.newsletterForm) {
            elements.newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }
        
        // Form validation (exclude newsletter forms as they have their own handler)
        const forms = document.querySelectorAll('form:not(.newsletter-form)');
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    function handleNewsletterSubmit(event) {
        event.preventDefault();
        event.stopPropagation(); // Prevent any other handlers from running
        
        // Rate limiting: prevent rapid-fire submissions
        const now = Date.now();
        if (now - lastNewsletterSubmissionTime < MIN_SUBMISSION_INTERVAL) {
            showNotification('Please wait before submitting again.', 'warning');
            return;
        }
        lastNewsletterSubmissionTime = now;
        
        const form = event.target;
        const emailInput = form.querySelector('input[type="email"], .newsletter-input');
        if (!emailInput) {
            showNotification('Newsletter form error. Please refresh the page.', 'error');
            return;
        }
        
        const email = emailInput.value.trim();
        
        // Clear any previous errors
        clearFieldError(emailInput);
        
        // Validate email
        if (!email) {
            showFieldError(emailInput, 'This field is required');
            showNotification('Please enter your email address.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Disable submit button during processing
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton ? submitButton.textContent : 'Subscribe';
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
        }
        
        // Get API endpoint from config or use fallback
        const apiEndpoint = (typeof window !== 'undefined' && window.NEWSLETTER_CONFIG) 
            ? window.NEWSLETTER_CONFIG.API_ENDPOINT 
            : null;
        
        // Try to send via API if configured, otherwise use localStorage
        if (apiEndpoint && !apiEndpoint.includes('YOUR_API_ID')) {
            // Send subscription to API Gateway
            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store email locally as backup
                    saveSubscriptionToLocalStorage(email);
                    showNotification(data.message || 'Thank you for subscribing! Please check your email for confirmation.', 'success');
                    form.reset();
                } else {
                    // API failed, try localStorage fallback
                    if (window.NEWSLETTER_CONFIG && window.NEWSLETTER_CONFIG.USE_FALLBACK) {
                        saveSubscriptionToLocalStorage(email);
                        showNotification('Thank you for subscribing! We\'ll send you updates soon.', 'success');
                        form.reset();
                    } else {
                        showNotification(data.error || 'Subscription failed. Please try again.', 'error');
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalButtonText;
                        }
                    }
                }
            })
            .catch(error => {
                console.error('API subscription error:', error);
                // Use improved error handling
                handleError(error, 'Newsletter Subscription');
                
                // API failed, try localStorage fallback
                if (window.NEWSLETTER_CONFIG && window.NEWSLETTER_CONFIG.USE_FALLBACK) {
                    saveSubscriptionToLocalStorage(email);
                    showNotification('Thank you for subscribing! We\'ll send you updates soon.', 'success');
                    form.reset();
                } else {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                    }
                }
            });
        } else {
            // No API configured, use localStorage only
            saveSubscriptionToLocalStorage(email);
            showNotification('Thank you for subscribing! You will receive our weekly wellness updates.', 'success');
            form.reset();
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    }
    
    function saveSubscriptionToLocalStorage(email) {
        try {
            let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            const timestamp = new Date().toISOString();
            
            // Check if email already exists
            const existingIndex = subscribers.findIndex(sub => sub.email.toLowerCase() === email.toLowerCase());
            if (existingIndex >= 0) {
                // Update existing subscription
                subscribers[existingIndex].lastSubscription = timestamp;
            } else {
                // Add new subscriber
                subscribers.push({
                    email: email,
                    subscribedAt: timestamp,
                    lastSubscription: timestamp
                });
            }
            
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        } catch (error) {
            console.error('Error saving subscription to localStorage:', error);
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
        if (!email || typeof email !== 'string') return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
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
        
        // Auto remove after configured time
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, NOTIFICATION_ANIMATION_TIME);
        }, NOTIFICATION_DISPLAY_TIME);
        
        announceToScreenReader(message);
    }

    // ===== UTILITY FUNCTIONS =====
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768 && isMenuOpen) {
            toggleMobileMenu();
        }
        
        // Reinitialize dropdown behavior on resize
        initDropdownBehavior();
    }
    
    // Store click outside handler reference
    let clickOutsideHandler = null;
    
    function initDropdownBehavior() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const isDesktop = window.innerWidth >= 768;
        
        dropdownToggles.forEach(toggle => {
            // Remove existing click listeners
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);
            
            if (isDesktop) {
                // Desktop: click to toggle
                newToggle.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const dropdown = newToggle.closest('.nav-dropdown');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    const isActive = dropdown.classList.contains('active');
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-dropdown').forEach(dd => {
                        if (dd !== dropdown) {
                            dd.classList.remove('active');
                            const menu = dd.querySelector('.dropdown-menu');
                            if (menu) {
                                menu.style.pointerEvents = 'none';
                            }
                        }
                    });
                    
                    // Toggle current dropdown
                    if (!isActive) {
                        dropdown.classList.add('active');
                        if (dropdownMenu) {
                            dropdownMenu.style.pointerEvents = 'auto';
                            // Ensure dropdown is positioned correctly
                            positionDropdown(dropdownMenu, newToggle);
                        }
                    } else {
                        dropdown.classList.remove('active');
                        if (dropdownMenu) {
                            dropdownMenu.style.pointerEvents = 'none';
                        }
                    }
                });
            } else {
                // Mobile: prevent default navigation
                newToggle.addEventListener('click', (event) => {
                    event.preventDefault();
                });
            }
        });
        
        // Remove old click outside handler if it exists
        if (clickOutsideHandler) {
            document.removeEventListener('click', clickOutsideHandler);
            clickOutsideHandler = null;
        }
        
        // Close dropdown when clicking outside (desktop only)
        if (isDesktop) {
            clickOutsideHandler = function(event) {
                if (!event.target.closest('.nav-dropdown')) {
                    document.querySelectorAll('.nav-dropdown').forEach(dd => {
                        dd.classList.remove('active');
                        const menu = dd.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.style.pointerEvents = 'none';
                        }
                    });
                }
            };
            document.addEventListener('click', clickOutsideHandler);
        }
    }
    
    function positionDropdown(menu, toggle) {
        // Ensure dropdown menu is positioned correctly
        const rect = toggle.getBoundingClientRect();
        menu.style.top = '100%';
        menu.style.left = '0';
        menu.style.position = 'absolute';
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
        
        // Provide specific error messages based on error type
        let userMessage = 'Something went wrong. Please try again.';
        
        if (error.name === 'NetworkError' || error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
            userMessage = 'Unable to connect. Please check your internet connection and try again.';
        } else if (error.name === 'TimeoutError' || error.message.includes('timeout')) {
            userMessage = 'Request timed out. Please try again.';
        } else if (error.status === 429 || error.message.includes('rate limit')) {
            userMessage = 'Too many requests. Please wait a moment before trying again.';
        } else if (error.status === 403 || error.message.includes('forbidden')) {
            userMessage = 'Access denied. Please refresh the page and try again.';
        } else if (error.status === 400 || error.message.includes('invalid')) {
            userMessage = 'Invalid request. Please check your input and try again.';
        } else if (error.status >= 500) {
            userMessage = 'Server error. Please try again in a few moments.';
        }
        
        showNotification(userMessage, 'error');
        
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
