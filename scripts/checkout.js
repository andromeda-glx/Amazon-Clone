import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
import { renderCheckoutHeader } from "./Checkout/checkout-header.js";
// import "./data/car.js";
// import "./backend-practice.js";
import { loadProductsFetch } from "./data/products.js";
import { loadCart, loadCartFetch } from "./data/cart.js";

/* async is a shortcut for promises */
// await lets us write asynchronous code like normal code. we can replace .then() at the end of a promise, with await at the front of the promise. (await loadProducts). we can use await only in an asynch function.
async function loadPage() {
    try{
        // await loadProductsFetch();
        // await loadCartFetch();

        await Promise.all([
            loadProductsFetch(),
            loadCartFetch()
        ]);
    }
    catch(error){
        console.log('There was a problem loading the page. Please refresh or try again later.');
    }
    
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
asynch returns a promise. it's a shortcut for the code below.

reject() is a function that enables us to use errors asynchronously
function loadPage(){
    return new Promise((resolve, reject) => {
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

// loadProductsFetch().then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// loadProducts(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
// });