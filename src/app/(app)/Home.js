'use client'

import {
  Card,
  CardBody,
  CardImg,
  Carousel,
  CarouselItem,
  Container,
} from 'react-bootstrap'
import CardContainer from '@/components/layout/CardContainer'
import { useProducts } from '@/hooks/useProducts'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LoadingSpinner from '@/components/layout/LoadingSpinner'

const items = [
  {
    src: '/images/ads/ad1.webp',
    alt: 'First slide',
  },
  {
    src: '/images/ads/ad2.webp',
    alt: 'Second slide',
  },
  {
    src: '/images/ads/ad3.webp',
    alt: 'Third slide',
  },
]

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { getProductsByCategory } = useProducts()

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsByCategory(11) // Celulares y Telefonía
      if (data) {
        setProducts(data)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <>
      {/* Carrusel de anuncios */}
      <Carousel>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Image
              src={item.src}
              alt={item.alt}
              width={1920}
              height={1080}
              className="carousel-image"
            />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Sección de productos */}
      <Container>
        <CardContainer className="bg-body p-4 mt-4">
          <h4>Celulares y Telefonía</h4>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="d-flex gap-3 mt-3 flex-wrap">
              {products.map(product => (
                <Card
                  key={product.id}
                  border="0"
                  style={{ width: '12rem' }}
                  as={Link}
                  href={product.href}
                  className="text-decoration-none">
                  <CardImg
                    src={
                      product.photos[0]?.url || '/images/products/ejemplo.webp'
                    }
                    as={Image}
                    width={180}
                    height={180}
                    alt={product.title}
                    style={{ objectFit: 'contain' }}
                  />
                  <CardBody>
                    <p>{product.title}</p>
                    <h3 className="mb-0">${product.price}</h3>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </CardContainer>
      </Container>
    </>
  )
}

export default Home
