// Smooth scrolling for navigation links
function scrollToWaitlist() {
    document.getElementById('waitlist').scrollIntoView({
        behavior: 'smooth'
    });
}

function openDemoModal() {
    document.getElementById('demoModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    document.getElementById('demoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Waitlist form handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');
    const emailInput = document.getElementById('email');
    
    // Form submission handler for Google Apps Script
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        submitBtn.disabled = true;
        
        // Submit to Google Apps Script
        submitToGoogleSheets(email);
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(message) {
        showToast('Error', message, 'error');
    }
    
    // Show success message
    function showSuccess(message) {
        showToast('Success', message, 'success');
    }
    
    // Toast notification system
    function showToast(title, message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    'fa-info-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'toastSlideOut 0.3s ease';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Submit to Google Apps Script using form submission (bypasses CORS)
    function submitToGoogleSheets(email) {
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw_NwzIbLuY2kUNa-nN2DV7crUwJt4my-mBZEQtvjUlJBYADCta7dttvUByKP9Q3nLh/exec';
        
        // Flag to prevent double success messages
        let successHandled = false;
        
        // Success handler (shared by all methods)
        function handleSuccess() {
            if (successHandled) return;
            successHandled = true;
            
            console.log('Form submitted successfully');
            
            // Success - show success message
            waitlistForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Reset button state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Join Waitlist';
            submitBtn.disabled = false;
            
            // Show success toast
            showSuccess('Welcome to the waitlist! We\'ll notify you when Reform is ready.');
            
            // Scroll to success message
            successMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Track conversion
            trackWaitlistSignup(email);
        }
        
        // Detect if we're in an in-app browser (Twitter, Facebook, Instagram, etc.)
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isInAppBrowser = /FBAN|FBAV|Twitter|Instagram|LinkedIn|Line|WeChat|Snapchat/i.test(userAgent);
        
        console.log('User Agent:', userAgent);
        console.log('In-app browser detected:', isInAppBrowser);
        
        // For in-app browsers, use GET method with URL encoding (more reliable)
        if (isInAppBrowser) {
            console.log('Using in-app browser method (GET with URL params)');
            
            // Encode parameters
            const params = new URLSearchParams({
                email: email,
                source: 'landing_page_inapp',
                timestamp: new Date().toISOString()
            });
            
            // Create image beacon for submission (most reliable for in-app browsers)
            const img = new Image();
            img.style.display = 'none';
            img.onload = function() {
                console.log('Beacon loaded - submission successful');
                handleSuccess();
            };
            img.onerror = function() {
                console.log('Beacon error - but submission likely successful');
                handleSuccess(); // Still show success as the request was sent
            };
            
            // Submit via GET (Google Apps Script will handle it)
            img.src = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            document.body.appendChild(img);
            
            // Fallback timeout
            setTimeout(() => {
                console.log('In-app browser timeout - assuming success');
                handleSuccess();
            }, 2000);
            
            return;
        }
        
        // Standard method for regular browsers (Safari, Chrome, Firefox)
        console.log('Using standard browser method (POST with iframe)');
        
        // Create a hidden form to submit data (bypasses CORS)
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = GOOGLE_SCRIPT_URL;
        form.target = 'hiddenFrame';
        form.style.display = 'none';
        
        // Add form fields
        const emailField = document.createElement('input');
        emailField.type = 'hidden';
        emailField.name = 'email';
        emailField.value = email;
        
        const sourceField = document.createElement('input');
        sourceField.type = 'hidden';
        sourceField.name = 'source';
        sourceField.value = 'landing_page';
        
        const timestampField = document.createElement('input');
        timestampField.type = 'hidden';
        timestampField.name = 'timestamp';
        timestampField.value = new Date().toISOString();
        
        form.appendChild(emailField);
        form.appendChild(sourceField);
        form.appendChild(timestampField);
        
        // Create hidden iframe to handle response
        const iframe = document.createElement('iframe');
        iframe.name = 'hiddenFrame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        document.body.appendChild(form);
        
        // Handle iframe load (success) - works on most browsers
        iframe.onload = function() {
            console.log('iframe onload fired');
            handleSuccess();
        };
        
        // iOS Safari fallback: Assume success after timeout since iOS doesn't reliably trigger onload
        const iOSTimeout = setTimeout(() => {
            console.log('iOS fallback: Assuming submission success');
            handleSuccess();
        }, 2500);
        
        // Handle iframe error
        iframe.onerror = function() {
            clearTimeout(iOSTimeout);
            if (successHandled) return;
            
            console.error('Form submission failed');
            showError('Something went wrong. Please try again.');
            
            // Reset button state
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Join Waitlist';
            submitBtn.disabled = false;
            
            // Clean up
            if (form.parentNode) document.body.removeChild(form);
            if (iframe.parentNode) document.body.removeChild(iframe);
        };
        
        // Submit the form
        form.submit();
        
        // Clean up after success
        setTimeout(() => {
            if (form && form.parentNode) document.body.removeChild(form);
            if (iframe && iframe.parentNode) document.body.removeChild(iframe);
        }, 3000);
    }
    
    // Track waitlist signup (replace with your analytics)
    function trackWaitlistSignup(email) {
        console.log('Waitlist signup:', email);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'email_signup'
            });
        }
        
        // Example: Send to your backend
        // fetch('/api/waitlist', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email: email })
        // });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(step);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('demoModal');
        if (event.target === modal) {
            closeDemoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeDemoModal();
        }
    });
    
    // Add click tracking for buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Track button clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'event_category': 'engagement',
                    'event_label': buttonText
                });
            }
        });
    });
    
    // Add smooth reveal animation for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
        heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 400);
    }
});

// Utility function to debounce scroll events
function debounce(func, wait) {
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

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing animation
        // typeWriter(heroTitle, originalText, 50);
    }
});
