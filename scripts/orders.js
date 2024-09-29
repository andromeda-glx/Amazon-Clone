import { updateCartQuantity } from "./utils/update-cart-quantity.js";
import { generateDefaultHeader } from "./utils/amazon-default-header.js";
import { orders } from "./data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import convertCentsToDollars from "./utils/money.js";
import { findProduct, loadProductsFetch } from "./data/products.js";

renderOrdersPage();

async function renderOrdersPage(){
    await loadProductsFetch();

    generateDefaultHeader();
    updateCartQuantity();
    generateOrdersHTML();
}

function generateOrdersHTML() {
    const ordersGridElement = document.querySelector('.js-orders-grid');

    orders.forEach(order => {
        console.log(order);
        
        ordersGridElement.innerHTML += 
        `
            <div class="order-c">
                <div class="order-header">
                    <div class="order-header-left-section order-header-section">
                        <div class="order-header-title">Order Placed:</div>
                        <div>${formatDeliveryDate(order.orderTime)}</div>
                    </div>
                    <div class="order-header-middle-section order-header-section">
                        <div class="order-header-title">Total:</div>
                        <div>$${convertCentsToDollars(order.totalCostCents)}</div>
                    </div>
                    <div class="order-header-right-section order-header-section">
                        <div class="order-header-title">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
                <div class="order-body">
                    ${generateOrderItems(order.products)}
                </div>
            </div>
        `
    });
}

function formatDeliveryDate(deliveryDate) {
    return dayjs(deliveryDate).format('MMM D');
}

function generateOrderItems(orderItems){
    let orderItemsHTML = '';

    orderItems.forEach(item => {
        let product = findProduct(item.productId);
        orderItemsHTML += 
        `
            <div class="order-item">
                <div class="order-item-img">
                    <img src="${product.image}" alt="">
                </div>
                <div class="order-item-details">
                    <div class="order-name">${product.name}</div>
                    <div class="order-delivery-time">
                        Arriving on: ${formatDeliveryDate(item.estimatedDeliveryTime)}
                    </div>
                    <div class="order-quantity">
                        Quantity: ${item.quantity}
                    </div>
                    <div class="order-rebuy-btn">
                        <button>
                            <img src="./images/icons/buy-again.png" alt="">
                            <div>Buy it again</div>
                        </button>
                    </div>
                </div>
                <div class="order-item-track-btn">
                    <a href="./tracking.html?orderId=123&productId=456">
                        <button>Track package</button>
                    </a>
                </div>
            </div>
        `
    });

    return orderItemsHTML;
}