import { calculateSelectedShipping } from './shippingCalculator'

export const calculateTotals = (items, selectedIds, groupedItems) => {
  // Convertir los precios a números y multiplicarlos por la cantidad
  const subtotal = items
    .filter(item => selectedIds.includes(item.user_id))
    .reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  const shippingData = calculateSelectedShipping(groupedItems, selectedIds)

  // Asegurarse de que los valores sean números y sumarlos
  const total =
    parseFloat(subtotal) +
    (shippingData.allFree ? 0 : parseFloat(shippingData.cost))

  return {
    subtotal,
    shipping: shippingData,
    total,
  }
}

// Calcular la cantidad total de productos seleccionados
export const getTotalSelectedUnits = (items = [], selectedIds = []) => {
  return items
    .filter(item => selectedIds.includes(item.user_id))
    .reduce((sum, item) => sum + item.quantity, 0)
}

// Agrupar productos por vendedor
export const groupItemsBySeller = products => {
  return [...products]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .reduce((groups, product) => {
      const sellerId = product.user_id

      // Si el grupo no existe, crear nuevo grupo
      if (!groups[sellerId]) {
        groups[sellerId] = {
          seller: product.user,
          products: [],
          firstAdded: product.created_at,
        }
      }

      groups[sellerId].products.push(product)
      return groups
    }, [])
}
