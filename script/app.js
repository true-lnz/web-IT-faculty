var arrowContainer = document.querySelector('.arrow-container');
let links = document.querySelectorAll('.site-navigation li a');

window.addEventListener("scroll", function() {
	const scrollPos = 40;
	var scrollThreshold = 1200;
	const header = document.querySelector('.site-navbar');

	const scrollPosition = () => document.documentElement.scrollTop || this.window.pageXOffset;
	const containActive = () => header.classList.contains('active');

	if (scrollPosition() > scrollPos && !containActive()) {
		header.classList.add('active');
	} 
	else if (scrollPosition() < scrollPos && containActive()) {
		header.classList.remove('active');
	}

	if (window.scrollY >= scrollThreshold) {
		arrowContainer.style.display = 'flex';
	} else {
		arrowContainer.style.display = 'none';
	}

})

links.forEach(function(link) {
	link.addEventListener('mouseenter', function() {
			links
	})
})

function showLangSelector() {
	let LangSelector = document.querySelector(".lang-selector");
	LangSelector.classList.toggle("active");
}
