// Why Choose Us Section - Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the section
    initWhyChooseUs();
    
    // Set up number counting animation
    setupNumberCounting();
    
    // Set up strength card interactions
    setupStrengthCards();
    
    // Set up CTA button interactions
    setupCTAButtons();
    
    // Add animations on scroll
    setupScrollAnimations();
});

/**
 * Initialize the Why Choose Us section
 */
function initWhyChooseUs() {
    console.log('Why Choose Us section initialized');
    
    // Add initial animation to section
    const section = document.querySelector('.why-choose-us');
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
    
    // Add hover effect to testimonial
    const testimonial = document.querySelector('.testimonial-highlight');
    testimonial.addEventListener('mouseenter', () => {
        testimonial.style.transform = 'translateY(-5px)';
        testimonial.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
    
    testimonial.addEventListener('mouseleave', () => {
        testimonial.style.transform = 'translateY(0)';
        testimonial.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
}

/**
 * Set up number counting animation for trust indicators
 */
function setupNumberCounting() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Only animate when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetNumber = parseInt(numberElement.getAttribute('data-count'));
                animateNumber(numberElement, targetNumber);
                observer.unobserve(numberElement);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

/**
 * Animate number counting
 * @param {HTMLElement} element - Number element
 * @param {number} target - Target number to count to
 */
function animateNumber(element, target) {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;
    
    // Check if it's a percentage
    const isPercentage = element.textContent.includes('%');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isPercentage) {
            element.textContent = `${Math.round(current)}%`;
        } else {
            // Format large numbers with commas
            element.textContent = Math.round(current).toLocaleString();
        }
    }, stepDuration);
}

/**
 * Set up strength card interactions
 */
function setupStrengthCards() {
    const strengthCards = document.querySelectorAll('.strength-card');
    
    strengthCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function() {
            const cardType = this.querySelector('.strength-title').textContent;
            handleStrengthCardClick(cardType, this);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const cardType = this.querySelector('.strength-title').textContent;
                handleStrengthCardClick(cardType, this);
            }
        });
        
        // Enhanced hover effect timing
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}

/**
 * Handle strength card click
 * @param {string} cardType - Type of strength card
 * @param {HTMLElement} cardElement - The clicked card element
 */
function handleStrengthCardClick(cardType, cardElement) {
    // Visual feedback for click
    cardElement.style.transform = 'translateY(-12px) scale(1.02)';
    
    // Reset after a short delay
    setTimeout(() => {
        cardElement.style.transform = 'translateY(-10px)';
    }, 150);
    
    // Create a more pronounced visual effect
    createCardClickEffect(cardElement);
    
    // Log interaction for analytics (in a real scenario)
    console.log(`Strength card clicked: ${cardType}`);
    
    // Show expanded information
    showStrengthDetail(cardType, cardElement);
}

/**
 * Create visual effect for card click
 * @param {HTMLElement} card - The card element
 */
function createCardClickEffect(card) {
    // Create a temporary overlay for visual feedback
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)';
    overlay.style.borderRadius = '16px';
    overlay.style.zIndex = '3';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease';
    
    card.appendChild(overlay);
    
    // Animate the overlay
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });
    
    // Remove overlay after animation
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode === card) {
                card.removeChild(overlay);
            }
        }, 300);
    }, 300);
}

/**
 * Show expanded strength detail
 * @param {string} cardType - Type of strength card
 * @param {HTMLElement} cardElement - The clicked card element
 */
