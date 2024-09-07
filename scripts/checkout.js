import { cart, deleteCartItem, getCartTotalQuantity, updateProductQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { convertCentsToDollars } from './utils/money.js';

let productTypeIndex;
updateThePage();

function generateHTMLCode() {
    const orderItemsHTML = document.querySelector('.js-order-items');
    orderItemsHTML.innerHTML = '';

    cart.forEach(cartItem => {
        const product = findProduct(cartItem.id);
        orderItemsHTML.innerHTML += `
                <div class="order-item">
                    <h3>Delivery date: Tuesday June, 21</h3>
                    <div class="order-details-grid">
                        <img class="item-img" src="${product.image}" alt="">
                        <div class="item-details-${productTypeIndex}">
                            <div class="item-name">${product.name}</div>
                            <div class="item-price">$${convertCentsToDollars(product.priceCents)}</div>
                            <div class="item-quantity">Quantity: ${cartItem.quantity}</div>
                            <div class="item-update-delete">
                                <span class="item-update primary-link" data-product-index="${productTypeIndex}">Update</span>
                                <input class="quantity-input js-quantity-input-${productTypeIndex}" type="text">
                                <span class="save-quantity-link primary-link" data-product-index="${productTypeIndex}">Save</span>
                                <span class="item-delete primary-link js-item-delete" data-product-index="${productTypeIndex}">Delete</span>
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
    });
}

function updateItemsNumber() {
    document.querySelector('.js-total-products-number').innerHTML = getCartTotalQuantity();
}

function findProduct(productId) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
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

function updateThePage() {
    productTypeIndex = 0;
    generateHTMLCode();
    updateItemsNumber();
    addDeleteEventListener();
    addUpdateEventListener();
}

function addUpdateEventListener() {
    const updateProductHTML = document.querySelectorAll('.item-update');

    updateProductHTML.forEach(updateText => {
        updateText.addEventListener('click', () => {
            const productIndex = updateText.dataset.productIndex;
            const itemContainer = document.querySelector(`.item-details-${productIndex}`);
            itemContainer.classList.add('is-editing-quantity');

            addSaveEventListener(productIndex);
            addInputEventListener(productIndex);
        });
    });
}

function addSaveEventListener(productIndex) {
    document.querySelectorAll('.save-quantity-link').forEach(saveLink => {
        if (productIndex === saveLink.dataset.productIndex) {
            saveLink.addEventListener('click', () => {
                const inputValue = document.querySelector(`.js-quantity-input-${productIndex}`).value;

                updateProductQuantity(Number(productIndex), Number(inputValue));
                updateThePage();
            });
        }
    });
}

function addInputEventListener(productIndex) {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (event) =>{
            if (event.key === "Enter"){
                const inputValue = input.value;

                updateProductQuantity(Number(productIndex), Number(inputValue));
                updateThePage();
            }
        });
    });
}