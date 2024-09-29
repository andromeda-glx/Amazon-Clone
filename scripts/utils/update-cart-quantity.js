import { cart } from "../data/cart.js";


export function updateCartQuantity(){
    document.querySelector('.js-cart-quantity').innerHTML = cart.getCartTotalQuantity();
}