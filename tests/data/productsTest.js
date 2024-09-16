import { findProduct, Product, Clothing, Appliance } from "../../scripts/data/products.js";

describe('test suite: findProduct', () => {
    const productId = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

    it('finds an existign product with a valid id', () => {
        const product = findProduct(productId);

        expect(product).not.toEqual(null);
        expect(product.id).toEqual(productId);
    })

    it('does not find a product with invalid id', () => {
        const product = findProduct('invalid-product-id');

        expect(product).toEqual(null);
    })
});

describe('test suite: productClass', () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090
        });
    });

    it('has the correct properties', () => {
        expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.image).toEqual("images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(product.name).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");
        expect(product.rating).toEqual({
            stars: 4.5,
            count: 87
        });
        expect(product.priceCents).toEqual(1090);
    });

    it('gets the stars URL', () => {
        expect(product.getStarsURL()).toEqual('./images/ratings/rating-45.png');
    });

    it('gets the rating count', () => {
        expect(product.getRatingCount()).toEqual(87);
    });

    it('gets the price', () => {
        expect(product.getPrice()).toEqual('10.90');
    });

    it('does not display ant extra info', () => {
        expect(product.getExtraHTMLInfo()).toEqual('');
    });
});

describe('test suit: clothingClass', () => {
    let product;

    beforeEach(() => {
        product = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });

    it('has the correct properties', () => {
        expect(product.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(product.image).toEqual("images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg");
        expect(product.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
        expect(product.rating).toEqual({
            stars: 4.5,
            count: 56
        });
        expect(product.priceCents).toEqual(799);
        expect(product.sizeChartLink).toEqual("images/clothing-size-chart.png");
    });

    it('gets the stars URL', () => {
        expect(product.getStarsURL()).toEqual('./images/ratings/rating-45.png');
    });

    it('gets the rating count', () => {
        expect(product.getRatingCount()).toEqual(56);
    });

    it('gets the price', () => {
        expect(product.getPrice()).toEqual('7.99');
    });

    it('displays a size chart link inside the HTML element', () => {
        expect(product.getExtraHTMLInfo()).toContain('<a href="../images/clothing-size-chart.png" target="_blank">');

        expect(product.getExtraHTMLInfo()).toContain('Size chart');
    });
});

describe('test suite: applianceClass', () => {
    let product;
    beforeEach(() => {
        product = new Appliance({
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            instructionsLink: 'images/appliance-instructions.png',
            warrantyLink: 'images/appliance-warranty.png'
        });
    });

    it('has the correct properties', () => {
        expect(product.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
        expect(product.image).toEqual("images/products/black-2-slot-toaster.jpg");
        expect(product.name).toEqual("2 Slot Toaster - Black");
        expect(product.rating).toEqual({
            stars: 5,
            count: 2197
        });
        expect(product.priceCents).toEqual(1899);
        expect(product.instructionsLink).toEqual("images/appliance-instructions.png");
        expect(product.warrantyLink).toEqual('images/appliance-warranty.png');
    });

    it('gets the stars URL', () => {
        expect(product.getStarsURL()).toEqual('./images/ratings/rating-50.png');
    });

    it('gets the rating count', () => {
        expect(product.getRatingCount()).toEqual(2197);
    });

    it('gets the price', () => {
        expect(product.getPrice()).toEqual('18.99');
    });

    it('displays instructions link and warranty link inside the HTML element', () => {
        expect(product.getExtraHTMLInfo()).toContain('<a href="../images/appliance-instructions.png" target="_blank">');

        expect(product.getExtraHTMLInfo()).toContain('<a href="../images/appliance-warranty.png" target="_blank">');

        expect(product.getExtraHTMLInfo()).toContain('Instructions');
        expect(product.getExtraHTMLInfo()).toContain('Warranty');
    });
});