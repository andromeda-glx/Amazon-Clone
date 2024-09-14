import { cart } from '../data/cart.js';
import { findProduct } from '../data/products.js';
import convertCentsToDollars from '../utils/money.js';
import { deliveryOptions, calculateDeliveryDate } from '../data/delivery-options.js';
import { renderPaymentSummary } from './payment-summary.js';
import { renderCheckoutHeader } from './checkout-header.js';

export function generateOrderSummaryHTML() {
    
    const orderItemsHTML = document.querySelector('.js-order-items');
    orderItemsHTML.innerHTML = '';

    cart.cartItems.forEach(cartItem => {
        const product = findProduct(cartItem.id);
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryDate = '';

        deliveryOptions.forEach(opt => {
            if (opt.id === deliveryOptionId)
                deliveryDate = opt;
        });

        orderItemsHTML.innerHTML += `
                <div class="order-item js-order-item-${product.id}">
                    <h3>Delivery Date: ${calculateDeliveryDate(deliveryDate.deliveryDays)}</h3>
                    <div class="order-details-grid">
                        <img class="item-img" src="${product.image}" alt="">
                        <div class="item-details-${product.id}">
                            <div class="item-name js-item-name-${product.id}">${product.name}</div>
                            <div class="item-price js-item-price-${product.id}">$${convertCentsToDollars(product.priceCents)}</div>
                            <div class="item-quantity js-item-quantity-${product.id}">Quantity: ${cartItem.quantity}</div>
                            <div class="item-update-delete">
                                <span class="item-update primary-link" data-product-id="${product.id}">Update</span>
                                <input class="quantity-input js-quantity-input-${product.id}" type="text">
                                <span class="save-quantity-link primary-link" data-product-id="${product.id}">Save</span>
                                <span class="item-delete primary-link js-item-delete js-item-delete-${product.id}" data-product-id="${product.id}">Delete</span>
                            </div>
                        </div>
                        <div class="item-delivery-options">
                            <p>Choose a delivery option:</p>
                                ${generateDeliveryOptions(product.id, cartItem.deliveryOptionId)}
                        </div>
                    </div>
                </div>
        `;
    });

    
}

function generateDeliveryOptions(productId, deliveryOptId) {
    let deliveryOpritonsHTML = '';
    let deliveryPrice = 0;
    deliveryOptions.forEach(deliveryOption => {
        deliveryPrice = deliveryOption.deliveryPriceCents === 0 ? 'FREE' : `$${convertCentsToDollars(deliveryOption.deliveryPriceCents)} -`;

        deliveryOpritonsHTML += `
            <div class="item-delivery-option">
                <input class="js-radio-btn js-delivery-option-${productId}-${deliveryOption.id}" type="radio" name="option${productId}" ${deliveryOption.id === deliveryOptId ? 'checked' : ''} data-product-id="${productId}" data-delivery-id="${deliveryOption.id}">
                <div class="delivery-time-price">
                    <div class="delivery-time">
                        ${calculateDeliveryDate(deliveryOption.deliveryDays)}
                    </div>
                    <div class="delivery-price">
                        ${deliveryPrice} Shipping
                    </div>
                </div>
            </div>`
    });

    return deliveryOpritonsHTML;
}

function addRadioEventListener(){
    document.querySelectorAll('.js-radio-btn').forEach(radio => {
        radio.addEventListener('change', () =>{
            const {productId, deliveryId} = radio.dataset;
            cart.updateDeliveryOptionId(productId, deliveryId)
            renderOrderSummary();
        })
    });
}

function addDeleteEventListener() {
    document.querySelectorAll('.js-item-delete').forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;

            cart.deleteCartItem(productId);
            renderOrderSummary();
        });
    });
}

export function renderOrderSummary() {
    generateOrderSummaryHTML();
    addDeleteEventListener();
    addUpdateEventListener();
    addRadioEventListener();
    
    renderPaymentSummary();
    renderCheckoutHeader();
}

function addUpdateEventListener() {
    const updateProductHTML = document.querySelectorAll('.item-update');

    updateProductHTML.forEach(updateText => {
        updateText.addEventListener('click', () => {
            const productId = updateText.dataset.productId;
            const itemContainer = document.querySelector(`.item-details-${productId}`);
            itemContainer.classList.add('is-editing-quantity');

            addSaveEventListener(productId);
            addInputEventListener(productId);
        });
    });
}

function addSaveEventListener(productId) {
    document.querySelectorAll('.save-quantity-link').forEach(saveLink => {
        if (productId === saveLink.dataset.productId) {
            saveLink.addEventListener('click', () => {
                const inputValue = document.querySelector(`.js-quantity-input-${productId}`).value;

                cart.updateProductQuantity(productId, Number(inputValue));
                renderOrderSummary();
            });
        }
    });
}

function addInputEventListener(productId) {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                const inputValue = input.value;

                cart.updateProductQuantity(productId, Number(inputValue));
                renderOrderSummary();
            }
        });
    });
}