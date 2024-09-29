import { cart } from "../data/cart.js";
import { findDeliveryOption } from "../data/delivery-options.js";
import { findProduct } from "../data/products.js";
import convertCentsToDollars from "../utils/money.js";
import { addToOrders, orders } from "../data/orders.js";

export function renderPaymentSummary() {
    generatePaymentSummaryHTML();
}

function generatePaymentSummaryHTML() {
    let paymentSummaryHTML = document.querySelector('.js-order-payment-summary');

    const totalItemsPriceCents = getCartTotalPrice();
    const totalShippingPriceCents = getCartTotalShippingPrice();

    const totalPriceCents = totalItemsPriceCents + totalShippingPriceCents;
    const taxRate = 0.1;
    const taxAmount = totalPriceCents * taxRate;

    const totalPriceWithTaxCents = totalPriceCents + taxAmount;

    paymentSummaryHTML.innerHTML =
        `
        <h3 class="order-summary-title">Order Summary</h3>
        <div class="order-summary-row">
            <div>Items (${cart.getCartTotalQuantity()}):</div>
            <div class="price-row">$${convertCentsToDollars(totalItemsPriceCents)}</div>
        </div>
        <div class="order-summary-row">
            <div>Shipping & handling:</div>
            <div class="price-row js-total-shipping-price">$${convertCentsToDollars(totalShippingPriceCents)}</div>
        </div>
        <div class="order-summary-row total-before-tax">
            <div>Total before tax:</div>
            <div class="price-row">$${convertCentsToDollars(totalPriceCents)}</div>
        </div>
        <div class="order-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="price-row">$${convertCentsToDollars(taxAmount)}</div>
        </div>
        <div class="order-summary-row order-total">
            <div>Order total:</div>
            <div class="price-row js-total-price-with-tax">$${convertCentsToDollars(totalPriceWithTaxCents)}</div>
        </div>

        <button class="place-your-order-btn js-place-your-order-btn">
            Place your order
        </button>
    `;

    document.querySelector('.js-place-your-order-btn')
        .addEventListener('click', async () => {
            try {
                const respons = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart.cartItems
                    })
                });

                const order = await respons.json();
                addToOrders(order);
                cart.clear();
            }
            catch(error){
                console.log('Unexpected error. Try again later.');   
            }

            /* changes the current page to a different URL */
            window.location.href = 'orders.html';
    })
}

function getCartTotalPrice() {
    let total = 0;
    cart.cartItems.forEach(cartItem => {
        let itemQuantity = cartItem.quantity;
        let itemPrice = findProduct(cartItem.productId).priceCents;

        total += itemQuantity * itemPrice;
    });

    return total;
}

function getCartTotalShippingPrice() {
    let total = 0;
    cart.cartItems.forEach(cartItem => {
        let { deliveryOptionId } = cartItem;
        let deliveryOption = findDeliveryOption(deliveryOptionId);

        total += deliveryOption.deliveryPriceCents;
    });
    return total;
}