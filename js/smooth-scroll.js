/**
 * TranquilMindQuest - Smooth Scroll JavaScript
 * Enhanced smooth scrolling with accessibility support
 */

(function() {
    'use strict';

    // ===== CONFIGURATION =====
    const config = {
        duration: 800,
        easing: 'easeInOutCubic',
        offset: 80, // Account for fixed header
        updateURL: true,
        preventDefault: true
    };

    // ===== EASING FUNCTIONS =====
    const easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => 1 - (--t) * t * t * t,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
        easeInQuint: t => t * t * t * t * t,
        easeOutQuint: t => 1 + (--t) * t * t * t * t,
        easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    };

    // ===== STATE MANAGEMENT =====
    let isScrolling = false;
    let currentScrollTarget = null;
    let scrollAnimationId = null;

    // ===== INITIALIZATION =====
    function init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            config.duration = 0;
        }

        // Initialize smooth scroll for anchor links
        initSmoothScroll();
        
        // Initialize scroll to top functionality
        initScrollToTop();
        
        // Initialize section navigation
        initSectionNavigation();
        
        console.log('Smooth scroll initialized');
    }

    // ===== SMOOTH SCROLL INITIALIZATION =====
    function initSmoothScroll() {
        // Find all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', handleAnchorClick);
        });

        // Handle programmatic navigation
        window.addEventListener('hashchange', handleHashChange);
        
        // Handle initial hash on page load
        if (window.location.hash) {
            setTimeout(() => {
                scrollToElement(window.location.hash.substring(1));
            }, 100);
        }
    }

    // ===== ANCHOR CLICK HANDLER =====
    function handleAnchorClick(event) {
        const href = event.currentTarget.getAttribute('href');
        
        if (href === '#') {
            event.preventDefault();
            return;
        }

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            event.preventDefault();
            scrollToElement(targetId);
            
            // Update URL if configured
            if (config.updateURL) {
                updateURL(targetId);
            }
            
            // Track analytics event
            trackScrollEvent('anchor_click', targetId);
        }
    }

    // ===== HASH CHANGE HANDLER =====
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            scrollToElement(hash);
        }
    }

    // ===== SCROLL TO ELEMENT =====
    function scrollToElement(elementId, options = {}) {
        const element = document.getElementById(elementId);
        
        if (!element) {
            console.warn(`Element with ID "${elementId}" not found`);
            return;
        }

        // Cancel any ongoing scroll animation
        if (scrollAnimationId) {
            cancelAnimationFrame(scrollAnimationId);
        }

        const finalOptions = { ...config, ...options };
        
        // Calculate target position
        const targetPosition = calculateTargetPosition(element, finalOptions.offset);
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // If distance is small, scroll immediately
        if (Math.abs(distance) < 5) {
            return;
        }

        // Start scroll animation
        animateScroll(startPosition, distance, finalOptions);
        
        // Focus the target element for accessibility
        setTimeout(() => {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth' });
        }, finalOptions.duration);
    }

    // ===== CALCULATE TARGET POSITION =====
    function calculateTargetPosition(element, offset) {
        const elementRect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return elementRect.top + scrollTop - offset;
    }

    // ===== SCROLL ANIMATION =====
    function animateScroll(startPosition, distance, options) {
        isScrolling = true;
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / options.duration, 1);
            
            // Apply easing function
            const easedProgress = easingFunctions[options.easing](progress);
            
            // Calculate current position
            const currentPosition = startPosition + (distance * easedProgress);
            
            // Apply scroll
            window.scrollTo(0, currentPosition);
            
            // Continue animation or finish
            if (progress < 1) {
                scrollAnimationId = requestAnimationFrame(animate);
            } else {
                isScrolling = false;
                scrollAnimationId = null;
                
                // Dispatch scroll complete event
                dispatchScrollCompleteEvent();
            }
        }
        
        scrollAnimationId = requestAnimationFrame(animate);
    }

    // ===== SCROLL TO TOP FUNCTIONALITY =====
    function initScrollToTop() {
        // Create scroll to top button
        const scrollToTopButton = createScrollToTopButton();
        document.body.appendChild(scrollToTopButton);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', throttle(handleScrollToTopVisibility, 100));
    }

    function createScrollToTopButton() {
        const button = document.createElement('button');
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
            </svg>
        `;
        
        // Style the button
        Object.assign(button.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 'var(--z-fixed)',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all var(--transition-normal)',
            opacity: '0',
            transform: 'translateY(20px)'
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(0) scale(1.1)';
            button.style.boxShadow = 'var(--shadow-xl)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = 'var(--shadow-lg)';
        });
        
        // Add click handler
        button.addEventListener('click', () => {
            scrollToTop();
        });
        
        return button;
    }

    function handleScrollToTopVisibility() {
        const button = document.querySelector('.scroll-to-top');
        if (!button) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldShow = scrollTop > 300;
        
        if (shouldShow) {
            button.style.display = 'flex';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (button.style.opacity === '0') {
                    button.style.display = 'none';
                }
            }, 300);
        }
    }

    function scrollToTop() {
        scrollToElement('top', { duration: 600 });
        trackScrollEvent('scroll_to_top', 'top');
    }

    // ===== SECTION NAVIGATION =====
    function initSectionNavigation() {
        // Create section navigation
        const sections = document.querySelectorAll('section[id]');
        if (sections.length === 0) return;
        
        const nav = createSectionNavigation(sections);
        document.body.appendChild(nav);
        
        // Update active section on scroll
        window.addEventListener('scroll', throttle(updateActiveSection, 100));
    }

    function createSectionNavigation(sections) {
        const nav = document.createElement('nav');
        nav.className = 'section-nav';
        nav.setAttribute('aria-label', 'Section navigation');
        
        const navList = document.createElement('ul');
        navList.className = 'section-nav-list';
        
        sections.forEach((section, index) => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            link.href = `#${section.id}`;
            link.textContent = section.dataset.navLabel || section.id.replace(/-/g, ' ');
            link.className = 'section-nav-link';
            link.setAttribute('aria-label', `Go to ${link.textContent} section`);
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        });
        
        nav.appendChild(navList);
        
        // Style the navigation
        Object.assign(nav.style, {
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 'var(--z-fixed)',
            display: 'none'
        });
        
        Object.assign(navList.style, {
            listStyle: 'none',
            padding: '0',
            margin: '0',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-sm)'
        });
        
        // Show navigation on larger screens
        if (window.innerWidth >= 1024) {
            nav.style.display = 'block';
        }
        
        window.addEventListener('resize', () => {
            nav.style.display = window.innerWidth >= 1024 ? 'block' : 'none';
        });
        
        return nav;
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.section-nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        const scrollPosition = window.pageYOffset + 100;
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${activeSection}`;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    // ===== UTILITY FUNCTIONS =====
    function updateURL(elementId) {
        const url = new URL(window.location);
        url.hash = elementId;
        window.history.pushState(null, null, url);
    }

    function dispatchScrollCompleteEvent() {
        const event = new CustomEvent('scrollComplete', {
            detail: { target: currentScrollTarget }
        });
        document.dispatchEvent(event);
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

    // ===== ANALYTICS TRACKING =====
    function trackScrollEvent(action, target) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'navigation',
                event_label: target,
                value: action
            });
        }
    }

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    function enhanceAccessibility() {
        // Add keyboard navigation for section nav
        const sectionNav = document.querySelector('.section-nav');
        if (sectionNav) {
            sectionNav.addEventListener('keydown', handleSectionNavKeydown);
        }
        
        // Announce scroll events to screen readers
        document.addEventListener('scrollComplete', (event) => {
            const target = event.detail.target;
            if (target) {
                announceScrollComplete(target);
            }
        });
    }

    function handleSectionNavKeydown(event) {
        const links = Array.from(event.currentTarget.querySelectorAll('.section-nav-link'));
        const currentIndex = links.indexOf(document.activeElement);
        
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % links.length;
            links[nextIndex].focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = currentIndex === 0 ? links.length - 1 : currentIndex - 1;
            links[prevIndex].focus();
        }
    }

    function announceScrollComplete(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const announcement = `Scrolled to ${targetElement.textContent || targetId} section`;
            const liveRegion = document.getElementById('live-region');
            if (liveRegion) {
                liveRegion.textContent = announcement;
            }
        }
    }

    // ===== EXPORT FUNCTIONS =====
    window.SmoothScroll = {
        scrollToElement,
        scrollToTop,
        isScrolling: () => isScrolling,
        config
    };

    // ===== INITIALIZE =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ===== ENHANCE ACCESSIBILITY AFTER INIT =====
    document.addEventListener('DOMContentLoaded', enhanceAccessibility);

})();
