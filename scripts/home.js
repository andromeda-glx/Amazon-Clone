import {cart, addProductToTheCart, getCartTotalQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { convertCentsToDollars } from './utils/money.js';

generateDataStructureHTML();
addToCartEventListener();
updateCartQuantity();

function generateDataStructureHTML() {
    const productsContainer = document.querySelector('.js-products-grid');
    let productsString = '';

    products.forEach(product => {
        productsString += `
        
            <div class="product-c">
                <div class="product-img-c">
                    <img class="product-img" src="${product.image}" alt="">
                </div>
                <div class="product-title">
                    ${product.name}
                </div>
                <div class="product-rating-c">
                    <img class="product-rating-star" src="./images/ratings/rating-${product.rating.stars * 10}.png" alt="">
                    <div class="product-rating-num">${product.rating.count}</div>
                </div>
                <div class="product-price">$${convertCentsToDollars(product.priceCents)}</div>
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
                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    <div>Added</div>
                </div>
                <button class="add-to-cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
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

                addProductToTheCart(productId, getProductQuantity(productId));

                updateCartQuantity();
            });
        });
}

function getProductQuantity(productId){
    return Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
}

function updateCartQuantity() {
    document.querySelector('.js-cart-quantity').innerHTML = getCartTotalQuantity();
}