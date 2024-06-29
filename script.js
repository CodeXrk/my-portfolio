function loadContent(section) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `sections/${section}.html`, true);
    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById('content').innerHTML = this.responseText;
        }
    };
    xhr.send();
}

// Load the home section by default
document.addEventListener('DOMContentLoaded', function() {
    loadContent('home');
});
