//LOG IN PAGE
const admin = document.getElementById("admin-username")
const password = document.getElementById('admin-password')
const btnLogIn = document.getElementById('admin-button')
const lblUsername = document.getElementById('username-error-label')
const lblPassword = document.getElementById('password-error-label')

const adminPanel = document.getElementById('admin-center');
const loginPanel = document.getElementById('log-in');

//ADMIN TABLE PAGE [PRODUCTS]
const adminTable = document.getElementById('admin-tables');
const productButton = document.getElementById('admin-products');
const deliveryButton = document.getElementById('admin-deliver');

//SEARCH AND FILTER [FILTERED FUNCTION]
const selection = document.querySelector(".selection");
const selected_text = document.querySelector(".selection p");
const categories = document.querySelector(".categories");
const options = document.querySelectorAll(".categories p");
const searchInput = document. getElementById("searchProduct");

const addProductButton = document.getElementById('add-product-button');
const addProduct = document.getElementById('add-product');

//GET PRODUCTS FROM DATABASE
let products, deliveries = [];

//LOG OUT
const logOutButton = document.getElementById('log-out-button');

// Check login state on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showAdminPanel();
    }
});

// Function to show admin panel and hide login form
const showAdminPanel = () => {
    loginPanel.classList.add('hidden');
    adminPanel.classList.remove('hidden');
    logOutButton.classList.remove('hidden');
    productButton.classList.remove('hidden');
    deliveryButton.classList.remove('hidden');
    if (localStorage.getItem('products') === 'true') {
        productButton.classList.add('nav-selected');
        deliveryButton.classList.remove('nav-selected');
        addProductButton.classList.remove('hidden');
        getProducts(new Event('load'));
    }
    if (localStorage.getItem('products') === 'false') {
        productButton.classList.remove('nav-selected');
        deliveryButton.classList.add('nav-selected');
        addProductButton.classList.add('hidden');
        getDeliveries(new Event('load'));
    }
};

//FUNCTION GETS PRODUCTS
const getProducts = async (e) =>{
    e.preventDefault();
    const res = await fetch('/admin/products');
    products = await res.json();
    productDisplay(products);
}

//FUNCTION GETS DELIVERY
const getDeliveries = async (e) =>{
    e.preventDefault();
    //const res = await fetch('/admin/deliveries');
    //deliveries = await res.json();
    deliveryDisplay(deliveries);
}

//DISPLAY ALL PRODUCTS
const productDisplay = (products) => {
    adminTable.innerHTML = `
        <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
        </tr>
    `;
    if (products.length === 0) {
        const noProductRow = document.createElement('tr');
        noProductRow.innerHTML = `
                <td colspan="5">
                <div class = "no-product">
                    <img src="/img/sadPizza.png" alt="">
                    <p>No Products Available</p>
                </div>
                </td>
        `;
        adminTable.appendChild(noProductRow);
        return;
    } else{
        products.forEach(product => {
            const productRow = document.createElement('tr');
            
            productRow.innerHTML = `
                <td><img src="${product.productURL}" alt="${product.name}" class = "product-image"></td>
                <td class = "product-name">${product.name}</td>
                <td class="price">${product.price}</td>
                <td><span class = "category">${product.category}</span></td>
                <td class="description">${product.description}</td>
            `;
    
            adminTable.appendChild(productRow);
        });
    }
};

//DISPLAY ALL DELIVERIES
const deliveryDisplay = (deliveries) => {
    console.log("i entered here")
    adminTable.innerHTML = `
        <tr>
            <th>Delivery ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Amount</th>
            <th>Status</th>
        </tr>
    `;
    if (deliveries.length === 0) {
        const noProductRow = document.createElement('tr');
        noProductRow.innerHTML = `
                <td colspan="5">
                <div class = "no-product">
                    <img src="/img/sadPizza.png" alt="">
                    <p>No Deliveries Available</p>
                </div>
                </td>
        `;
        adminTable.appendChild(noProductRow);
        return;
    } else{
        deliveries.forEach(product => {
            const productRow = document.createElement('tr');
            
            productRow.innerHTML = `
                <td></td>
                <td class = "product-name">${deliveries.name}</td>
                <td class="price">${deliveries.price}</td>
                <td><span class = "category">${pdeliveries.category}</span></td>
                <td class="description">${deliveries.description}</td>
            `;
    
            adminTable.appendChild(productRow);
        });
    }
};

