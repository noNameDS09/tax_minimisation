export default function calculateTax(taxableAmount: number, taxRate: number = 0.15): number {
        return taxableAmount * taxRate;
}