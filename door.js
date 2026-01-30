// Doors & Windows Solutions Section - Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the section
    initDoorsWindowsSection();
    
    // Set up category switching
    setupCategorySwitching();
    
    // Set up service card interactions
    setupServiceCards();
    
    // Add smooth animations
    setupAnimations();
});

/**
 * Initialize the doors & windows section
 */
function initDoorsWindowsSection() {
    console.log('Premium Doors & Windows Solutions section initialized');
    
    // Add initial animation to section
    const section = document.querySelector('.doors-windows-section');
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Set up category switching functionality
 */
function setupCategorySwitching() {
    const categoryButtons = document.querySelectorAll('.main-cat-btn');
    const categorySections = document.querySelectorAll('.services-category');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-main-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active section
            categorySections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${targetCategory}-section`) {
                    setTimeout(() => {
                        section.classList.add('active');
                    }, 50);
                }
            });
            
            // Add visual feedback
            createButtonClickEffect(this);
        });
    });
}

/**
 * Set up interactive service cards
 */
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add click interaction
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking a button
            if (!e.target.closest('.service-cta')) {
                const cardType = this.classList.contains('window-door-card') ? 'window-door' :
                               this.classList.contains('aluminium-card') ? 'aluminium' : 'upvc';
                const specificType = this.getAttribute('data-type');
                handleCardClick(cardType, specificType, this);
            }
        });
        
        // Add keyboard navigation for CTA buttons
        const ctaButton = card.querySelector('.service-cta');
        if (ctaButton) {
            ctaButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const cardType = card.classList.contains('window-door-card') ? 'window-door' :
                                   card.classList.contains('aluminium-card') ? 'aluminium' : 'upvc';
                    const specificType = card.getAttribute('data-type');
                    handleCardClick(cardType, specificType, card);
                }
            });
        }
        
        // Add enhanced hover effect timing
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}

/**
 * Handle service card click
 * @param {string} cardType - Type of service card
 * @param {string} specificType - Specific type from data-type
 * @param {HTMLElement} cardElement - The clicked card element
 */
function handleCardClick(cardType, specificType, cardElement) {
    // Visual feedback for click
    cardElement.style.transform = 'translateY(-12px) scale(1.02)';
    
    // Reset after a short delay
    setTimeout(() => {
        cardElement.style.transform = 'translateY(-10px)';
    }, 150);
    
    // Create a more pronounced visual effect
    createCardClickEffect(cardElement);
    
    // Get service name for display
    const serviceName = cardElement.querySelector('.service-name').textContent;
    
    // Log interaction for analytics (in a real scenario)
    console.log(`Service card clicked: ${serviceName} (${cardType} - ${specificType})`);
    
    // Show service details notification
    showServiceNotification(serviceName);
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
    overlay.style.background = 'radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 0%, transparent 70%)';
    overlay.style.borderRadius = '16px';
    overlay.style.zIndex = '2';
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
 * Create visual effect for button click
 * @param {HTMLElement} button - The button element
 */
function createButtonClickEffect(button) {
    // Create ripple effect
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
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
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
 * Show notification for service selection
 * @param {string} serviceName - Name of service selected
 */
function showServiceNotification(serviceName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'service-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-text">
                <strong>${serviceName}</strong> selected. Contact us for a consultation.
            </div>
        </div>
    `;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
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
    
    // Add styles for notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .notification-icon {
            font-size: 1.5rem;
            flex-shrink: 0;
        }
        .notification-text {
            font-size: 0.95rem;
            line-height: 1.4;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode === document.body) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

/**
 * Set up animations and interactions
 */
function setupAnimations() {
    // Add scroll-triggered animations for assurance cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe assurance cards for animation
    const assuranceCards = document.querySelectorAll('.assurance-card');
    assuranceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}