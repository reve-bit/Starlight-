// -----------------------------
// Mobile Navigation Overlay
// -----------------------------
document.querySelectorAll('.nav-overlay, [data-close]').forEach(el => {
  el.addEventListener('click', () => {
    const cb = document.getElementById('menu-toggle');
    if (cb) cb.checked = false;
  });
});

// -----------------------------
// Slider Functionality (only if present)
// -----------------------------
(function () {
  document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider-wrapper');
    const prev = container.querySelector('.slider-btn.prev');
    const next = container.querySelector('.slider-btn.next');
    const card = slider ? slider.querySelector('.card') : null;

    function cardWidth() {
      return card ? (card.offsetWidth + 20) : 260;
    }

    if (next && slider) {
      next.addEventListener('click', () => {
        slider.scrollBy({ left: cardWidth(), behavior: 'smooth' });
      });
    }
    if (prev && slider) {
      prev.addEventListener('click', () => {
        slider.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
      });
    }
  });
})();

// -----------------------------
// Video Controls for intro-video
// -----------------------------
(function () {
  const video = document.querySelector('.intro-video');
  if (!video) return;  // If the video doesn't exist, do nothing

  // Create a custom play/pause button
  const controlButton = document.createElement('button');
  controlButton.textContent = 'Play/Pause';
  controlButton.style.position = 'absolute';
  controlButton.style.top = '10px';
  controlButton.style.right = '10px';
  controlButton.style.background = '#6A00F4';  // Match your theme
  controlButton.style.color = '#fff';
  controlButton.style.border = 'none';
  controlButton.style.padding = '10px';
  controlButton.style.borderRadius = '5px';
  controlButton.style.cursor = 'pointer';

  const highlightsSection = document.querySelector('#highlights');
  if (highlightsSection) {
    highlightsSection.appendChild(controlButton);
  }

  controlButton.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      controlButton.textContent = 'Pause';
    } else {
      video.pause();
      controlButton.textContent = 'Play';
    }
  });

  video.addEventListener('ended', () => {
    controlButton.textContent = 'Play';
  });

  // Add Intersection Observer for auto-mute/unmute
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Video is in view, unmute it
        video.muted = false;  // Unmute
      } else {
        // Video is out of view, mute it
        video.muted = true;  // Mute
      }
    });
  }, { threshold: 0.5 });  // Trigger when 50% of the video is visible

  if (video) {
    observer.observe(video);  // Observe the video element
  }
})();

