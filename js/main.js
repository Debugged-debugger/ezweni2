// ===== MAIN APPLICATION JS =====

// Load common components
function loadCommonComponents() {
    // Load header
    const headerHTML = `
        <header>
            <div class="container header-container">
                <div class="logo">
                    <div class="logo-text">Ezweni</div>
                    <div class="logo-subtext">Funerals (Pty) Ltd</div>
                </div>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="pre-planning.html">Pre-Planning</a></li>
                        <li><a href="blog.html">Our Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <div class="mobile-menu">
                        <i class="fas fa-bars"></i>
                    </div>
                </nav>
            </div>
        </header>
    `;
    
    // Load footer
    const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-container">
                    <div class="footer-col">
                        <h3>Ezweni Funerals</h3>
                        <p>Providing compassionate, dignified funeral services with respect for all traditions and cultures.</p>
                        <div class="social-links">
                            <a href="https://www.facebook.com/people/Ezweni-Funerals/61578321483864/#" class="social-link" target="_blank">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-col">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="services.html">Services</a></li>
                            <li><a href="pre-planning.html">Pre-Planning</a></li>
                            <li><a href="blog.html">Our Blog</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>Our Services</h3>
                        <ul>
                            <li><a href="services.html">Traditional Funerals</a></li>
                            <li><a href="services.html">Green Funerals</a></li>
                            <li><a href="services.html">Pre-Planning</a></li>
                            <li><a href="services.html">Grief Support</a></li>
                            <li><a href="services.html">Memorial Services</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>Contact Info</h3>
                        <ul>
                            <li><i class="fas fa-map-marker-alt"></i> 123 Memorial Drive, Johannesburg</li>
                            <li><i class="fas fa-phone"></i> +27 11 123 4567</li>
                            <li><i class="fas fa-envelope"></i> info@ezwenifunerals.co.za</li>
                            <li><i class="fas fa-clock"></i> 24/7 Availability</li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2023 Ezweni Funerals (Pty) Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    `;
    
    // Insert header and footer
    const headerElement = document.getElementById('header');
    const footerElement = document.getElementById('footer');
    
    if (headerElement) {
        headerElement.innerHTML = headerHTML;
    }
    
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
    
    // Initialize other functionality
    initMobileMenu();
    setActiveNavLink();
    initSmoothScrolling();
    initAnimations();
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenu && navUl) {
        mobileMenu.addEventListener('click', function() {
            navUl.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navUl.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navUl.contains(event.target) || mobileMenu.contains(event.target);
            if (!isClickInsideNav && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
            }
        });
    }
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for same-page anchors
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll animations
function initAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    function checkVisibility() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
}

// Counter animation for statistics
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => initCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will contact you shortly.');
            this.reset();
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCommonComponents();
    initContactForm();
    
    // Initialize counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const counterSection = document.querySelector('.counter');
    if (counterSection) {
        observer.observe(counterSection);
    }
});

// Make functions available globally
window.initCounters = initCounters;