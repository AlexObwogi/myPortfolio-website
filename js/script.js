// script.js - Handles navbar, animations, form validation, etc.

// Navbar active link highlighting (to indicate current page)
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(link => link.classList.remove('active')); // Remove active class from all links
    link.classList.add('active'); // Add active class to the clicked link
  });
});

// Smooth scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

// Trigger animations when the elements are in the viewport (using Intersection Observer API)
const fadeInElements = document.querySelectorAll('.fade-in');
const slideInLeftElements = document.querySelectorAll('.slide-in-left');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in'); // Trigger fade-in animation
    }
  });
}, {
  threshold: 0.5, // Trigger when 50% of the element is in view
});

fadeInElements.forEach(element => observer.observe(element));

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in-left'); // Trigger slide-in animation
    }
  });
}, {
  threshold: 0.5,
});

slideInLeftElements.forEach(element => slideObserver.observe(element));

// Optional: Adjust navigation bar behavior on scroll (e.g., sticky navbar)
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
});

// Contact form validation (for the contact.html page)
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;
    
    // Basic validation
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

// Email validation function
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Scroll to top button
const scrollToTopButton = document.querySelector('#scroll-to-top');

if (scrollToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// Project gallery filter (if you have projects listed on a page)
const filterButtons = document.querySelectorAll('.filter-button');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterProjects(filter);
  });
});

function filterProjects(filter) {
  projectItems.forEach(item => {
    if (filter === 'all' || item.classList.contains(filter)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
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
