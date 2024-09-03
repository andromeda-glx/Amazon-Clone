export const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
            quantity
        });
    }
}

export function deleteCartItem(itemIndex) {
    cart.splice(itemIndex, 1);
}