import { deliveryOptions } from "./delivery-options.js";

class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveCartToLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
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

export const cart = new Cart('cart-oop');

/* results in a boolean value */
// console.log(businessCart instanceof Cart);