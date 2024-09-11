export let cart;

loadFromStorage();

export function loadFromStorage(){
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

export function deleteCartItem(itemIndex) {
    cart.splice(itemIndex, 1);
    saveCartToLocalStorage();
}

function saveCartToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartTotalQuantity(){
    let totalQuantity = 0;
    cart.forEach(item => totalQuantity += item.quantity);
    return totalQuantity;
}

export function updateProductQuantity(productIndex, quantity){

    if (quantity >= 0 && quantity < 1000){
        cart[productIndex].quantity = quantity;
        saveCartToLocalStorage();
    }
    else{
        alert('Invalid quantity value.');
    }
}

export function updateDeliveryOptionId(productIndex, newId){
    cart[productIndex].deliveryOptionId = newId;
    saveCartToLocalStorage();
}