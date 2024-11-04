function showSignup() {
    document.getElementById('login-form').classList.add("hidden");
    document.getElementById('signup-form').classList.remove("hidden");
}

function showLogin() {
    document.getElementById('login-form').classList.remove("hidden");
    document.getElementById('signup-form').classList.add("hidden");
}

//GET SIGN UP DATA
const signUp = document.getElementById('signup-forms');
const logIn = document.getElementById('login-button');

signUp.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(signUp);
    const data = Object.fromEntries(formData.entries());
    
    // Concatenate address fields into a single address string
    data.address = `${data.street}, ${data.barangay}, ${data.city}, ${data.province}`;

    // Remove individual address fields if only `address` is needed
    delete data.street;
    delete data.barangay;
    delete data.city;
    delete data.province;

    console.log(data);

    const response = await fetch('/login/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Optionally handle response here
    const result = await response.json();
    alert(result);
});

logIn.addEventListener("click", async (e) =>{
    e.preventDefault()

    const username = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;

    const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: pass })
    });

    const result = await response.json();

    if (result.success) {
        // Store the token in localStorage or a cookie
        localStorage.setItem('token', result.token);
        // Redirect to homePage.html
        window.location.href = '/';
    } else {
        alert(result.message);
    }
})