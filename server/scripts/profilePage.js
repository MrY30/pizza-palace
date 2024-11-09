let userID, orderID
window.addEventListener('load', async(e)=>{
    e.preventDefault()

    const res = await fetch('/getUserData');
    const userData = await res.json();
    userID = userData.userId

    const order = await fetch(`/profile/${userID}`);
    const orderData = await order.json();
    orderID = orderData.rows[0].order_id;
    console.log(orderData.rows[0].order_id)

    displayUser(userData)

    getOrders().then(displayOrder)
    .catch(error => {
        console.error("Error fetching products for carts:", error);
    });


})

const orderTable = document.getElementById('order-tables')
const getOrders = async () => {
    try {
        const res = await fetch(`/profile/${userID}/${orderID}`);
        const orders = await res.json();
        
        // Log orders to check its structure
        console.log("Orders response:", orders);

        if (orders.rows) {
            console.log("Order rows:", orders.rows); // Log rows to see if they exist
        }

        return orders.rows || []; // Return rows if they exist, otherwise an empty array
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Return an empty array if there's an error
    }
};

const displayOrder = (orders) => {
    orderTable.innerHTML = ''; // Clear existing items

    // Check if there are orders to display
    if (orders.length === 0) {
        orderTable.innerHTML = '<tr><td colspan="2">No orders found</td></tr>';
        return;
    }

    // Loop through orders to display each in a row
    orders.forEach(order => {
        orderTable.innerHTML += `
            <tr>
                <td>${order.product_name}</td>
                <td>${order.amount}</td>
            </tr>
        `;
    });
};

userArea = document.getElementById('profile-content')
const displayUser = (user) => {
    userArea.innerHTML = ''; // Clear existing items

    userArea.innerHTML = `
        <div class="info-section">
                <div class="profile-field">
                    <label>First Name:</label>
                    <p>${user.firstName}</p>
                </div>
                <div class="profile-field">
                    <label>Last Name:</label>
                    <p>${user.lastName}</p>
                </div>
                <div class="profile-field">
                    <label>Birthdate:</label>
                    <p>${user.birthDate}</p>
                </div>
                <div class="profile-field">
                    <label>Contact Number:</label>
                    <p>${user.contact}</p>
                </div>
                <div class="profile-field">
                    <label>Address:</label>
                    <p>${user.address}</p>
                </div>
            </div>
    `;
};

