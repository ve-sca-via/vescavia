// ==========================================
// VESCAVIA - CREATIVE DIGITAL AGENCY
// Bold. Creative. Unique.
// ==========================================

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;
let hasMoved = false;

// Hide cursor initially
if (cursorDot) cursorDot.style.opacity = '0';
if (cursorOutline) cursorOutline.style.opacity = '0';

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursor on first movement
    if (!hasMoved) {
        hasMoved = true;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorOutline) cursorOutline.style.opacity = '1';
        outlineX = mouseX;
        outlineY = mouseY;
    }
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
});

function animateCursor() {
    if (hasMoved) {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        if (cursorOutline) {
            cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        }
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Navbar transparency on scroll
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Cursor hover effects
document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.width = '16px';
        if (cursorDot) cursorDot.style.height = '16px';
        if (cursorOutline) cursorOutline.style.width = '60px';
        if (cursorOutline) cursorOutline.style.height = '60px';
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.width = '8px';
        if (cursorDot) cursorDot.style.height = '8px';
        if (cursorOutline) cursorOutline.style.width = '40px';
        if (cursorOutline) cursorOutline.style.height = '40px';
    });
});

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Dynamic Text Animation
const dynamicText = document.getElementById('dynamicText');
if (dynamicText) {
    const words = [
        'DIGITAL MAGIC',
        'BOLD BRANDS',
        'CREATIVE STORIES',
        'EPIC CAMPAIGNS',
        'WEB EXPERIENCES'
    ];
    let currentIndex = 0;

    function changeWord() {
        dynamicText.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % words.length;
            dynamicText.textContent = words[currentIndex];
            dynamicText.style.opacity = '1';
        }, 300);
    }

    setInterval(changeWord, 3000);
}

// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// Mega Dropdown Image Switching
document.addEventListener('DOMContentLoaded', () => {
    const dropdownLinks = document.querySelectorAll('.dropdown-links a');
    const dropdownImages = document.querySelectorAll('.dropdown-image img');
    const dropdownDescription = document.querySelector('.dropdown-description');
    
    dropdownLinks.forEach((link, index) => {
        link.addEventListener('mouseenter', () => {
            // Hide all images
            dropdownImages.forEach(img => img.style.opacity = '0');
            // Show the corresponding image
            if (dropdownImages[index]) {
                dropdownImages[index].style.opacity = '1';
            }
            // Update description text
            const description = link.getAttribute('data-description');
            if (dropdownDescription && description) {
                dropdownDescription.textContent = description;
            }
        });
    });
    
    // Show first image and description by default
    if (dropdownImages[0]) {
        dropdownImages[0].style.opacity = '1';
    }
    if (dropdownDescription && dropdownLinks[0]) {
        const firstDescription = dropdownLinks[0].getAttribute('data-description');
        if (firstDescription) {
            dropdownDescription.textContent = firstDescription;
        }
    }
});

// Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const duration = 2000;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + (target === 98 ? '%' : '+');
                    clearInterval(counter);
                } else {
                    entry.target.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
                }
            }, stepTime);

            countObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(num => countObserver.observe(num));

// Parallax Effect for Hero Video
const heroVideo = document.querySelector('.hero-video');

if (heroVideo) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// Service Cards Tilt Effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Form Steps (for contact page)
const formSteps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const progressSteps = document.querySelectorAll('.progress-step');
let currentStep = 0;

if (nextBtns.length > 0) {
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateForm();
            }
        });
    });
}

if (prevBtns.length > 0) {
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateForm();
        });
    });
}

function updateForm() {
    formSteps.forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    progressSteps.forEach((step, index) => {
        if (index <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function validateStep(step) {
    const currentStepElement = formSteps[step];
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#1F1F1F';
        }
    });

    return isValid;
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
