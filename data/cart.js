export const cart = [];

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