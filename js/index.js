
// animation for tags
const projects = document.querySelectorAll('.projects__tags');
const delay = 0.05;

projects.forEach((item) => {
	for(let i = 0; i < item.children.length; i++) {
		item.children[i].style.transitionDelay = `${i * delay}s`;
	}
});

// navbar modal window
const modalButton = document.querySelector('.header__modal-btn');
const menu = document.querySelector('.header__nav');
const menuItems = menu.querySelectorAll('a');

if (modalButton) {
	modalButton.addEventListener('click', () => {
		if (menu) {
			menu.classList.toggle('active');
		}

		if (modalButton) {
			modalButton.classList.toggle('active');
		}
	});
}

if (menuItems) {
	menuItems.forEach((item) => {
		item.addEventListener('click', () => {
			if (menu) {
				menu.classList.remove('active');
			}

			if (modalButton) {
				modalButton.classList.remove('active');
			}
		});
	});
}