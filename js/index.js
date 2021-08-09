

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

if (modalButton) {
	window.addEventListener('click', (e) => {
		const matchedElement = e.target.closest('.header__modal-btn, .header__nav'); 
		
		if (!matchedElement) {
			if (menu) {
				menu.classList.remove('active');
			}

			if (modalButton) {
				modalButton.classList.remove('active');
			}
		}
	});
}