// -----------------------------
// Fallback Centering for Hero Content
// -----------------------------
(function () {
  const hc = document.querySelector('.hero-content');
  const hero = document.querySelector('.hero');
  if (!hc || !hero) return;

  function ensureCenter() {
    const st = getComputedStyle(hc);
    if (st.position !== 'absolute' && st.position !== 'fixed') {
      hc.style.position = 'absolute';
      hc.style.top = '50%';
      hc.style.left = '50%';
      hc.style.transform = 'translate(-50%, -50%)';
      hc.style.zIndex = '1002';
      hc.style.textAlign = 'center';
    }
  }

  window.addEventListener('load', ensureCenter);
  window.addEventListener('resize', ensureCenter);
  ensureCenter();
})();
// Help Center JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // FAQ toggle functionality
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const toggle = this.querySelector('.faq-toggle');
      const faqItem = this.parentElement;
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.maxHeight = null;
          item.querySelector('.faq-toggle').textContent = '+';
        }
      });
      
      // Toggle current FAQ item
      faqItem.classList.toggle('active');
      
      // Toggle answer visibility
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        toggle.textContent = '+';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
      }
    });
  });
  
  // Search functionality
  const searchBox = document.querySelector('.search-box');
  const searchBtn = document.querySelector('.search-btn');
  
  searchBtn.addEventListener('click', function() {
    performSearch();
  });
  
  searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  function performSearch() {
    const searchTerm = searchBox.value.trim().toLowerCase();
    if (searchTerm) {
      // Search through FAQ items
      const faqItems = document.querySelectorAll('.faq-item');
      let foundResults = false;
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
          item.classList.add('active');
          item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
          item.querySelector('.faq-toggle').textContent = '−';
          foundResults = true;
          
          // Scroll to the first found result
          if (!document.querySelector('.scrolled-to-result')) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.classList.add('scrolled-to-result');
          }
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show message if no results found
      if (!foundResults) {
        alert(`No results found for "${searchTerm}". Please try different keywords.`);
        // Show all FAQ items again
        faqItems.forEach(item => {
          item.style.display = 'block';
          item.classList.remove('active');
          item.querySelector('.faq-answer').style.maxHeight = null;
          item.querySelector('.faq-toggle').textContent = '+';
        });
      }
      
      // Remove scroll marker after a delay
      setTimeout(() => {
        document.querySelectorAll('.scrolled-to-result').forEach(el => {
          el.classList.remove('scrolled-to-result');
        });
      }, 2000);
    } else {
      // If search is empty, show all FAQ items
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        item.style.display = 'block';
        item.classList.remove('active');
        item.querySelector('.faq-answer').style.maxHeight = null;
        item.querySelector('.faq-toggle').textContent = '+';
      });
    }
  }
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      
      // Simulate form submission
      const submitBtn = this.querySelector('.cta-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} within 24 hours.`);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Add cosmic glow effect to interactive elements
  const interactiveElements = document.querySelectorAll('.help-category, .faq-question, .social-link, .app-btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 20px rgba(201, 167, 235, 0.4)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
});
// Form submission handler
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide the form
      this.style.display = 'none';
      
      // Show the confirmation message
      document.getElementById('confirmationMessage').style.display = 'block';
    });
    
    // FAQ toggle functionality
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

 // Form submission handler
    document.getElementById('fanSubmissionForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your submission! Your creation has been received and will be reviewed by our team.');
      this.reset();
    });
    // Form submission handling
    document.getElementById('fanSubmissionForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real application, you would send the form data to a server here
      // For demonstration, we'll just show the confirmation message
      document.getElementById('fanSubmissionForm').style.display = 'none';
      document.getElementById('submissionConfirmation').style.display = 'block';
    });
    // -----------------------------
// Enhanced Digital Collectibles Functionality
// -----------------------------

function initEnhancedDigitalCollectibles() {
    console.log('Initializing Enhanced Digital Collectibles...');
    
    // Enhanced Countdown Timer
    function updateEnhancedCountdown() {
        const launchDate = new Date('2025-01-15T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update countdown display
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            // Update progress bar (30 days total)
            const totalDays = 30;
            const daysPassed = totalDays - days;
            const progress = Math.min((daysPassed / totalDays) * 100, 100);
            document.getElementById('progress-fill').style.width = progress + '%';
            
            // Add pulse animation to numbers when under 10
            const units = ['days', 'hours', 'minutes', 'seconds'];
            units.forEach(unit => {
                const element = document.getElementById(unit);
                const value = parseInt(element.textContent);
                if (value <= 10) {
                    element.classList.add('pulse');
                } else {
                    element.classList.remove('pulse');
                }
            });
        } else {
            // Countdown finished
            document.querySelector('.countdown-container h2').textContent = 'Launch Time!';
            document.querySelector('.countdown-container p').textContent = 'Digital Collectibles are now available!';
            document.querySelector('.countdown-timer').style.display = 'none';
        }
    }
    
    // Enhanced registration counter with realistic simulation
    function updateEnhancedRegistrationCounter() {
        const counter = document.getElementById('registered-count');
        let count = parseInt(counter.textContent.replace(',', ''));
        
        // Simulate realistic registration patterns
        const growthRate = 1 + (Math.random() * 0.1);
        const newRegistrations = Math.floor(Math.random() * 5) + 1;
        
        // Only update occasionally for realism
        if (Math.random() > 0.7) {
            count += newRegistrations;
            counter.textContent = count.toLocaleString();
            
            // Add visual feedback
            counter.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counter.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Enhanced form submission with validation
    const enhancedForm = document.querySelector('.enhanced-form');
    if (enhancedForm) {
        enhancedForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('#email');
            const submitBtn = this.querySelector('.notify-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showFormMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate API call with realistic delay
            setTimeout(() => {
                // Success simulation
                showFormMessage(`🎉 Welcome to the waitlist! We've sent a confirmation email to ${email}. You'll be among the first to access our Digital Collectibles.`, 'success');
                
                // Update registration counter
                const counter = document.getElementById('registered-count');
                let count = parseInt(counter.textContent.replace(',', ''));
                count += 1;
                counter.textContent = count.toLocaleString();
                
                // Reset form
                enhancedForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
                
                // Trigger confetti effect
                triggerConfetti();
                
            }, 2000);
        });
    }
    
    // Form message display
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <span class="message-icon">${type === 'success' ? '✅' : '⚠️'}</span>
                <span>${message}</span>
            </div>
        `;
        
        enhancedForm.insertBefore(messageDiv, enhancedForm.firstChild);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
    
    // Confetti effect for successful registration
    function triggerConfetti() {
        const confettiCount = 100;
        const colors = ['#C9A7EB', '#6A00F4', '#8B37FF', '#A366FF'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.5};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 10000;
            `;
            
            document.body.appendChild(confetti);
            
            // Animation
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Enhanced FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });
    
    // Add hover effects to showcase items
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Add interactive effects to benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize countdown and counters
    setInterval(updateEnhancedCountdown, 1000);
    setInterval(updateEnhancedRegistrationCounter, 3000);
    updateEnhancedCountdown();
}

