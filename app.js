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

// Infinite Typewriter Animation
document.addEventListener('DOMContentLoaded', function () {
    const typewriterElements = document.querySelectorAll('.typewriter-text');

    function startInfiniteTypewriter(element, delay = 0) {
        const text = element.getAttribute('data-text') || element.textContent.trim();
        const typeSpeed = 100; // milliseconds per character when typing
        const eraseSpeed = 50; // milliseconds per character when erasing
        const pauseTime = 2000; // pause time after typing complete
        const eraseDelay = 1000; // delay before starting to erase
        
        // Store original text and clear element
        element.setAttribute('data-original-text', text);
        element.textContent = '';
        element.classList.add('typing');

        function typeText() {
            let i = 0;
            const typeInterval = setInterval(() => {
                element.textContent = text.slice(0, i + 1);
                i++;

                if (i > text.length) {
                    clearInterval(typeInterval);
                    // Pause before erasing
                    setTimeout(() => {
                        eraseText();
                    }, pauseTime);
                }
            }, typeSpeed);
        }

        function eraseText() {
            let i = text.length;
            const eraseInterval = setInterval(() => {
                element.textContent = text.slice(0, i - 1);
                i--;

                if (i <= 0) {
                    clearInterval(eraseInterval);
                    // Pause before typing again
                    setTimeout(() => {
                        typeText();
                    }, eraseDelay);
                }
            }, eraseSpeed);
        }

        // Start the infinite loop after initial delay
        setTimeout(() => {
            typeText();
        }, delay);
    }

    // Start infinite typewriter animations
    if (typewriterElements.length > 0) {
        typewriterElements.forEach((element, index) => {
            const delay = parseInt(element.getAttribute('data-delay')) || 800;
            startInfiniteTypewriter(element, delay);
        });
    }
});

// Intersection Observer for typewriter on scroll (for about page)
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('about-text')) {
                const paragraphs = entry.target.querySelectorAll('p');
                paragraphs.forEach((p, index) => {
                    if (!p.classList.contains('typewriter-animated')) {
                        p.classList.add('typewriter-animated');
                        animateTextReveal(p, index * 800);
                    }
                });
            }
        });
    }, observerOptions);

    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        observer.observe(aboutText);
    }
});

// Text reveal animation for about section
function animateTextReveal(element, delay) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    setTimeout(() => {
        let i = 0;
        const revealInterval = setInterval(() => {
            element.textContent = text.slice(0, i + 1);
            i++;

            if (i >= text.length) {
                clearInterval(revealInterval);
            }
        }, 30);
    }, delay);
}

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