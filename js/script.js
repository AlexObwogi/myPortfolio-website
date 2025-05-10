document.addEventListener("DOMContentLoaded", () => {
  // Animate elements on scroll
  const animatedElements = document.querySelectorAll(".animate-on-scroll, .fade-in, .slide-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));

  // Navbar active link highlighting
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(link => link.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Sticky navbar on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });

  // Scroll to top button
  const scrollToTopButton = document.querySelector('#scroll-to-top');
  if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
      scrollToTopButton.classList.toggle('show', window.scrollY > 200);
    });
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile navbar toggle
  const mobileMenuIcon = document.querySelector('#mobile-menu-icon');
  const mobileMenu = document.querySelector('.nav-links');
  if (mobileMenuIcon) {
    mobileMenuIcon.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuIcon.classList.toggle('active');
    });
  }

  // Contact form validation and submission
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission

      const name = document.querySelector('#name').value.trim();
      const email = document.querySelector('#email').value.trim();
      const message = document.querySelector('#message').value.trim();
      const submitButton = document.querySelector('.btn-primary');

      // Basic validation
      if (!name || !email || !message) {
        displayNotification('Please fill out all fields!', 'error');
        return;
      }

      if (!validateEmail(email)) {
        displayNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Disable submit button during form submission
      submitButton.disabled = true;

      try {
        // Send data to the backend
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });

        // Re-enable submit button after submission
        submitButton.disabled = false;

        if (response.ok) {
          displayNotification('Thank you for your message!', 'success');
          contactForm.reset(); // Reset the form on success
        } else {
          const errorData = await response.json();
          displayNotification(`Error: ${errorData.message || 'Unknown error occurred'}`, 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        submitButton.disabled = false;
        displayNotification('Could not reach the server. Please try again later.', 'error');
      }
    });
  }

  // Email validation regex
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  // Function to display notifications
  function displayNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
});
