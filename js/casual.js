// Magical Cursor
const cursor = document.querySelector('.magical-cursor');
const cursorSparkle = document.querySelector('.cursor-sparkle');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorSparkle.style.left = mouseX + 'px';
    cursorSparkle.style.top = mouseY + 'px';
    
    cursorTrail.style.left = cursorX + 'px';
    cursorTrail.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .magical-project, .service-flower, .skill-star');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorTrail.classList.add('hover');
        cursorSparkle.style.transform = 'translate(-50%, -50%) scale(2)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorTrail.classList.remove('hover');
        cursorSparkle.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.dreamy-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(200, 162, 200, 0.2)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.dreamy-text-block, .service-flower, .magical-project, .skill-star, .dreamy-card, .timeline-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Simulate form submission
    const submitBtn = this.querySelector('.magical-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending Magic...</span>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showSuccessModal();
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form labels
        document.querySelectorAll('.form-group label').forEach(label => {
            label.style.top = '1rem';
            label.style.fontSize = '1rem';
            label.style.color = 'var(--text-secondary)';
        });
    }, 2000);
});

function showSuccessModal() {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
        closeSuccessModal();
    }
});

// Magical button ripple effect
document.querySelectorAll('.magical-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .magical-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Skill stars interaction
document.querySelectorAll('.skill-star').forEach(star => {
    star.addEventListener('click', function() {
        this.style.transform = 'translateY(-10px) scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px) scale(1)';
        }, 150);
        
        // Add magical sparkle effect
        const sparkles = document.createElement('div');
        sparkles.innerHTML = '✨💫⭐🌟';
        sparkles.style.position = 'absolute';
        sparkles.style.top = '50%';
        sparkles.style.left = '50%';
        sparkles.style.transform = 'translate(-50%, -50%)';
        sparkles.style.fontSize = '2rem';
        sparkles.style.pointerEvents = 'none';
        sparkles.style.animation = 'sparkleExplode 1s ease-out forwards';
        
        this.appendChild(sparkles);
        
        setTimeout(() => {
            sparkles.remove();
        }, 1000);
    });
});

// Add sparkle explosion animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleExplode {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Service flower hover effects
document.querySelectorAll('.service-flower').forEach(flower => {
    flower.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        
        // Add magical glow
        this.style.boxShadow = '0 25px 50px rgba(147, 112, 219, 0.3)';
    });
    
    flower.addEventListener('mouseleave', function() {
        if (this.classList.contains('featured')) {
            this.style.transform = 'scale(1.05)';
        } else {
            this.style.transform = 'translateY(0) scale(1)';
        }
        this.style.boxShadow = 'var(--shadow-dreamy)';
    });
});

// Magical project 3D hover effects
document.querySelectorAll('.magical-project').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        item.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

// Floating elements animation
function createFloatingElement(emoji, container) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'absolute';
    element.style.fontSize = Math.random() * 20 + 15 + 'px';
    element.style.left = Math.random() * 100 + '%';
    element.style.top = '100%';
    element.style.pointerEvents = 'none';
    element.style.animation = `float ${Math.random() * 10 + 15}s linear infinite`;
    element.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 25000);
}

// Create floating elements periodically
const magicContainer = document.querySelector('.magic-container');
const floatingEmojis = ['💜', '🌸', '🦋', '⭐', '✨', '💫', '🌙', '🌺', '💖'];

setInterval(() => {
    const randomEmoji = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    createFloatingElement(randomEmoji, magicContainer);
}, 3000);

// Parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for gradient orbs
    const orbs = document.querySelector('.gradient-orbs');
    if (orbs) {
        orbs.style.transform = `translateY(${scrolled * -0.3}px)`;
    }
    
    // Parallax for floating petals
    const petals = document.querySelector('.floating-petals');
    if (petals) {
        petals.style.transform = `translateY(${scrolled * -0.5}px)`;
    }
    
    // Avatar rotation on scroll
    const avatar = document.querySelector('.magical-avatar');
    if (avatar) {
        avatar.style.transform = `rotate(${scrolled * 0.05}deg)`;
    }
});

// Enhanced scroll animations with stagger effect
const animateElements = document.querySelectorAll('.fade-in');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => {
    staggerObserver.observe(el);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSuccessModal();
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background
    const nav = document.querySelector('.dreamy-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(200, 162, 200, 0.2)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.9)';
        nav.style.boxShadow = 'none';
    }
    
    // Parallax effects
    const scrolled = window.pageYOffset;
    const orbs = document.querySelector('.gradient-orbs');
    const petals = document.querySelector('.floating-petals');
    const avatar = document.querySelector('.magical-avatar');
    
    if (orbs) {
        orbs.style.transform = `translateY(${scrolled * -0.3}px)`;
    }
    
    if (petals) {
        petals.style.transform = `translateY(${scrolled * -0.5}px)`;
    }
    
    if (avatar) {
        avatar.style.transform = `rotate(${scrolled * 0.05}deg)`;
    }
}, 16));

// Initialize animations on load
window.addEventListener('load', () => {
    // Add entrance animations
    document.querySelector('.hero-content').style.opacity = '1';
    
    // Start magical animations
    const sparkles = document.querySelector('.magical-sparkles');
    if (sparkles) {
        sparkles.style.animation = 'sparkle 20s linear infinite';
    }
    
    // Initialize floating elements
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const randomEmoji = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
                createFloatingElement(randomEmoji, magicContainer);
            }, i * 1000);
        }
    }, 2000);
    
    console.log('✨ Yessi Sitanggang Portfolio loaded successfully! Ready to create magic! 🦋');
});

// Preload critical images
const criticalImages = [
    '/placeholder.svg?height=300&width=300',
    '/placeholder.svg?height=400&width=600'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add magical touch interactions for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = touch.clientX + 'px';
        sparkle.style.top = touch.clientY + 'px';
        sparkle.style.fontSize = '1.5rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkleTouch 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    });
    
    // Add touch sparkle animation
    const touchStyle = document.createElement('style');
    touchStyle.textContent = `
        @keyframes sparkleTouch {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(2) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(touchStyle);
}

// Tambahkan sebelum </body> atau di script.js

// Ambil semua elemen portfolio-item
const items = document.querySelectorAll('.magical-project');
let current = 0;

// Fungsi untuk pindah sinyal ke item berikutnya
function cycleHighlight() {
  // Hapus highlight dari yang sebelumnya
  items[current].classList.remove('highlight');
  // Hitung index berikutnya (loop)
  current = (current + 1) % items.length;
  // Tambah kelas highlight
  items[current].classList.add('highlight');
}

// Mulai cycle setiap 3 detik
setInterval(cycleHighlight, 3000);

// Inisialisasi highlight pertama kali
items[current].classList.add('highlight');
