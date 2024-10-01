export let orders = [];

export function addToOrders(order){
    /* unshift() adds an item to the front of the array */
    orders.unshift(order);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function loadOrders(){
    if (localStorage.getItem('orders')){
        orders = JSON.parse(localStorage.getItem('orders')).map(item => {
            return new Order(item);
        });
    }
}

export function findOrder(orderId) {
    for(let i = 0; i < orders.length; i++){
        if(orders[i].id === orderId){
            return orders[i];
        }
    }
}

class Order{
    id;
    orderTime;
    totalCostCents;
    products;

    constructor(orderDetails){
        this.id = orderDetails.id;
        this.orderTime = orderDetails.orderTime;
        this.totalCostCents = orderDetails.totalCostCents;
        this.products = orderDetails.products;
    }

    getProduct(productId){
        for(let i = 0; i < this.products.length; i++){
            if (this.products[i].productId === productId){
                return this.products[i];
            }
        }
    }
}