selection.onclick = function(){
    categories.classList.toggle("active");
}

options.forEach(option => {
    option.onclick = () => {
        selected_text.innerHTML = option.innerHTML;
        categories.classList.toggle("active");
        filteredDisplay(selected_text.textContent);
    }
});

const filteredDisplay = (category) => {
    const searchText = searchInput.value.toLowerCase();
    let filteredProducts = products;

    if (category !== 'All') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    if (searchText){
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchText));
    }
    productDisplay(filteredProducts);
}

searchInput.addEventListener('input', () => {
    filteredDisplay(selected_text.textContent);
});

//LOG IN
btnLogIn.addEventListener('click',async (e)=>{
    e.preventDefault();
    
    //NO INPUT IN USERNAME OR PASSWORD
    const username = admin.value;
    const pass = password.value;

    if(!username){
        lblUsername.innerHTML = "Username is Required"
        lblUsername.classList.remove('hidden-error')
        admin.classList.add('error')
        return
    }else{
        lblUsername.classList.add('hidden-error')
        admin.classList.remove('error')
    }

    if(!pass){
        lblPassword.innerHTML = "Password is Required"
        lblPassword.classList.remove('hidden-error')
        password.classList.add('error')
        return
    }else{
        lblPassword.classList.add('hidden-error')
        password.classList.remove('error')
    }
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
        localStorage.setItem('isLoggedIn', 'true'); // Save login state
        localStorage.setItem('products', 'true');
        showAdminPanel();
    } else {
        lblUsername.innerHTML = "Incorrect Username / Password. Please Try Again!"
        lblUsername.classList.remove('hidden-error')
        admin.classList.add('error')
        password.classList.add('error')
        return
    }
})

//LOG OUT
logOutButton.addEventListener('click', () =>{
    localStorage.removeItem('isLoggedIn');
    loginPanel.classList.remove('hidden');
    adminPanel.classList.add('hidden');
    logOutButton.classList.add('hidden');
    productButton.classList.add('hidden')
    deliveryButton.classList.add('hidden')
    admin.value = ''
    password.value = ''
})

//SHOW PRODUCTS THROUGH BUTTON
productButton.addEventListener('click', (e)=>{
    localStorage.setItem('products', 'true');
    showAdminPanel()
});

deliveryButton.addEventListener('click', (e) =>{
    localStorage.setItem('products', 'false');
    showAdminPanel()
})

//SHOW ADD NEW PRODUCT FORM
addProductButton.addEventListener('click',()=>{
    addProduct.classList.remove('hidden');
})

//CHANGING THE IMAGE TEXT
function updateFileName() {
    const fileInput = document.getElementById('add-image');
    const fileNameDisplay = document.querySelector('.file-name');
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    fileNameDisplay.textContent = fileName;
}

//UPLOAD DETAILS
document.getElementById('add-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('add-image');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', document.getElementById('add-name').value);
    formData.append('price', document.getElementById('add-price').value);
    formData.append('description', document.getElementById('add-description').value);
    formData.append('category', document.getElementById('add-category').value);
    formData.append('image_name', file.name);

    try {
        const response = await fetch('/admin/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if(result.success){
            alert(result.message);
            addProduct.classList.add('hidden');
            showAdminPanel();
        }
    } catch (error) {
        console.log('Error uploading file and data:', error);
    }
});

//CLOSE FORM
document.getElementById('add-close').addEventListener('click',()=>{
    addProduct.classList.add('hidden');
});
