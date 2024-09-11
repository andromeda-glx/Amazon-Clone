import { renderOrderSummary } from "../../scripts/Checkout/order-summary.js";
import { loadFromStorage } from "../../scripts/data/cart.js";

describe('test suite: generateOrderSummaryHTML', () => {
    it('displays orders', () => {
        document.querySelector('.js-test-container').innerHTML =
        `
            <div class="js-checkout-header"></div>
            <div class="js-order-items"></div>
            <div class="js-order-payment-summary"></div>
        `;

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
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
        document.querySelector('.js-test-container').innerHTML =
            `
            <div class="js-checkout-header"></div>
            <div class="js-order-items"></div>
            <div class="js-order-payment-summary"></div>
        `;

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
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

        /* click(), 'clicks' an element for us*/
        document.querySelector(`.js-item-delete-1`).click();

        expect(
            document.querySelectorAll('.order-item').length
        ).toEqual(1);
    });
});