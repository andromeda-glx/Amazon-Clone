import { generateDefaultHeader } from "./utils/amazon-default-header.js";
import { updateCartQuantity } from "./utils/update-cart-quantity.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
import { findOrder, loadOrders } from "./data/orders.js";
import { findProduct, loadProductsFetch } from "./data/products.js";

renderTrackingPage();

async function renderTrackingPage() {
    await loadProductsFetch();
    loadOrders();

    generateDefaultHeader();
    updateCartQuantity();
    generateOrderItem();
}

function generateOrderItem(){
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const orderItemHTML = document.querySelector('.js-order-item');

    const order = findOrder(orderId);
    const product = findProduct(productId);
    const productDeliveryDetails = order.getProduct(productId);
    const quantity = productDeliveryDetails.quantity;
    const deliveryDate = productDeliveryDetails.estimatedDeliveryTime;

    orderItemHTML.innerHTML = 
    `
        <h2>Arriving on ${dayjs(deliveryDate).format('dddd, MMMM D')}</h2>
        <div class="order-name">
            ${product.name}
        </div>
        <div class="order-quantity">
            Quantity: ${quantity}
        </div>
        <div class="order-img">
            <img src="${product.image}" alt="">
        </div>
    `;

    generateOrderStatus(order.orderTime, deliveryDate);
}

function generateOrderStatus(orderTime, deliveryDate){
    const orderStatusHTML = document.querySelector('.js-order-status');

    const hoursPast = dayjs().diff(orderTime, 'h');
    const hoursLeft = dayjs(deliveryDate).diff(orderTime, 'h');
    
    let statusPercentage = Math.ceil(hoursPast / hoursLeft * 100);

    if (statusPercentage < 0){
        statusPercentage = 0;
    }
    else if(statusPercentage > 100){
        statusPercentage = 100;
    }

    orderStatusHTML.innerHTML = 
    `
        <div class="status-titles">
            <div class="status-title-preparing">Preparing</div>
            <div class="status-title-shipped">Shipped</div>
            <div class="status-title-delivered">Delivered</div>
        </div>

        <div class="status-progress-bar">
            <div class="status-progress-completed" style="width: ${statusPercentage}%;">
            </div>
        </div>
    `;

    if (statusPercentage >= 0 && statusPercentage < 50){
        document.querySelector('.status-title-preparing').classList.add('current-status-title');
    }
    else if(statusPercentage >= 50 && statusPercentage < 100){
        document.querySelector('.status-title-shipped').classList.add('current-status-title');
    }
    else{
        document.querySelector('.status-title-delivered').classList.add('current-status-title');
    }
}