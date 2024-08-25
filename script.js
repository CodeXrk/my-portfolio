document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    const nightModeToggle = document.getElementById('night-mode-toggle');
    const pulleyIndicator = document.getElementById('pulley-indicator');
    const sections = document.querySelectorAll('.parallax');

    // Custom cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Night mode toggle
    nightModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('night-mode');
        nightModeToggle.innerHTML = document.body.classList.contains('night-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });

    // Pulley indicator
    function createPulleyIndicator() {
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('pulley-dot');
            dot.style.top = `${(index / (sections.length - 1)) * 100}%`;
            pulleyIndicator.appendChild(dot);
        });
    }
    createPulleyIndicator();

    // Parallax effect and section transitions
    function handleScroll() {
        const scrollPosition = window.pageYOffset;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                section.style.backgroundPositionY = `${(scrollPosition - sectionTop) * 0.5}px`;
                document.querySelectorAll('.pulley-dot')[index].classList.add('active');
            } else {
                document.querySelectorAll('.pulley-dot')[index].classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
