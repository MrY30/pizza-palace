document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript file loaded");

    const progress = document.querySelector('.progress');
    let progressStep = 0;
    const totalSteps = 5;
    const sections = document.querySelectorAll('.slide-section');
    const nextButton = document.getElementById('next-page');
    const backButton = document.getElementById('back-page');

    function updateProgressBar() {
        const progressPercentage = ((progressStep + 1) / totalSteps) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    function showSection(step) {
        sections.forEach((section, index) => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        if (sections[step]) {
            sections[step].style.display = 'flex';
            sections[step].classList.add('active');
        }
    }

    nextButton.addEventListener('click', () => {
        if (progressStep < totalSteps - 1) {
            sections[progressStep].classList.add('slide-left');
            setTimeout(() => {
                sections[progressStep].style.display = 'none';
                progressStep += 1;
                updateProgressBar();
                showSection(progressStep);
            }, 300); // Matches CSS animation duration
        }
    });

    backButton.addEventListener('click', () => {
        if (progressStep > 0) {
            sections[progressStep].classList.add('slide-right');
            setTimeout(() => {
                sections[progressStep].style.display = 'none';
                progressStep -= 1;
                updateProgressBar();
                showSection(progressStep);
            }, 300); // Matches CSS animation duration
        }
    });

    showSection(progressStep);
    updateProgressBar();

    // Reference to the main pizza image
    const customPizza = document.getElementById("custom-pizza");
    const thickCrustOption = document.getElementById("thickCrustOption");
    const thinCrustOption = document.getElementById("thinCrustOption");

    function changeImageWithRotation(newSrc) {
        customPizza.classList.add('rotate');  // Add the rotate class

        setTimeout(() => {
            customPizza.src = newSrc;  // Change the image source
        }, 250);  // Timing for midway through the rotation

        setTimeout(() => {
            customPizza.classList.remove('rotate');  // Remove the rotate class after rotation is complete
        }, 500);  // Complete the rotation in 500ms
    }

    thickCrustOption.addEventListener("click", () => {
        console.log('Thick Crust option is selected');
        changeImageWithRotation('/img/ThickCrust.png');
    });

    thinCrustOption.addEventListener("click", () => {
        console.log("Thin Crust option selected");
        changeImageWithRotation('/img/ThinCrust.png');
    });
});
