/* Integration test: testing many units/pieces of code working together */

import { renderOrderSummary } from "../../scripts/Checkout/order-summary.js";
import { cart } from "../../scripts/data/cart.js";
import { loadProducts } from "../../scripts/data/products.js";

describe('test suite: generateOrderSummaryHTML', () => {
    /* Hooks let us run some code fore each test */
    /* beforeEach Hook, will run its parameter function before each test */
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    /* beforeAll Hook, will reun its parameter function before all the test (1 time)*/
    /* done() is a Jasmine function which will stop the code compilation process until its called */
    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML =
        `
            <div class="js-checkout-header"></div>
            <div class="js-order-items"></div>
            <div class="js-order-payment-summary"></div>
        `;

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: productId2,
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        cart.loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        /* removes the generated HTML in the test result for clean-up purposes */
        document.querySelector('.js-test-container').innerHTML = ``;
    });



    it('displays orders', () => {

        expect(
            document.querySelectorAll('.order-item').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-item-quantity-${productId1}`).innerHTML
        ).toEqual('Quantity: 2');

        expect(
            document.querySelector(`.js-item-quantity-${productId2}`).innerText
        ).toEqual('Quantity: 1');

        expect(document.querySelector(`.js-item-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        
        expect(document.querySelector(`.js-item-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
        
        expect(document.querySelector(`.js-item-price-${productId2}`).innerText).toEqual('$20.95');
        expect(document.querySelector(`.js-item-price-${productId1}`).innerText).toEqual('$10.90');
    });

    it('removes an item', () => {

        /* click(), 'clicks' an element for us*/
        document.querySelector(`.js-item-delete-${productId1}`).click();

        expect(
            document.querySelectorAll('.order-item').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-order-item-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-order-item-${productId2}`)
        ).not.toEqual(undefined);

        expect(
            document.querySelector(`.js-order-item-${productId2}`)
        ).not.toEqual(null);

        expect(
            cart.cartItems.length
        ).toEqual(1);

        expect(
            cart.cartItems[0].productId
        ).toEqual(productId2);

        expect(document.querySelector(`.js-item-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

        expect(document.querySelector(`.js-item-price-${productId2}`).innerText).toEqual('$20.95');
    });

    it('updates delivery option', () => {
        const deliveryBtn = document.querySelector(`.js-delivery-option-${productId1}-3`);

        deliveryBtn.click();

        expect(deliveryBtn.checked).toEqual(true);
        expect(cart.cartItems.length).toEqual(2);

        expect(cart.cartItems[0].productId).toEqual(productId1);
        expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
        expect(cart.cartItems[1].productId).toEqual(productId2);
        expect(cart.cartItems[1].deliveryOptionId).toEqual('2');

        expect(document.querySelector('.js-total-shipping-price').innerText).toEqual('$14.98');
        expect(document.querySelector('.js-total-price-with-tax').innerText).toEqual('$63.50');
    });
});



/* instead of duplicated codes that we use for each test case, we can use hooks to run the duplicated codes before each test case. */

/* we cleaned-up our code below using hooks to share duplicated codes */

// it('displays orders', () => {

//     const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
//     const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
//     spyOn(localStorage, 'setItem');
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//         return JSON.stringify([
//             {
//                 id: productId1,
//                 quantity: 1,
//                 deliveryOptionId: '1'
//             },
//             {
//                 id: productId2,
//                 quantity: 2,
//                 deliveryOptionId: '2'
//             }
//         ]);
//     });
//     loadFromStorage();

//     renderOrderSummary();

//     expect(
//         document.querySelectorAll('.order-item').length
//     ).toEqual(2);

//     expect(
//         document.querySelector(`.js-item-quantity-${productId1}`).innerHTML
//     ).toEqual('Quantity: 1');

//     expect(
//         document.querySelector(`.js-item-quantity-${productId2}`).innerText
//     ).toEqual('Quantity: 2');

//     /* removes the generated HTML in the test result for clean-up purposes */
//     document.querySelector('.js-test-container').innerHTML = ``;
// });

// it('removes an item', () => {
//     document.querySelector('.js-test-container').innerHTML =
//         `
//         <div class="js-checkout-header"></div>
//         <div class="js-order-items"></div>
//         <div class="js-order-payment-summary"></div>
//     `;

//     const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
//     const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
//     spyOn(localStorage, 'setItem');
//     spyOn(localStorage, 'getItem').and.callFake(() => {
//         return JSON.stringify([
//             {
//                 id: productId1,
//                 quantity: 1,
//                 deliveryOptionId: '1'
//             },
//             {
//                 id: productId2,
//                 quantity: 2,
//                 deliveryOptionId: '2'
//             }
//         ]);
//     });
//     loadFromStorage();

//     renderOrderSummary();

//     /* click(), 'clicks' an element for us*/
//     document.querySelector(`.js-item-delete-${productId1}`).click();

//     expect(
//         document.querySelectorAll('.order-item').length
//     ).toEqual(1);

//     expect(
//         document.querySelector(`.js-order-item-${productId1}`)
//     ).toEqual(null);

//     expect(
//         document.querySelector(`.js-order-item-${productId2}`)
//     ).not.toEqual(undefined);

//     expect(
//         document.querySelector(`.js-order-item-${productId2}`)
//     ).not.toEqual(null);

//     expect(
//         cart.length
//     ).toEqual(1);

//     expect(
//         cart[0].id
//     ).toEqual(productId2);

//     /* removes the generated HTML in the test result for clean-up purposes */
//     document.querySelector('.js-test-container').innerHTML = ``;
// });