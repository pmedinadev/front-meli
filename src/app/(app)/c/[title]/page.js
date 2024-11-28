import CategoryDetail from './CategoryDetail'

export async function generateMetadata({ params }) {
  const title = params.title
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${title} en Mercado Libre`,
    description: `Encuentra lo que buscas en ${title}. Todo lo que necesitas lo consigues en un solo lugar, en Mercado Libre.`,
  }
}

export default function CategoriesPage() {
  return <CategoryDetail />
}
