document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('custom-cursor');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sections = document.querySelectorAll('.parallax-section');
    const pulleyRope = document.querySelector('.pulley-rope');

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
    function updatePulley() {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const ropeHeight = pulleyRope.offsetHeight;
        const wheelPosition = scrollPercentage * ropeHeight;
        gsap.to('.pulley-wheel', { y: wheelPosition, duration: 0.3 });
    }

    window.addEventListener('scroll', updatePulley);

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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
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
