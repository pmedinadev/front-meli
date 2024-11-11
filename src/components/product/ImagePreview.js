import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function ImagePreview({ photo, onDelete, isDeleting }) {
  const [showDelete, setShowDelete] = useState(false)

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}>
      <CldImage
        src={photo.url}
        width={96}
        height={96}
        {...(photo.url && { preserveTransformations: true })}
        alt="Product preview"
        className={`rounded border ${isDeleting ? 'opacity-50' : ''}`}
      />
      {showDelete && (
        <Button
          variant="danger"
          size="sm"
          className="position-absolute top-0 end-0 m-1 p-0 rounded-circle"
          style={{ width: '20px', height: '20px', fontSize: '12px' }}
          onClick={() => onDelete(photo.id)}
          disabled={isDeleting}>
          {isDeleting ? (
            <Spinner
              animation="border"
              size="sm"
              style={{ width: '10px', height: '10px' }}
            />
          ) : (
            <i className="bi bi-x-lg" />
          )}
        </Button>
      )}
    </div>
  )
}
