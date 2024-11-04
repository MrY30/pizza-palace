document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript file loaded");

    const progress = document.querySelector('.progress');
    let progressStep = 0;
    const totalSteps = 5;
    const sections = document.querySelectorAll('.slide-section');
    const nextButtons = document.querySelectorAll('.order-button#next-page');
    const backButtons = document.querySelectorAll('.order-button#back-page');
    let currentPizzaSize = "400px"; // Default size
    const selectedToppings = {}; // Track selected toppings to toggle on/off

    function updateProgressBar() {
        const progressPercentage = ((progressStep + 1) / totalSteps) * 100;
        progress.style.width = `${progressPercentage}%`;
    }

    function showSection(step) {
        sections.forEach((section, index) => {
            section.classList.remove('active', 'slide-left', 'slide-right');
            section.style.display = 'none';
        });

        if (sections[step]) {
            sections[step].style.display = 'flex';
            sections[step].classList.add('active');
        }

        // Update the Section 4 image when moving to it
        if (step === 3) {
            updateSection4Image();
        }
    }

    nextButtons.forEach(nextButton => {
        nextButton.addEventListener('click', () => {
            if (progressStep === 0) {
                updateSection2Image();
            }
            if (progressStep === 1) {
                updateSection3Image();
            }
            if (progressStep < totalSteps - 1) {
                sections[progressStep].classList.add('slide-left');
                setTimeout(() => {
                    sections[progressStep].style.display = 'none';
                    progressStep += 1;
                    updateProgressBar();
                    showSection(progressStep);
                }, 300);
            }
        });
    });

    backButtons.forEach(backButton => {
        backButton.addEventListener('click', () => {
            if (progressStep > 0) {
                sections[progressStep].classList.add('slide-right');
                setTimeout(() => {
                    sections[progressStep].style.display = 'none';
                    progressStep -= 1;
                    updateProgressBar();
                    showSection(progressStep);
                }, 300);
            }
        });
    });

    showSection(progressStep);
    updateProgressBar();

    function getActivePizzaImage() {
        const activeSection = document.querySelector('.slide-section.active');
        return activeSection.querySelector('img[id^="custom-pizza"]');
    }

    const thickCrustOption = document.getElementById("thickCrustOption");
    const thinCrustOption = document.getElementById("thinCrustOption");

    function changeImageWithRotation(newSrc) {
        const activePizzaImage = getActivePizzaImage();
        if (activePizzaImage) {
            activePizzaImage.classList.add('rotate');

            setTimeout(() => {
                activePizzaImage.src = newSrc;
            }, 250);

            setTimeout(() => {
                activePizzaImage.classList.remove('rotate');
            }, 500);
        }
    }

    let selectedCrustImageSrc = '/img/pizzaur.png';

    thickCrustOption.addEventListener("click", () => {
        console.log('Thick Crust option is selected');
        selectedCrustImageSrc = '/img/pizzaur.png';
        changeImageWithRotation('/img/ThickCrust.png');
    });

    thinCrustOption.addEventListener("click", () => {
        console.log("Thin Crust option selected");
        selectedCrustImageSrc = '/img/pizzaurt.png';
        changeImageWithRotation('/img/ThinCrust.png');
    });

    function updateSection2Image() {
        const section2PizzaImage = document.getElementById('custom-pizza2');
        section2PizzaImage.src = selectedCrustImageSrc;
    }

    function updateSection3Image() {
        const section3PizzaImage = document.getElementById('custom-pizza3');
        if (selectedCrustImageSrc === '/img/pizzaur.png') {
            section3PizzaImage.src = '/img/pizzaurS.png';
        } else if (selectedCrustImageSrc === '/img/pizzaurt.png') {
            section3PizzaImage.src = '/img/pizzaurtS.png';
        } else {
            section3PizzaImage.src = selectedCrustImageSrc;
        }
    }

    const toppingOptions = document.querySelectorAll('.toppings-option img');

    toppingOptions.forEach(option => {
        option.addEventListener('click', () => {
            const section3PizzaContainer = document.querySelector('#section3 #pizza');
            const toppingSrc = getToppingImageSrc(option.id);

            if (toppingSrc) {
                if (selectedToppings[option.id]) {
                    // Remove selected topping
                    const existingTopping = document.getElementById(`topping-${option.id}`);
                    if (existingTopping) {
                        section3PizzaContainer.removeChild(existingTopping);
                        delete selectedToppings[option.id];
                    }
                } else {
                    // Add new topping
                    const toppingImage = document.createElement('img');
                    toppingImage.src = toppingSrc;
                    toppingImage.classList.add('topping-overlay');
                    setToppingSize(toppingImage); // Adjust size based on current pizza size
                    toppingImage.id = `topping-${option.id}`;
                    section3PizzaContainer.appendChild(toppingImage);
                    selectedToppings[option.id] = true;
                }
            }
        });
    });

    function getToppingImageSrc(optionId) {
        switch (optionId) {
            case 'pepperoniOption':
                return '/img/addpepperoni.png';
            case 'mushroomOption':
                return '/img/addmushroom.png';
            case 'pineappleOption':
                return '/img/addpineapple.png';
            case 'olivesOption':
                return '/img/addolives.png';
            case 'baconOption':
                return '/img/addbacon.png';
            case 'shrimpOption':
                return '/img/addshrimp.png';
            default:
                return null;
        }
    }

    const sizeOptions = {
        small: "360px",
        regular: "400px",
        large: "440px",
        family: "480px"
    };

    document.querySelectorAll('.size-option img').forEach(option => {
        option.addEventListener('click', () => {
            const size = sizeOptions[option.id.replace('Option', '').toLowerCase()];
            console.log(`${option.alt} size selected`);
            changePizzaSize(size);
        });
    });

    function changePizzaSize(size) {
        currentPizzaSize = size; // Update current size
        const allPizzaImages = document.querySelectorAll('img[id^="custom-pizza"]');
        allPizzaImages.forEach(pizzaImage => {
            pizzaImage.classList.add('rotate');

            setTimeout(() => {
                pizzaImage.style.width = size;
                pizzaImage.style.height = 'auto';
                pizzaImage.style.maxWidth = '100%';
                pizzaImage.style.objectFit = 'contain';
            }, 250);

            setTimeout(() => {
                pizzaImage.classList.remove('rotate');
            }, 500);
        });

        // Adjust existing toppings size based on the current pizza size
        const existingToppings = document.querySelectorAll('.topping-overlay');
        existingToppings.forEach(topping => {
            setToppingSize(topping);
        });
    }

    function setToppingSize(topping) {
        switch (currentPizzaSize) {
            case '360px':
                topping.style.width = '85%'; // Adjust size for small pizza
                break;
            case '400px':
                topping.style.width = '90%'; // Adjust size for regular pizza
                break;
            case '440px':
                topping.style.width = '95%'; // Adjust size for large pizza
                break;
            case '480px':
                topping.style.width = '100%'; // Adjust size for family pizza
                break;
            default:
                topping.style.width = '105%'; // Default size
        }
        topping.style.top = '50%'; // Center the topping vertically
        topping.style.left = '50%'; // Center the topping horizontally
        topping.style.transform = 'translate(-50%, -50%)'; // Centering transformation
        topping.style.height = 'auto'; // Maintain aspect ratio
    }

    function updateSection4Image() {
        const section4PizzaContainer = document.querySelector('#section4 #pizza');
        section4PizzaContainer.innerHTML = ''; // Clear any existing elements

        // Clone the current pizza image from Section 3 and add it to Section 4
        const section3PizzaImage = document.getElementById('custom-pizza3');
        const clonedPizzaImage = section3PizzaImage.cloneNode(true);
        clonedPizzaImage.id = 'custom-pizza4';
        section4PizzaContainer.appendChild(clonedPizzaImage);

        // Clone each topping from Section 3 and add it to Section 4
        const section3Toppings = document.querySelectorAll('#section3 .topping-overlay');
        section3Toppings.forEach(topping => {
            const clonedTopping = topping.cloneNode(true);
            section4PizzaContainer.appendChild(clonedTopping);
        });

        // Add event listeners for triangle and square cut options
        const triangleOption = document.getElementById('triangleOption');
        const squareOption = document.getElementById('squareOption');

        triangleOption.addEventListener('click', () => {
            overlayCutImage(section4PizzaContainer, '/img/TriCut.png');
        });

        squareOption.addEventListener('click', () => {
            overlayCutImage(section4PizzaContainer, '/img/SquCut.png');
        });
    }

    function updateSection5Image() {
        const section5PizzaContainer = document.querySelector('#section5 #pizza');
        section5PizzaContainer.innerHTML = ''; // Clear any existing elements
    
        // Clone the current pizza image from Section 4 and add it to Section 5
        const section4PizzaImage = document.getElementById('custom-pizza4');
        const clonedPizzaImage = section4PizzaImage.cloneNode(true);
        clonedPizzaImage.id = 'custom-pizza5';
        section5PizzaContainer.appendChild(clonedPizzaImage);
    
        // Clone each topping from Section 4 and add it to Section 5
        const section4Toppings = document.querySelectorAll('#section4 .topping-overlay');
        section4Toppings.forEach(topping => {
            const clonedTopping = topping.cloneNode(true);
            section5PizzaContainer.appendChild(clonedTopping);
        });
    
        // Clone any cut overlay from Section 4 and add it to Section 5
        const section4CutOverlay = document.querySelector('#section4 .cut-overlay');
        if (section4CutOverlay) {
            const clonedCutOverlay = section4CutOverlay.cloneNode(true);
            section5PizzaContainer.appendChild(clonedCutOverlay);
        }
    }
    
    // Update Section 5 when moving to it
    nextButtons.forEach(nextButton => {
        nextButton.addEventListener('click', () => {
            if (progressStep === 3) {
                updateSection5Image();
            }
        });
    });

    function overlayCutImage(container, cutImageSrc) {
        // Remove any existing cut overlay
        const existingCutOverlay = container.querySelector('.cut-overlay');
        if (existingCutOverlay) {
            container.removeChild(existingCutOverlay);
        }

        // Add the new cut overlay
        const cutImage = document.createElement('img');
        cutImage.src = cutImageSrc;
        cutImage.classList.add('cut-overlay');
        cutImage.style.position = 'absolute';
        cutImage.style.top = '50%';
        cutImage.style.left = '50%';
        cutImage.style.transform = 'translate(-50%, -50%)';
        cutImage.style.width = '100%';
        cutImage.style.height = 'auto';
        cutImage.style.zIndex = '3'; 
        container.appendChild(cutImage);
    }
});
