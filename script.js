document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal with stagger
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 150); // 150ms delay between elements
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    // Observe the services section for the image animation
    const servicesSection = document.getElementById('services');
    const servicesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            console.log('Services section intersection observed:', entry.isIntersecting); // ADDED
            if (entry.isIntersecting) {
                servicesSection.classList.add('is-visible');
                console.log('is-visible class added to services'); // ADDED
                servicesObserver.unobserve(servicesSection); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }

    // Mobile menu toggle (+ ARIA support)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('main-navigation');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            menuToggle.setAttribute('aria-expanded', navLinks.classList.contains('show'));
        });
    }

    // Smooth scrolling for nav links, logo, and buttons
    document.querySelectorAll('nav a[href^="#"], a.logo[href^="#"], a.btn[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetSection = document.getElementById(href.slice(1));
                if (targetSection) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 70;
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    // Close menu if open, and link is in navigation, on mobile
                    if (navLinks.classList.contains('show') && this.closest('nav ul')) {
                        navLinks.classList.remove('show');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Accordion behavior for FAQs
    const faqDetails = document.querySelectorAll('#faqs details');
    faqDetails.forEach((detail) => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                faqDetails.forEach((other) => {
                    if (other !== detail && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
});