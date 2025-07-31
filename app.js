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
        if (themeIcon) {
            themeIcon.style.transform = 'rotate(180deg)';
        }
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        // Update icon rotation and save preference
        if (body.classList.contains('dark-theme')) {
            if (themeIcon) {
                themeIcon.style.transform = 'rotate(180deg)';
            }
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIcon) {
                themeIcon.style.transform = 'rotate(0deg)';
            }
            localStorage.setItem('theme', 'light');
        }
    });
});

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    emailjs.init("obL0CmcIlU-7DcNXD"); // Replace with your actual EmailJS public key
})();

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

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                reply_to: email,
                subject: subject,
                message: message,
                to_email: 'mustafahusaini754@gmail.com', // Your email address
                sender_info: `${name} (${email})` // Combined sender info for easy viewing
            };

            // Send email using EmailJS
            emailjs.send('service_nb0asub', 'template_t1c0h87', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
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

// Simple Typewriter Animation (Name Only)
document.addEventListener('DOMContentLoaded', function () {
    const nameElement = document.querySelector('.hero-title.typewriter-text');
    
    if (nameElement) {
        const text = nameElement.getAttribute('data-text') || nameElement.textContent.trim();
        const typeSpeed = 100; // milliseconds per character when typing
        
        // Store original text and clear element
        nameElement.textContent = '';
        nameElement.classList.add('typing');

        function typeText() {
            let i = 0;
            const typeInterval = setInterval(() => {
                nameElement.textContent = text.slice(0, i + 1);
                i++;

                if (i > text.length) {
                    clearInterval(typeInterval);
                    // Remove typing class to stop cursor blinking after completion
                    setTimeout(() => {
                        nameElement.classList.remove('typing');
                    }, 1000);
                }
            }, typeSpeed);
        }

        // Start typing after a delay
        setTimeout(() => {
            typeText();
        }, 800);
    }
});

// Simple fade-in animation for about page
document.addEventListener('DOMContentLoaded', function () {
    const aboutText = document.querySelector('.about-text');
    
    if (aboutText) {
        // Add animation class to enable the fade effect
        aboutText.classList.add('animate-on-scroll');
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('about-text')) {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        if (!p.classList.contains('fade-animated')) {
                            setTimeout(() => {
                                p.classList.add('fade-animated');
                            }, index * 200);
                        }
                    });
                }
            });
        }, observerOptions);

        observer.observe(aboutText);
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