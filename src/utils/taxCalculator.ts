export function calculateTax(taxableAmount: number, taxRate: number = 0.05): number {
        return taxableAmount * taxRate;
};

export function calculateTaxOnProfit(saleRate: number, buyRate: number,quantity: number, taxRate: number = 0.15): number {
        const profit = (saleRate - buyRate) * quantity;
    if (profit > 0) {
        return profit * taxRate;
    }
    return 0;
};
