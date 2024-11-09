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

// DISPLAY PRODUCTS TO MENU
const menuArea = document.getElementById("menu-content");
const filterButtons = document.querySelectorAll('.filter-category a'); // Category filter buttons
const searchInput = document.querySelector('.search-bar input'); // Search input element
let products = []; // Array to store fetched products

// Fetch Products from the Server
const getProduct = async () => {
    const res = await fetch('/admin/products');
    products = await res.json();
    return products;
};

// Display Products in the Menu
const displayMenu = (productsToDisplay) => {
    menuArea.innerHTML = ''; // Clear the menu area before displaying products

    // Check if there are no products to display
    if (productsToDisplay.length === 0) {
        menuArea.innerHTML = `<p style="text-align: center; font-weight: bold;">No products found.</p>`;
        return;
    }

    // Display each product in the menu
    productsToDisplay.forEach(product => {
        menuArea.innerHTML += `
            <div class="row" style="display: flex; flex-direction: column; gap: 1rem; align-items: stretch; max-width: 300px; margin: auto;">
                <div class="image-frame" style="width: 100%; height: 200px; overflow: hidden; border-radius: 10px;">
                    <img src="${product.productURL}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="menu-text" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="menu-left">
                        <h4 style="font-size: 1.5rem; color: #32613E;">${product.name}</h4>
                    </div>
                    <div class="menu-right">
                        <h5 style="font-size: 1.2rem; color: #b2381e;">₱${product.price}</h5>
                    </div>
                </div>
                <p style="font-size: 1rem; color: #494830;">${product.description}</p>
                <div class="menu-actions" style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="category-text" style="font-size: 0.9rem; color: #da9147;">${product.category}</span>
                    <button class="add-cart-btn" style="background: #b2381e; padding: 0.5rem 1rem; border-radius: 10px;">
                        <img src="/img/addtoCart.png" alt="Add to Cart" class="add-cart-image" data-id="${product.id}" style="width: 20px;">
                    </button>
                </div>                
            </div>
        `;
    });

    // Maintain the grid layout after displaying products
    menuArea.style.display = 'grid';
    menuArea.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    menuArea.style.gap = '2rem';
};

// Filter Products Based on Category
const filterProducts = (category) => {
    let filteredProducts = products;
    if (category !== 'All') {
        filteredProducts = products.filter(product => product.category === category);
    }
    displayMenu(filteredProducts);
};

// Event Listener for Category Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Reset the styling for all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('btn-select');
            btn.classList.add('btn-unselect');
        });

        // Highlight the selected button
        button.classList.remove('btn-unselect');
        button.classList.add('btn-select');

        // Filter products based on the selected category
        filterProducts(button.textContent);
    });
});

// Search Functionality
const searchProducts = (searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(lowerCaseSearchText)
    );

    // Display the filtered products while maintaining the grid layout
    displayMenu(filteredProducts);

    // If search input is cleared, display all products again
    if (searchText === '') {
        displayMenu(products);
    }

    // Ensure the grid layout is maintained after search
    menuArea.style.display = 'grid';
    menuArea.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, auto))';
};

// Event Listener for Search Input
searchInput.addEventListener('input', (event) => {
    const searchText = event.target.value;
    searchProducts(searchText);
});

// Fetch products and initialize the display
getProduct()
    .then(fetchedProducts => {
        products = fetchedProducts; // Store fetched products globally
        displayMenu(products); // Display all products initially
    })
    .catch(error => {
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