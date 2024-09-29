export function generateDefaultHeader() {
    document.querySelector('header').innerHTML = `
        <div class="header-left-section">
            <a class="header-link" href="./index.html">
                <img class="amazon-home-logo" src="./images/amazon-logo-white.png" alt="">
                <img class="amazon-home-logo-sm" src="./images/amazon-mobile-logo-white.png" alt="">
            </a>
        </div>
        <div class="header-middle-section">
            <input class="search-bar" type="text" placeholder="Search Amazon Clone">
            <button class="search-btn">
                <img class="search-icon" src="./images/icons/search-icon.png" alt="">
            </button>
        </div>
        <div class="header-right-section">
            <a class="header-link" href="./orders.html">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
            </a>

            <a class="header-link cart-section" href="./checkout.html">
                <img class="cart-logo" src="./images/icons/cart-icon.png" alt="">
                <span class="cart-quantity js-cart-quantity">0</span>
                <div class="cart-text">Cart</div>
            </a>
        </div>
        <div class="hamburger-btn">
            <img src="./images/icons/hamburger-menu.png" alt="">
        </div>
    `;
}