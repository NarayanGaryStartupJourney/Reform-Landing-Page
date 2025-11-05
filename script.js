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
        const email = emailInput.value.trim();
        
        // Basic email validation
        if (!isValidEmail(email)) {
            e.preventDefault();
            showError('Please enter a valid email address');
            return;
        }
        
        // Always prevent default and use JavaScript (works for ALL browsers now!)
        e.preventDefault();
        
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
        
        // Comprehensive browser detection
        const userAgent = navigator.userAgent || '';
        const isiOS = /iPhone|iPad|iPod/i.test(userAgent);
        const isAndroid = /Android/i.test(userAgent);
        
        // Always log user agent for debugging
        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('User Agent:', userAgent);
        console.log('sendBeacon available:', !!navigator.sendBeacon);
        
        // Detect specific in-app browsers with multiple patterns
        // Twitter detection - multiple patterns for iOS and Android
        const isTwitter = /Twitter/i.test(userAgent) || 
                         /TwitterAndroid/i.test(userAgent) ||
                         /com\.twitter\.android/i.test(userAgent) ||
                         /Twitter/i.test(userAgent);
        
        // Twitter on iOS - special detection
        const isTwitterIOS = isTwitter && isiOS;
        
        const isFacebook = /FBAN|FBAV|FB_IAB|FB4A|FBIOS/i.test(userAgent);
        const isMessenger = /FB_IAB|FBIOS|FB4A|Messenger/i.test(userAgent);
        const isInstagram = /Instagram/i.test(userAgent);
        const isLinkedIn = /LinkedIn/i.test(userAgent);
        const isWeChat = /MicroMessenger/i.test(userAgent);
        const isLine = /Line/i.test(userAgent);
        const isSnapchat = /Snapchat/i.test(userAgent);
        
        // Combined in-app browser detection
        const isInAppBrowser = isTwitter || isFacebook || isMessenger || isInstagram || 
                              isLinkedIn || isWeChat || isLine || isSnapchat;
        
        // Log detected browser for debugging
        const browserName = isTwitterIOS ? 'Twitter iOS' :
                          isTwitter ? 'Twitter' : 
                          isFacebook ? 'Facebook' : 
                          isMessenger ? 'Facebook Messenger' :
                          isInstagram ? 'Instagram' :
                          isLinkedIn ? 'LinkedIn' :
                          isWeChat ? 'WeChat' :
                          isLine ? 'Line' :
                          isSnapchat ? 'Snapchat' : 
                          isiOS ? 'iOS Safari' :
                          isAndroid ? 'Android Browser' : 
                          'Desktop Browser';
        
        console.log(`Browser: ${browserName}`);
        console.log(`In-app browser: ${isInAppBrowser ? 'YES' : 'NO'}`);
        console.log(`Platform: ${isiOS ? 'iOS' : isAndroid ? 'Android' : 'Desktop'}`);
        if (isTwitterIOS) {
            console.log('🐦 Twitter iOS detected - using most reliable submission method');
        }
        console.log('==============================');
        
        // iOS Safari workaround: Use sendBeacon/image beacon for better reliability
        // iOS Safari doesn't reliably fire iframe.onload, so we prefer these methods
        // Twitter iOS needs the most reliable method (always use image beacon if sendBeacon fails)
        const useReliableMethod = isInAppBrowser || (isiOS && !isInAppBrowser);
        
        if (isiOS && !isInAppBrowser) {
            console.log('⚠️ iOS Safari detected - using reliable method (sendBeacon/image) instead of iframe');
        }
        
        // Method 1: sendBeacon for in-app browsers AND iOS Safari (most reliable)
        if (useReliableMethod && navigator.sendBeacon) {
            console.log('Attempting sendBeacon method...');
            // Use different source for Twitter iOS, other in-app browsers, and iOS Safari
            let source;
            if (isTwitterIOS) {
                source = 'landing_page_twitter_ios';
            } else if (isInAppBrowser) {
                source = 'landing_page_inapp';
            } else {
                source = 'landing_page_ios_safari';
            }
            
            const params = new URLSearchParams({
                email: email,
                source: source,
                timestamp: new Date().toISOString()
            });
            const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            
            try {
                const beaconSent = navigator.sendBeacon(url);
                if (beaconSent) {
                    console.log('✓ sendBeacon: Request queued successfully');
                    // For Twitter iOS, use slightly longer timeout to ensure delivery
                    const timeout = isTwitterIOS ? 2500 : 2000;
                    setTimeout(() => {
                        console.log('sendBeacon completed, showing success');
                        handleSuccess();
                    }, timeout);
                    return;
                } else {
                    console.warn('sendBeacon failed, trying fallback method...');
                    // Fall through to image beacon
                }
            } catch (error) {
                console.error('sendBeacon error:', error);
                // Fall through to image beacon
            }
        }
        
        // Method 2: Image beacon fallback for in-app browsers AND iOS Safari
        // This is especially important for Twitter iOS which may block sendBeacon
        if (useReliableMethod) {
            console.log('Using image beacon method for reliable submission');
            if (isTwitterIOS) {
                console.log('🐦 Twitter iOS: Using image beacon (most reliable for Twitter)');
            }
            
            // Use different source for Twitter iOS, other in-app browsers, and iOS Safari
            let source;
            if (isTwitterIOS) {
                source = 'landing_page_twitter_ios_image';
            } else if (isInAppBrowser) {
                source = 'landing_page_image';
            } else {
                source = 'landing_page_ios_image';
            }
            const params = new URLSearchParams({
                email: email,
                source: source,
                timestamp: new Date().toISOString()
            });
            const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            
            const img = new Image();
            img.style.display = 'none';
            img.crossOrigin = 'anonymous'; // Helps with some browser restrictions
            
            img.onload = () => {
                console.log('✓ Image beacon loaded successfully');
                if (isTwitterIOS) {
                    console.log('🐦 Twitter iOS: Image beacon succeeded');
                }
                handleSuccess();
            };
            
            img.onerror = () => {
                console.warn('Image beacon onerror fired, but request might have been sent');
                if (isTwitterIOS) {
                    console.warn('🐦 Twitter iOS: Image beacon onerror - but request was likely sent');
                }
                // Still show success - request was likely sent (browser may block image but not the GET request)
                // For Twitter iOS, be more aggressive with success
                const errorTimeout = isTwitterIOS ? 1500 : 2000;
                setTimeout(() => handleSuccess(), errorTimeout);
            };
            
            // Set src to trigger the request immediately
            console.log(`Loading image beacon: ${url.substring(0, 80)}...`);
            img.src = url;
            document.body.appendChild(img);
            
            // Cleanup and fallback timeout
            // Twitter iOS needs longer timeout due to restrictions
            const cleanupTimeout = isTwitterIOS ? 4000 : 3000;
            setTimeout(() => {
                if (img.parentNode) {
                    img.parentNode.removeChild(img);
                }
                // If success hasn't been handled by now, assume it worked
                // This is especially important for Twitter iOS
                if (!successHandled) {
                    if (isTwitterIOS) {
                        console.log('🐦 Twitter iOS: Image beacon timeout - assuming success (Twitter may block image load but request was sent)');
                    } else {
                        console.log('Image beacon timeout - assuming success');
                    }
                    handleSuccess();
                }
            }, cleanupTimeout);
            
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
        
        // Track if iframe has loaded once (first load is empty, second is the response)
        let iframeLoadCount = 0;
        
        // Handle iframe load (success) - works on most browsers
        iframe.onload = function() {
            iframeLoadCount++;
            console.log(`iframe onload fired (count: ${iframeLoadCount})`);
            
            // First load is the initial empty iframe, second load is the response
            // On some browsers, only one load event fires
            if (iframeLoadCount >= 1) {
                // Wait a bit to ensure the request completed
                setTimeout(() => {
                    if (!successHandled) {
                        console.log('✓ Form submission successful (iframe)');
                        handleSuccess();
                    }
                }, 500);
            }
        };
        
        // iOS/Safari fallback: Assume success after timeout since iOS doesn't reliably trigger onload
        const fallbackTimeout = setTimeout(() => {
            if (!successHandled) {
                console.log('Fallback timeout: Assuming submission success');
                handleSuccess();
            }
        }, 3500);
        
        // Handle iframe error (network failure, etc.)
        iframe.onerror = function(error) {
            clearTimeout(fallbackTimeout);
            if (successHandled) return;
            
            console.error('iframe onerror fired:', error);
            
            // Try image beacon as last resort
            console.warn('Attempting image beacon as fallback...');
            const params = new URLSearchParams({
                email: email,
                source: 'landing_page_fallback',
                timestamp: new Date().toISOString()
            });
            const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            
            const img = new Image();
            img.style.display = 'none';
            img.src = url;
            document.body.appendChild(img);
            
            // Show success after trying image beacon
            setTimeout(() => {
                if (!successHandled) {
                    console.log('Image beacon fallback sent');
                    handleSuccess();
                }
            }, 2000);
            
            // Clean up
            setTimeout(() => {
                if (form.parentNode) document.body.removeChild(form);
                if (iframe.parentNode) document.body.removeChild(iframe);
                if (img.parentNode) document.body.removeChild(img);
            }, 3000);
        };
        
        // Submit the form
        try {
            console.log('Submitting form to Google Apps Script...');
            form.submit();
            console.log('Form submitted, waiting for response...');
        } catch (error) {
            console.error('Form submission error:', error);
            clearTimeout(fallbackTimeout);
            
            // Try image beacon as last resort
            console.warn('Form.submit() failed, using image beacon...');
            const params = new URLSearchParams({
                email: email,
                source: 'landing_page_error_fallback',
                timestamp: new Date().toISOString()
            });
            const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;
            
            const img = new Image();
            img.style.display = 'none';
            img.src = url;
            document.body.appendChild(img);
            
            setTimeout(() => {
                handleSuccess();
            }, 2000);
        }
        
        // Clean up after success
        setTimeout(() => {
            if (form && form.parentNode) document.body.removeChild(form);
            if (iframe && iframe.parentNode) document.body.removeChild(iframe);
        }, 5000);
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
