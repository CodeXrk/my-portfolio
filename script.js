document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const indicators = document.querySelectorAll('.scroll-indicator div');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Show loading spinner
    loadingSpinner.style.display = 'block';

    // Hide loading spinner when page is loaded
    window.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    function updateActiveSection() {
        const scrollPosition = window.pageYOffset;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));
                
                navLinks[index].classList.add('active');
                indicators[index].classList.add('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll event listener
    window.addEventListener('scroll', updateActiveSection);

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
});
