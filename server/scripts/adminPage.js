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