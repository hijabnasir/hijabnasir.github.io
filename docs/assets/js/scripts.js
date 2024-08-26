document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for the Education link
    const educationLink = document.querySelector('nav ul li a[href="education.html"]');
    const educationSection = document.getElementById('education');

    educationLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        educationSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the education section
    });

    // Existing project card animation code
    const projectCards = document.querySelectorAll('.project-card');

    if (typeof window.framerMotion !== 'undefined') {
        const { motion } = window.framerMotion;

        const animation = {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { 
                opacity: 1, 
                scale: 1,
                transition: { duration: 0.5, ease: "easeInOut" }
            }
        };

        const startAnimation = () => {
            projectCards.forEach((card, index) => {
                motion(card).start({
                    ...animation.visible,
                    transition: {
                        delay: index * 0.2, // Staggered delay for each card
                        duration: 0.5,
                        ease: "easeInOut"
                    }
                });
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });

        if (projectCards.length > 0) {
            observer.observe(projectCards[0]);
        }
    }

    // Modal handling and other event listeners remain unchanged
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    const modalContent = document.getElementById('modal-project-content');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            loadProjectDetails(project);
            modal.style.display = "block";
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = "none";
        modalContent.innerHTML = '';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalContent.innerHTML = '';
        }
    });

    function loadProjectDetails(project) {
        const projectFileMap = {
            'p6': 'projects/p6.html',
            'machineLearning': 'projects/machineLearning.html',
            'p5': 'projects/p5.html',
            'P4': 'projects/P4.html',
            'P3': 'projects/P3.html',
            'CapstoneProject': 'projects/CapstoneProject.html',
        };

        if (projectFileMap[project]) {
            fetch(projectFileMap[project])
                .then(response => response.text())
                .then(data => {
                    modalContent.innerHTML = data;
                })
                .catch(error => {
                    modalContent.innerHTML = `<p>Project details could not be loaded. Please try again later.</p>`;
                });
        } else {
            modalContent.innerHTML = `<p>The project you're looking for doesn't exist.</p>`;
        }
    }
});

