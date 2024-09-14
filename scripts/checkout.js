import { renderOrderSummary } from "./Checkout/order-summary.js";
import { renderPaymentSummary } from "./Checkout/payment-summary.js";
import { renderCheckoutHeader } from "./Checkout/checkout-header.js";
import "./data/cart-class.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();