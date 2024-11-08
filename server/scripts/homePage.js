//GET USER ID
let userID

//WINDOWS ON LOAD PROGRAM [CHECKS IF USER HAS BEEN LOGGED IN OR NOT]
window.addEventListener('load', async (e)=>{
    e.preventDefault()

    const res = await fetch('/getUserData');
    const userData = await res.json();

    userID = userData.userId

    const premiumBtn = document.querySelectorAll('.verify');
    const createPizza = document.getElementById('create-pizza');

    if(!userData.userId){
        premiumBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                window.location.href = '/login';
            });
        });
        menuArea.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('add-fave')) {
                window.location.href = '/login';
            }
        });
    }else{
        //ALLOWS USER BUTTONS
        cartIcon.onclick = () =>{ toggleCartModal(); };
        favoritesIcon.onclick = () =>{ toggleFavoritesModal();};
        createPizza.addEventListener('click',()=>{ window.location.href = '/pizza'; })

        //HEART BUTTON
        menuArea.addEventListener('click', function(e) {
            if (e.target.classList.contains('bx-heart') || e.target.classList.contains('bxs-heart')) {
                // Toggle between outlined and filled heart icons
                const heart = e.target;
                if (heart.classList.contains('bx-heart')) {
                    //ADD TO 'CART'
                    console.log(`Added: ${heart.dataset.id}`)
                    addToCart(heart.dataset.id)
                    heart.classList.remove('bx-heart');
                    heart.classList.add('bxs-heart', 'active');
                } else {
                    //REMOVE TO 'CART'
                    console.log(`Remove: ${heart.dataset.id}`)
                    heart.classList.remove('bxs-heart', 'active');
                    heart.classList.add('bx-heart');
                }
            }
        });

        //DISPLAY CART
        getCart().then(carts => {
            displayCart(carts);
        }).catch(error => {
            console.error("Error fetching products for carts:", error);
        });
    }
})

//ADD TO CART
async function addToCart(productId){
    const id = productId
    const response = await fetch(`/cart/${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productID: id }),
    });

    const result = await response.json();
    if(result.success === 2){

    }
}

//DISPLAY FUNCTIONS

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
                    <span class = "category">${product.category}</span>
					<i data-id="${product.id}" class='bx bx-heart add-fave' ></i>
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

//DISPLAY CARTS TO SHOPPING CART
const cartArea = document.getElementById('cart-area');
const getCart = async () =>{
    const res = await fetch(`/cart/${userID}`);
    const carts = await res.json();
	return carts;
}
const displayCart = (carts) =>{
    carts.forEach(cart =>{
        console.log(cart.cartURL)
        cartArea.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${cart.cartURL}" alt="${cart.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${cart.name}</h4>
                    <div class="quantity-control">
                        <button class="quantity-btn minus-btn">-</button>
                        <input type="number" class="quantity-input" value="${cart.amount}" min="1">
                        <button class="quantity-btn plus-btn">+</button>
                    </div>
                    <p>Price: ₱${cart.price}</p>
                </div>
            </div>
        `
    })
}


//STYLES AND DESIGN

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

//STYLE FOR CART
const cartModal = document.getElementById("cartModal");
const cartIcon = document.querySelector(".bx-cart");
const cartCloseBtn = document.querySelector(".cart-close");
function toggleCartModal() {
    cartModal.classList.toggle("open"); // Toggle the open class
}
cartCloseBtn.onclick = function() {
    toggleCartModal();
}
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
function updateCartTotal() {
    // Calculate and update the total here
    // This is a placeholder; you can add logic to dynamically update the cart total
}

//STYLE FOR FAVORITE
const favoritesModal = document.getElementById("favoritesModal");
const favoritesIcon = document.querySelector(".bx-heart")
const favoritesCloseBtn = document.querySelector(".favorites-close");
function toggleFavoritesModal() {
    favoritesModal.classList.toggle("open");
}
favoritesCloseBtn.onclick = function() {
    toggleFavoritesModal();
}
window.onclick = function(event) {
    if (event.target == cartModal) {
        closeCartModal();
    }
}