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
            if (e.target.classList.contains('add-cart-image')) {
                // Toggle between outlined and filled heart icons
                const cart = e.target;
                addToCart(cart.dataset.id);
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
    alert(result.message);
    if(result.success){
        getCart().then(carts => {
            displayCart(carts);
        }).catch(error => {
            console.error("Error fetching products for carts:", error);
        });
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
				<div class="menu-actions">
					<span class="category-text">${product.category}</span>
					<button class="add-cart-btn verify">
						<img src="/img/addtoCart.png" alt="Add to Cart" class="add-cart-image" data-id="${product.id}">
					</button>
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
    
    cartArea.innerHTML = ''
    carts.forEach(cart =>{
        cartArea.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <input type="checkbox" class="cart-checkbox" data-product-id="${cart.product_id}">
                    <img src="${cart.cartURL}" alt="${cart.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${cart.name}</h4>
                    <div class="quantity-control">
                        <button class="quantity-btn minus-btn">-</button>
                        <input type="number" class="quantity-input" value="${cart.amount}" min="1">
                        <button class="quantity-btn plus-btn">+</button>
                    </div>
                    <p>Price: ${cart.price}</p>
                    <span class="delete-item" id="delete-item" data-product-id="${cart.product_id}">Remove Item</span>
                </div>
            </div>
        `
    })
}


//DELETING ITEMS FROM CART
document.getElementById("cart-area").addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-item")) {
        const res = await fetch('/getUserData');
        const userData = await res.json();

        const productId = e.target.getAttribute("data-product-id");

        deleteCartItem(userData.userId, productId, e.target.closest('.cart-item'));
    }
});

const deleteCartItem = async (userId, productId, cartItemElement) => {
    try {
        const response = await fetch(`/cart/${userId}/${productId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        if (result.success) {
            // Remove the cart item from the DOM
            cartItemElement.remove();
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while removing the product from the cart');
    }
};

//ORDER BUTTON
const orderNowBtn = document.querySelector('.order-now-btn');
orderNowBtn.addEventListener('click',async ()=>{
    const selectedItems = [];
    document.querySelectorAll('.cart-checkbox:checked').forEach(checkbox => {
        selectedItems.push(checkbox.getAttribute('data-product-id'));
    });
    console.log(selectedItems);
    console.log(userID)
    try {
        const response = await fetch('/cart/order', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, selectedProductIds: selectedItems }),
        });

        const result = await response.json();
        if (result.success) {
            alert(result.message);
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while removing the product from the cart');
    }
    window.location.href = '/order'
})

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
document.querySelectorAll('.delete-item').forEach((item) => {
    item.addEventListener('click', (event) => {
        const cartItem = event.target.closest('.cart-item');
        cartItem.remove();
        // Update the cart total if necessary
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

//GOING TO ACCOUNTS PAGE
const profile = document.querySelector(".bxs-user");
profile.addEventListener('click', ()=>{
    window.location.href = "/profile"
})