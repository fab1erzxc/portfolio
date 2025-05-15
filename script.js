document.addEventListener('DOMContentLoaded', function () {

    // Update year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // IntersectionObserver for section scroll animations
    const sections = document.querySelectorAll('.content-section');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Project card 3D tilt animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const maxRotate = 8;
            const rotateX = (y - rect.height / 2) / (rect.height / 2) * -maxRotate;
            const rotateY = (x - rect.width / 2) / (rect.width / 2) * maxRotate;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Active navigation link on scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    const pageSections = document.querySelectorAll('main section[id]');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 2.5) {
                currentSectionId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    });

    // Typing effect for H1 with cursor
    const typingEffect = (element, text, speed = 120, cursorChar = '|') => {
        let i = 0;
        const cursorSpan = `<span class="typing-cursor">${cursorChar}</span>`;

        element.innerHTML = cursorSpan; // Start with only the cursor

        const type = () => {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + cursorSpan;
                i++;
                setTimeout(type, speed);
            } else {
                // Typing finished, keep cursor blinking at the end
                element.innerHTML = text + cursorSpan;
            }
        };
        // Start typing after a brief moment to ensure cursor is visible first
        setTimeout(type, speed * 0.5);
    };

    const h1Title = document.querySelector('#hero h1');
    if (h1Title) {
        const originalText = h1Title.textContent.trim(); // Get text from HTML and trim whitespace
        h1Title.textContent = ''; // Clear existing text content before starting animation

        setTimeout(() => {
            typingEffect(h1Title, originalText, 100);
        }, 500); // 500ms delay before typing starts
    }
});