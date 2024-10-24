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

document.querySelectorAll('.favorite i').forEach(heart => {
    heart.addEventListener('click', function() {
        // Toggle between outlined and filled heart icons
        if (this.classList.contains('bx-heart')) {
            this.classList.remove('bx-heart');
            this.classList.add('bxs-heart', 'active');
        } else {
            this.classList.remove('bxs-heart', 'active');
            this.classList.add('bx-heart');
        }
    });
});