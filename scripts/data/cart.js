import { deliveryOptions } from "./delivery-options.js";

export class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveCartToLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addProductToTheCart(productId, quantity) {
        let isFound = false;

        this.cartItems.forEach(item => {
            if (item.productId === productId) {
                item.quantity += quantity;
                isFound = true;
            }
        });

        if (!isFound) {
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }

        this.saveCartToLocalStorage();
    }

    deleteCartItem(itemId) {
        this.cartItems.forEach((product, index) => {
            if (product.productId === itemId)
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
            if (productId === item.productId) {
                if (quantity >= 0 && quantity < 1000) {
                    this.cartItems[index].quantity = quantity;
                    this.saveCartToLocalStorage();
                }
            }
        });
    }

    updateDeliveryOptionId(productId, newId) {
        this.cartItems.forEach((item, index) => {
            if (item.productId === productId) {
                if (Number(newId) > 0 && Number(newId) <= deliveryOptions.length) {
                    this.cartItems[index].deliveryOptionId = newId;
                    this.saveCartToLocalStorage();
                }
            }
        });
    }

    clear(){
        this.cartItems = [];
        this.saveCartToLocalStorage();
    }
}

export const cart = new Cart('cart');

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);

        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const cart = await response.text();
    console.log(cart);
    return cart;
}

/* results in a boolean value */
// console.log(businessCart instanceof Cart);