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

// size buttons
const smallButton = document.getElementById('small');
const regularButton = document.getElementById('regular');
const largeButton = document.getElementById('large');
const familySizeButton = document.getElementById('family-size');
const customPizza = document.getElementById('custom-pizza');

smallButton.addEventListener('click', ()=>{
    console.log('Small button is clicked');
    customPizza.classList.remove('regular', 'large', 'family-size');
    customPizza.classList.add('small');
    customPizza.classList.toggle('rotate');

});
regularButton.addEventListener('click', ()=>{
    console.log('Regular button is clicked');
    customPizza.classList.remove('small', 'large', 'family-size');
    customPizza.classList.add('regular');
    customPizza.classList.toggle('rotate');
});
largeButton.addEventListener('click', ()=>{
    console.log('Large button is clicked');
    customPizza.classList.remove('small', 'regular', 'family-size');
    customPizza.classList.add('large');
    customPizza.classList.toggle('rotate');

});
familySizeButton.addEventListener('click', ()=>{
    console.log('Family Size button is clicked');
    customPizza.classList.remove('small', 'regular', 'large');
    customPizza.classList.add('family-size');
    customPizza.classList.toggle('rotate');

});
