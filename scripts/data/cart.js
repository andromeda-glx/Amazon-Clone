export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addProductToTheCart(id, quantity) {
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
            quantity,
            deliveryOptionId: '1'
        });
    }
    saveCartToLocalStorage();
}

export function deleteCartItem(itemId) {
    cart.forEach((product, index) => {
        if (product.id === itemId)
            cart.splice(index, 1);
    });

    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartTotalQuantity() {
    let totalQuantity = 0;
    cart.forEach(item => totalQuantity += item.quantity);
    return totalQuantity;
}

export function updateProductQuantity(productId, quantity) {

    cart.forEach((item, index) => {
        if (productId === item.id) {
            if (quantity >= 0 && quantity < 1000) {
                cart[index].quantity = quantity;
                saveCartToLocalStorage();
            }
            else {
                alert('Invalid quantity value.');
            }
        }
    });
}

export function updateDeliveryOptionId(productId, newId) {
    cart.forEach((item, index) => {
        if (item.id === productId)
            cart[index].deliveryOptionId = newId;        
    });

    saveCartToLocalStorage();
}