function showStrengthDetail(cardType, cardElement) {
    // In a real application, you might:
    // 1. Show a detailed modal
    // 2. Expand the card to show more information
    // 3. Scroll to a related section
    // 4. Highlight related products or services
    
    // For this demo, we'll create a subtle notification
    const notification = document.createElement('div');
    notification.className = 'strength-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-info-circle"></i>
            </div>
            <div class="notification-text">
                Learn more about our <strong>${cardType}</strong>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '80px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(135deg, #D4AF37 0%, #2C2C2C 100%)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 8px 24px rgba(18, 18, 18, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.maxWidth = '350px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .strength-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .strength-notification .notification-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        .strength-notification .notification-text {
            font-size: 0.95rem;
            line-height: 1.4;
            flex: 1;
        }
        .strength-notification .notification-close {
            background: transparent;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            padding: 4px;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }
        .strength-notification .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode === document.body) {
                document.body.removeChild(notification);
            }
        }, 500);
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode === document.body) {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode === document.body) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }
    }, 6000);
}

/**
 * Set up CTA button interactions
 */
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPrimary = this.classList.contains('primary');
            handleCTAClick(isPrimary ? 'consultation' : 'quote', this);
        });
        
        // Add visual feedback for clicks
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Handle CTA button click
 * @param {string} actionType - Type of action
 * @param {HTMLElement} buttonElement - The clicked button element
 */
function handleCTAClick(actionType, buttonElement) {
    // Visual feedback
    buttonElement.style.transform = 'scale(0.95)';
    
    // Create ripple effect
    createRippleEffect(buttonElement);
    
    // Log action (in a real scenario)
    console.log(`CTA clicked: ${actionType}`);
    
    // Reset after animation
    setTimeout(() => {
        buttonElement.style.transform = 'scale(1)';
    }, 200);
    
    // In a real application, this would:
    // 1. Open a contact form modal
    // 2. Scroll to contact section
    // 3. Initiate a phone call
    // 4. Open a quote request form
}

/**
 * Create ripple effect for buttons
 * @param {HTMLElement} button - The button element
 */
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = 0;
    const y = 0;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = button.classList.contains('primary') 
        ? 'rgba(18, 18, 18, 0.1)' 
        : 'rgba(255, 255, 255, 0.2)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode === button) {
            button.removeChild(ripple);
        }
    }, 600);
}

/**
 * Set up scroll-triggered animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe strength cards
    const strengthCards = document.querySelectorAll('.strength-card');
    strengthCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe trust stats
    const trustStats = document.querySelectorAll('.trust-stat');
    trustStats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(stat);
    });
    
    // Observe testimonial
    const testimonial = document.querySelector('.testimonial-highlight');
    if (testimonial) {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateY(20px)';
        testimonial.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
        observer.observe(testimonial);
    }
    
    // Observe CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.style.opacity = '0';
        ctaSection.style.transform = 'translateY(20px)';
        ctaSection.style.transition = 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s';
        observer.observe(ctaSection);
    }
}

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add this to your existing JavaScript file
function optimizeCardsForMobile() {
    const isMobile = window.innerWidth <= 767;
    const durabilityCard = document.querySelector('.strength-card:nth-child(4)');
    
    if (isMobile && durabilityCard) {
        // Optionally hide some features on mobile
        const features = durabilityCard.querySelectorAll('.feature-item');
        if (features.length > 3) {
            for (let i = 3; i < features.length; i++) {
                features[i].style.display = 'none';
            }
        }
        
        // Make warranty badge more compact
        const warrantyBadge = durabilityCard.querySelector('.warranty-badge');
        if (warrantyBadge) {
            warrantyBadge.style.fontSize = '0.7rem';
            warrantyBadge.style.padding = '5px 10px';
        }
    } else if (durabilityCard) {
        // Reset to desktop view
        const features = durabilityCard.querySelectorAll('.feature-item');
        features.forEach(feature => {
            feature.style.display = 'flex';
        });
        
        const warrantyBadge = durabilityCard.querySelector('.warranty-badge');
        if (warrantyBadge) {
            warrantyBadge.style.fontSize = '';
            warrantyBadge.style.padding = '';
        }
    }
}

// Call on load and resize
window.addEventListener('load', optimizeCardsForMobile);
window.addEventListener('resize', optimizeCardsForMobile);