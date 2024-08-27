document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sections = document.querySelectorAll('.parallax-section');
    const gearBelt = document.querySelector('.gear-belt-indicator');
    const topGear = document.querySelector('.top-gear');
    const bottomGear = document.querySelector('.bottom-gear');
    const belt = document.querySelector('.belt');
    const navLinks = document.querySelectorAll('.nav-link');
    const loadingSpinner = document.getElementById('loading-spinner');

    let currentSection = 0;
    let isThrottled = false;

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Hide loading spinner when page is loaded
    window.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    // Custom Cursor
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Pulley Indicator
    function updateGearBelt() {
        if (!gearBelt || !topGear || !bottomGear || !belt) return;
        
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const rotation = scrollPercentage * 360;
        
        topGear.style.transform = `rotate(${rotation}deg)`;
        bottomGear.style.transform = `rotate(-${rotation}deg)`;
        
        const beltOffset = scrollPercentage * belt.offsetHeight;
        belt.style.backgroundPosition = `0 ${beltOffset}px`;
    }

    window.addEventListener('scroll', () => {
        if (!isThrottled) {
            window.requestAnimationFrame(() => {
                updateGearBelt();
                updateActiveSection();
                // ... (keep any other existing scroll-related functions)
                isThrottled = false;
            });
            isThrottled = true;
        }
    })

    // Update active section
    function updateActiveSection() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = index;
                updateNavigation();
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

    // Parallax Effect
    sections.forEach((section) => {
        gsap.to(section, {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Project and Experience Sliders
    const sliders = document.querySelectorAll('.project-slider, .experience-slider');
    sliders.forEach((slider) => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Skills Animation
    const skills = [
        { name: 'CAD Modeling', level: 90 },
        { name: 'Problem Solving', level: 85 },
        { name: 'Critical Thinking', level: 80 },
        { name: 'Communication', level: 85 },
        { name: 'Programming', level: 75 },
        { name: 'Project Management', level: 80 }
    ];

    const skillsGrid = document.querySelector('.skills-grid');

    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill';
        skillElement.innerHTML = `
            <h3>${skill.name}</h3>
            <div class="skill-bar">
                <div class="skill-level" style="width: 0%"></div>
            </div>
        `;
        skillsGrid.appendChild(skillElement);

        gsap.to(skillElement.querySelector('.skill-level'), {
            width: `${skill.level}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: skillElement,
                start: 'top 80%'
            }
        });
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
                data: [90, 85, 80, 85, 75, 80],
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

    // Initialize animations
    function init() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.parallax-section').forEach((section, i) => {
            gsap.fromTo(section, 
                { y: i % 2 === 0 ? '100' : '-100', opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1
                    }
                }
            );
        });
    }

    // Run initialization
    init();
});
