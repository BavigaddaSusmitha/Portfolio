// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navMobileMenu = document.getElementById('navMobileMenu');
    const navMobileLinks = document.querySelectorAll('.nav-mobile-link');
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

    // Throttle function (FIX)
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Toggle mobile menu
    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navMobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMobileMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isInside = navToggle.contains(event.target) || navMobileMenu.contains(event.target);
        if (!isInside && navMobileMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMobileMenu.classList.remove('active');
        }
    });

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll background
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('.nav');
        nav.style.background = window.scrollY > 50
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(15, 23, 42, 0.8)';
    });

    // Section reveal animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = '0.6s ease';
        observer.observe(section);
    });

    // Project card hover
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
            card.style.borderColor = 'rgba(59,130,246,0.5)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.borderColor = '#334155';
        });
    });
    //Resume Download Button
    const downloadResumeBtn = document.getElementById('downloadResumeBtn');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = 'Susmitha_RESUME.pdf';      // resume file name
        link.download = 'Bavigadda_Susmitha_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
const viewWorkBtn = document.getElementById('viewWorkBtn');

if (viewWorkBtn) {
    viewWorkBtn.addEventListener('click', function () {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}


    // Parallax hero image (FIXED)
    window.addEventListener('scroll', throttle(() => {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && window.scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        }
    }, 16));

    // Typing effect
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        let i = 0;
        setTimeout(function type() {
            if (i < text.length) {
                heroName.textContent += text[i++];
                setTimeout(type, 100);
            }
        }, 1000);
    }

    // Social ripple effect (navigation still works)
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function () {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Project link click (FIXED & COMPLETED)
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function () {
            window.open(this.href, '_blank');
        });
    });
});
