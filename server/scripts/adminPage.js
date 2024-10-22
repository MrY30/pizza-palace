//LOG IN PAGE
const admin = document.getElementById("admin-username")
const password = document.getElementById('admin-password')
const btnLogIn = document.getElementById('admin-button')

btnLogIn.addEventListener('click',async (e)=>{
    e.preventDefault();
    
    const username = admin.value;
    const pass = password.value;

    const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: pass })
    });

    const data = await response.json();
    if (data.success) {
        alert('Login successful');
    } else {
        alert(data.message);
    }
})

//ADMIN TABLE PAGE
let price, inventory
const productButton = document.getElementById('admin-products');
const adminTable = document.getElementById('admin-tables');
productButton.addEventListener('click',async (e)=>{
    e.preventDefault();

    const res = await fetch('/admin/products');
    const products = await res.json();
    productDisplay(products);
});

const productDisplay = (products) =>{
    price = products.map(product => product.price);
}

// adminTable.innerHTML = "<tr><th>Product Image</th><th>Product Name</th><th>Price</th><th>Inventory</th></tr>";

    // if(products.length === 0){
    //     const option = document.createElement('option');
    //     option.value = '';
    //     option.textContent = 'No Courses Available';
    //     tableSelect.appendChild(option);
    //     return;
    // }