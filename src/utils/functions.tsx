export function formatCurrency(money: number, opt?: ConstructorParameters<Intl.NumberFormatConstructor>[1]) {
  return new Intl.NumberFormat('en-GB', {currency: 'GBP', style: 'currency', ...opt}).format(money)
}
