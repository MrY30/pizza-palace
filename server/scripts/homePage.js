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
					<i id="add-fave" class='bx bx-heart' ></i>
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

// When the user clicks on the close button (X), close the modal
cartCloseBtn.onclick = function() {
    toggleCartModal();
}

// Select all plus and minus buttons
document.querySelectorAll('.plus-btn').forEach(button => {
    button.addEventListener('click', function() {
        let quantityInput = this.previousElementSibling;
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateCartTotal();
    });
});

document.querySelectorAll('.minus-btn').forEach(button => {
    button.addEventListener('click', function() {
        let quantityInput = this.nextElementSibling;
        if (parseInt(quantityInput.value) > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateCartTotal();
        }
    });
});

// Function to update the total price (example function, adjust as needed)
function updateCartTotal() {
    // Calculate and update the total here
    // This is a placeholder; you can add logic to dynamically update the cart total
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

//ON LOAD CHECKS IF USER HAS BEEN LOGGED IN OR NOT
document.addEventListener('DOMContentLoaded', async (e)=>{
    e.preventDefault()

    const res = await fetch('/getUserData');
    const userData = await res.json();

    const premiumBtn = document.querySelectorAll('.verify');
    const createPizza = document.getElementById('create-pizza');

    if(!userData.userId){
        premiumBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = '/login';
            });
        });
        menuArea.addEventListener('click', (event) => {
            if (event.target && event.target.id === 'add-fave') {
                window.location.href = '/login';
            }
        });
    }else{
        cartIcon.onclick = () =>{
            toggleCartModal();
        };
        favoritesIcon.onclick = () =>{
            toggleFavoritesModal();
        };
        createPizza.addEventListener('click',()=>{
            window.location.href = '/pizza';
        })
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
        console.log(userData.userId)
    }
})