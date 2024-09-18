import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
import { renderCheckoutHeader } from "./Checkout/checkout-header.js";
// import "./data/car.js";
// import "./backend-practice.js";
import { loadProducts } from "./data/products.js";

loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});