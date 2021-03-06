// Animate navbar items
const animateMenuItems = (duration1 = 500, duration2 = 200, offset = 200) => {
	const menuItems = document.querySelectorAll('.header__nav .header__item');

	if (menuItems) {
		menuItems.forEach((item) => {
			const spans = item.querySelectorAll('span');
			if (spans.length !== 2) return;

			item.addEventListener('mouseover', () => {
				spans[0].style.cssText = `animation: navbar-item-slide ${duration1}ms ease-in-out;`;
				spans[1].style.cssText = `transition: ${duration2}ms ease-in-out ${duration1 + offset}ms; transform: translateX(-40%)`;

				setTimeout(() => {
					spans[0].style.cssText = `animation: none;`;
				}, duration1);
			});

			item.addEventListener('mouseout', () => {
				spans[1].style.cssText = `transition: ${duration2}ms ease-in-out; transform: translateX(calc(-100% - 5px))`;
			});
		});
	}
}

// Animate text typing
class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.isDeleting = false;
	}

	type = () => {
		// current index of word
		const current = this.wordIndex % this.words.length;
		// get full text of current word
		const fulltxt = this.words[current];
		
		// check if deleting
		if (this.isDeleting) {
			// remove char
			this.txt = fulltxt.substring(0, this.txt.length - 1);	
		}
		else {
			// add char
			this.txt = fulltxt.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.txtElement.innerHTML = ` <span class="txt">${this.txt}</span>`;

		// type speed
		let typeSpeed = 100;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		// if word is complete
		if (!this.isDeleting && this.txt === fulltxt) {
			// make pause at the end
			typeSpeed = this.wait;
			this.isDeleting = true;
		}
		else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			// next word
			this.wordIndex++;
			// pause before typing
			typeSpeed = 500;
		}

		setTimeout(this.type, typeSpeed);
	}
}

// terminal typing
const animateTerminalTyping = () => {
	const txtElement = document.querySelector('.terminal .txt-type');
	if (!txtElement) return;

	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	// init typing
	const typer = new TypeWriter(txtElement, words, wait);
	typer.type();
}

// parallax on the homepage banner
const animateBannerWithParallax = () => {
	const thresholdWidth = 1200;
	const scene = document.getElementById('scene-1');

	if (!scene) return;

	let parallaxInstance = new Parallax(scene, {
		hoverOnly: true,
		invertX: true
	});

	const terminal = document.querySelector('.about__term');
	const picture = document.querySelector('.about__picture');
	const wrapper  = document.querySelector('.about__wrapper');

	window.addEventListener("resize", (e) => {
		if (window.innerWidth < thresholdWidth) {
			parallaxInstance.disable();

			terminal.classList.add('no-parallax');
			picture.classList.add('no-parallax');
			wrapper.classList.add('no-parallax');
		}
		else {
			parallaxInstance.enable();
			
			terminal.classList.remove('no-parallax');
			picture.classList.remove('no-parallax');
			wrapper.classList.remove('no-parallax');
		}
	});

	if (window.innerWidth < thresholdWidth) {
		parallaxInstance.disable();

		terminal.classList.add('no-parallax');
		picture.classList.add('no-parallax');
		wrapper.classList.add('no-parallax');
	}
	else {
		parallaxInstance.enable();
		
		terminal.classList.remove('no-parallax');
		picture.classList.remove('no-parallax');
		wrapper.classList.remove('no-parallax');
	}
}

// tilt on the projects
const animateProjectsTilt = () => {
	const projects = document.querySelectorAll('.projects__block');

	if (!projects) return;

	const thresholdWidth = 1200;
	// init tilt js
	const params = {
		scale: 1.1,
		reverse: true,
		max: 10,
		perspective: 1400,
		speed: 200
	}

	projects.forEach((project) => {
		VanillaTilt.init(project, params);
	});

	window.addEventListener('resize', () => {

		if (window.innerWidth < thresholdWidth) {	
			projects.forEach((project) => {
				if (project.vanillaTilt) {
					project.vanillaTilt.destroy();
				}
			});
		}
		else {
			projects.forEach((project) => {
				VanillaTilt.init(project, params);
			});
		}
	});

	if (window.innerWidth < thresholdWidth) {	
		projects.forEach((project) => {
			if (project.vanillaTilt) {
				project.vanillaTilt.destroy();
			}
		});
	}
	else {
		projects.forEach((project) => {
			VanillaTilt.init(project, params);
		});
	}
}

// animate tags
const animateTagsPopin = () => {
	// animation for tags
	const projects = document.querySelectorAll('.projects__tags');
	if (!projects) return;

	const delay = 0.05;

	projects.forEach((item) => {
		for(let i = 0; i < item.children.length; i++) {
			item.children[i].style.transitionDelay = `${i * delay}s`;
		}
	});
}

const setAnimations = () => {
	// call functions
	animateMenuItems(500, 200, 200);
	animateTerminalTyping();
	animateBannerWithParallax();
	animateProjectsTilt();
	animateTagsPopin();
}

document.addEventListener('DOMContentLoaded', setAnimations);