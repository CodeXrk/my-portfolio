function loadContent(section) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `sections/${section}.html`, true);
    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById('content').innerHTML = this.responseText;
            if (section === 'experience' || section === 'projects') {
                addTimelineClickEvents();
            }
        }
    };
    xhr.send();
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
    loadContent('home');
});