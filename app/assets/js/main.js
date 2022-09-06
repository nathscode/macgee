const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");
var isToggled = true;

hamburger.addEventListener("click", toggleNav);
function toggleNav() {
	if (isToggled) {
		mobileNav.style.display = "flex";
	} else {
		mobileNav.style.display = "none";
	}
	isToggled = !isToggled;
}
