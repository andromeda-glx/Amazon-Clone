import { deliveryOptions } from "./delivery-options.js";

class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    saveCartToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addProductToTheCart(id, quantity) {
        let isFound = false;

        this.cartItems.forEach(item => {
            if (item.id === id) {
                item.quantity += quantity;
                isFound = true;
            }
        });

        if (!isFound) {
            this.cartItems.push({
                id,
                quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveCartToLocalStorage();
    }

    deleteCartItem(itemId) {
        this.cartItemscart.forEach((product, index) => {
            if (product.id === itemId)
                this.cartItems.splice(index, 1);
        });

        this.saveCartToLocalStorage();
    }

    getCartTotalQuantity() {
        let totalQuantity = 0;
        this.cartItems.forEach(item => totalQuantity += item.quantity);

        return totalQuantity;
    }

    updateProductQuantity(productId, quantity) {
        this.cartItems.forEach((item, index) => {
            if (productId === item.id) {
                if (quantity >= 0 && quantity < 1000) {
                    this.cartItems[index].quantity = quantity;
                    this.saveCartToLocalStorage();
                }
            }
        });
    }

    updateDeliveryOptionId(productId, newId) {
        this.cartItems.forEach((item, index) => {
            if (item.id === productId) {
                if (Number(newId) > 0 && Number(newId) <= deliveryOptions.length) {
                    this.cartItems[index].deliveryOptionId = newId;
                    this.saveCartToLocalStorage();
                }
            }
        });
    }
}

let cart = new Cart('cart-oop');
cart.addProductToTheCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

let businessCart = new Cart('business-cart');
businessCart.addProductToTheCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 2);
businessCart.addProductToTheCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);

console.log(cart);
console.log(businessCart);

console.log(cart.getCartTotalQuantity());
console.log(businessCart.getCartTotalQuantity());

/* results in a boolean value */
console.log(businessCart instanceof Cart);


localStorage.clear();