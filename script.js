document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const indicators = document.querySelectorAll('.scroll-indicator div');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const loadingSpinner = document.getElementById('loading-spinner');

    let currentSection = 0;
    let isThrottled = false;

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Hide loading spinner when page is loaded
    window.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    function updateActiveSection() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = index;
                updateNavigation();
                updateScrollIndicator();
            }
        });
    }

    function updateNavigation() {
        navLinks.forEach((link, index) => {
            if (index === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function updateScrollIndicator() {
        indicators.forEach((indicator, index) => {
            if (index === currentSection) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    function smoothScroll(target) {
        const targetSection = document.querySelector(target);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', () => {
        if (!isThrottled) {
            window.requestAnimationFrame(() => {
                updateActiveSection();
                isThrottled = false;
            });
            isThrottled = true;
        }
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Initialize map
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Initialize chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['CAD Modeling', 'Problem Solving', 'Critical Thinking', 'Communication', 'Programming', 'Project Management'],
            datasets: [{
                label: 'Skills',
                data: [90, 85, 80, 75, 70, 80],
                backgroundColor: 'rgba(0, 170, 255, 0.2)',
                borderColor: 'rgba(0, 170, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });

    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('active'));
    document.addEventListener('mouseup', () => cursor.classList.remove('active'));

    document.querySelectorAll('a, button, .project-card, .timeline-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Project Modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.getElementsByClassName('close')[0];

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalDescription.textContent = card.querySelector('p').textContent;
            modal.style.display = 'block';
        });
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };

    // Collapsible Timeline
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Parallax Background
    const parallaxBg = document.createElement('div');
    parallaxBg.classList.add('parallax-bg');
    document.body.insertBefore(parallaxBg, document.body.firstChild);

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Animated SVG Icons (using GSAP)
    gsap.from('.skill i', {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#skills',
            start: 'top 80%',
        },
    });
});

    // Add scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
