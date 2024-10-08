import { cart } from './data/cart.js';
import { products, loadProducts } from './data/products.js';
import { updateCartQuantity } from "./utils/update-cart-quantity.js";
import { generateDefaultHeader } from "./utils/amazon-default-header.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    generateDefaultHeader();
    generateDataStructureHTML();
    addToCartEventListener();
    updateCartQuantity();
}

function generateDataStructureHTML() {
    const url = new URL(window.location.href);
    const searchParam = url.searchParams.get('search');
    let filteredList = products;

    if(searchParam){
        filteredList = products.filter(product => {
            return product.name.toLowerCase().includes(searchParam.toLowerCase()) || product.keywords.includes(searchParam.toLowerCase());
        });
    }

    const productsContainer = document.querySelector('.js-products-grid');
    let productsString = '';

    filteredList.forEach(product => {
        productsString += `
        
            <div class="product-c">
                <div class="product-img-c">
                    <img class="product-img" src="${product.image}" alt="">
                </div>
                <div class="product-title limit-line">
                    ${product.name}
                </div>
                <div class="product-rating-c">
                    <img class="product-rating-star" src="${product.getStarsURL()}" alt="">
                    <div class="product-rating-num">${product.getRatingCount()}</div>
                </div>
                <div class="product-price">$${product.getPrice()}</div>
                <div class="product-quantity">
                <select class="js-quantity-selector-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                ${product.getExtraHTMLInfo()}
                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    <div>Added</div>
                </div>
                <div class="add-to-cart-btn-container">
                    <button class="add-to-cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
    });

    productsContainer.innerHTML = productsString;
}

function addToCartEventListener() {
    document.querySelectorAll('.js-add-to-cart-btn')
        .forEach((btn) => {
            let timeOut;
            btn.addEventListener('click', () => {
                const productId = btn.dataset.productId;
                const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

                addedMessage.classList.add('added-to-cart-visible');
                clearTimeout(timeOut);

                timeOut = setTimeout(() => {
                    addedMessage.classList.remove('added-to-cart-visible');
                }, 2000);

                cart.addProductToTheCart(productId, getProductQuantity(productId));

                updateCartQuantity();
            });
        });
}

function getProductQuantity(productId) {
    return Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
}