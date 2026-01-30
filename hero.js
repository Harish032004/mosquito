// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const menuOverlay = document.getElementById('menuOverlay');
const whatsappForm = document.getElementById('whatsappForm');

// 1. Mobile Menu Logic
function openMenu() {
    mobileNav.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    mobileNav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('active')) closeMenu();
    else openMenu();
});

menuOverlay.addEventListener('click', closeMenu);

// 2. WhatsApp Integration Logic
whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const location = document.getElementById('location').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const phone = "919876543210"; // REPLACE WITH YOUR NUMBER

    const text = `*New Enquiry - Elite Services*%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Mobile:* ${mobile}%0A` +
                 `*Location:* ${location}%0A` +
                 `*Service:* ${service}%0A` +
                 `*Message:* ${message}`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
});

// 3. Smooth Reveal Animation on Scroll
window.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 200);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, observerOptions);

    // Target all reveal classes
    const animatedElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    animatedElements.forEach(el => observer.observe(el));

    // Optional: Add a subtle tilt effect to the form card on mouse move
    const card = document.querySelector('.enquiry-card');
    if(window.innerWidth > 1024) { // Only on Desktop
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }
});

/* =====================================
   OPTIMIZED SCROLL ANIMATIONS
   (NO FADE — SINGLE OBSERVER)
===================================== */
document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-reveal');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll(
        '.reveal-up, .reveal-left, .reveal-right'
    ).forEach(el => observer.observe(el));

});

/* =====================================
   FORM INTERACTION ANIMATIONS
===================================== */
const formCard = document.querySelector('.enquiry-card');
const formInputs = document.querySelectorAll(
    '.enquiry-card input, .enquiry-card textarea, .enquiry-card select'
);

// Add subtle card feedback when user interacts
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        formCard.classList.add('form-active');
    });

    input.addEventListener('blur', () => {
        formCard.classList.remove('form-active');
    });
});

/* =====================================
   BUTTON CLICK FEEDBACK (EXTRA POLISH)
===================================== */
const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('click', () => {
    ctaButton.style.borderRadius = '32px';
    setTimeout(() => {
        ctaButton.style.borderRadius = '8px';
    }, 250);
});
