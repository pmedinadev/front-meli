import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'

export default function ProductImages({
  photos,
  title,
  selectedPhoto,
  onPhotoSelect,
}) {
  return (
    <Row className="g-0 mb-4">
      <Col className="col-auto">
        <div className="d-flex flex-column gap-2">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`border rounded p-1 cursor-pointer ${
                selectedPhoto === index ? 'border-primary' : ''
              }`}
              onMouseEnter={() => onPhotoSelect(index)}>
              <CldImage
                src={photo.public_id}
                width={50}
                height={50}
                crop="fill"
                alt={`${title} thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </Col>
      <Col className="d-flex justify-content-center">
        {photos.length > 0 ? (
          <CldImage
            src={photos[selectedPhoto].public_id}
            width={500}
            height={500}
            crop="fill"
            alt={title}
          />
        ) : (
          <Image
            src="/profile_avatar_placeholder.png"
            width={500}
            height={500}
            alt={title}
          />
        )}
      </Col>
    </Row>
  )
}
