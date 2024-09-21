import { cart } from "../data/cart.js";

export function renderCheckoutHeader() {
    generateCheckoutHeaderHTML();
}

function generateCheckoutHeaderHTML() {
    const headerHTML = document.querySelector('.js-checkout-header');
    
    headerHTML.innerHTML = 
    `            
        <div class="left-section">
            <a href="./index.html">
                <img class="amazon-logo" src="./images/amazon-logo.png" alt="">
                <img class="amazon-logo-sm" src="./images/amazon-mobile-logo.png" alt="">
            </a>
        </div>
        <div class="middle-section">
            Checkout (<a class="items-quantity-link" href="./index.html">
            <span class="js-total-products-number">${cart.getCartTotalQuantity()}</span> items</a> )
        </div>
        <div class="right-section">
            <img src="./images/icons/checkout-lock-icon.png" alt="">
        </div>
    `;
}