// -----------------------------
// Common Features Initialization
// -----------------------------

function initCommonFeatures() {
    // Mobile navigation
    document.querySelectorAll('.nav-overlay, [data-close]').forEach(el => {
        el.addEventListener('click', () => {
            const cb = document.getElementById('menu-toggle');
            if (cb) cb.checked = false;
        });
    });

    // Hero content centering
    const hc = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    if (hc && hero) {
        function ensureCenter() {
            const st = getComputedStyle(hc);
            if (st.position !== 'absolute' && st.position !== 'fixed') {
                hc.style.position = 'absolute';
                hc.style.top = '50%';
                hc.style.left = '50%';
                hc.style.transform = 'translate(-50%, -50%)';
                hc.style.zIndex = '1002';
                hc.style.textAlign = 'center';
            }
        }

        window.addEventListener('load', ensureCenter);
        window.addEventListener('resize', ensureCenter);
        ensureCenter();
    }

    // Add floating collectibles animation
    initFloatingCollectibles();
}

// Floating collectibles animation
function initFloatingCollectibles() {
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach((item, index) => {
        // Add random variations to animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        const randomX = Math.random() * 100;
        
        item.style.setProperty('--delay', `${randomDelay}s`);
        item.style.setProperty('--x', `${randomX}%`);
        item.style.animationDuration = `${randomDuration}s`;
    });
}

// -----------------------------
// Main Initialization
// -----------------------------

document.addEventListener('DOMContentLoaded', function() {
    console.log('Starlight+ Digital Collectibles Page Loaded');
    
    // Initialize common functionality
    initCommonFeatures();
    
    // Initialize enhanced digital collectibles
    initEnhancedDigitalCollectibles();
    
    // Add CSS for animations if not already present
    addAnimationStyles();
});

