// Setup year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* =======================================
   CUSTOM CURSOR LOGIC
======================================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run cursor code if the user is not on a touch device
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate Dot instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate Outline with slight delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const iteractables = document.querySelectorAll('a, button, .btn, .hamburger');
    iteractables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

/* =======================================
   MOBILE NAVIGATION TOGGLE
======================================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

function toggleMenu() {
    navLinks.classList.toggle('active');
    
    // Toggle hamburger icon animation
    const bars = hamburger.querySelectorAll('.bar');
    if(navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

/* =======================================
   NAVBAR BACKGROUND ON SCROLL & ACTIVE LINKS
======================================= */
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');

function handleScroll() {
    // Add glass background when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current) && current !== '') {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', handleScroll);

/* =======================================
   SCROLL REVEAL ANIMATIONS
======================================= */
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100; // when to start reveal
        
        if (elementTop < windowHeight - elementVisible) {
            // Check for staggered delays
            const delay = reveals[i].getAttribute('data-delay');
            if(delay) {
                setTimeout(() => {
                    reveals[i].classList.add('active');
                    
                    // Specific trigger for skill bars when they reveal
                    if (reveals[i].classList.contains('skill-category')) {
                        const progressBars = reveals[i].querySelectorAll('.progress');
                        progressBars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-width');
                        });
                    }
                }, parseInt(delay));
            } else {
                reveals[i].classList.add('active');
                
                // Specific trigger for skill bars when they reveal
                if (reveals[i].classList.contains('skill-category')) {
                    const progressBars = reveals[i].querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            }
        }
    }
}

// Initial trigger
window.addEventListener('scroll', revealElements);
// Trigger once on load
setTimeout(revealElements, 100);

/* =======================================
   CONTACT FORM HANDLING
======================================= */
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple UI feedback
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Sending...`;
        
        // Simulate network request
        setTimeout(() => {
            btn.style.background = '#10b981'; // Green success color
            btn.innerHTML = `<i class='bx bx-check'></i> Message Sent!`;
            contactForm.reset();
            
            // Revert back
            setTimeout(() => {
                btn.style.background = '';
                btn.innerHTML = originalText;
            }, 3000);
            
        }, 1500);
    });
}
