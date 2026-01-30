// Toggle mobile menu function
function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu function
function openMobileMenu() {
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
}

// Close mobile menu function
function closeMobileMenu() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.classList.remove('menu-open');
}

// Toggle mobile menu when clicking hamburger
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking overlay
if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
}

// Handle navigation link clicks
if (navLinks.length > 0) {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For demo purposes, prevent actual navigation for hash links
            if(this.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
            }
            
            // Update active state on both desktop and mobile
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            // Update the corresponding link in the other menu
            const href = this.getAttribute('href');
            if (href) {
                const otherLink = document.querySelector(`.nav-link[href="${href}"], .mobile-nav-link[href="${href}"]`);
                if(otherLink && otherLink !== this) {
                    otherLink.classList.add('active');
                }
            }
            
            // Close mobile menu if open
            if(mobileNav && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Smooth scroll for anchor links
            const targetId = this.getAttribute('href');
            if(targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - (navbar?.offsetHeight || 80),
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if(window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Add close button functionality if exists
document.addEventListener('DOMContentLoaded', () => {
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }
});


// Fix mobile brand name visibility on load
document.addEventListener('DOMContentLoaded', function() {
    // Ensure mobile brand name is visible
    const mobileBrandName = document.querySelector('.mobile-brand-name');
    const mobileBrandTagline = document.querySelector('.mobile-brand-tagline');
    
    if (mobileBrandName) {
        mobileBrandName.style.color = '#D4AF37';
        mobileBrandName.style.background = 'none';
        mobileBrandName.style.webkitBackgroundClip = 'unset';
        mobileBrandName.style.backgroundClip = 'unset';
        mobileBrandName.style.webkitTextFillColor = '#D4AF37';
    }
    
    if (mobileBrandTagline) {
        mobileBrandTagline.style.color = '#3A3A3A';
    }
});

function openMobileMenu() {
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    menuOverlay.classList.add('active');
    
    // Add this to hide the BACKGROUND logo, but not the menu logo
    document.body.classList.add('menu-open'); 
    document.body.style.overflow = 'hidden';
}
// Debug function to check mobile menu elements
function debugMobileMenu() {
    console.log("=== DEBUG MOBILE MENU ===");
    
    const mobileNav = document.getElementById('mobileNav');
    const mobileBrandName = document.querySelector('.mobile-brand-name');
    const mobileBrandTagline = document.querySelector('.mobile-brand-tagline');
    const mobileBrandText = document.querySelector('.mobile-brand-text');
    
    console.log("Mobile Nav exists:", !!mobileNav);
    console.log("Mobile Brand Name exists:", !!mobileBrandName);
    console.log("Mobile Brand Tagline exists:", !!mobileBrandTagline);
    console.log("Mobile Brand Text exists:", !!mobileBrandText);
    
    if (mobileBrandName) {
        console.log("Mobile Brand Name content:", mobileBrandName.textContent);
        console.log("Mobile Brand Name computed style - color:", getComputedStyle(mobileBrandName).color);
        console.log("Mobile Brand Name computed style - display:", getComputedStyle(mobileBrandName).display);
        console.log("Mobile Brand Name computed style - opacity:", getComputedStyle(mobileBrandName).opacity);
        console.log("Mobile Brand Name computed style - visibility:", getComputedStyle(mobileBrandName).visibility);
    }
    
    // Force visible styles
    if (mobileBrandName) {
        mobileBrandName.style.cssText = `
            color: #D4AF37 !important;
            background: none !important;
            -webkit-text-fill-color: #D4AF37 !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
            font-size: 1.6rem !important;
            font-weight: 800 !important;
        `;
    }
    
    if (mobileBrandTagline) {
        mobileBrandTagline.style.cssText = `
            color: #3A3A3A !important;
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        `;
    }
}

// Run debug when menu opens
menuToggle.addEventListener('click', function() {
    setTimeout(debugMobileMenu, 100);
});

// Also run on page load
document.addEventListener('DOMContentLoaded', debugMobileMenu);