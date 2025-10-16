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
