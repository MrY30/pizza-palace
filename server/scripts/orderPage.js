let userID, total, orderID
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

function updateOrderTotal() {
    total = 0;

    // Loop through each order item
    document.querySelectorAll('.order-item').forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        total += price;
    });

    // Update the total display
    document.querySelector('.order-total span').textContent = `Total: ₱${total.toFixed(2)}`;
}

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
            <div class="order-item" data-id = "${order.product_id}" data-name = "${order.name}" data-price = "${order.price}">
                <img src="${order.orderURL}" alt="${order.name}" class="product-image">
                <div class="item-details">
                    <h3 class="product-name">${order.name}</h3>
                    <div class="quantity-controls">
                        <span class="quantity">Amount: ${order.amount}</span>
                    </div>
                    <p class="item-price">₱${order.price}</p>
                </div>
            </div>
        `
    })

    updateOrderTotal()
}

const customerName = document.getElementById('name')
const address = document.getElementById('address')
const contact = document.getElementById('contact')
const deliverButton = document.getElementById('checkout-button')
const paymentMethod = document.getElementById('payment-method')

deliverButton.addEventListener('click', async ()=>{
    const orderItems = document.querySelectorAll('.order-item');
    const productIds = Array.from(orderItems).map(item => item.getAttribute('data-id'));
    const productNames = Array.from(orderItems).map(item => item.getAttribute('data-name'));
    const productPrice = Array.from(orderItems).map(item => item.getAttribute('data-price'));
    console.log(productIds); // Displays an array of product_ids in the console
    console.log(customerName.value);
    console.log(address.value);
    console.log(contact.value);

    const res = await fetch(`/order/${userID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productID: productIds, customerName: customerName.value, address: address.value, contact: contact.value, paymentMethod: paymentMethod.value, productNames: productNames, productPrice: productPrice})
    });

    const result = await res.json();
    alert(result.message);
    if(result.success){
        const update = await fetch('/order/deliver', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID, selectedProductIds: productIds }),
        });

        const updated = await update.json();
        if (updated.success) {
            alert(updated.message);
            window.location.href = "/"
        } else {
            alert(updated.message);
        }

    }
})



