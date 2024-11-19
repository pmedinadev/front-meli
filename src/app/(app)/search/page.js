import SearchResults from './SearchResults'

export async function generateMetadata({ searchParams }) {
  const query = searchParams.q

  return {
    title: query ? `${query} | Mercado Libre 📦` : 'Mercado Libre',
  }
}

export default function SearchPage() {
  return <SearchResults />
}
