const products = [
    {
        image: './images/products/athletic-cotton-socks-6-pairs.jpg',
        name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        rating: {
            stars: 45,
            counts: 87
        },
        priceCents: 1090
    },

    {
        image: './images/products/intermediate-composite-basketball.jpg',
        name: 'Intermediate Size Basketball',
        rating: {
            stars: 40,
            counts: 127
        },
        priceCents: 2095
    },

    {
        image: './images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
        name: 'Adults Plain Cotton T-Shirt - 2 Pack',
        rating: {
            stars: 45,
            counts: 56
        },
        priceCents: 799
    },

    {
        image: './images/products/black-2-slot-toaster.jpg',
        name: '2 Slot Toaster - Black',
        rating: {
            stars: 50,
            counts: 2197
        },
        priceCents: 1899
    },

    {
        image: './images/products/6-piece-white-dinner-plate-set.jpg',
        name: '6 Piece White Dinner Plate Set',
        rating: {
            stars: 40,
            counts: 37
        },
        priceCents: 2067
    }
];

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
                    <img class="product-rating-star" src="./images/ratings/rating-${product.rating.stars}.png" alt="">
                    <div class="product-rating-num">${product.rating.counts}</div>
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