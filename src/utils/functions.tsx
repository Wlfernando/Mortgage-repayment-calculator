export function formatCurrency(money: number) {
  return new Intl.NumberFormat('en-GB', {currency: 'GBP', style: 'currency'}).format(money)
}
