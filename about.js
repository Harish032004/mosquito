// About Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // 1. Counter Animation for Stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 1500;
            const increment = target / (duration / 16);
            
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(counter);
        });
    }

    // 2. Simple Accordion Functionality
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        otherContent.style.maxHeight = '0';
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    content.style.maxHeight = '0';
                }
            });
        });
    }

    // 3. Scroll-triggered reveal animations
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translate(0, 0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize all
    animateCounters();
    initAccordion();
    initRevealAnimations();
});