document.addEventListener("DOMContentLoaded", function() {
    // Load Education Component
    fetch("education.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("education").innerHTML = data;
        });

    // Load Experience Component
    fetch("experience.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("experience").innerHTML = data;
        });

    // Load Projects Component
    fetch("projects.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("projects").innerHTML = data;
        });
});
