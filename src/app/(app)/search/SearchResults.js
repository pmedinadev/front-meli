'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import axios from '@/lib/axios'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import ProductCard from './ProductCard'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q')

  useEffect(() => {
    if (!query) {
      router.replace('/categories')
    }
  }, [query, router])

  const fetcher = url => axios.get(url).then(res => res.data.products)
  const { data: products, error } = useSWR(
    `/api/products/search?q=${encodeURIComponent(query)}`,
    fetcher,
  )

  if (error) return <div>Error loading results</div>
  if (!products) return <LoadingSpinner />

  return (
    <Container className="my-5">
      {products.length > 0 ? (
        <Row>
          <Col xs="3">
            <h4 className="mb-0">{query}</h4>
            <span className="fw-light">
              <small>
                {products.length} resultado{products.length !== 1 ? 's' : ''}
              </small>
            </span>
          </Col>
          <Col>
            <div className="bg-body">
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="text-center p-5">
                  <i className="bi bi-search fs-1 text-muted mb-3" />
                  <h5>No hay publicaciones que coincidan con tu búsqueda</h5>
                  <p className="text-muted">
                    Revisa la ortografía o usa términos más generales
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="bg-body rounded p-5 align-items-center mt-5">
          <Col xs="3" className="px-5 text-end">
            <Image
              src="/svgs/search-not-found.svg"
              width={80}
              height={80}
              alt="Publicación no encontrada"
            />
          </Col>
          <Col className="ps-3">
            <h5 className="mb-3">
              No hay publicaciones que coincidan con tu búsqueda
            </h5>
            <ul className="ps-3 mb-0">
              <small>
                <li>
                  <strong>Revisa la ortografía</strong> de la palabra.
                </li>
                <li>
                  Utiliza <strong>palabras más genéricas</strong> o menos
                  palabras.
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="link-underline link-underline-opacity-0 link-underline-opacity-100-hover">
                    Navega por las categorías
                  </Link>{' '}
                  para encontrar un producto similar.
                </li>
              </small>
            </ul>
          </Col>
        </Row>
      )}
    </Container>
  )
}
