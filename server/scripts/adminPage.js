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
const productDisplay = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/admin/products');
    const products = await res.json();

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
        noProductRow.innerHTML = '<td colspan="5">No Products Available</td>';
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
    }else{
        lblUsername.classList.add('hidden-error')
        admin.classList.remove('error')
    }

    if(!pass){
        lblPassword.innerHTML = "Password is Required"
        lblPassword.classList.remove('hidden-error')
        password.classList.add('error')
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
        loginPanel.classList.add('hidden')
        adminPanel.classList.remove('hidden')

        productDisplay(e);
    } else {
        lblUsername.innerHTML = "Account Not Found"
        lblUsername.classList.remove('hidden-error')
        admin.classList.add('error')
        password.classList.add('error')
    }
})

//SHOW PRODUCTS THROUGH BUTTON
productButton.addEventListener('click',productDisplay);

//SHOW ADD NEW PRODUCT FORM
const addProductButton = document.getElementById('add-product-button');
const addProduct = document.getElementById('add-product');
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
            productDisplay(e);
        }
    } catch (error) {
        console.log('Error uploading file and data:', error);
    }
});

//CLOSE FORM
document.getElementById('add-close').addEventListener('click',()=>{
    addProduct.classList.add('hidden');
});