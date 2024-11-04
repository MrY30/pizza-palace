//REPONSIVE MENU
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

//NEW SCROLL REVEAL

// const sr = ScrollReveal ({
// 	distance: '30px', 
// 	duration: 2500,
// 	reset: true
// })
// sr.reveal('.home-text',{delay:200, origin:'left'});
// sr.reveal('.home-img',{delay:200, origin:'right'});
// sr.reveal('.about, .menu, .contact',{delay:200, origin:'bottom'});

//DISPLAY PRODUCTS TO MENU
const menuArea = document.getElementById("menu-content");
const getProduct = async () => {
    const res = await fetch('/admin/products');
    const products = await res.json();

	return products;
}
const displayMenu = (products) => {
    products.forEach(product => {
        menuArea.innerHTML += `
            <div class="row">
				<div class="image-frame">
					<img src="${product.productURL}" alt="${product.name}">
				</div>
				<div class="menu-text">
					<div class="menu-left">
						<h4>${product.name}</h4>
					</div>
					<div class="menu-right">
						<h5>₱${product.price}</h5>
					</div>
				</div>
				<p>${product.description}</p>
				<div class="favorite">
					<i class='bx bx-heart' ></i>
				</div>
			</div>
        `;
    });
};

getProduct().then(products => {
    displayMenu(products);
}).catch(error => {
    console.error("Error fetching products:", error);
});

// document.querySelectorAll('.favorite i').forEach(heart => {
//     heart.addEventListener('click', function() {
//         // Toggle between outlined and filled heart icons
//         if (this.classList.contains('bx-heart')) {
//             this.classList.remove('bx-heart');
//             this.classList.add('bxs-heart', 'active');
//         } else {
//             this.classList.remove('bxs-heart', 'active');
//             this.classList.add('bx-heart');
//         }
//     });
// });

// Attach event listener to the parent container (menuArea)
menuArea.addEventListener('click', function(e) {
    if (e.target.classList.contains('bx-heart') || e.target.classList.contains('bxs-heart')) {
        // Toggle between outlined and filled heart icons
        const heart = e.target;
        if (heart.classList.contains('bx-heart')) {
            heart.classList.remove('bx-heart');
            heart.classList.add('bxs-heart', 'active');
        } else {
            heart.classList.remove('bxs-heart', 'active');
            heart.classList.add('bx-heart');
        }
    }
});


// Get the cart modal element
const cartModal = document.getElementById("cartModal");

// Get the cart icon that opens the modal
const cartIcon = document.querySelector(".bx-cart");

// Get the close button inside the modal
const cartCloseBtn = document.querySelector(".cart-close");

// Function to toggle the cart modal open and close
function toggleCartModal() {
    cartModal.classList.toggle("open"); // Toggle the open class
}

// When the user clicks on the cart icon, open or close the modal
cartIcon.onclick = function() {
    toggleCartModal();
}

// When the user clicks on the close button (X), close the modal
cartCloseBtn.onclick = function() {
    toggleCartModal();
}



// Get the favorites modal element
const favoritesModal = document.getElementById("favoritesModal");

// Get the heart icon that opens the favorites modal
const favoritesIcon = document.querySelector(".bx-heart"); // Adjust selector if necessary

// Get the close button inside the favorites modal
const favoritesCloseBtn = document.querySelector(".favorites-close");

// Function to toggle the favorites modal open and close
function toggleFavoritesModal() {
    favoritesModal.classList.toggle("open"); // Toggle the open class
}

// When the user clicks on the heart icon, open or close the favorites modal
favoritesIcon.onclick = function() {
    toggleFavoritesModal();
}

// When the user clicks on the close button (X), close the favorites modal
favoritesCloseBtn.onclick = function() {
    toggleFavoritesModal();
}








// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == cartModal) {
        closeCartModal();
    }
}

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
// clickableItems.forEach(item => {
//     item.addEventListener("click", function(event) {
//         // Prevent the default action of links/buttons
//         event.preventDefault();
//         // Open the login modal
//         openLoginModal();
//     });
// });

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