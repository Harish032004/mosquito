// Premium Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer functionality
    initFooter();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize current year
    initCurrentYear();
    
    // Initialize smooth scroll for footer links
    initSmoothScroll();
});

// Initialize footer functionality
function initFooter() {
    // Add animation delay to footer sections
    const footerSections = document.querySelectorAll('.footer-grid > *');
    footerSections.forEach((section, index) => {
        section.style.setProperty('--animation-order', index);
    });
    
    // Add hover effect to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
            }
        });
    });
    
    // Add click effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add click sound effect (optional)
            playClickSound();
        });
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track the click (for analytics)
        trackButtonClick('back_to_top');
    });
    
    // Add hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.3)';
    });
}

// Initialize current year in copyright
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Initialize smooth scroll for footer links
function initSmoothScroll() {
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle anchor links
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                // Add active class to clicked link
                footerLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Track link click (for analytics)
                trackLinkClick('footer_navigation', href);
            }
        });
    });
}

// Play click sound (optional)
function playClickSound() {
    // You can add a subtle click sound here
    // For example, using the Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio context not supported, silent fail
    }
}

// Track button clicks (for analytics)
function trackButtonClick(buttonName) {
    // In a real implementation, this would send data to your analytics platform
    console.log(`Button clicked: ${buttonName}`);
    
    // Example: Google Analytics
    // if (typeof gtag === 'function') {
    //     gtag('event', 'click', {
    //         'event_category': 'footer',
    //         'event_label': buttonName
    //     });
    // }
}

// Track link clicks (for analytics)
function trackLinkClick(category, link) {
    // In a real implementation, this would send data to your analytics platform
    console.log(`Link clicked: ${category} - ${link}`);
    
    // Example: Google Analytics
    // if (typeof gtag === 'function') {
    //     gtag('event', 'click', {
    //         'event_category': category,
    //         'event_label': link
    //     });
    // }
}

// Add ripple animation to CSS
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Call to add ripple animation
addRippleAnimation();

// Newsletter subscription (optional functionality)
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Track subscription
                trackNewsletterSubscription(email);
            }, 1500);
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="${
                    type === 'success' 
                        ? 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
                        : 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
                }"/>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#footer-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'footer-notification-styles';
        style.textContent = `
            .footer-notification {
                position: fixed;
                bottom: 100px;
                right: 30px;
                background: var(--footer-dark);
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid;
                max-width: 300px;
            }
            
            .footer-notification.success {
                border-left-color: #27ae60;
            }
            
            .footer-notification.error {
                border-left-color: #e74c3c;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .footer-notification.success .notification-content svg {
                fill: #27ae60;
            }
            
            .footer-notification.error .notification-content svg {
                fill: #e74c3c;
            }
            
            .footer-notification .notification-content span {
                color: white;
                font-size: 0.9rem;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Track newsletter subscription
function trackNewsletterSubscription(email) {
    console.log(`Newsletter subscription: ${email}`);
    
    // In a real implementation, send to your analytics platform
    // if (typeof gtag === 'function') {
    //     gtag('event', 'generate_lead', {
    //         'event_category': 'newsletter',
    //         'event_label': 'footer_subscription'
    //     });
    // }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNewsletter);