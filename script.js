function loadContent(section) {
    document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.sidebar nav ul li a[href="#${section}"]`).classList.add('active');
    
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.querySelector(`#${section}`).style.display = 'block';

    window.location.hash = section;
}

function addScrollSpy() {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.6
    };

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
}

function addTimelineClickEvents() {
    const timelinePanels = document.querySelectorAll('.timeline-panel');
    timelinePanels.forEach(panel => {
        panel.addEventListener('click', function() {
            panel.classList.toggle('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.querySelector('#home').style.display = 'block';
    addScrollSpy();
    addTimelineClickEvents();
});
