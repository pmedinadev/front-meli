'use client'

import { useCategories } from '@/hooks/useCategories'
import CardContainer from "@/components/layout/CardContainer"
import {
  DropdownItem,
  Spinner,
} from 'react-bootstrap'
import Link from 'next/link'

export default function CategoriesPage() {
  const { categories, loading, error } = useCategories()

  if (loading) return <Spinner animation="border" role="status" />
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="mt-5 m-5">
      <h5 className="m-5">Categorías para comprar y vender</h5>
      <CardContainer className="bg-body p-4 m-5">
        <div className="mt-3">
          {categories && categories.map((category, index) => (
            <div key={category.id}>
              <DropdownItem as={Link} href={`/category/${category.id}`}>
                <h6>{category.name}</h6>
              </DropdownItem>
              {index < categories.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </CardContainer>
    </div>
  )
}
