import { cart, addProductToTheCart, loadFromStorage } from "../../scripts/data/cart.js";

describe('test suite: addToCart', () => {
    it('increses the quantity of an existing product in the cart', () => {
        /* (5) a Mock only lasts for one test case. so we need to mock the methods here as well. */
        spyOn(localStorage, 'setItem');
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        addProductToTheCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('1');
    });

    it('adds a new product to the cart', () => {
        /* (3) since addProductToCart() saves the progress into localStorage using localStorage.setItem(), this test will affect our website. so we need to fake out localStorage.setItem() for our test as well. now when we add a product to our 'fake' cart, the saving progress will be a fake one too.*/
        spyOn(localStorage, 'setItem');

        /* (1) we don't want the cart in the real website affect our test. so we Mock it. here we're faking localStorage.getItem() to return an empty array. */
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // return null;
            return JSON.stringify([]);
        });

        /* (2) although we faked localStorage.getItem(), the cart is still loaded before that. so the cart is already loaded from localStorage. here we're re-loading the car from the localStorage but this time localStorage.getItem() has been faked. */
        loadFromStorage();

        addProductToTheCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.length).toEqual(1);
        /* (4) with this code, we can see how many times localStorage.setItem was called. */
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
    });
});

/* Integration test: testing many units/pieces of code working together */