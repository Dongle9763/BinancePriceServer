const prices = new Map<string, string>();

export const setPrice = (symbol: string, price: string) => {
    prices.set(symbol.toLowerCase(), price);
};

export const getPrice = (symbol: string) => {
    return prices.get(symbol.toLowerCase());
};
