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