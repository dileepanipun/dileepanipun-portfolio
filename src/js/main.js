$(document).ready(function() {
    // Custom cursor elements
    const cursor = {
        dot: document.querySelector('.custom-cursor-dot'),
        text: document.querySelector('.custom-cursor-text'),
        wrapper: document.querySelector('.custom-cursor')
    };

    // Initialize cursor position
    let cursorX = 0;
    let cursorY = 0;
    let targetX = 0;
    let targetY = 0;

    // Update cursor position smoothly
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    // Smooth animation function with adjusted easing
    function updateCursor() {
        const ease = 1; // Increased from 0.25 to 0.35 for more realistic movement
        
        cursorX += (targetX - cursorX) * ease;
        cursorY += (targetY - cursorY) * ease;

        if (cursor.dot) {
            cursor.dot.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        
        if (cursor.text) {
            cursor.text.style.transform = `translate(${cursorX + 25}px, ${cursorY}px)`;
        }

        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Cursor interactions
    const clickableElements = 'a, button, input[type="submit"], .clickable';

    $(clickableElements).hover(
        function() {
            cursor.wrapper.classList.add('clickable');
            const text = $(this).data('cursor-text') || 'Click';
            cursor.text.textContent = text;
        },
        function() {
            cursor.wrapper.classList.remove('clickable');
        }
    );

    // Hide cursor when leaving window
    $(window).on('mouseleave', function() {
        cursor.wrapper.classList.add('hidden');
    });

    $(window).on('mouseenter', function() {
        cursor.wrapper.classList.remove('hidden');
    });

    // Header scroll effect
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // Mobile menu
    $('.menu-button').click(function() {
        $('.mobile-menu').addClass('active');
    });

    $('.close-button').click(function() {
        $('.mobile-menu').removeClass('active');
    });

    // Close mobile menu on link click
    $('.mobile-menu .nav-links a').click(function() {
        $('.mobile-menu').removeClass('active');
    });

    // Your JavaScript/jQuery code here
    console.log('Website loaded!');

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
        observer.observe(card);
        card.classList.add('reveal-on-scroll');
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
        title.classList.add('reveal-on-scroll');
    });
}); 