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
                <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
                <div class="product-quantity">
                    <select>
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
                <button class="add-to-cart-btn js-add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
    });

    productsContainer.innerHTML = productsString;
}

function addToCartEventListener() {
    document.querySelectorAll('.js-add-to-cart-btn')
        .forEach((btn) => {
            btn.addEventListener('click', () => {
                addProductToTheCart(btn.dataset.productId, 1);
            });
        });
}

function addProductToTheCart(id, quantity) {
    let isFound = false;

    cart.forEach(item => {
        if (item.id === id) {
            item.quantity += quantity;
            isFound = true;
        }
    });

    if (!isFound) {
        cart.push({
            id,
            quantity
        });
    }

    updateCartQuantity();
}

function updateCartQuantity() {
    let totalQuantity = 0;
    if (cart.length){
        cart.forEach(item => totalQuantity += item.quantity);
    }
    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
}