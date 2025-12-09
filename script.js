// Fade-up animation
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach(el => observer.observe(el));


  // Animate skill bars
  const bars = document.querySelectorAll(".skill-bar");
  const skillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const val = bar.getAttribute("data-value");
          bar.style.width = val + "%";
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach(bar => skillObserver.observe(bar));


  // Modal functionality
  const modal = document.getElementById("contact-modal");
  const btn = document.getElementById("contact-btn");
  const closeBtn = document.getElementById("close-modal");

  btn.onclick = function() {
    modal.style.display = "block";
  }

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


  // Lazy loading for images
  const lazyImages = document.querySelectorAll('img.lazy');
  const skeletonGrids = document.querySelectorAll('.gallery-grid');

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Simulate loading delay and show real images
    setTimeout(() => {
      skeletonGrids[0].style.display = 'none';
      skeletonGrids[1].style.display = 'grid';
    }, 2000); // 2 second delay for demo
  }


  // Form submit loading state
  const form = document.querySelector('#contact-modal form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function(e) {
    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  });
});
