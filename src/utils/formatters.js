export const formatPrice = price => {
  const [whole, decimal] = parseFloat(price).toFixed(2).split('.')
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return { whole: formattedWhole, decimal: decimal === '00' ? null : decimal }
}
