import Image from "next/image"
import { Carousel, CarouselItem } from "react-bootstrap"

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
    </>
  )
}

export default Home
