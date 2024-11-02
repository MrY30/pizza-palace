document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript file loaded");

    const progress = document.querySelector('.progress');
    let progressStep = 0;
    const totalSteps = 4;

    const sizes = document.getElementById("sizes");
    const crusts = document.getElementById("crusts");
    const toppings = document.getElementById("toppings");
    const slices = document.getElementById("slices");

    function updateProgressBar() {
        const progressPercentage = ((progressStep + 1) / totalSteps) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    function showSection(step) {
        if (!sizes || !crusts || !toppings || !slices) {
            console.error("One or more section elements are missing.");
            return;
        }
        
        sizes.classList.add('hidden');
        crusts.classList.add('hidden');
        toppings.classList.add('hidden');
        slices.classList.add('hidden');
        
        switch (step) {
            case 0:
                crusts.classList.remove('hidden');
                break;
            case 1:
                sizes.classList.remove('hidden');
                break;
            case 2:
                toppings.classList.remove('hidden');
                break;
            case 3:
                slices.classList.remove('hidden');
                break;
        }
    }

    document.getElementById('next-page').addEventListener('click', () => {
        if (progressStep < totalSteps - 1) {
            progressStep += 1;
            updateProgressBar();
            showSection(progressStep);
        }
    });

    document.getElementById('back-page').addEventListener('click', () => {
        if (progressStep > 0) {
            progressStep -= 1;
            updateProgressBar();
            showSection(progressStep);
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
