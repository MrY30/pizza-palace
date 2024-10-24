const header = document.querySelector("header");

window.addEventListener("scroll", function(){
	header.classList.toggle("sticky", window.scrollY > 0);

})

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
}

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
}

const sr = ScrollReveal ({
	distance: '30px', 
	duration: 2500,
	reset: true
})
sr.reveal('.home-text',{delay:200, origin:'left'});
sr.reveal('.home-img',{delay:200, origin:'right'});
sr.reveal('.container, .about, .menu, .contact',{delay:200, origin:'bottom'});








// Get the cart modal element
const cartModal = document.getElementById("cartModal");

// Get the cart icon that opens the modal
const cartIcon = document.querySelector(".bx-cart");

// Get the close button inside the modal
const cartCloseBtn = document.querySelector(".cart-close");

// Function to open the cart modal
function openCartModal() {
    cartModal.style.display = "flex"; // Show the modal
}

// Function to close the cart modal
function closeCartModal() {
    cartModal.style.display = "none";
}

// When the user clicks on the cart icon, open the modal
cartIcon.onclick = function() {
    openCartModal();
}

// When the user clicks on the close button (X), close the modal
cartCloseBtn.onclick = function() {
    closeCartModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == cartModal) {
        closeCartModal();
    }
}








// Get the modal element
// Get the modal element
const loginModal = document.getElementById("loginModal");

// Get all clickable elements (links and buttons) on the homepage
const clickableItems = document.querySelectorAll("a, button");

// Get the close button inside the modal
const loginCloseBtn = document.querySelector(".login-close");

// Function to open the modal
function openLoginModal() {
    loginModal.style.display = "flex"; // Show the modal
}

// Function to close the modal
function closeLoginModal() {
    loginModal.style.display = "none";
}

// Attach the click event to all clickable items on the homepage
clickableItems.forEach(item => {
    item.addEventListener("click", function(event) {
        // Prevent the default action of links/buttons
        event.preventDefault();
        // Open the login modal
        openLoginModal();
    });
});

// When the user clicks on the close button (X), close the modal
loginCloseBtn.onclick = function() {
    closeLoginModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == loginModal) {
        closeLoginModal();
    }
}
