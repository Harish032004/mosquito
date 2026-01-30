// Premium Gallery Section - Enhanced with Fixed Filters

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery
    initGallery();
    
    // Set up filter functionality
    setupGalleryFilters();
    
    // Set up lightbox functionality
    setupLightbox();
    
    // Set up lazy loading with better blur effect
    setupLazyLoading();
    
    // Set up smooth animations
    setupGalleryAnimations();
});

/**
 * Initialize the gallery section
 */
function initGallery() {
    console.log('Premium Gallery section initialized');
    
    // Add initial animation to section
    const section = document.querySelector('.gallery-section');
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }, 100);
    
    // Add no results message to DOM
    addNoResultsMessage();
    
    // Load initial images
    loadVisibleImages();
}

/**
 * Add no results message to gallery
 */
function addNoResultsMessage() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const noResultsHTML = `
        <div class="gallery-no-results">
            <div class="no-results-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3 class="no-results-text">No projects found</h3>
            <p class="no-results-hint">Try selecting a different filter category</p>
        </div>
    `;
    galleryGrid.insertAdjacentHTML('beforeend', noResultsHTML);
}

/**
 * Set up gallery filter functionality - FIXED VERSION
 */
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const noResultsMessage = document.querySelector('.gallery-no-results');
    
    // Calculate and display initial counts
    updateFilterCounts();
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            // Add visual feedback
            createFilterButtonEffect(this);
            
            // Filter gallery items
            let visibleItems = 0;
            
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                    visibleItems++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show/hide no results message
            if (visibleItems === 0 && noResultsMessage) {
                noResultsMessage.classList.add('active');
            } else if (noResultsMessage) {
                noResultsMessage.classList.remove('active');
            }
            
            // Log filter change
            console.log(`Gallery filter applied: ${filterValue} (${visibleItems} items)`);
            
            // Update filter counts
            updateFilterCounts();
        });
    });
}

/**
 * Update filter counts based on current active filter
 */
function updateFilterCounts() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        const filterValue = button.getAttribute('data-filter');
        let count = 0;
        
        if (filterValue === 'all') {
            count = galleryItems.length;
        } else {
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    count++;
                }
            });
        }
        
        const countElement = button.querySelector('.filter-count');
        if (countElement) {
            countElement.textContent = count;
        }
    });
}

/**
 * Set up lightbox functionality
 */
function setupLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox-modal');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxType = document.querySelector('.lightbox-type');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const prevButton = document.querySelector('.lightbox-nav.prev');
    const nextButton = document.querySelector('.lightbox-nav.next');
    
    let currentIndex = 0;
    const itemsArray = Array.from(galleryItems);
    
    // Open lightbox when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            currentIndex = index;
            openLightbox();
        });
        
        // Add keyboard support
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                currentIndex = index;
                openLightbox();
            }
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Navigation
    prevButton.addEventListener('click', showPreviousImage);
    nextButton.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    /**
     * Open lightbox with current image
     */
    function openLightbox() {
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Prevent scroll on body
        document.documentElement.style.overflow = 'hidden';
        
        // Add entrance animation
        const container = document.querySelector('.lightbox-container');
        container.style.animation = 'modalAppear 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        console.log(`Lightbox opened for image ${currentIndex + 1}`);
    }
    
    /**
     * Close lightbox
     */
    function closeLightbox() {
        const container = document.querySelector('.lightbox-container');
        container.style.animation = 'none';
        
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }, 300);
    }
    
    /**
     * Show previous image
     */
    function showPreviousImage() {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : itemsArray.length - 1;
        updateLightboxContent();
        createNavEffect(prevButton);
    }
    
    /**
     * Show next image
     */
    function showNextImage() {
        currentIndex = currentIndex < itemsArray.length - 1 ? currentIndex + 1 : 0;
        updateLightboxContent();
        createNavEffect(nextButton);
    }
    
    /**
     * Update lightbox content with current image
     */
    function updateLightboxContent() {
        const currentItem = itemsArray[currentIndex];
        const img = currentItem.querySelector('img');
        const projectType = currentItem.querySelector('.project-badge').textContent;
        const projectTitle = currentItem.querySelector('.project-title').textContent;
        const projectDesc = currentItem.querySelector('.project-desc').textContent;
        
        // Use high-res image for lightbox
        const highResSrc = img.getAttribute('data-src') || img.src;
        
        // Show loading state
        lightboxImage.style.opacity = '0.7';
        lightboxImage.style.filter = 'blur(5px)';
        
        // Preload high-res image
        const highResImg = new Image();
        highResImg.onload = function() {
            lightboxImage.src = highResSrc;
            lightboxImage.style.opacity = '0';
            lightboxImage.style.filter = 'blur(0)';
            
            setTimeout(() => {
                lightboxImage.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
                lightboxImage.style.opacity = '1';
            }, 10);
        };
        highResImg.onerror = function() {
            // Fallback to regular src if high-res fails
            lightboxImage.src = img.src;
            lightboxImage.style.opacity = '1';
            lightboxImage.style.filter = 'blur(0)';
        };
        highResImg.src = highResSrc;
        
        // Update text content
        lightboxType.textContent = projectType;
        lightboxTitle.textContent = projectTitle;
        lightboxDescription.textContent = projectDesc;
        
        // Update details based on category
        updateLightboxDetails(currentItem.getAttribute('data-category'));
    }
    
    /**
     * Update lightbox details based on category
     */
    function updateLightboxDetails(category) {
        const details = document.querySelectorAll('.detail-item span');
        
        if (category.includes('residential')) {
            details[1].textContent = 'Location: Residential Area';
            details[2].textContent = 'Installation Time: 2-4 Days';
        } else if (category.includes('commercial')) {
            details[1].textContent = 'Location: Commercial District';
            details[2].textContent = 'Installation Time: 5-7 Days';
        }
        
        if (category.includes('aluminium')) {
            details[0].textContent = 'Material: Premium Aluminium';
        } else if (category.includes('upvc')) {
            details[0].textContent = 'Material: High-Grade uPVC';
        }
    }
    
    /**
     * Create navigation button effect
     */
    function createNavEffect(button) {
        button.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            button.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    }
}