// Add necessary animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .pulse {
            animation: pulse 1s infinite;
        }
        
        .form-message {
            padding: 15px;
            border-radius: var(--radius);
            margin: 20px 0;
            animation: slideInUp 0.3s ease;
        }
        
        .form-message-success {
            background: rgba(76, 175, 80, 0.1);
            border: 1px solid rgba(76, 175, 80, 0.3);
            color: #4CAF50;
        }
        
        .form-message-error {
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid rgba(244, 67, 54, 0.3);
            color: #F44336;
        }
        
        .message-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .message-icon {
            font-size: 1.2rem;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Enhanced form focus states */
        .enhanced-form input:focus,
        .enhanced-form select:focus {
            outline: none;
            border-color: var(--lilac);
            box-shadow: 0 0 20px rgba(201, 167, 235, 0.3);
            background: rgba(255, 255, 255, 0.15);
        }
        
        /* Loading state for buttons */
        .notify-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        /* Enhanced hover effects */
        .showcase-item {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .benefit-item {
            transition: all 0.3s ease;
        }
        
        /* Countdown number styles */
        .countdown-unit .number {
            transition: all 0.3s ease;
        }
    `;
    
    // Only add if not already present
    if (!document.querySelector('#enhanced-styles')) {
        style.id = 'enhanced-styles';
        document.head.appendChild(style);
    }
}

// Add intersection observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.showcase-item, .feature-card, .countdown-unit');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when DOM is fully loaded
window.addEventListener('load', function() {
    initScrollAnimations();
    
    // Add some interactive console logging for development
    console.log('🌟 Starlight+ Digital Collectibles initialized successfully!');
    console.log('🚀 Features loaded:');
    console.log('   - Enhanced countdown timer');
    console.log('   - Interactive registration form');
    console.log('   - Animated showcase items');
    console.log('   - FAQ accordion system');
    console.log('   - Floating collectibles animation');
});
// -----------------------------
// Exclusive Updates Functionality
// -----------------------------

function initExclusiveUpdates() {
    console.log('Initializing Exclusive Updates...');
    
    // Initialize subscription functionality
    initSubscriptionSystem();
    
    // Initialize live updates feed
    initLiveUpdates();
    
    // Add real-time update simulation
    initUpdateSimulation();
}

// Subscription System
function initSubscriptionSystem() {
    // Subscription tier selection
    const tierButtons = document.querySelectorAll('.tier-cta');
    const subscriptionModal = document.querySelector('.subscription-modal');
    const closeModal = document.querySelector('.close-modal');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const subscriptionForm = document.querySelector('.subscription-form');
    
    // Open modal when tier is selected
    tierButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tier = this.closest('.subscription-tier');
            const tierName = tier.querySelector('.tier-name').textContent;
            const tierPrice = tier.querySelector('.tier-price').textContent;
            
            // Set selected tier in modal
            document.getElementById('selected-tier').textContent = tierName;
            document.getElementById('selected-price').textContent = tierPrice;
            
            // Show modal
            subscriptionModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closeSubscriptionModal);
    subscriptionModal.addEventListener('click', function(e) {
        if (e.target === subscriptionModal) {
            closeSubscriptionModal();
        }
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Form submission
    subscriptionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-subscription');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            // Success simulation
            showSubscriptionSuccess();
            
            // Reset form
            subscriptionForm.reset();
            paymentMethods.forEach(m => m.classList.remove('selected'));
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
        }, 3000);
    });
    
    function closeSubscriptionModal() {
        subscriptionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function showSubscriptionSuccess() {
        const modalContent = document.querySelector('.modal-content');
        const originalContent = modalContent.innerHTML;
        
        modalContent.innerHTML = `
            <button class="close-modal">&times;</button>
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
                <h3 style="color: var(--lilac); margin-bottom: 15px;">Welcome to Starlight++!</h3>
                <p style="color: var(--muted); margin-bottom: 30px; line-height: 1.6;">
                    Thank you for subscribing to Starlight++! You now have access to exclusive content, 
                    premium features, and real-time updates. A confirmation email has been sent to your inbox.
                </p>
                <button class="cta-btn" onclick="closeSubscriptionModal()" style="width: 100%;">
                    Start Exploring
                </button>
            </div>
        `;
        
        // Re-attach close event
        modalContent.querySelector('.close-modal').addEventListener('click', closeSubscriptionModal);
        
        // Trigger confetti
        triggerConfetti();
    }
}

// Live Updates Feed
function initLiveUpdates() {
    const updateFeed = document.querySelector('.update-feed');
    
    // Sample update data
    const updates = [
        {
            icon: '🎵',
            title: 'New Album Announcement',
            content: 'Cosmic Waves just announced their new album "Nebula Dreams" releasing next month!',
            time: '2 minutes ago',
            premium: false
        },
        {
            icon: '🌟',
            title: 'Exclusive Behind-the-Scenes',
            content: 'Get exclusive access to Galaxy Beats studio session footage (Premium Members Only)',
            time: '15 minutes ago',
            premium: true
        },
        {
            icon: '🎬',
            title: 'Live Concert Streaming',
            content: 'Starlight Dream live concert streaming this Friday at 8 PM EST',
            time: '1 hour ago',
            premium: false
        },
        {
            icon: '💫',
            title: 'Artist Q&A Session',
            content: 'Join Nebula Voice for an exclusive Q&A session tomorrow (Premium Members Only)',
            time: '3 hours ago',
            premium: true
        },
        {
            icon: '📢',
            title: 'Platform Update',
            content: 'New features coming to Starlight+ next week including enhanced video streaming',
            time: '5 hours ago',
            premium: false
        }
    ];
    
    // Populate update feed
    updates.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item';
        updateItem.innerHTML = `
            <div class="update-icon">${update.icon}</div>
            <div class="update-content">
                <h4>${update.title} ${update.premium ? '<span style="color: var(--violet); font-size: 0.8rem;">PREMIUM</span>' : ''}</h4>
                <p>${update.content}</p>
                <div class="update-time">${update.time}</div>
            </div>
        `;
        updateFeed.appendChild(updateItem);
    });
    
    // Auto-scroll feed
    let scrollPosition = 0;
    setInterval(() => {
        if (scrollPosition < updateFeed.scrollHeight - updateFeed.clientHeight) {
            scrollPosition += 1;
            updateFeed.scrollTop = scrollPosition;
        } else {
            scrollPosition = 0;
            updateFeed.scrollTop = 0;
        }
    }, 50);
}

// Real-time Update Simulation
function initUpdateSimulation() {
    const updateFeed = document.querySelector('.update-feed');
    
    // Add new updates periodically
    setInterval(() => {
        const newUpdates = [
            {
                icon: '🔥',
                title: 'Trending Now',
                content: 'Fan artwork for Cosmic Waves is trending in the community gallery',
                time: 'Just now',
                premium: false
            },
            {
                icon: '🎁',
                title: 'Exclusive Merch Drop',
                content: 'Limited edition collectibles available now for Premium members',
                time: 'Just now',
                premium: true
            },
            {
                icon: '📈',
                title: 'Voting Results',
                content: 'See the results for this week\'s fan favorite performance',
                time: 'Just now',
                premium: false
            }
        ];
        
        const randomUpdate = newUpdates[Math.floor(Math.random() * newUpdates.length)];
        
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item new-update';
        updateItem.style.animation = 'slideInUp 0.5s ease';
        updateItem.innerHTML = `
            <div class="update-icon">${randomUpdate.icon}</div>
            <div class="update-content">
                <h4>${randomUpdate.title} ${randomUpdate.premium ? '<span style="color: var(--violet); font-size: 0.8rem;">PREMIUM</span>' : ''}</h4>
                <p>${randomUpdate.content}</p>
                <div class="update-time">${randomUpdate.time}</div>
            </div>
        `;
        
        updateFeed.insertBefore(updateItem, updateFeed.firstChild);
        
        // Remove old updates if too many
        if (updateFeed.children.length > 10) {
            updateFeed.removeChild(updateFeed.lastChild);
        }
        
    }, 15000); // Add new update every 15 seconds
}

// Confetti effect (reuse from previous implementation)
function triggerConfetti() {
    const confettiCount = 100;
    const colors = ['#C9A7EB', '#6A00F4', '#8B37FF', '#A366FF'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.5};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Update main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    initCommonFeatures();
    
    // Page-specific initializations
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'exclusive-updates.html':
            initExclusiveUpdates();
            break;
        case 'digital-collectibles.html':
            initDigitalCollectibles();
            break;
        case 'creative-contests.html':
            initCreativeContests();
            break;
    }
});
