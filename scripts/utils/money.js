function convertCentsToDollars(cents) {
    if (cents >= 0)
        return (Math.round(cents) / 100).toFixed(2);
    else
        return '0.00';
}

export default convertCentsToDollars;