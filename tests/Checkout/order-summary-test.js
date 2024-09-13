/* Integration test: testing many units/pieces of code working together */

import { renderOrderSummary } from "../../scripts/Checkout/order-summary.js";
import { loadFromStorage, cart } from "../../scripts/data/cart.js";

describe('test suite: generateOrderSummaryHTML', () => {
    /* Hooks let us ren some code fore each test */
    /* beforeEach Hook, will run its parameter function before each test */
    let productId1;
    let productId2;

    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML =
        `
            <div class="js-checkout-header"></div>
            <div class="js-order-items"></div>
            <div class="js-order-payment-summary"></div>
        `;

        productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    id: productId1,
                    quantity: 1,
                    deliveryOptionId: '1'
                },
                {
                    id: productId2,
                    quantity: 2,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromStorage();

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
        ).toEqual('Quantity: 1');

        expect(
            document.querySelector(`.js-item-quantity-${productId2}`).innerText
        ).toEqual('Quantity: 2');
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
            cart.length
        ).toEqual(1);

        expect(
            cart[0].id
        ).toEqual(productId2);
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