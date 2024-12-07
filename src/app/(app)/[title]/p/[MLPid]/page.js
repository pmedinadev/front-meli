import ProductDetail from './ProductDetail'
import { notFound } from 'next/navigation'

async function getProduct(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`,
      { cache: 'no-store' },
    )
    const data = await response.json()

    if (!data.product || data.product?.status !== 'published') {
      return null
    }

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
  const { title, MLPid } = params
  const productId = MLPid.replace('MLP', '')
  const product = await getProduct(productId)

  if (!product || title !== product.slug) {
    return {
      title: 'Producto no disponible',
      description: 'Este producto no está disponible actualmente',
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
  const { title, MLPid } = params
  const productId = MLPid.replace('MLP', '')

  const product = await getProduct(productId)

  if (!product || title !== product.slug) {
    notFound()
  }

  return <ProductDetail initialProduct={product} />
}
