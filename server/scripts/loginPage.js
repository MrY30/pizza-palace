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

logIn.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = '/'
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred. Please try again.');
    }
});