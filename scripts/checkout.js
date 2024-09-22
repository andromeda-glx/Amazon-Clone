import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
import { renderCheckoutHeader } from "./Checkout/checkout-header.js";
// import "./data/car.js";
// import "./backend-practice.js";
import { loadProducts, loadProductsFetch } from "./data/products.js";

/* async is a shortcut for promises */
// await lets us write asynchronous code like normal code. we can replace .then() at the end of a promise, with await at the front of the promise. (await loadProducts). we can use await only in an asynch function.
async function loadPage() {
    console.log('load page');

    await loadProductsFetch();
    
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

/*
asynch returns a promise. it's a shortcut for the code below.

function loadPage(){
    return new Promise((resolve) => {
        resolve();
    });
}
*/

/* resolve() lets us control when to go to the next step. (then())*/
// new Promise((resolve) => {
//     loadProductsFetch(() => {
//         resolve();
//     });
// }).then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// Promise.all([
//     loadProductsFetch(),
//     new Promise... ,
//     new Promise... ,
//     ...
// ]).then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

loadProductsFetch().then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});

// loadProducts(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });