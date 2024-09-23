export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addToOrders(order){
    /* unshift() adds an item to the front of the array */
    orders.unshift(order);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}