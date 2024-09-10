import { cart, addProductToTheCart } from "../../scripts/data/cart.js";

describe('test suite: addToCart', () => {
    it('increses the quantity of an existing product in the cart', () => {

    });

    it('adds a new product to the cart', () => {
        addProductToTheCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
    });
});