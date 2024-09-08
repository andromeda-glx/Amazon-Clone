import { cart, deleteCartItem, getCartTotalQuantity, updateProductQuantity, updateDeliveryOptionId} from '../../data/cart.js';
import { products, findProduct } from '../../data/products.js';
import convertCentsToDollars from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import { deliveryOptions } from '../../data/delivery-options.js';
import { renderPaymentSummary } from './payment-summary.js';

let productTypeIndex;

function generateOrderSummaryHTML() {
    const orderItemsHTML = document.querySelector('.js-order-items');
    orderItemsHTML.innerHTML = '';

    cart.forEach(cartItem => {
        const product = findProduct(cartItem.id);
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryDate = '';

        deliveryOptions.forEach(opt => {
            if (opt.id === deliveryOptionId)
                deliveryDate = opt;
        });

        orderItemsHTML.innerHTML += `
                <div class="order-item">
                    <h3>Delivery Date: ${calcDeliveryDate(deliveryDate.deliveryDays)}</h3>
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
                                ${generateDeliveryOptions(productTypeIndex, cartItem.deliveryOptionId)}
                        </div>
                    </div>
                </div>
        `;
        productTypeIndex++;
    });
}

function generateDeliveryOptions(productTypeIndex, deliveryOptId) {
    let deliveryOpritonsHTML = '';
    let deliveryPrice = 0;
    deliveryOptions.forEach(deliveryOption => {
        deliveryPrice = deliveryOption.deliveryPriceCents === 0 ? 'FREE' : `$${convertCentsToDollars(deliveryOption.deliveryPriceCents)} -`;

        deliveryOpritonsHTML += `
            <div class="item-delivery-option">
                <input class="js-radio-btn" type="radio" name="option${productTypeIndex}" ${deliveryOption.id === deliveryOptId ? 'checked' : ''} data-product-index="${productTypeIndex}" data-delivery-id="${deliveryOption.id}">
                <div class="delivery-time-price">
                    <div class="delivery-time">
                        ${calcDeliveryDate(deliveryOption.deliveryDays)}
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
            const {productIndex, deliveryId} = radio.dataset;
            updateDeliveryOptionId(Number(productIndex), deliveryId)
            renderOrderSummary();
        })
    });
}

function calcDeliveryDate(numberOfDays) {
    return dayjs().add(numberOfDays, 'day').format('dddd, MMMM D');
}

function updateItemsNumber() {
    document.querySelector('.js-total-products-number').innerHTML = getCartTotalQuantity();
}

function addDeleteEventListener() {
    document.querySelectorAll('.js-item-delete').forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
            const productIndex = deleteLink.dataset.productIndex;

            deleteCartItem(Number(productIndex));
            renderOrderSummary();
        });
    });
}

export function renderOrderSummary() {
    productTypeIndex = 0;
    generateOrderSummaryHTML();
    updateItemsNumber();
    addDeleteEventListener();
    addUpdateEventListener();
    addRadioEventListener();
    
    renderPaymentSummary();
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
                renderOrderSummary();
            });
        }
    });
}

function addInputEventListener(productIndex) {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (event) => {
            if (event.key === "Enter") {
                const inputValue = input.value;

                updateProductQuantity(Number(productIndex), Number(inputValue));
                renderOrderSummary();
            }
        });
    });
}