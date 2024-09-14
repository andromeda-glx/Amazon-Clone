import { cart, addProductToTheCart, loadFromStorage, deleteCartItem, updateDeliveryOptionId } from "../../scripts/data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('increses the quantity of an existing product in the cart', () => {
        /* (5) a Mock only lasts for one test case. so we need to mock the methods here as well. */

        // spyOn(localStorage, 'setItem'); (moved into the beforeach hook)

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

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
        }])
        );
    });

    it('adds a new product to the cart', () => {
        /* (3) since addProductToCart() saves the progress into localStorage using localStorage.setItem(), this test will affect our website. so we need to fake out localStorage.setItem() for our test as well. now when we add a product to our 'fake' cart, the saving progress will be a fake one too.*/
        // spyOn(localStorage, 'setItem'); (moved into the beforeach hook)

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


        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});

describe('test suite: removeFromCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });

        loadFromStorage();
    });

    it('removes product from the cart', () => {
        deleteCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    it('removes non-product from the cart', () => {
        deleteCartItem('does-not-exist');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '2'
        }]));
    });
});

describe('test suite: updateDeliveryOptionId', () => {
    const productId = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                id: productId,
                quantity: 2,
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage();
    });

    it('updates product\'s delivery option id', () => {
        updateDeliveryOptionId(productId, '4');
        
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            id: productId,
            quantity: 2,
            deliveryOptionId: '4'
        }]));

        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual('4');
    })

    it('does not update product\'s invalid delivery option id', () => {
        updateDeliveryOptionId(productId, '0');
        
        expect(cart.length).toEqual(1);
        expect(cart[0].id).toEqual(productId);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).not.toEqual('0');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })

    it('does not update the delivery option id of a non-existing product', () => {
        updateDeliveryOptionId('non-existing-product-id', '4');

        expect(cart.length).not.toEqual(2);
        expect(cart[0].id).toEqual(productId);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).not.toEqual('4');
        
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});