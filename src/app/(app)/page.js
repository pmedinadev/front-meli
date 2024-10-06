import Image from "next/image"
import { Card, CardBody, CardImg, Carousel, CarouselItem, Container } from "react-bootstrap"

export const metadata = {
  title: 'Mercado Libre',
}

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

      {/* Carrusel de productos */}
      <Container>
        <div className="bg-body rounded shadow-sm p-4 mt-4">
          <h4>Productos</h4>
          <div className="d-flex mt-3">
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          <Card border="0" style={{width: '12rem'}}>
            <CardImg src="/images/products/ejemplo.webp" as=
            {Image} width={100} height={180} />
          <CardBody>
            <p>Audífonos bluetooth</p>
            <h3 className="mb-0">1,500</h3>
          </CardBody>
          </Card>
          </div>
        </div>
      </Container>


    </>
  )
}

export default Home
