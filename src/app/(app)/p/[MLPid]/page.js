import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'

async function getProduct(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
      { cache: 'no-store' },
    )
    const data = await response.json()
    return data.product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

function formatTitlePrice(price) {
  const [whole, decimal] = parseFloat(price).toFixed(2).split('.')
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return decimal === '00' ? formattedWhole : `${formattedWhole}.${decimal}`
}

export async function generateMetadata({ params }) {
  const productId = params.MLPid.replace('MLP', '')
  const product = await getProduct(productId)

  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  const mainImage =
    product.photos?.[0]?.url || '/profile_avatar_placeholder.png'

  const formattedPrice = formatTitlePrice(product.price)

  return {
    title: `${product.title} - $ ${formattedPrice}`,
    description: product.description || 'Sin descripción',
    openGraph: {
      title: product.title,
      description: product.description || 'Sin descripción',
      images: [mainImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description || 'Sin descripción',
      images: [mainImage],
    },
  }
}

export default async function ProductPage({ params }) {
  const productId = params.MLPid.replace('MLP', '')
  const initialProduct = await getProduct(productId)

  if (!initialProduct) {
    notFound()
  }

  return <ProductDetail initialProduct={initialProduct} />
}
