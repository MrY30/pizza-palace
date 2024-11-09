let userID
window.addEventListener('load', async(e)=>{
    e.preventDefault()

    const res = await fetch('/getUserData');
    const userData = await res.json();
    userID = userData.userId

    displayUser(userData)

    console.log(userID)
    const ordersRes = await fetch(`/profile/${userID}`);
    const ordersData = await ordersRes.json();
    if (ordersData.success === false) {
        console.log("Message:", ordersData.message);
    } else {
        console.log("Orders:", ordersData.rows);
    }

})

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

