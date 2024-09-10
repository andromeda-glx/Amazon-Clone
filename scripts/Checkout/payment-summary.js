import { cart, getCartTotalQuantity } from "../data/cart.js";
import { findDeliveryOption } from "../data/delivery-options.js";
import { findProduct } from "../data/products.js";
import convertCentsToDollars from "../utils/money.js";

export function renderPaymentSummary(){
    generatePaymentSummaryHTML();
}

function generatePaymentSummaryHTML(){
    let paymentSummaryHTML = document.querySelector('.order-payment-summary');

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
            <div>Items (${getCartTotalQuantity()}):</div>
            <div class="price-row">$${convertCentsToDollars(totalItemsPriceCents)}</div>
        </div>
        <div class="order-summary-row">
            <div>Shipping & handling:</div>
            <div class="price-row">$${convertCentsToDollars(totalShippingPriceCents)}</div>
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
            <div class="price-row">$${convertCentsToDollars(totalPriceWithTaxCents)}</div>
        </div>

        <button class="place-your-order-btn">
            Place your order
        </button>
    `;
}

function getCartTotalPrice(){
    let total = 0;
    cart.forEach(cartItem => {
        let itemQuantity = cartItem.quantity;
        let itemPrice = findProduct(cartItem.id).priceCents;

        total += itemQuantity * itemPrice;
    });

    return total;
}

function getCartTotalShippingPrice() {
    let total = 0;
    cart.forEach(cartItem => {
        let {deliveryOptionId} = cartItem;
        let deliveryOption = findDeliveryOption(deliveryOptionId);

        total += deliveryOption.deliveryPriceCents;
    });
    return total;
}