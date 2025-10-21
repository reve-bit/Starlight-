// -----------------------------
// Common Features Initialization
// -----------------------------

function initCommonFeatures() {
    console.log('Initializing Common Features...');
    
    // Advanced Feature 1: Objects & Methods - Configuration object with methods
    const appConfig = {
        features: {
            mobileNav: true,
            heroCentering: true,
            performance: true
        },
        
        // Object method for feature validation
        validateFeatures: function() {
            const validFeatures = Object.keys(this.features).filter(key => this.features[key]);
            console.log('Active features:', validFeatures);
            return validFeatures;
        },
        
        // Object method for performance tracking
        trackPerformance: function(featureName, startTime) {
            const endTime = performance.now();
            console.log(`${featureName} initialized in ${(endTime - startTime).toFixed(2)}ms`);
        }
    };

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

    // Validate and log active features
    appConfig.validateFeatures();
}

// -----------------------------
// FAQ Functionality
// -----------------------------

function initFAQ() {
    console.log('Initializing FAQ functionality...');
    
    // Advanced Feature 2: Arrays - Array of FAQ states and operations
    const faqStates = [];
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Advanced Feature 3: Loops - Using forEach with array operations
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Store initial state in array
        faqStates.push({
            id: index,
            isOpen: false,
            element: item,
            question: question?.textContent?.trim() || ''
        });
        
        if (question && answer && toggle) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Advanced Feature 4: Conditions - Complex conditional logic
                const shouldCloseOthers = !e.shiftKey; // Close others unless shift is held
                const isCurrentlyOpen = item.classList.contains('active');
                
                // Close other open FAQs based on condition
                if (shouldCloseOthers) {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherToggle = otherItem.querySelector('.faq-toggle');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0';
                                otherAnswer.style.overflow = 'hidden';
                            }
                            if (otherToggle) otherToggle.textContent = '+';
                            
                            // Update state in array
                            const otherIndex = Array.from(faqItems).indexOf(otherItem);
                            if (otherIndex !== -1) {
                                faqStates[otherIndex].isOpen = false;
                            }
                        }
                    });
                }
                
                // Toggle current FAQ
                item.classList.toggle('active');
                
                // Advanced Feature 5: Objects & Methods - State management object
                const faqManager = {
                    open: function() {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.overflow = 'visible';
                        toggle.textContent = '−';
                        faqStates[index].isOpen = true;
                    },
                    close: function() {
                        answer.style.maxHeight = '0';
                        answer.style.overflow = 'hidden';
                        toggle.textContent = '+';
                        faqStates[index].isOpen = false;
                    },
                    toggle: function() {
                        if (item.classList.contains('active')) {
                            this.open();
                        } else {
                            this.close();
                        }
                    }
                };
                
                faqManager.toggle();
                
                // Log FAQ analytics
                console.log(`FAQ ${index + 1} ${faqStates[index].isOpen ? 'opened' : 'closed'}`);
            });
            
            // Initialize all answers as closed
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
        }
    });
    
    // Add keyboard support
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Advanced Feature 6: Arrays - FAQ analytics method
    const faqAnalytics = {
        getOpenCount: function() {
            return faqStates.filter(state => state.isOpen).length;
        },
        getAllQuestions: function() {
            return faqStates.map(state => state.question);
        },
        getPopularQuestions: function() {
            // Simulate popularity based on question length
            return [...faqStates]
                .sort((a, b) => b.question.length - a.question.length)
                .slice(0, 3)
                .map(state => state.question);
        }
    };
    
    console.log('FAQ Analytics:', {
        total: faqStates.length,
        popularQuestions: faqAnalytics.getPopularQuestions()
    });
}

// -----------------------------
// Video Lazy Loading with Auto Fullscreen (Fixed Version)
// -----------------------------

