generateDataStructureHTML();

function generateDataStructureHTML(){
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
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
    });

    productsContainer.innerHTML = productsString;
}