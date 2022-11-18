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

const productForms = document.querySelectorAll('.product-form');

const cartItemTemplate = document.querySelector('#cart-item-template').content;
const newCartItemTemplate = cartItemTemplate.querySelector('.cart-item');

const cartPlug = document.querySelector('.plug');

const cartSumm = document.querySelector('.cart-summ');
let cartSummContent = 0;

/* Delete CartItem */

if (cartContainer.children.length <= 1) {
	cartPlug.classList.add('plug-on');
}

for (let i = 0; i < productForms.length; i++) {
	productForms[i].addEventListener('submit', function (evt) {
		evt.preventDefault();

		const productItemColor = productForms[i].querySelector('.radio-color:checked');
		const productItemStorage = productForms[i].querySelector('.radio-storage:checked');
		const productItemPrice = productForms[i].querySelector('.product-price');
		const productItemButton = productForms[i].querySelector('.accessories-submit');
	
		const itemColorContent = productItemColor.value;
		let itemStorageContent = '';
		const itemPriceContent = productItemPrice.textContent;
		const itemNameContent = productItemButton.value;
		
		let newCartItem = newCartItemTemplate.cloneNode(true);
		let newCartItemName = newCartItem.querySelector('.cart-item-name');
		let newCartItemColor = newCartItem.querySelector('.cart-item-color');
		let newCartItemStorage = newCartItem.querySelector('.cart-item-storage');
		let newCartItemPrice = newCartItem.querySelector('.cart-item-price');

		if (productItemStorage != null) {
			itemStorageContent = productItemStorage.value;
			newCartItemStorage.textContent = itemStorageContent
		}

		newCartItemName.textContent = itemNameContent;
		newCartItemPrice.textContent = itemPriceContent;
		newCartItemColor.textContent = itemColorContent;

		if (itemNameContent == 'Apple Pencil') {
			newCartItem.querySelector('.item-color').style.display = "none";
		};

		cartContainer.appendChild(newCartItem);
		deleteCartItem(newCartItem);

		cartSummContent += parseFloat(itemPriceContent.slice(1));
		cartSumm.textContent = '$' + cartSummContent + '.00';


		/* Stylization */

		if (cartContainer.children.length > 1) {
			cartPlug.classList.remove('plug-on');
		};

		productItemButton.setAttribute("disabled", "");
	});
};

/* Delete CartItem */

let deleteCartItem = function(cartItem) {
	if (cartItem.tagName != 'TEMPLATE') {
		let closeButton = cartItem.querySelector('.close-button');
		closeButton.addEventListener('click', function () {

			let currentPriceContent = cartItem.querySelector('.cart-item-price').textContent;
			cartSummContent -= parseFloat(currentPriceContent.slice(1));
			cartSumm.textContent = '$' + cartSummContent + '.00';

			let currentNameContent = cartItem.querySelector('.cart-item-name').textContent;
			let currentAccessoriesItemButton = document.getElementById(currentNameContent);
			currentAccessoriesItemButton.removeAttribute("disabled");

			cartItem.remove();
	
			if (cartContainer.children.length <= 1) {
				cartPlug.classList.add('plug-on');
			}
		});
	}
};

let setIpadPrice = function (price) {
	const currentIpadPrice = document.querySelector('.ipad-price');
	currentIpadPrice.textContent = price;
};

let setIpadPic = function (picSrc) {	
	const currentIpadPic = document.querySelector('.ipad-pic');
	currentIpadPic.setAttribute('src', picSrc);
};