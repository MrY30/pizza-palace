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








// Get the modal element
const cartModal = document.getElementById("cartModal");

// Get the cart icon that opens the modal
const cartIcon = document.querySelector(".bx-cart");

// Get the close button inside the modal
const cartCloseBtn = document.querySelector(".cart-close");

// When the user clicks on the cart icon, open the modal
cartIcon.onclick = function() {
    cartModal.style.display = "flex"; // Show the modal
}

// When the user clicks on the close button (X), close the modal
cartCloseBtn.onclick = function() {
    cartModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}
