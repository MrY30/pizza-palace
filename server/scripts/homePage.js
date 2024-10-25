const header = document.querySelector("header");

window.addEventListener("scroll", function(){
	header.classList.toggle("sticky", window.scrollY > 0);

})

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
	menu.classList.toggle('bx-x');
	navbar.classList.toggle('open');
}

window.onscroll = () => {
	menu.classList.remove('bx-x');
	navbar.classList.remove('open');
}

const sr = ScrollReveal ({
	distance: '30px', 
	duration: 2500,
	reset: true
})
sr.reveal('.home-text',{delay:200, origin:'left'});
sr.reveal('.home-img',{delay:200, origin:'right'});
sr.reveal('.container, .about, .menu, .contact',{delay:200, origin:'bottom'});

//DISPLAY PRODUCTS TO MENU
const menuArea = document.getElementById("menu-content");
const getProduct = async () => {
    const res = await fetch('/admin/products');
    const products = await res.json();

	return products;
}
const displayMenu = (products) => {



    products.forEach(product => {
        menuArea.innerHTML += `
            <div class="row">
				<div class="image-frame">
					<img src="${product.productURL}" alt="${product.name}">
				</div>
				<div class="menu-text">
					<div class="menu-left">
						<h4>${product.name}</h4>
					</div>
					<div class="menu-right">
						<h5>$${product.price}</h5>
					</div>
				</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, magnam.</p>
				<div class="favorite">
					<i class='bx bx-heart' ></i>
				</div>
			</div>
        `;
    });
};

getProduct().then(products => {
    displayMenu(products);
}).catch(error => {
    console.error("Error fetching products:", error);
});

// document.querySelectorAll('.favorite i').forEach(heart => {
//     heart.addEventListener('click', function() {
//         // Toggle between outlined and filled heart icons
//         if (this.classList.contains('bx-heart')) {
//             this.classList.remove('bx-heart');
//             this.classList.add('bxs-heart', 'active');
//         } else {
//             this.classList.remove('bxs-heart', 'active');
//             this.classList.add('bx-heart');
//         }
//     });
// });

// Attach event listener to the parent container (menuArea)
menuArea.addEventListener('click', function(e) {
    if (e.target.classList.contains('bx-heart') || e.target.classList.contains('bxs-heart')) {
        // Toggle between outlined and filled heart icons
        const heart = e.target;
        if (heart.classList.contains('bx-heart')) {
            heart.classList.remove('bx-heart');
            heart.classList.add('bxs-heart', 'active');
        } else {
            heart.classList.remove('bxs-heart', 'active');
            heart.classList.add('bx-heart');
        }
    }
});
