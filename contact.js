// Premium Contact Form with WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact form
  initContactForm();
  
  // Initialize WhatsApp functionality
  initWhatsAppIntegration();
  
  // Add animations
  initContactAnimations();
  
  // Initialize map interactions
  initMapInteractions();
});

// Initialize contact form with validation
function initContactForm() {
  const contactForm = document.getElementById('premiumContactForm');
  if (!contactForm) return;
  
  // Form validation
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formValues = {};
    
    for (let [key, value] of formData.entries()) {
      formValues[key] = value.trim();
    }
    
    // Validate form
    if (!validateForm(formValues)) {
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      // Show success message
      showNotification('Inquiry submitted successfully! We will contact you within 2 hours.', 'success');
      
      // Create WhatsApp message from form data
      const whatsappMessage = createWhatsAppMessage(formValues);
      
      // Show WhatsApp option
      showWhatsAppOption(whatsappMessage);
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      
      // Track form submission
      trackFormSubmission(formValues);
      
    }, 1500);
  });
  
  // Add real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
  });
}

// Form validation logic
function validateForm(formData) {
  let isValid = true;
  
  // Name validation
  if (!formData.name || formData.name.length < 2) {
    showFieldError('name', 'Please enter a valid name (minimum 2 characters)');
    isValid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Phone validation (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanPhone = formData.phone.replace(/\D/g, '');
  if (!formData.phone || !phoneRegex.test(cleanPhone)) {
    showFieldError('phone', 'Please enter a valid 10-digit Indian phone number');
    isValid = false;
  }
  
  // Service validation
  if (!formData.service) {
    showFieldError('service', 'Please select a service');
    isValid = false;
  }
  
  // Address validation
  if (!formData.address || formData.address.length < 10) {
    showFieldError('address', 'Please enter a complete address');
    isValid = false;
  }
  
  // Message validation
  if (!formData.message || formData.message.length < 10) {
    showFieldError('message', 'Please provide a detailed message (minimum 10 characters)');
    isValid = false;
  }
  
  return isValid;
}

// Validate individual field
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  
  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        showFieldError(fieldName, 'Please enter a valid name (minimum 2 characters)');
        return false;
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(fieldName, 'Please enter a valid email address');
        return false;
      }
      break;
      
    case 'phone':
      const phoneRegex = /^[6-9]\d{9}$/;
      const cleanPhone = value.replace(/\D/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        showFieldError(fieldName, 'Please enter a valid 10-digit Indian phone number');
        return false;
      }
      break;
      
    case 'address':
      if (value.length < 10) {
        showFieldError(fieldName, 'Please enter a complete address');
        return false;
      }
      break;
      
    case 'message':
      if (value.length < 10) {
        showFieldError(fieldName, 'Please provide a detailed message (minimum 10 characters)');
        return false;
      }
      break;
  }
  
  clearFieldError(fieldName);
  return true;
}

// Show field error
function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const formGroup = field.closest('.form-group');
  
  // Remove existing error
  const existingError = formGroup.querySelector('.field-error');
  if (existingError) existingError.remove();
  
  // Add error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
    <span>${message}</span>
  `;
  
  formGroup.appendChild(errorElement);
  
  // Add error styling
  field.style.borderColor = '#e74c3c';
  field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
  
  // Add error styles
  const style = document.createElement('style');
  if (!document.querySelector('#field-error-styles')) {
    style.id = 'field-error-styles';
    style.textContent = `
      .field-error {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #e74c3c;
        font-size: 0.75rem;
        margin-top: 8px;
        font-weight: 500;
      }
      
      .field-error svg {
        fill: #e74c3c;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(style);
  }
}

// Clear field error
function clearFieldError(field) {
  const fieldName = typeof field === 'string' ? field : field.name;
  const fieldElement = document.querySelector(`[name="${fieldName}"]`);
  const formGroup = fieldElement.closest('.form-group');
  
  // Remove error message
  const existingError = formGroup.querySelector('.field-error');
  if (existingError) existingError.remove();
  
  // Reset styling
  fieldElement.style.borderColor = '';
  fieldElement.style.boxShadow = '';
}

// Initialize WhatsApp integration
function initWhatsAppIntegration() {
  // Create WhatsApp message from form
  window.createWhatsAppMessage = function(formData) {
    const message = `
*New Service Inquiry*
----------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Service Required:* ${formData.service}
*Address:* ${formData.address}
*Message:* ${formData.message}
----------------------
Received via Website Contact Form
    `.trim();
    
    return encodeURIComponent(message);
  };
  
  // Handle WhatsApp button clicks
  const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');
  whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Track WhatsApp click
      console.log('WhatsApp contact initiated');
      
      // You can add analytics tracking here
      // Example: trackEvent('whatsapp_click', { button: this.textContent });
    });
  });
  
  // Auto-populate WhatsApp message on form change
  const form = document.getElementById('premiumContactForm');
  if (form) {
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.addEventListener('change', updateWhatsAppLink);
    });
  }
}