function initVideoLazyLoading() {
    console.log('Initializing YouTube video lazy loading...');
    
    // Advanced Feature 7: Objects & Methods - Video configuration object
    const videoConfig = {
        autoplay: true,
        controls: true,
        modestbranding: true,
        rel: 0,
        enableFullscreen: true,
        
        // Method to generate YouTube URL
        generateUrl: function(videoId, params = {}) {
            const baseParams = {
                autoplay: this.autoplay ? 1 : 0,
                rel: this.rel,
                modestbranding: this.modestbranding ? 1 : 0,
                ...params
            };
            
            const queryString = Object.keys(baseParams)
                .map(key => `${key}=${baseParams[key]}`)
                .join('&');
                
            return `https://www.youtube.com/embed/${videoId}?${queryString}`;
        },
        
        // Method to validate video sources
        validateSource: function(src) {
            const youtubeRegex = /^(https:\/\/www\.youtube\.com\/embed\/|https:\/\/youtu\.be\/)/;
            return youtubeRegex.test(src);
        }
    };
    
    const videoContainers = document.querySelectorAll('.intro-video');
    
    // Advanced Feature 8: Arrays - Track video states
    const videoStates = Array.from(videoContainers).map((container, index) => ({
        id: index,
        container: container,
        isLoaded: false,
        isPlaying: false,
        loadTime: null
    }));
    
    videoContainers.forEach((container, index) => {
        const placeholder = container.querySelector('.video-placeholder');
        const playButton = container.querySelector('.play-button');
        const iframe = container.querySelector('.video-player');
        
        if (!placeholder || !playButton || !iframe) return;
        
        // Only load YouTube video when user interacts
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Play button clicked for YouTube video');
            
            // Show loading state
            container.classList.add('video-loading');
            playButton.textContent = '⏳';
            
            // Get the YouTube embed URL
            const videoSrc = placeholder.getAttribute('data-video-src');
            
            if (videoSrc && videoConfig.validateSource(videoSrc)) {
                // Extract video ID and generate URL using object method
                const videoId = videoSrc.split('/').pop() || videoSrc.split('v=')[1];
                const fullVideoSrc = videoConfig.generateUrl(videoId, { autoplay: 1 });
                
                // Set the iframe source to load the YouTube video with autoplay
                iframe.src = fullVideoSrc;
                
                // Show the iframe and hide the placeholder
                iframe.style.display = 'block';
                placeholder.style.display = 'none';
                
                // Remove loading state
                container.classList.remove('video-loading');
                container.classList.add('video-loaded');
                
                // Update video state
                videoStates[index].isLoaded = true;
                videoStates[index].loadTime = Date.now();
                
                // Enter fullscreen mode for the container
                enterFullscreenMode(container, iframe, fullVideoSrc);
            } else {
                console.error('Invalid video source:', videoSrc);
                container.classList.remove('video-loading');
                playButton.textContent = '❌ Error';
            }
        });
        
        // Optional: Preload when it comes into viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('YouTube video placeholder in viewport');
                    observer.unobserve(container);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(container);
    });
    
    // Advanced Feature 9: Arrays - Video analytics
    const videoAnalytics = {
        getLoadedVideos: function() {
            return videoStates.filter(state => state.isLoaded);
        },
        getLoadStatistics: function() {
            const loaded = this.getLoadedVideos();
            return {
                total: videoStates.length,
                loaded: loaded.length,
                percentage: (loaded.length / videoStates.length * 100).toFixed(1) + '%'
            };
        }
    };
    
    console.log('Video Analytics:', videoAnalytics.getLoadStatistics());
}

