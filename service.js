/**
 * Premium Services Section - Interactive Components
 * Mosquito Net Types & Blind Types with category switching
 */

class ServicesSection {
    constructor() {
        this.currentCategory = 'mosquito-types';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAccessibility();
        this.setupImageLoading();
        this.setupCardAnimations();
    }

    bindEvents() {
        // Main category switching
        document.querySelectorAll('.main-cat-btn').forEach(button => {
            button.addEventListener('click', (e) => this.switchMainCategory(e));
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.switchMainCategory(e);
                }
            });
        });

        // Card CTA button clicks
        document.querySelectorAll('.service-cta').forEach(button => {
            button.addEventListener('click', (e) => this.handleCTAClick(e));
        });

        // Card click for quick view
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.service-cta')) {
                    this.showQuickView(card);
                }
            });
            
            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.service-cta')) {
                    e.preventDefault();
                    this.showQuickView(card);
                }
            });
        });

        // Window resize handling
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
    }

    switchMainCategory(e) {
        const button = e.currentTarget;
        const category = button.dataset.mainCategory;
        
        if (!category || category === this.currentCategory) return;
        
        // Update active states
        document.querySelectorAll('.main-cat-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Update sections
        document.querySelectorAll('.services-category').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(`${category}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentCategory = category;
            
            // Dispatch event
            this.dispatchCategoryChange(category);
            
            // Scroll to section smoothly
            this.scrollToSection(targetSection);
        }
    }

    handleCTAClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const button = e.currentTarget;
        const card = button.closest('.service-card');
        const serviceName = card.querySelector('.service-name').textContent;
        
        this.showServiceDetails(card, serviceName);
    }

    showQuickView(card) {
        const serviceName = card.querySelector('.service-name').textContent;
        const serviceDesc = card.querySelector('.service-desc').textContent;
        
        this.createQuickNotification(serviceName, serviceDesc);
    }
showServiceDetails(card, serviceName) {
    const overlay = this.createOverlay();
    const modal = this.createDetailModal(card, serviceName);
    
    // Add responsive class for CSS targeting
    const width = window.innerWidth;
    if (width < 768) {
        modal.classList.add('mobile-modal');
    } else if (width < 1024) {
        modal.classList.add('tablet-modal');
    }
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Focus management
    const firstFocusable = modal.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
    
    // Close functionality
    const closeModal = () => this.removeOverlay(overlay);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('close-modal')) {
            closeModal();
        }
    });
    
    // Escape key to close
    const handleEscape = (e) => {
        if (e.key === 'Escape') closeModal();
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Store cleanup function
    overlay._cleanup = () => {
        document.removeEventListener('keydown', handleEscape);
    };
    
    // Handle window resize while modal is open
    const handleResize = () => {
        modal.classList.remove('mobile-modal', 'tablet-modal');
        const newWidth = window.innerWidth;
        if (newWidth < 768) {
            modal.classList.add('mobile-modal');
        } else if (newWidth < 1024) {
            modal.classList.add('tablet-modal');
        }
    };
    
    window.addEventListener('resize', handleResize);
    overlay._resizeHandler = handleResize;
}

removeOverlay(overlay) {
    overlay.style.animation = 'overlayIn 0.3s ease-out reverse';
    
    // Remove resize handler
    if (overlay._resizeHandler) {
        window.removeEventListener('resize', overlay._resizeHandler);
    }
    
    setTimeout(() => {
        if (overlay._cleanup) overlay._cleanup();
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 300);
}    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'service-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 20px;
            backdrop-filter: blur(5px);
            animation: overlayIn 0.3s ease-out;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#overlay-animations')) {
            const style = document.createElement('style');
            style.id = 'overlay-animations';
            style.textContent = `
                @keyframes overlayIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(-30px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        return overlay;
    }

    createDetailModal(card, serviceName) {
        const features = Array.from(card.querySelectorAll('.feature')).map(f => f.textContent);
        const specs = Array.from(card.querySelectorAll('.spec-item')).map(s => ({
            icon: s.querySelector('i').className,
            text: s.querySelector('span').textContent
        }));
        const icon = card.querySelector('.card-icon i').className;
        const imageBg = card.querySelector('.media-image').style.backgroundImage;
        const tag = card.querySelector('.service-tag span').textContent;
        const badge = card.querySelector('.card-badge')?.textContent || '';
        
        const modal = document.createElement('div');
        modal.className = 'service-detail-modal';
        modal.style.cssText = `
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border-radius: 24px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            color: white;
            border: 1px solid rgba(212, 175, 55, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        modal.innerHTML = `
            <div class="modal-header" style="padding: 40px 40px 30px; background: rgba(0,0,0,0.5); border-bottom: 1px solid rgba(212, 175, 55, 0.2); position: relative;">
                <button class="close-modal" style="position: absolute; top: 20px; right: 20px; background: rgba(212, 175, 55, 0.2); border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; color: white;">
                    <i class="fas fa-times"></i>
                </button>
                <div style="display: flex; align-items: center; gap: 25px; margin-bottom: 20px;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #D4AF37 0%, #8B6914 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(212, 175, 55, 0.4);">
                        <i class="${icon}" style="font-size: 2.5rem; color: white;"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px;">
                            <h3 style="font-size: 2rem; font-weight: 700; margin: 0; color: white;">${serviceName}</h3>
                            ${badge ? `<span style="padding: 6px 16px; background: linear-gradient(135deg, #D4AF37 0%, #8B6914 100%); color: white; font-size: 0.875rem; font-weight: 600; border-radius: 20px; white-space: nowrap;">${badge}</span>` : ''}
                        </div>
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <span style="padding: 6px 16px; background: rgba(212, 175, 55, 0.15); color: #D4AF37; font-size: 0.875rem; font-weight: 600; border-radius: 20px; border: 1px solid rgba(212, 175, 55, 0.3);">${tag}</span>
                            <span style="color: #aaa; font-size: 0.875rem;"><i class="fas fa-clock" style="margin-right: 5px;"></i> Installation: 2-4 hours</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-content" style="padding: 40px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
                    <div>
                        <h4 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid rgba(212, 175, 55, 0.3);">Product Specifications</h4>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                            ${specs.map(spec => `
                                <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.1);">
                                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                                        <i class="${spec.icon}" style="color: #D4AF37; font-size: 1rem;"></i>
                                        <span style="font-size: 0.875rem; color: #ccc; font-weight: 500;">${spec.text}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid rgba(212, 175, 55, 0.3);">Key Features</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            ${features.map(feature => `
                                <span style="padding: 10px 18px; background: rgba(212, 175, 55, 0.1); color: #D4AF37; font-size: 0.875rem; font-weight: 600; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.3);">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 16px; border: 1px solid rgba(212, 175, 55, 0.1); margin-bottom: 40px;">
                    <h4 style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 15px;">Service Description</h4>
                    <p style="color: #ccc; line-height: 1.7; margin-bottom: 0;">${card.querySelector('.service-desc').textContent}</p>
                </div>
                
                <div style="display: flex; gap: 20px;">
                 <button class="action-btn primary-action" 
        onclick="const target = document.querySelector('.contact-form-section'); if(target) { target.scrollIntoView({behavior: 'smooth'}); document.querySelector('.close-modal').click(); }"
        style="flex: 1; padding: 20px; background: linear-gradient(135deg, #D4AF37 0%, #8B6914 100%); color: white; border: none; border-radius: 12px; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 12px;">
    <i class="fas fa-calendar-check"></i>
    Schedule Free Consultation
</button>
                    <button class="action-btn secondary-action" style="flex: 1; padding: 20px; background: rgba(255, 255, 255, 0.05); color: white; border: 2px solid rgba(212, 175, 55, 0.3); border-radius: 12px; font-size: 1.125rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 12px;">
                        <i class="fas fa-download"></i>
                        Budget friendly
                    </button>
                </div>
            </div>
        `;
        
        return modal;
    }

    removeOverlay(overlay) {
        overlay.style.animation = 'overlayIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (overlay._cleanup) overlay._cleanup();
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 300);
    }

    createQuickNotification(serviceName, serviceDesc) {
        const notification = document.createElement('div');
        notification.className = 'quick-notification';
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: linear-gradient(135deg, #D4AF37 0%, #8B6914 100%);
            color: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
            z-index: 9999;
            max-width: 350px;
            animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="width: 50px; height: 50px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-info-circle" style="font-size: 1.5rem; color: white;"></i>
                </div>
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 8px; color: white;">${serviceName}</div>
                    <div style="font-size: 0.875rem; opacity: 0.9; line-height: 1.5; margin-bottom: 15px;">Click "Explore This Type" for complete details and pricing</div>
                    <button class="close-notify" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; padding: 8px 16px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.3s; width: 100%;">
                        OK, Got it
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.close-notify');
        closeBtn.addEventListener('click', () => this.removeNotification(notification));
        
        // Auto-remove after 6 seconds
        setTimeout(() => this.removeNotification(notification), 6000);
    }

    removeNotification(notification) {
        if (!notification.parentNode) return;
        
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    scrollToSection(section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    dispatchCategoryChange(category) {
        const event = new CustomEvent('servicesCategoryChanged', {
            detail: { 
                category: category,
                timestamp: new Date().toISOString()
            }
        });
        document.dispatchEvent(event);
    }

    setupAccessibility() {
        // Add ARIA labels and roles
        document.querySelectorAll('.main-cat-btn').forEach(btn => {
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', btn.classList.contains('active'));
        });
        
        document.querySelectorAll('.service-card').forEach(card => {
            const title = card.querySelector('.service-name').textContent;
            card.setAttribute('aria-label', `Learn more about ${title}`);
            card.setAttribute('role', 'article');
        });
        
        document.querySelectorAll('.service-cta').forEach(btn => {
            const card = btn.closest('.service-card');
            const title = card.querySelector('.service-name').textContent;
            btn.setAttribute('aria-label', `View complete details for ${title}`);
        });
    }

    setupImageLoading() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const imgContainer = entry.target;
                        imgContainer.classList.add('image-loaded');
                        imageObserver.unobserve(imgContainer);
                    }
                });
            }, {
                rootMargin: '100px'
            });
            
            document.querySelectorAll('.card-media').forEach(container => {
                imageObserver.observe(container);
            });
        }
    }

    setupCardAnimations() {
        // Stagger animation for cards
        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                cardObserver.observe(card);
            });
        }
    }

    handleResize() {
        // Adjust card layouts based on screen size
        const grid = document.querySelector('.services-grid');
        if (!grid) return;
        
        const width = window.innerWidth;
        
        if (width < 768) {
            grid.style.gap = '1.5rem';
        } else if (width < 1024) {
            grid.style.gap = '2rem';
        } else {
            grid.style.gap = '3rem';
        }
    }

    debounce(func, wait) {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const servicesSection = new ServicesSection();
    
    // Make available globally
    window.ServicesSection = servicesSection;
    
    console.log('✅ Premium Services Section initialized successfully');
    
    // Export utility functions
    window.getCurrentServiceCategory = () => servicesSection.currentCategory;
});

