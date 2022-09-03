/* Preloader */
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

/* Smooth scroll */
const smoothLinks = document.querySelectorAll("a[href^='#']");
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute("href");

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}

/* Cart functional */

const cartContainer = document.querySelector('.cart-content');
const cartItems = cartContainer.children;

const accessoriesForms = document.querySelectorAll('.accessories-form');

const cartItemTemplate = document.querySelector('#cart-item-template').content;
const newCartItemTemplate = cartItemTemplate.querySelector('.cart-item');

const cartPlug = document.querySelector('.plug');

/* Delete CartItem */

if (cartContainer.children.length <= 1) {
	cartPlug.classList.add('plug-on');
}

for (let i = 0; i < accessoriesForms.length; i++) {
	accessoriesForms[i].addEventListener('submit', function (evt) {
		evt.preventDefault();

		const accessoriesItemColor = accessoriesForms[i].querySelector('.radio-color:checked');
		const accessoriesItemPrice = accessoriesForms[i].querySelector('.accessories-price');
		const accessoriesItemButton = accessoriesForms[i].querySelector('.accessories-submit');
	
		const itemColorContent = accessoriesItemColor.value;
		const itemPriceContent = accessoriesItemPrice.textContent;
		const itemNameContent = accessoriesItemButton.value;
		
		let newCartItem = newCartItemTemplate.cloneNode(true);
		let newCartItemName = newCartItem.querySelector('.cart-item-name');
		let newCartItemColor = newCartItem.querySelector('.cart-item-color');
		let newCartItemPrice = newCartItem.querySelector('.cart-item-price');

		newCartItemName.textContent = itemNameContent;
		newCartItemPrice.textContent = itemPriceContent;
		newCartItemColor.textContent = itemColorContent;

		if (itemNameContent == 'Apple Pencil') {
			newCartItem.querySelector('.item-color').style.display = "none";
		};

		cartContainer.appendChild(newCartItem);

		/* Delete CartItem */

		let deleteCartItem = function(cartItem) {
			if (cartItem.tagName != 'TEMPLATE') {
			let closeButton = cartItem.querySelector('.close-button');
			closeButton.addEventListener('click', function () {
				cartItem.remove();
				accessoriesItemButton.setAttribute("disabled", false);
		
				if (cartContainer.children.length <= 1) {
					cartPlug.classList.add('plug-on');
				}
			});
			}
		};

		/*Stylization */

		accessoriesItemButton.setAttribute("disabled", true);

		if (cartContainer.children.length > 1) {
			cartPlug.classList.remove('plug-on');
		};

		for (let i = 0; i < cartItems.length; i++) {
			deleteCartItem(cartItems[i]);
		};
	});
};