// Update WhatsApp link with form data
function updateWhatsAppLink() {
  const form = document.getElementById('premiumContactForm');
  if (!form) return;
  
  const formData = new FormData(form);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  const message = createWhatsAppMessage(data);
  const whatsappButtons = document.querySelectorAll('.whatsapp-direct-btn');
  
  whatsappButtons.forEach(button => {
    const baseUrl = 'https://wa.me/919940369925?text=';
    button.href = baseUrl + message;
  });
}

// Show WhatsApp option after form submission
function showWhatsAppOption(message) {
  // Create WhatsApp notification
  const notification = document.createElement('div');
  notification.className = 'whatsapp-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-header">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
        </svg>
        <h4>Connect on WhatsApp</h4>
        <button class="close-notification">&times;</button>
      </div>
      <p>Want faster response? Continue the conversation on WhatsApp.</p>
      <div class="notification-actions">
        <a href="https://wa.me/919940369925?text=${message}" target="_blank" class="whatsapp-action-btn">
          Continue on WhatsApp
        </a>
        <button class="close-btn">Maybe Later</button>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .whatsapp-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-strong);
      z-index: 1000;
      width: 350px;
      max-width: 90vw;
      animation: slideIn 0.3s ease;
      border: 2px solid #25D366;
      overflow: hidden;
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .notification-content {
      padding: 20px;
    }
    
    .notification-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid rgba(37, 211, 102, 0.1);
    }
    
    .notification-header svg {
      fill: #25D366;
    }
    
    .notification-header h4 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--black);
      margin: 0;
      flex: 1;
    }
    
    .close-notification {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--medium-grey);
      cursor: pointer;
      line-height: 1;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-content p {
      color: var(--medium-grey);
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    .notification-actions {
      display: flex;
      gap: 12px;
    }
    
    .whatsapp-action-btn {
      flex: 1;
      padding: 12px 16px;
      background: #25D366;
      color: white;
      border: none;
      border-radius: var(--border-radius-md);
      font-weight: 600;
      text-decoration: none;
      text-align: center;
      transition: var(--transition-standard);
    }
    
    .whatsapp-action-btn:hover {
      background: #128C7E;
      transform: translateY(-2px);
    }
    
    .close-btn {
      padding: 12px 16px;
      background: rgba(212, 175, 55, 0.1);
      color: var(--gold-dark);
      border: 1px solid rgba(212, 175, 55, 0.2);
      border-radius: var(--border-radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: var(--transition-standard);
    }
    
    .close-btn:hover {
      background: rgba(212, 175, 55, 0.15);
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Add event listeners for buttons
  notification.querySelector('.close-notification').addEventListener('click', () => {
    notification.remove();
  });
  
  notification.querySelector('.close-btn').addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto-remove after 30 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 30000);
}

// Initialize animations
function initContactAnimations() {
  // Animate cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe contact cards
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .contact-card {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .contact-card.animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }
  `;
  document.head.appendChild(style);
}

// Initialize map interactions
function initMapInteractions() {
  const mapInfoCard = document.querySelector('.map-info-card');
  if (mapInfoCard) {
    mapInfoCard.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  }
}

// Show notification
function showNotification(message, type = 'success') {
  // Remove existing notifications
  const existing = document.querySelectorAll('.form-notification');
  existing.forEach(notification => notification.remove());
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `form-notification ${type}`;
  notification.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path d="${
        type === 'success' 
          ? 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
          : 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
      }"/>
    </svg>
    <span>${message}</span>
  `;
  
  // Add styles
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      .form-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 24px;
        background: var(--white);
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-strong);
        z-index: 1000;
        animation: slideDown 0.3s ease;
        border-left: 4px solid;
        max-width: 400px;
      }
      
      .form-notification.success {
        border-left-color: #25D366;
      }
      
      .form-notification.error {
        border-left-color: #e74c3c;
      }
      
      .form-notification svg {
        fill: currentColor;
        flex-shrink: 0;
      }
      
      .form-notification.success {
        color: #25D366;
      }
      
      .form-notification.error {
        color: #e74c3c;
      }
      
      @keyframes slideDown {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Track form submission (for analytics)
function trackFormSubmission(formData) {
  // In a real implementation, this would send data to your analytics platform
  console.log('Form submitted:', {
    name: formData.name,
    email: formData.email,
    service: formData.service,
    timestamp: new Date().toISOString()
  });
  
  // Example: Send to Google Analytics
  // if (typeof gtag === 'function') {
  //   gtag('event', 'form_submit', {
  //     'event_category': 'Contact',
  //     'event_label': formData.service
  //   });
  // }
}