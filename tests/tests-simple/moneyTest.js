/* 
    This is an automated testing, meaning that we use code to test code.
    This way of testing our code is much more efficient and more foolproof than Manual Testing, which involves us interacting with our interface to test different scenarioes.
*/

import convertCentsToDollars from "../../scripts/utils/money.js";

function convertCentsToDollarsTest(priceCents, expectation) {
    let result = convertCentsToDollars(priceCents);
    let testResult =  result === expectation ? `Passed` : `Faild`;

    testResult += ` (${priceCents})\nExpectation: ${expectation} -> Result: ${result}`;

    return testResult;
}

/* We group our related test cases into different test suites */
console.log('%c***** Test Suite: Format Currency *****', 'color: magenta');

/* These are called test cases */
console.log('%c===== Converts cents into dollars =====', 'color: cyan');
console.log(convertCentsToDollarsTest(2095, '20.95'));
console.log(convertCentsToDollarsTest(20005, '200.05'));

console.log('%c===== works with negative number =====', 'color: cyan');
console.log(convertCentsToDollarsTest(-2095, '0.00'));

console.log('%c===== works with 0 =====', 'color: cyan');
console.log(convertCentsToDollarsTest(0, '0.00'));

console.log('%c===== rounds up to nearest cent =====', 'color: cyan');
console.log(convertCentsToDollarsTest(2000.5, '20.01'));
console.log(convertCentsToDollarsTest(2000.4, '20.00'));