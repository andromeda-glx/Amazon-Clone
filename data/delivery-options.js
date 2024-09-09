import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export const deliveryOptions = 
[
    {
        id: '1',
        deliveryDays: 7,
        deliveryPriceCents: 0
    },
    {
        id: '3',
        deliveryDays: 5,
        deliveryPriceCents: 259
    },
    {
        id: '2',
        deliveryDays: 3,
        deliveryPriceCents: 499
    },
    {
        id: '4',
        deliveryDays: 1,
        deliveryPriceCents: 999
    }
];

export function findDeliveryOption(deliveryOptionId){
    for (const option of deliveryOptions) {
        if (option.id === deliveryOptionId)
            return option;
    }
}

export function calculateDeliveryDate(numberOfDays){
    let deliveryDate = dayjs();
    let workDays = 0;

    while (workDays !== numberOfDays){
        deliveryDate = deliveryDate.add(1, 'd');

        if (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday'){
            continue;
        }

        workDays++;
    }
    return deliveryDate.format('dddd, MMMM D');
}