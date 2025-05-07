// === script.js ===
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll, .fade-in, .slide-in");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Optional: stops observing once visible
        }
      });
    }, {
      threshold: 0.1
    });
  
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
  
    // Project gallery filter
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        projectItems.forEach(item => {
          item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
        });
      });
    });
  
    // Mobile navbar toggle
    const mobileMenuIcon = document.querySelector('#mobile-menu-icon');
    const mobileMenu = document.querySelector('.nav-links');
    if (mobileMenuIcon) {
      mobileMenuIcon.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuIcon.classList.toggle('active');
      });
    }
  
    // Contact form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();
  
        if (!name || !email || !message) {
          alert('Please fill out all fields!');
          return;
        }
        if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        alert('Thank you for your message!');
        contactForm.reset();
      });
    }
  
    function validateEmail(email) {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(email).toLowerCase());
    }
  });
  