import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
import { renderCheckoutHeader } from "./Checkout/checkout-header.js";
// import "./data/car.js";
// import "./backend-practice.js";
import { loadProductsFetch } from "./data/products.js";

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