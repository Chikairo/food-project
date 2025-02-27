export function formatCurrency(priceInNaira) {
  return (Math.round(priceInNaira) / 100).toFixed(2);
}
