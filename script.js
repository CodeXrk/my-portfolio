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
});
