

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