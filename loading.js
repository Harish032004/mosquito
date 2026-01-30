class PremiumLoadingAnimation {
    constructor() {
        this.loadingElement = document.getElementById('loading-animation');
        this.mosquito1 = document.querySelector('.mosquito-1');
        this.mosquito2 = document.querySelector('.mosquito-2');
        this.netContainer = document.querySelector('.net-container');
        this.animationDuration = 4500; // 4.5 seconds total
        this.startTime = null;
        
        this.init();
    }
    
    init() {
        // Ensure loading element exists
        if (!this.loadingElement) {
            console.warn('Loading animation element not found');
            this.hideLoading();
            return;
        }
        
        // Show loading animation
        document.body.style.overflow = 'hidden';
        this.loadingElement.style.display = 'flex';
        
        // Start timing
        this.startTime = Date.now();
        
        // Setup exit animation
        this.setupExitAnimation();
        
        // Setup mosquito capture effect
        this.setupCaptureEffect();
        
        // Optional: Add skip button for UX
        this.addSkipButton();
    }
    
    setupCaptureEffect() {
        // Freeze mosquitoes when net appears (at 2 seconds)
        setTimeout(() => {
            // Stop mosquito animations
            this.mosquito1.style.animationPlayState = 'paused';
            this.mosquito2.style.animationPlayState = 'paused';
            
            // Add capture effect - mosquitoes fall slightly
            this.mosquito1.style.animation = 'mosquitoCapture 0.8s ease-out forwards';
            this.mosquito2.style.animation = 'mosquitoCapture 0.8s ease-out 0.1s forwards';
            
            // Add CSS for capture animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes mosquitoCapture {
                    0% {
                        transform: translate(var(--x), var(--y)) rotate(var(--rotate));
                        opacity: 1;
                    }
                    30% {
                        transform: translate(var(--x), calc(var(--y) + 5px)) rotate(calc(var(--rotate) + 10deg));
                        opacity: 0.8;
                    }
                    70% {
                        transform: translate(var(--x), calc(var(--y) + 10px)) rotate(calc(var(--rotate) + 5deg));
                        opacity: 0.6;
                    }
                    100% {
                        transform: translate(var(--x), calc(var(--y) + 15px)) rotate(calc(var(--rotate) + 0deg));
                        opacity: 0.4;
                    }
                }
            `;
            document.head.appendChild(style);
            
            // Get current positions for freeze frame
            const style1 = window.getComputedStyle(this.mosquito1);
            const style2 = window.getComputedStyle(this.mosquito2);
            
            // Set custom properties for freeze position
            this.mosquito1.style.setProperty('--x', style1.transform.split('(')[1]?.split(')')[0] || '0px');
            this.mosquito1.style.setProperty('--y', style1.transform.split('(')[1]?.split(')')[0] || '0px');
            this.mosquito1.style.setProperty('--rotate', style1.transform.includes('rotate') ? 
                style1.transform.split('rotate(')[1]?.split(')')[0] || '0deg' : '0deg');
            
            this.mosquito2.style.setProperty('--x', style2.transform.split('(')[1]?.split(')')[0] || '0px');
            this.mosquito2.style.setProperty('--y', style2.transform.split('(')[1]?.split(')')[0] || '0px');
            this.mosquito2.style.setProperty('--rotate', style2.transform.includes('rotate') ? 
                style2.transform.split('rotate(')[1]?.split(')')[0] || '0deg' : '0deg');
                
        }, 2000); // Capture at 2 seconds
    }
    
    setupExitAnimation() {
        // Wait for animation to complete, then exit
        setTimeout(() => {
            this.exitAnimation();
        }, this.animationDuration);
        
        // Also exit if page loads before animation completes
        window.addEventListener('load', () => {
            const elapsed = Date.now() - this.startTime;
            const remaining = Math.max(0, this.animationDuration - elapsed);
            setTimeout(() => this.exitAnimation(), remaining);
        });
    }
    
    exitAnimation() {
        // Add exiting class for fade out
        this.loadingElement.classList.add('exiting');
        
        // Remove loading after animation completes
        setTimeout(() => {
            this.hideLoading();
        }, 800); // Match CSS exitAnimation duration
    }
    
    hideLoading() {
        // Hide loading element
        if (this.loadingElement) {
            this.loadingElement.style.display = 'none';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('loadingComplete'));
    }
    
    addSkipButton() {
        // Create skip button
        const skipButton = document.createElement('button');
        skipButton.className = 'skip-loading';
        skipButton.innerHTML = 'Skip';
        skipButton.setAttribute('aria-label', 'Skip loading animation');
        
        // Style the button
        skipButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(212, 175, 55, 0.3);
            color: #555555;
            padding: 6px 16px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10000;
            backdrop-filter: blur(5px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        `;
        
        // Hover effect
        skipButton.addEventListener('mouseenter', () => {
            skipButton.style.background = 'rgba(212, 175, 55, 0.1)';
            skipButton.style.borderColor = '#D4AF37';
            skipButton.style.color = '#2D2D2D';
        });
        
        skipButton.addEventListener('mouseleave', () => {
            skipButton.style.background = 'rgba(255, 255, 255, 0.9)';
            skipButton.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            skipButton.style.color = '#555555';
        });
        
        // Click handler
        skipButton.addEventListener('click', () => {
            this.exitAnimation();
        });
        
        // Add to loading container
        this.loadingElement.appendChild(skipButton);
        
        // Auto hide after 2 seconds
        setTimeout(() => {
            skipButton.style.opacity = '0';
            skipButton.style.visibility = 'hidden';
            setTimeout(() => {
                if (skipButton.parentNode) {
                    skipButton.parentNode.removeChild(skipButton);
                }
            }, 300);
        }, 2000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        new PremiumLoadingAnimation();
    }, 50);
});

// Optional: Track loading performance
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log('Loading Performance:', {
                domContentLoaded: perfData.domContentLoadedEventEnd,
                loadComplete: perfData.loadEventEnd,
                duration: perfData.duration
            });
        }
    });
}