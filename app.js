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

/* =======================================
   3D WIREFRAME CANVAS ANIMATION
======================================= */
const canvas = document.getElementById('wireframeCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    const rows = 35;
    const cols = 35;
    const spacing = 70;
    let time = 0;

    function draw() {
        ctx.fillStyle = '#0a0f1c'; 
        ctx.fillRect(0, 0, width, height);

        time += 0.015;

        const offsetX = width / 2;
        const offsetY = height / 2 + 100;

        ctx.lineWidth = 1;

        const points = [];
        for (let i = 0; i < rows; i++) {
            points[i] = [];
            for (let j = 0; j < cols; j++) {
                let x = (j - cols / 2) * spacing;
                let z = i * spacing;
                let distance = Math.sqrt(x*x + z*z);
                let y = Math.sin(distance * 0.005 - time * 2) * 120 + Math.cos(x * 0.01 + time) * 50;

                let scale = 900 / (900 + z); 
                let px = offsetX + x * scale;
                let py = offsetY + y * scale - z * scale * 0.4;
                
                points[i][j] = { px, py };
            }
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        for (let i = 0; i < rows; i++) {
            ctx.beginPath();
            for (let j = 0; j < cols; j++) {
                let p = points[i][j];
                if (j === 0) ctx.moveTo(p.px, p.py);
                else ctx.lineTo(p.px, p.py);
            }
            ctx.stroke();
        }

        for (let j = 0; j < cols; j++) {
            ctx.beginPath();
            for (let i = 0; i < rows; i++) {
                let p = points[i][j];
                if (i === 0) ctx.moveTo(p.px, p.py);
                else ctx.lineTo(p.px, p.py);
            }
            ctx.stroke();
        }

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (i % 2 === 0 && j % 2 === 0) {
                    let p = points[i][j];
                    ctx.fillStyle = 'rgba(0, 255, 100, 0.8)';
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = 'rgba(0, 255, 100, 1)';
                    ctx.beginPath();
                    ctx.arc(p.px, p.py, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }
        }

        requestAnimationFrame(draw);
    }
    
    draw();
}
