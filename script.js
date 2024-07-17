const sections = document.querySelectorAll('section');
const timelineItems = document.querySelectorAll('.timeline-item');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

let currentSection = 0;

function updateSections() {
    sections.forEach((section, index) => {
        section.classList.remove('section-visible-left', 'section-visible-right', 'section-hidden-left', 'section-hidden-right');
        
        if (index === currentSection) {
            section.classList.add(index % 2 === 0 ? 'section-visible-left' : 'section-visible-right');
        } else if (index < currentSection) {
            section.classList.add(index % 2 === 0 ? 'section-hidden-left' : 'section-hidden-right');
        } else {
            section.classList.add(index % 2 === 0 ? 'section-hidden-right' : 'section-hidden-left');
        }
    });
    updateScrollIndicator();
}

function updateTimeline() {
    timelineItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSection);
    });
}

function updateScrollIndicator() {
    const indicators = document.querySelectorAll('.scroll-indicator div');
    indicators.forEach((indicator, index) => {
        if (index === currentSection) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

window.addEventListener('wheel', (event) => {
    const delta = event.deltaY;

    if (delta > 0 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (delta < 0 && currentSection > 0) {
        currentSection--;
    }

    updateSections();
    updateTimeline();
});

timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSection = index;
        updateSections();
        updateTimeline();
        modal.style.display = "block";
        // Add content dynamically based on the item clicked
    });
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelectorAll('.collapse-button').forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.classList.toggle('active');
    });
});

updateSections();
updateTimeline();
updateScrollIndicator();

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    document.querySelectorAll('.timeline-panel').forEach(panel => {
        panel.classList.toggle('dark-mode');
    });
});

// Interactive Chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
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

// Interactive Map
const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
