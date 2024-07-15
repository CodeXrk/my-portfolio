document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll spy functionality
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.6
    };

    const sections = document.querySelectorAll('section');

let currentSection = 0;

function updateSections() {
    sections.forEach((section, index) => {
        section.classList.add('section-hidden');
        section.classList.remove('section-visible', 'section-left');
        
        if (index === currentSection) {
            section.classList.add('section-visible');
            section.classList.remove('section-hidden');
        } else if (index < currentSection) {
            section.classList.add('section-left');
        }
    });
}

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (event.deltaY < 0 && currentSection > 0) {
        currentSection--;
    }
    updateSections();
});

updateSections();


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.sidebar nav ul li a[href="#${entry.target.id}"]`).classList.add('active');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add click events for timeline panels
    document.querySelectorAll('.timeline-panel').forEach(panel => {
        panel.addEventListener('click', function() {
            panel.classList.toggle('active');
        });
    });

    document.querySelectorAll('.timeline-panel').forEach(panel => {
    panel.addEventListener('mouseover', function() {
        panel.classList.add('active');
    });
    panel.addEventListener('mouseout', function() {
        panel.classList.remove('active');
    });
    panel.addEventListener('click', function() {
        panel.classList.toggle('active');
    });


      // Add touch event listeners for mobile devices
    panel.addEventListener('touchstart', function() {
        panel.classList.add('active');
    });
    panel.addEventListener('touchend', function() {
        panel.classList.toggle('active');
    });

const sections = document.querySelectorAll('section');

let currentSection = 0;
let lastScrollTop = 0;

function updateSections() {
    sections.forEach((section, index) => {
        section.classList.remove('section-visible-left', 'section-visible-right', 'section-hidden-left', 'section-hidden-right');

        if (index === currentSection) {
            section.classList.add(index % 2 === 0 ? 'section-visible-left' : 'section-visible-right');
        } else {
            section.classList.add(index % 2 === 0 ? 'section-hidden-left' : 'section-hidden-right');
        }
    });
}

window.addEventListener('wheel', (event) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const delta = event.deltaY;

    if (delta > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (delta < 0 && currentSection > 0) {
        currentSection--;
    }

    updateSections();
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

updateSections();

    // Check if there's a hash in the URL and scroll to the corresponding section
    if (window.location.hash) {
        document.querySelector(window.location.hash).scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Scroll indicator
    const indicators = document.querySelectorAll('.scroll-indicator div');
    const updateScrollIndicator = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                indicators.forEach(indicator => indicator.classList.remove('active'));
                indicators[index].classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateScrollIndicator);

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelectorAll('.sidebar, button, .timeline-panel').forEach(el => {
            el.classList.toggle('dark-mode');
        });
    });

    // Loading spinner
    window.addEventListener('load', function() {
        document.getElementById('loading-spinner').style.display = 'none';
    });

    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('beforeunload', function() {
            document.getElementById('loading-spinner').style.display = 'block';
        });
    });

    // Modal window
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Leaflet.js
    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
});
