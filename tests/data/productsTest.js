import { findProduct } from "../../scripts/data/products.js";

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