import convertCentsToDollars from "../../scripts/utils/money.js";

/* describe function is a test suite */
/* it function is a test case */

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(convertCentsToDollars(2095)).toEqual('20.95');
        expect(convertCentsToDollars(20005)).toEqual('200.05');
    });

    it('works with 0', () => {
        expect(convertCentsToDollars(0)).toEqual('0.00');
    });

    it('works with negative numbers', () => {
        expect(convertCentsToDollars(-2095)).toEqual('0.00');
    });

    it('rounds up to nearest cent', () => {
        expect(convertCentsToDollars(2000.5)).toEqual('20.01');
    });

    it ('rounds down to the nearest cent', () => {
        expect(convertCentsToDollars(2000.4)).toEqual('20.00');
    });
});