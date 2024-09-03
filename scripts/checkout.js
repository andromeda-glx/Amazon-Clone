import {cart, deleteCartItem} from '../data/cart.js';
import {products} from '../data/products.js';
import { convertCentsToDollars } from './utils/money.js';

let totalProductsNumber;
let productTypeIndex;
updateThePage();

function generateHTMLCode(){
    const orderItemsHTML = document.querySelector('.js-order-items');
    orderItemsHTML.innerHTML = '';

    cart.forEach(cartItem => {
        const product = findProduct(cartItem.id);
        orderItemsHTML.innerHTML += `
                <div class="order-item">
                    <h3>Delivery date: Tuesday June, 21</h3>
                    <div class="order-details-grid">
                        <img class="item-img" src="${product.image}" alt="">

                        <div class="item-details">
                            <div class="item-name">${product.name}</div>
                            <div class="item-price">$${convertCentsToDollars(product.priceCents)}</div>
                            <div class="item-quantity-update">
                                Quantity: ${cartItem.quantity}
                                <span class="item-update">Update</span>
                                <span class="item-delete js-item-delete" data-product-index="${productTypeIndex}">Delete</span>
                            </div>
                        </div>

                        <div class="item-delivery-options">
                            <p>Choose a delivery option:</p>
                            <div class="item-delivery-option">
                                <input type="radio" name="option${productTypeIndex}" checked id="">
                                <div class="delivery-time-price">
                                    <div class="delivery-time">Tuesday June, 21</div>
                                    <div class="delivery-price">FREE Shipping</div>
                                </div>
                            </div>
                            <div class="item-delivery-option">
                                <input type="radio" name="option${productTypeIndex}" id="">
                                <div class="delivery-time-price">
                                    <div class="delivery-time">Wednesday June, 15</div>
                                    <div class="delivery-price">$4.99 - Shipping</div>
                                </div>
                            </div>
                            <div class="item-delivery-option">
                                <input type="radio" name="option${productTypeIndex}" id="">
                                <div class="delivery-time-price">
                                    <div class="delivery-time">Monday June, 13</div>
                                    <div class="delivery-price">$9.99 - Shipping</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        productTypeIndex++;
        totalProductsNumber += cartItem.quantity;
    });
}

function updateItemsNumber(){
    document.querySelector('.js-total-products-number').innerHTML = totalProductsNumber;
}

function findProduct(productId) {
    for (let i = 0; i < products.length; i++){
        if (products[i].id === productId){
            return products[i];
        }
    }
    return null;
}

function addDeleteEventListener() {
    document.querySelectorAll('.js-item-delete').forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
            const productIndex = deleteLink.dataset.productIndex;
            
            deleteCartItem(Number(productIndex));
            updateThePage();
        });
    });
}

function updateThePage(){
    productTypeIndex = 0;
    totalProductsNumber = 0;
    generateHTMLCode();
    updateItemsNumber();
    addDeleteEventListener();

    localStorage.setItem('cart', JSON.stringify(cart));
}