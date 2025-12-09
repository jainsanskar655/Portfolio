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


  // Form submit handling
  const form = document.querySelector('#contact-modal form');
  const submitBtn = form.querySelector('button[type="submit"]');
  const modalContent = document.querySelector('.modal-content');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    submitBtn.classList.add('btn-loading');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Prepare form data
    const formData = new FormData(form);

    // Send form data using fetch
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Success: Show thank you message
        modalContent.innerHTML = `
          <span class="close-btn" id="close-modal">&times;</span>
          <h2>Thank You!</h2>
          <p>Your message has been sent successfully. I'll get back to you soon.</p>
          <button class="btn btn-primary" id="close-thank-you">Close</button>
        `;

        // Reattach close functionality
        document.getElementById('close-modal').onclick = function() {
          modal.style.display = "none";
        };
        document.getElementById('close-thank-you').onclick = function() {
          modal.style.display = "none";
        };
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Error: Show error message
      submitBtn.classList.remove('btn-loading');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      alert('There was an error sending your message. Please try again.');
    });
  });
});
