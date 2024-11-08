let userID
window.addEventListener('load', async (e)=>{
    e.preventDefault()

    const res = await fetch('/getUserData');
    const userData = await res.json();
    userID = userData.userId
    console.log(userData.userId)

    //DISPLAY CART
    getOrder().then(orders => {
        displayOrder(orders);
    }).catch(error => {
        console.error("Error fetching products for carts:", error);
    });
})

//DISPLAY ORDERS
const orderArea = document.getElementById('order-area');
const getOrder = async () =>{
    const res = await fetch(`/order/${userID}`);
    const orders = await res.json();
	return orders;
}
const displayOrder = (orders) =>{

    orderArea.innerHTML = ''
    orders.forEach(order =>{
        orderArea.innerHTML += `
            <div class="order-item">
                <img src="${order.orderURL}" alt="${order.name}" class="product-image">
                <div class="item-details">
                    <h3 class="product-name">${order.name}</h3>
                    <div class="quantity-controls">
                        <button class="quantity-button minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-button plus">+</button>
                    </div>
                    <p class="item-price">₱${order.price}</p>
                </div>
            </div>
        `
    })
}
