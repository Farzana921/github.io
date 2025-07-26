// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        // Update icon and save preference
        if (body.classList.contains('dark-theme')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for page transitions
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';

        setTimeout(() => {
            mainContent.style.transition = 'all 0.6s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Add active class management
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileMenuToggle && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }
    });
});