/**
 * Set up lazy loading for images with blur effect
 */
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        // Create Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        // Observe all lazy images
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => loadImage(img));
    }
    
    // Load images on scroll as backup
    window.addEventListener('scroll', loadVisibleImages);
    window.addEventListener('resize', loadVisibleImages);
}

/**
 * Load an individual image
 */
function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // Show loading state
    const parent = img.parentElement;
    parent.classList.add('loading');
    
    const imageLoader = new Image();
    imageLoader.onload = function() {
        img.src = src;
        img.classList.add('loaded');
        parent.classList.remove('loading');
        
        // Force repaint for smooth transition
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
            img.style.opacity = '1';
        }, 10);
    };
    
    imageLoader.onerror = function() {
        // If image fails to load, remove loading state
        parent.classList.remove('loading');
        console.warn(`Failed to load image: ${src}`);
    };
    
    imageLoader.src = src;
}

/**
 * Load visible images immediately
 */
function loadVisibleImages() {
    const images = document.querySelectorAll('img[data-src]');
    const viewportHeight = window.innerHeight;
    
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < viewportHeight + 300) {
            const src = img.getAttribute('data-src');
            if (src) {
                loadImage(img);
                img.removeAttribute('data-src');
            }
        }
    });
}

/**
 * Set up gallery animations
 */
function setupGalleryAnimations() {
    // Create Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for items
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Observe filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        btn.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(btn);
    });
}

/**
 * Create filter button click effect
 */
function createFilterButtonEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = button.classList.contains('active') 
        ? 'rgba(255, 255, 255, 0.4)' 
        : 'rgba(212, 175, 55, 0.2)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.zIndex = '1';
    
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
 * Handle view more button click
 */
const viewMoreBtn = document.querySelector('.view-more-btn');
if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
        // Add click effect
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Create ripple effect
        createButtonClickEffect(this);
        
        // Show loading state
        showLoadingState();
        
        console.log('View more button clicked');
    });
}

/**
 * Show loading state for view more
 */
function showLoadingState() {
    const notification = document.createElement('div');
    notification.className = 'load-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="notification-text">
                Loading more projects...
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
    notification.style.maxWidth = '250px';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    });
    
    // Simulate loading and remove notification
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode === document.body) {
                document.body.removeChild(notification);
            }
            
            // Show success message
            showLoadSuccess();
        }, 500);
    }, 1500);
}

/**
 * Show load success message
 */
function showLoadSuccess() {
    const success = document.createElement('div');
    success.className = 'success-notification';
    success.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-text">
                <strong>Projects loaded</strong>
            </div>
        </div>
    `;
    
    // Style the notification
    success.style.position = 'fixed';
    success.style.bottom = '20px';
    success.style.right = '20px';
    success.style.background = 'linear-gradient(135deg, #D4AF37 0%, #2C2C2C 100%)';
    success.style.color = 'white';
    success.style.padding = '15px 20px';
    success.style.borderRadius = '8px';
    success.style.boxShadow = '0 8px 24px rgba(18, 18, 18, 0.2)';
    success.style.zIndex = '1000';
    success.style.maxWidth = '250px';
    success.style.transform = 'translateY(100px)';
    success.style.opacity = '0';
    success.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.4s ease';
    
    document.body.appendChild(success);
    
    // Animate in
    requestAnimationFrame(() => {
        success.style.transform = 'translateY(0)';
        success.style.opacity = '1';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        success.style.transform = 'translateY(100px)';
        success.style.opacity = '0';
        setTimeout(() => {
            if (success.parentNode === document.body) {
                document.body.removeChild(success);
            }
        }, 500);
    }, 3000);
}

/**
 * Create button click effect
 */
function createButtonClickEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '0';
    ripple.style.top = '0';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.zIndex = '1';
    
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

// Preload first few images immediately
setTimeout(loadVisibleImages, 100);

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 2. Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 3. Filter the gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Optional: add an animation class here
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});