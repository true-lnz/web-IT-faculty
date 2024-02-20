let arrow_btn = document.querySelector(".arrow-btn");
let links = document.querySelectorAll('.site-navigation li a');

window.addEventListener("scroll", function() {
	const scrollPos = 40;
	const header = document.querySelector('.site-navbar');

	const scrollPosition = () => document.documentElement.scrollTop || this.window.pageXOffset;
	const containActive = () => header.classList.contains('active');

	if (scrollPosition() > scrollPos && !containActive()) {
		header.classList.add('active');
	} 
	else if (scrollPosition() < scrollPos && containActive()) {
		header.classList.remove('active');
	}

	// Arrow Up logic
	if (scrollPosition() > 300) {
		arrow_btn.setAttribute('style', 'display: block;')
	}
	if (scrollPosition() < 500) {
		arrow_btn.setAttribute('style', 'display: none;')
	}

})

links.forEach(function(link) {
	link.addEventListener('mouseenter', function() {
			links
	})
})

arrow_btn.onclick = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
	arrow_btn.setAttribute('style', 'display: none;')
}

function showLangSelector() {
	let LangSelector = document.querySelector(".lang-selector");
	LangSelector.classList.toggle("active");
}
