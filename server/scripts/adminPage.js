const admin = document.getElementById("admin-username")
const password = document.getElementById('admin-password')
const btnLogIn = document.getElementById('admin-button')

btnLogIn.addEventListener('click',()=>{
    console.log(admin.value)
})
const logIn = async () => {
    const res = await fetch('/admin/login')
}