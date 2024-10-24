document.addEventListener("DOMContentLoaded", function(){
    
// category buttons
const sizeButton = document.getElementById('size');
const crustButton = document.getElementById('crust');
const toppingButton = document.getElementById('topping');
const sliceButton = document.getElementById('slice');

//category menus
const sizes = document.getElementById('sizes');
const crusts = document.getElementById('crusts');
const toppings = document.getElementById('toppings');
const slices = document.getElementById('slices');

//prices for pizza size
const prices = {
    small: 129,
    regular: 149,
    large: 179,
    familySize: 199
};

//prices for pizza crust
const pricec = {
    thick: 20,
    thin: 40
}

//variables to store selected size and crust prices
let selectedSizePrice = 0;
let selectedCrustPrice = 0;

// size buttons for SIZES
const smallButton = document.getElementById('small');
const regularButton = document.getElementById('regular');
const largeButton = document.getElementById('large');
const familySizeButton = document.getElementById('family-size');
const customPizza = document.getElementById('custom-pizza');
const customPizzaImage = document.getElementById('pizzaur');

//size buttons for CRUSTS
const thickCrustButton = document.getElementById('thick');
const thinCrustButton = document.getElementById('thin');

//topping buttons
const pepperoniButton = document.getElementById('pepperoni');
const mushroomButton = document.getElementById('mushrooms');

//total price element
const totalPriceElement = document.querySelector('#total-price h1:nth-of-type(2)');

// Get all the pizza buttons for SIZES
const smallPriceElement = smallButton.querySelector('p');
const regularPriceElement = regularButton.querySelector('p');
const largePriceElement = largeButton.querySelector('p');
const familySizePriceElement = familySizeButton.querySelector('p');

//Get all the pizza buttons for CRUSTS
const thickPriceElement = thickCrustButton.querySelector('p');
const thinPriceElement = thinCrustButton.querySelector('p');


// Function to update the price in the button
function updateButtonPrice(priceElement, price) {
    priceElement.textContent = `₱${price.toFixed(2)}`;
}

// Function to update the total price based on selected SIZE & CRUST
function updateTotalPrice() {
    const totalPrice = selectedSizePrice + selectedCrustPrice;
    totalPriceElement.textContent = `₱${totalPrice.toFixed(2)}`;
}

 // Call updateButtonPrice for all sizes (SIZES)
 updateButtonPrice(smallPriceElement, prices.small);
 updateButtonPrice(regularPriceElement, prices.regular);
 updateButtonPrice(largePriceElement, prices.large);
 updateButtonPrice(familySizePriceElement, prices.familySize);

 //Call updateButtonPrice for all sizes (CRUST)
 updateButtonPrice(thickPriceElement, pricec.thick);
 updateButtonPrice(thinPriceElement, pricec.thin);


 //Event Listener for TOPPINGS (adding image on top)
 pepperoniButton.addEventListener('click', () => {
    console.log('Pepperoni topping is clicked');
    const pepperoniImage = document.createElement('img');
    pepperoniImage.src = '/img/pepperoni.png'; // Path to pepperoni image
    pepperoniImage.classList.add('topping-image'); // Adding class for styling
    customPizza.appendChild(pepperoniImage); // Adding pepperoni image on top of pizza
});

mushroomButton.addEventListener('click', () => {
    console.log('Mushroom topping is clicked');
    const mushroomImage = document.createElement('img');
    mushroomImage.src = '/img/mushroom.png'; 
    mushroomImage.classList.add('topping-image'); 
    customPizza.appendChild(mushroomImage); 
});





sizeButton.addEventListener('click',()=>{
    sizeButton.classList.remove('unselected');
    sizeButton.classList.add('selected');
    crustButton.classList.add('unselected');
    toppingButton.classList.add('unselected');
    sliceButton.classList.add('unselected');

    sizes.classList.remove('hidden');
    crusts.classList.add('hidden');
    toppings.classList.add('hidden');
    slices.classList.add('hidden');
});

crustButton.addEventListener('click',()=>{
    crustButton.classList.remove('unselected');
    crustButton.classList.add('selected');
    sizeButton.classList.add('unselected');
    toppingButton.classList.add('unselected');
    sliceButton.classList.add('unselected');

    sizes.classList.add('hidden');
    crusts.classList.remove('hidden');
    toppings.classList.add('hidden');
    slices.classList.add('hidden');
});

toppingButton.addEventListener('click',()=>{
    toppingButton.classList.remove('unselected');
    toppingButton.classList.add('selected');
    sizeButton.classList.add('unselected');
    crustButton.classList.add('unselected');
    sliceButton.classList.add('unselected');

    sizes.classList.add('hidden');
    crusts.classList.add('hidden');
    toppings.classList.remove('hidden');
    slices.classList.add('hidden');
});
sliceButton.addEventListener('click',()=>{
    sliceButton.classList.remove('unselected');
    sliceButton.classList.add('selected');
    sizeButton.classList.add('unselected');
    toppingButton.classList.add('unselected');
    crustButton.classList.add('unselected');

    sizes.classList.add('hidden');
    crusts.classList.add('hidden');
    toppings.classList.add('hidden');
    slices.classList.remove('hidden');
});


smallButton.addEventListener('click', () => {
    console.log('Small button is clicked');
    customPizza.classList.remove('regular', 'large', 'family-size');
    customPizza.classList.add('small');
    customPizza.classList.toggle('rotate');
    selectedSizePrice = prices.small;
    updateTotalPrice();
});

regularButton.addEventListener('click', () => {
    console.log('Regular button is clicked');
    customPizza.classList.remove('small', 'large', 'family-size');
    customPizza.classList.add('regular');
    customPizza.classList.toggle('rotate');
    selectedSizePrice = prices.regular;
    updateTotalPrice();
});

largeButton.addEventListener('click', () => {
    console.log('Large button is clicked');
    customPizza.classList.remove('small', 'regular', 'family-size');
    customPizza.classList.add('large');
    customPizza.classList.toggle('rotate');
    selectedSizePrice = prices.large;
    updateTotalPrice();
});

familySizeButton.addEventListener('click', () => {
    console.log('Family Size button is clicked');
    customPizza.classList.remove('small', 'regular', 'large');
    customPizza.classList.add('family-size');
    customPizza.classList.toggle('rotate');
    selectedSizePrice = prices.familySize;
    updateTotalPrice();
    });

    // Event listeners for crust buttons to change pizza image
    thickCrustButton.addEventListener('click', () => {
        console.log('Thick Crust button is clicked');
        customPizzaImage.src = '/img/ThickCrust.png'; // Change image source for Thick Crust
        customPizza.classList.toggle('rotate');
        selectedCrustPrice = pricec.thick;
        updateTotalPrice();
    });

    thinCrustButton.addEventListener('click', () => {
        console.log('Thin Crust button is clicked');
        customPizzaImage.src = '/img/ThinCrust.png'; // Change image source for Thin Crust
        customPizza.classList.toggle('rotate');
        selectedCrustPrice = pricec.thin;
        updateTotalPrice();
    });

});