// Fixed Fullscreen functionality for YouTube videos
function enterFullscreenMode(container, iframe, videoSrc) {
    console.log('Entering fullscreen mode for YouTube video');
    
    // Advanced Feature 10: Objects & Methods - Fullscreen manager
    const fullscreenManager = {
        isActive: false,
        elements: {},
        
        initialize: function(container, iframe, videoSrc) {
            this.elements = {
                container: this.createFullscreenContainer(),
                iframe: this.createFullscreenIframe(videoSrc),
                closeButton: this.createCloseButton()
            };
            
            this.assembleFullscreen();
            this.attachEventListeners();
            this.activate();
        },
        
        createFullscreenContainer: function() {
            const container = document.createElement('div');
            container.className = 'video-fullscreen';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            return container;
        },
        
        createFullscreenIframe: function(videoSrc) {
            const iframe = document.createElement('iframe');
            iframe.src = videoSrc + "&autoplay=1&rel=0&modestbranding=1&playsinline=0";
            iframe.style.cssText = `
                width: 100%;
                height: 100%;
                border: none;
            `;
            iframe.allow = "autoplay; fullscreen; encrypted-media";
            iframe.allowFullscreen = true;
            return iframe;
        },
        
        createCloseButton: function() {
            const button = document.createElement('button');
            button.className = 'close-fullscreen';
            button.innerHTML = '✕';
            button.setAttribute('aria-label', 'Close fullscreen');
            button.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 10001;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            `;
            return button;
        },
        
        assembleFullscreen: function() {
            this.elements.container.appendChild(this.elements.iframe);
            this.elements.container.appendChild(this.elements.closeButton);
            document.body.appendChild(this.elements.container);
        },
        
        attachEventListeners: function() {
            // Close button click
            this.elements.closeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deactivate();
            });
            
            // Escape key
            this.escapeHandler = (e) => {
                if (e.key === 'Escape') this.deactivate();
            };
            document.addEventListener('keydown', this.escapeHandler);
            
            // Backdrop click
            this.backdropHandler = (e) => {
                if (e.target === this.elements.container) this.deactivate();
            };
            this.elements.container.addEventListener('click', this.backdropHandler);
        },
        
        activate: function() {
            this.isActive = true;
            document.body.style.overflow = 'hidden';
            console.log('Fullscreen activated');
        },
        
        deactivate: function() {
            if (!this.isActive) return;
            
            // Stop video
            if (this.elements.iframe) {
                this.elements.iframe.src = '';
            }
            
            // Remove event listeners
            document.removeEventListener('keydown', this.escapeHandler);
            this.elements.container.removeEventListener('click', this.backdropHandler);
            
            // Remove elements
            if (this.elements.container.parentNode) {
                this.elements.container.parentNode.removeChild(this.elements.container);
            }
            
            // Reset state
            document.body.style.overflow = '';
            this.isActive = false;
            
            console.log('Fullscreen deactivated');
        }
    };
    
    fullscreenManager.initialize(container, iframe, videoSrc);
}

function exitFullscreenMode(fullscreenElements) {
    console.log('Exiting fullscreen mode');
    
    const { container, iframe } = fullscreenElements;
    
    if (iframe) {
        // Stop the video by removing the iframe source
        iframe.src = '';
    }
    
    // Remove event listeners
    if (container._escapeHandler) {
        document.removeEventListener('keydown', container._escapeHandler);
    }
    if (container._backdropHandler) {
        container.removeEventListener('click', container._backdropHandler);
    }
    
    // Remove fullscreen container
    if (container && container.parentNode) {
        container.parentNode.removeChild(container);
    }
    
    // Re-enable body scroll
    document.body.style.overflow = '';
}

// Handle browser's native fullscreen API (optional enhancement)
function setupNativeFullscreenSupport() {
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            // User exited fullscreen, close our custom fullscreen
            const fullscreenContainers = document.querySelectorAll('.video-fullscreen');
            fullscreenContainers.forEach(container => {
                const video = container.querySelector('video');
                exitFullscreenMode(container, video);
            });
        }
    });
}

// -----------------------------
// Enhanced Slider Functionality
// -----------------------------

function initEnhancedSlider() {
    console.log('Initializing enhanced slider...');
    
    // Advanced Feature 11: Objects & Methods - Slider factory
    const sliderFactory = {
        createSlider: function(sliderElement) {
            const wrapper = sliderElement.querySelector('.slider-wrapper');
            const prevBtn = sliderElement.querySelector('.slider-btn.prev');
            const nextBtn = sliderElement.querySelector('.slider-btn.next');
            const cards = sliderElement.querySelectorAll('.card');
            
            if (!wrapper || !prevBtn || !nextBtn || cards.length === 0) return null;
            
            return {
                element: sliderElement,
                wrapper: wrapper,
                prevBtn: prevBtn,
                nextBtn: nextBtn,
                cards: cards,
                currentPosition: 0,
                cardWidth: 0,
                visibleCards: 0,
                maxPosition: 0,
                
                initialize: function() {
                    this.calculateDimensions();
                    this.attachEventListeners();
                    this.updateButtons();
                    return this;
                },
                
                calculateDimensions: function() {
                    this.cardWidth = this.cards[0].offsetWidth + 20;
                    this.visibleCards = Math.floor(this.wrapper.offsetWidth / this.cardWidth);
                    this.maxPosition = Math.max(0, (this.cards.length - this.visibleCards) * this.cardWidth);
                },
                
                updateButtons: function() {
                    // Advanced Feature 12: Conditions - Complex button state logic
                    const canGoPrev = this.currentPosition > 0;
                    const canGoNext = this.currentPosition < this.maxPosition;
                    
                    this.prevBtn.style.opacity = canGoPrev ? '1' : '0.5';
                    this.nextBtn.style.opacity = canGoNext ? '1' : '0.5';
                    this.prevBtn.disabled = !canGoPrev;
                    this.nextBtn.disabled = !canGoNext;
                    
                    // Add/remove active states based on conditions
                    if (canGoPrev) {
                        this.prevBtn.classList.add('active');
                    } else {
                        this.prevBtn.classList.remove('active');
                    }
                    
                    if (canGoNext) {
                        this.nextBtn.classList.add('active');
                    } else {
                        this.nextBtn.classList.remove('active');
                    }
                },
                
                scrollTo: function(position) {
                    this.wrapper.scrollTo({
                        left: position,
                        behavior: 'smooth'
                    });
                    this.currentPosition = position;
                    this.updateButtons();
                },
                
                next: function() {
                    const cardsToScroll = Math.min(this.visibleCards, 2);
                    const newPosition = Math.min(
                        this.currentPosition + (this.cardWidth * cardsToScroll), 
                        this.maxPosition
                    );
                    this.scrollTo(newPosition);
                },
                
                prev: function() {
                    const cardsToScroll = Math.min(this.visibleCards, 2);
                    const newPosition = Math.max(
                        this.currentPosition - (this.cardWidth * cardsToScroll), 
                        0
                    );
                    this.scrollTo(newPosition);
                },
                
                attachEventListeners: function() {
                    this.nextBtn.addEventListener('click', () => this.next());
                    this.prevBtn.addEventListener('click', () => this.prev());
                    
                    // Keyboard navigation
                    this.wrapper.setAttribute('tabindex', '0');
                    this.wrapper.addEventListener('keydown', (e) => {
                        if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            this.prev();
                        } else if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            this.next();
                        }
                    });
                    
                    // Touch support
                    this.attachTouchEvents();
                },
                
                attachTouchEvents: function() {
                    let startX = 0;
                    let scrollLeft = 0;
                    
                    this.wrapper.addEventListener('touchstart', (e) => {
                        startX = e.touches[0].pageX;
                        scrollLeft = this.wrapper.scrollLeft;
                    });
                    
                    this.wrapper.addEventListener('touchmove', (e) => {
                        if (!startX) return;
                        const x = e.touches[0].pageX;
                        const walk = (x - startX) * 2;
                        this.wrapper.scrollLeft = scrollLeft - walk;
                    });
                },
                
                handleResize: function() {
                    this.calculateDimensions();
                    this.updateButtons();
                }
            };
        }
    };
    
    const sliders = document.querySelectorAll('.slider-container');
    
    // Advanced Feature 13: Arrays - Manage multiple slider instances
    const sliderInstances = [];
    
    sliders.forEach((slider, index) => {
        const sliderInstance = sliderFactory.createSlider(slider);
        if (sliderInstance) {
            sliderInstances.push(sliderInstance.initialize());
            console.log(`Slider ${index + 1} initialized`);
        }
    });
    
    // Advanced Feature 14: Loops - Batch operations on slider instances
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            sliderInstances.forEach(instance => {
                instance.handleResize();
            });
        }, 250);
    });
    
    // Export slider instances for debugging
    window.sliderInstances = sliderInstances;
}

// -----------------------------
// Contact Form Functionality
// -----------------------------

function initContactForm() {
    console.log('Initializing contact form...');
    
    // Advanced Feature 15: Objects & Methods - Form processor with validation
    const formProcessor = {
        fields: ['name', 'email', 'message'],
        required: ['name', 'email'],
        
        validate: function(formData) {
            const errors = [];
            
            // Advanced Feature 16: Arrays & Conditions - Field validation
            this.required.forEach(field => {
                if (!formData.get(field) || formData.get(field).trim() === '') {
                    errors.push(`${field} is required`);
                }
            });
            
            // Email validation
            const email = formData.get('email');
            if (email && !this.isValidEmail(email)) {
                errors.push('Please enter a valid email address');
            }
            
            return {
                isValid: errors.length === 0,
                errors: errors
            };
        },
        
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        submit: function(formData, callback) {
            const validation = this.validate(formData);
            
            if (!validation.isValid) {
                callback({ success: false, errors: validation.errors });
                return;
            }
            
            // Simulate API call
            setTimeout(() => {
                callback({ 
                    success: true, 
                    message: 'Thank you for your message! We will get back to you soon.' 
                });
            }, 2000);
        },
        
        formatData: function(formData) {
            const data = {};
            this.fields.forEach(field => {
                data[field] = formData.get(field) || '';
            });
            return data;
        }
    };
    
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    if (contactForm && confirmationMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Process form using our form processor
            formProcessor.submit(formData, function(response) {
                if (response.success) {
                    // Success case
                    contactForm.style.display = 'none';
                    confirmationMessage.style.display = 'block';
                    contactForm.reset();
                    console.log('Contact form submitted:', formProcessor.formatData(formData));
                } else {
                    // Error case - show validation errors
                    alert('Please fix the following errors:\n' + response.errors.join('\n'));
                }
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// -----------------------------
// Collectibles Countdown Timer
// -----------------------------

function initCountdownTimer() {
    console.log('Initializing countdown timer...');
    
    // Advanced Feature 17: Objects & Methods - Countdown manager
    const countdownManager = {
        launchDate: null,
        elements: {},
        intervals: [],
        
        initialize: function() {
            this.launchDate = new Date();
            this.launchDate.setDate(this.launchDate.getDate() + 30);
            
            this.elements = {
                days: document.getElementById('days'),
                hours: document.getElementById('hours'),
                minutes: document.getElementById('minutes'),
                seconds: document.getElementById('seconds'),
                progressFill: document.getElementById('progress-fill'),
                registeredCount: document.getElementById('registered-count')
            };
            
            if (!this.elements.days || !this.elements.progressFill) return;
            
            this.startCountdown();
            this.startRegistrationSimulation();
        },
        
        startCountdown: function() {
            const countdownInterval = setInterval(() => {
                this.updateCountdown();
            }, 1000);
            
            this.intervals.push(countdownInterval);
            this.updateCountdown(); // Initial update
        },
        
        updateCountdown: function() {
            const now = new Date();
            const diff = this.launchDate - now;
            
            // Advanced Feature 18: Conditions - Countdown completion check
            if (diff <= 0) {
                this.handleCountdownComplete();
                return;
            }
            
            const time = this.calculateTimeUnits(diff);
            this.updateDisplay(time);
            this.updateProgressBar(time.days);
        },
        
        calculateTimeUnits: function(diff) {
            return {
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            };
        },
        
        updateDisplay: function(time) {
            // Advanced Feature 19: Arrays - Batch update elements
            const updates = [
                { element: this.elements.days, value: time.days },
                { element: this.elements.hours, value: time.hours },
                { element: this.elements.minutes, value: time.minutes },
                { element: this.elements.seconds, value: time.seconds }
            ];
            
            updates.forEach(update => {
                if (update.element) {
                    update.element.textContent = update.value.toString().padStart(2, '0');
                }
            });
        },
        
        updateProgressBar: function(daysRemaining) {
            const progress = ((30 - daysRemaining) / 30) * 100;
            this.elements.progressFill.style.width = `${progress}%`;
        },
        
        startRegistrationSimulation: function() {
            const simulationInterval = setInterval(() => {
                if (Math.random() > 0.7 && this.elements.registeredCount) {
                    const currentCount = parseInt(this.elements.registeredCount.textContent.replace(',', '')) || 0;
                    this.elements.registeredCount.textContent = (currentCount + 1).toLocaleString();
                }
            }, 3000);
            
            this.intervals.push(simulationInterval);
        },
        
        handleCountdownComplete: function() {
            // Advanced Feature 20: Loops - Clean up all intervals
            this.intervals.forEach(interval => clearInterval(interval));
            
            const zeros = ['days', 'hours', 'minutes', 'seconds'];
            zeros.forEach(unit => {
                if (this.elements[unit]) {
                    this.elements[unit].textContent = '00';
                }
            });
            
            if (this.elements.progressFill) {
                this.elements.progressFill.style.width = '100%';
            }
            
            console.log('Countdown completed!');
        },
        
        destroy: function() {
            this.intervals.forEach(interval => clearInterval(interval));
            this.intervals = [];
        }
    };
    
    countdownManager.initialize();
}

// -----------------------------
// Collectibles Notification Form
// -----------------------------

function initNotificationForm() {
    console.log('Initializing notification form...');
    
    const notifyForm = document.querySelector('.notify-form');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                email: this.querySelector('#email').value,
                artist: this.querySelector('#favorite-artist').value
            };
            
            const submitBtn = this.querySelector('.notify-btn');
            
            // Advanced Feature 21: Objects & Methods - Form validation object
            const validator = {
                rules: {
                    email: {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address.'
                    },
                    artist: {
                        required: false,
                        message: ''
                    }
                },
                
                validate: function(data) {
                    const errors = [];
                    
                    // Advanced Feature 22: Loops - Dynamic field validation
                    Object.keys(this.rules).forEach(field => {
                        const rule = this.rules[field];
                        const value = data[field];
                        
                        if (rule.required && (!value || value.trim() === '')) {
                            errors.push(`${field} is required`);
                        }
                        
                        if (rule.pattern && value && !rule.pattern.test(value)) {
                            errors.push(rule.message);
                        }
                    });
                    
                    return {
                        isValid: errors.length === 0,
                        errors: errors
                    };
                }
            };
            
            const validation = validator.validate(formData);
            
            if (!validation.isValid) {
                alert(validation.errors.join('\n'));
                return;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert('Thank you! You have been registered for early access. We will notify you when collectibles launch.');
                
                // Reset form
                this.reset();
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                console.log('Notification form submitted:', formData);
            }, 1500);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// -----------------------------
// Performance Optimizations
// -----------------------------

function initPerformanceOptimizations() {
    console.log('Initializing performance optimizations...');
    
    // Advanced Feature 23: Objects & Methods - Performance monitor
    const performanceMonitor = {
        metrics: {
            imagesLoaded: 0,
            imagesFailed: 0,
            scrollEvents: 0,
            resourcesPreloaded: 0
        },
        
        track: function(metric) {
            if (this.metrics[metric] !== undefined) {
                this.metrics[metric]++;
            }
        },
        
        getReport: function() {
            return {
                ...this.metrics,
                imageSuccessRate: ((this.metrics.imagesLoaded / (this.metrics.imagesLoaded + this.metrics.imagesFailed)) * 100).toFixed(1) + '%'
            };
        }
    };

    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Advanced Feature 24: Arrays - Image loading with tracking
    const imageLoadPromises = Array.from(images).map(img => {
        return new Promise((resolve, reject) => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
                performanceMonitor.track('imagesLoaded');
                resolve(this);
            });
            
            img.addEventListener('error', function() {
                console.error('Error loading image:', this.src);
                performanceMonitor.track('imagesFailed');
                reject(this);
            });
        });
    });

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        performanceMonitor.track('scrollEvents');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations here
        }, 100);
    });
    
    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'Images/Stages.jpg'
            // Add other critical images here
        ];
        
        // Advanced Feature 25: Loops - Resource preloading with tracking
        criticalImages.forEach(src => {
            const img = new Image();
            img.onload = () => performanceMonitor.track('resourcesPreloaded');
            img.src = src;
        });
    }
    
    // Load non-critical resources after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloadCriticalResources();
            console.log('Performance Report:', performanceMonitor.getReport());
        }, 1000);
    });
    
    // Video optimization: Pause videos when not visible
    const videos = document.querySelectorAll('video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Video is visible - could resume if needed
                console.log('Video is visible:', video.src);
            } else {
                // Video is not visible - pause to save resources
                if (!video.paused && video.currentTime > 0) {
                    video.pause();
                    console.log('Video paused due to visibility:', video.src);
                }
            }
        });
    }, { threshold: 0.3 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
    });
}

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
    console.log('Setting up subscription system...');
    
    // Advanced Feature 26: Objects & Methods - Subscription manager
    const subscriptionManager = {
        tiers: [],
        currentTier: null,
        
        initialize: function() {
            this.cacheElements();
            this.setupEventListeners();
            this.loadTierData();
        },
        
        cacheElements: function() {
            this.elements = {
                tierButtons: document.querySelectorAll('.tier-cta'),
                modal: document.querySelector('.subscription-modal'),
                closeModal: document.querySelector('.close-modal'),
                paymentMethods: document.querySelectorAll('.payment-method'),
                form: document.querySelector('.subscription-form'),
                featuredSubscribe: document.querySelector('.featured-subscribe')
            };
        },
        
        loadTierData: function() {
            // Advanced Feature 27: Arrays - Tier data management
            this.tiers = Array.from(document.querySelectorAll('.subscription-tier')).map(tier => ({
                element: tier,
                name: tier.querySelector('.tier-name')?.textContent || '',
                price: tier.querySelector('.tier-price')?.textContent || '',
                isFeatured: tier.classList.contains('featured'),
                isCurrent: tier.querySelector('.tier-cta')?.textContent === 'Current Plan'
            }));
            
            this.currentTier = this.tiers.find(tier => tier.isCurrent);
        },
        
        setupEventListeners: function() {
            // Tier selection
            this.elements.tierButtons.forEach(button => {
                if (button.textContent !== 'Current Plan') {
                    button.addEventListener('click', (e) => this.handleTierSelection(e));
                }
            });
            
            // Modal controls
            if (this.elements.closeModal) {
                this.elements.closeModal.addEventListener('click', () => this.closeModal());
            }
            
            if (this.elements.modal) {
                this.elements.modal.addEventListener('click', (e) => {
                    if (e.target === this.elements.modal) this.closeModal();
                });
            }
            
            // Payment method selection
            this.elements.paymentMethods.forEach(method => {
                method.addEventListener('click', (e) => this.selectPaymentMethod(e.target));
            });
            
            // Form submission
            if (this.elements.form) {
                this.elements.form.addEventListener('submit', (e) => this.handleFormSubmission(e));
            }
            
            // Featured subscription
            if (this.elements.featuredSubscribe) {
                this.elements.featuredSubscribe.addEventListener('click', () => this.openFeaturedTier());
            }
        },
        
        handleTierSelection: function(e) {
            const button = e.currentTarget;
            const tier = button.closest('.subscription-tier');
            const tierIndex = Array.from(tier.parentElement.children).indexOf(tier);
            const selectedTier = this.tiers[tierIndex];
            
            if (selectedTier) {
                this.openModal(selectedTier);
            }
        },
        
        openModal: function(tier) {
            const selectedTierEl = document.getElementById('selected-tier');
            const selectedPriceEl = document.getElementById('selected-price');
            
            if (selectedTierEl) selectedTierEl.textContent = tier.name;
            if (selectedPriceEl) selectedPriceEl.textContent = tier.price;
            
            if (this.elements.modal) {
                this.elements.modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        },
        
        closeModal: function() {
            if (this.elements.modal) {
                this.elements.modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        },
        
        selectPaymentMethod: function(method) {
            this.elements.paymentMethods.forEach(m => m.classList.remove('selected'));
            method.classList.add('selected');
        },
        
        openFeaturedTier: function() {
            const featuredTier = this.tiers.find(tier => tier.isFeatured);
            if (featuredTier) {
                this.openModal(featuredTier);
            }
        },
        
        handleFormSubmission: function(e) {
            e.preventDefault();
            
            // Advanced Feature 28: Conditions - Complex form validation
            const formData = this.getFormData();
            const validation = this.validateForm(formData);
            
            if (!validation.isValid) {
                alert(validation.errors.join('\n'));
                return;
            }
            
            this.processSubscription(formData);
        },
        
        getFormData: function() {
            return {
                firstName: document.getElementById('first-name')?.value,
                lastName: document.getElementById('last-name')?.value,
                email: document.getElementById('email')?.value,
                terms: document.getElementById('terms')?.checked,
                paymentMethod: document.querySelector('.payment-method.selected')?.textContent?.trim()
            };
        },
        
        validateForm: function(data) {
            const errors = [];
            const required = ['firstName', 'lastName', 'email'];
            
            // Advanced Feature 29: Loops - Dynamic required field validation
            required.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
                }
            });
            
            if (!data.terms) {
                errors.push('You must accept the terms and conditions');
            }
            
            if (!data.paymentMethod) {
                errors.push('Please select a payment method');
            }
            
            if (data.email && !this.isValidEmail(data.email)) {
                errors.push('Please enter a valid email address');
            }
            
            return {
                isValid: errors.length === 0,
                errors: errors
            };
        },
        
        isValidEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        processSubscription: function(formData) {
            const submitBtn = this.elements.form.querySelector('.submit-subscription');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            // Simulate payment processing
            setTimeout(() => {
                this.handleSubscriptionSuccess();
                
                // Reset form
                this.elements.form.reset();
                this.elements.paymentMethods.forEach(m => m.classList.remove('selected'));
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
            }, 3000);
        },
        
        handleSubscriptionSuccess: function() {
            this.showSuccessMessage();
            this.triggerConfetti();
        },
        
        showSuccessMessage: function() {
            const modalContent = document.querySelector('.modal-content');
            if (!modalContent) return;
            
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
            modalContent.querySelector('.close-modal').addEventListener('click', () => this.closeModal());
        }
    };

    subscriptionManager.initialize();
}

function closeSubscriptionModal() {
    const subscriptionModal = document.querySelector('.subscription-modal');
    if (subscriptionModal) {
        subscriptionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Modal closed');
    }
}

function showSubscriptionSuccess() {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent) return;
    
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

// Live Updates Feed
function initLiveUpdates() {
    const updateFeed = document.querySelector('.update-feed');
    if (!updateFeed) return;
    
    console.log('Initializing live updates feed...');
    
    // Advanced Feature 30: Arrays - Update data management
    const updates = [
        {
            icon: '🎵',
            title: 'New Album Announcement',
            content: 'Cosmic Waves just announced their new album "Nebula Dreams" releasing next month!',
            time: '2 minutes ago',
            premium: false,
            id: 1,
            category: 'music'
        },
        {
            icon: '🌟',
            title: 'Exclusive Behind-the-Scenes',
            content: 'Get exclusive access to Galaxy Beats studio session footage (Premium Members Only)',
            time: '15 minutes ago',
            premium: true,
            id: 2,
            category: 'exclusive'
        },
        {
            icon: '🎬',
            title: 'Live Concert Streaming',
            content: 'Starlight Dream live concert streaming this Friday at 8 PM EST',
            time: '1 hour ago',
            premium: false,
            id: 3,
            category: 'event'
        },
        {
            icon: '💫',
            title: 'Artist Q&A Session',
            content: 'Join Nebula Voice for an exclusive Q&A session tomorrow (Premium Members Only)',
            time: '3 hours ago',
            premium: true,
            id: 4,
            category: 'interaction'
        },
        {
            icon: '📢',
            title: 'Platform Update',
            content: 'New features coming to Starlight+ next week including enhanced video streaming',
            time: '5 hours ago',
            premium: false,
            id: 5,
            category: 'platform'
        }
    ];
    
    // Advanced Feature 31: Objects & Methods - Update manager
    const updateManager = {
        allUpdates: [...updates],
        displayedUpdates: [],
        
        displayUpdates: function() {
            this.allUpdates.forEach(update => {
                this.createUpdateElement(update);
            });
        },
        
        createUpdateElement: function(update) {
            const updateItem = document.createElement('div');
            updateItem.className = 'update-item';
            updateItem.dataset.id = update.id;
            updateItem.dataset.category = update.category;
            updateItem.innerHTML = `
                <div class="update-icon">${update.icon}</div>
                <div class="update-content">
                    <h4>${update.title} ${update.premium ? '<span style="color: var(--violet); font-size: 0.8rem;">PREMIUM</span>' : ''}</h4>
                    <p>${update.content}</p>
                    <div class="update-time">${update.time}</div>
                </div>
            `;
            updateFeed.appendChild(updateItem);
            this.displayedUpdates.push(updateItem);
        },
        
        filterUpdates: function(category) {
            const filtered = category === 'all' 
                ? this.allUpdates 
                : this.allUpdates.filter(update => update.category === category);
            
            this.clearUpdates();
            filtered.forEach(update => this.createUpdateElement(update));
        },
        
        clearUpdates: function() {
            this.displayedUpdates.forEach(update => update.remove());
            this.displayedUpdates = [];
        },
        
        getUpdateCount: function() {
            return {
                total: this.allUpdates.length,
                premium: this.allUpdates.filter(u => u.premium).length,
                regular: this.allUpdates.filter(u => !u.premium).length
            };
        }
    };
    
    updateManager.displayUpdates();
    
    // Auto-scroll feed
    let scrollPosition = 0;
    const scrollInterval = setInterval(() => {
        if (scrollPosition < updateFeed.scrollHeight - updateFeed.clientHeight) {
            scrollPosition += 1;
            updateFeed.scrollTop = scrollPosition;
        } else {
            scrollPosition = 0;
            updateFeed.scrollTop = 0;
        }
    }, 50);
    
    console.log('Update Statistics:', updateManager.getUpdateCount());
}

// Real-time Update Simulation
function initUpdateSimulation() {
    const updateFeed = document.querySelector('.update-feed');
    if (!updateFeed) return;
    
    console.log('Starting real-time update simulation...');
    
    // Advanced Feature 32: Arrays - Dynamic update generation
    const updateTemplates = [
        {
            icon: '🔥',
            title: 'Trending Now',
            content: 'Fan artwork for Cosmic Waves is trending in the community gallery',
            time: 'Just now',
            premium: false,
            category: 'community'
        },
        {
            icon: '🎁',
            title: 'Exclusive Merch Drop',
            content: 'Limited edition collectibles available now for Premium members',
            time: 'Just now',
            premium: true,
            category: 'exclusive'
        },
        {
            icon: '📈',
            title: 'Voting Results',
            content: 'See the results for this week\'s fan favorite performance',
            time: 'Just now',
            premium: false,
            category: 'community'
        }
    ];
    
    let updateId = 100; // Start from high number to avoid conflicts
    
    // Add new updates periodically
    setInterval(() => {
        const randomTemplate = updateTemplates[Math.floor(Math.random() * updateTemplates.length)];
        const newUpdate = {
            ...randomTemplate,
            id: updateId++,
            time: 'Just now'
        };
        
        const updateItem = document.createElement('div');
        updateItem.className = 'update-item new-update';
        updateItem.style.animation = 'slideInUp 0.5s ease';
        updateItem.dataset.id = newUpdate.id;
        updateItem.dataset.category = newUpdate.category;
        updateItem.innerHTML = `
            <div class="update-icon">${newUpdate.icon}</div>
            <div class="update-content">
                <h4>${newUpdate.title} ${newUpdate.premium ? '<span style="color: var(--violet); font-size: 0.8rem;">PREMIUM</span>' : ''}</h4>
                <p>${newUpdate.content}</p>
                <div class="update-time">${newUpdate.time}</div>
            </div>
        `;
        
        updateFeed.insertBefore(updateItem, updateFeed.firstChild);
        
        // Advanced Feature 33: Conditions - Smart cleanup based on feed size
        const maxUpdates = 10;
        if (updateFeed.children.length > maxUpdates) {
            const oldestUpdate = updateFeed.lastElementChild;
            if (oldestUpdate && !oldestUpdate.classList.contains('pinned')) {
                updateFeed.removeChild(oldestUpdate);
            }
        }
        
    }, 15000); // Add new update every 15 seconds
}

// Confetti effect
function triggerConfetti() {
    const confettiCount = 100;
    const colors = ['#C9A7EB', '#6A00F4', '#8B37FF', '#A366FF'];
    
    // Advanced Feature 34: Loops - Confetti particle generation
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

// -----------------------------
// Utility Functions
// -----------------------------

// Add necessary animation styles
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
        
        .new-update {
            animation: slideInUp 0.5s ease;
        }
        
        /* Form validation styles */
        .form-group input:invalid {
            border-color: #ff4444;
        }
        
        .form-group input:valid {
            border-color: rgba(201, 167, 235, 0.3);
        }
        
        /* Fullscreen video styles */
        .video-fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .close-fullscreen {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-fullscreen:hover {
            background: rgba(201, 167, 235, 0.8);
            color: #000;
        }
        
        /* FAQ Styles */
        .faq-item {
            border: 1px solid rgba(201, 167, 235, 0.2);
            border-radius: 12px;
            margin-bottom: 16px;
            background: rgba(15, 15, 35, 0.6);
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .faq-item:hover {
            border-color: rgba(201, 167, 235, 0.4);
            transform: translateY(-2px);
        }

        .faq-question {
            padding: 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            border: none;
            width: 100%;
            text-align: left;
            color: inherit;
            font-family: inherit;
        }

        .faq-question h3 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
            color: #fff;
        }

        .faq-toggle {
            font-size: 1.5rem;
            font-weight: 300;
            color: var(--lilac);
            transition: transform 0.3s ease;
            min-width: 20px;
            text-align: center;
        }

        .faq-item.active .faq-toggle {
            transform: rotate(180deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .faq-answer p {
            padding: 0 20px 20px;
            margin: 0;
            color: var(--muted);
            line-height: 1.6;
        }

        /* Improve accessibility */
        .faq-question:focus {
            outline: 2px solid var(--lilac);
            outline-offset: 2px;
        }

        /* Specific styles for collectibles FAQ */
        .collectibles-faq .faq-item {
            background: rgba(15, 15, 35, 0.8);
            backdrop-filter: blur(10px);
        }

        .collectibles-faq .faq-question h3 {
            color: var(--lilac);
            font-family: 'Orbitron', sans-serif;
        }
        
        /* Notification form loading state */
        .notify-btn.loading .btn-text {
            display: none;
        }
        
        .notify-btn.loading .btn-loading {
            display: inline;
        }
        
        .btn-loading {
            display: none;
        }
        
        /* Slider button active states */
        .slider-btn.active {
            background: var(--lilac);
            color: var(--dark-bg);
        }
    `;
    
    // Only add if not already present
    if (!document.querySelector('#exclusive-updates-styles')) {
        style.id = 'exclusive-updates-styles';
        document.head.appendChild(style);
    }
}

// Performance monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page loaded in ${loadTime}ms`);
                
                // Log Core Web Vitals-like metrics
                if ('getEntriesByType' in performance) {
                    const paintEntries = performance.getEntriesByType('paint');
                    paintEntries.forEach(entry => {
                        console.log(`${entry.name}: ${entry.startTime}ms`);
                    });
                }
            }, 0);
        });
    }
}

// -----------------------------
// Main Initialization
// -----------------------------

document.addEventListener('DOMContentLoaded', function() {
    console.log('Starlight+ Page Loaded - Optimized Version');
    
    // Initialize common functionality
    initCommonFeatures();
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize video lazy loading with auto fullscreen
    initVideoLazyLoading();
    
    // Initialize enhanced slider
    initEnhancedSlider();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize collectibles features
    initCountdownTimer();
    initNotificationForm();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Check if we're on the exclusive updates page
    if (document.querySelector('.feature-header') || document.querySelector('.premium-subscription')) {
        initExclusiveUpdates();
    }
    
    // Add CSS for animations if not already present
    addAnimationStyles();
    
    // Initialize native fullscreen support
    setupNativeFullscreenSupport();
});

// Make closeSubscriptionModal globally accessible
window.closeSubscriptionModal = closeSubscriptionModal;
