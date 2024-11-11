import { CldUploadWidget } from 'next-cloudinary'
import { Stack } from 'react-bootstrap'
import cloudinaryText from '@/lib/cloudinary-text.json'
import ImagePreview from './ImagePreview'

export default function PhotoUploader({
  photos,
  onSuccess,
  onDelete,
  deletingPhotos,
}) {
  const handleUploadSuccess = result => {
    if (result.event === 'success') {
      const { secure_url, public_id, coordinates } = result.info
      let imageUrl = secure_url

      if (coordinates && coordinates.custom) {
        const [x, y, width, height] = coordinates.custom[0]
        imageUrl = `${secure_url.replace(
          '/upload/',
          `/upload/c_crop,g_custom,x_${x},y_${y},w_${width},h_${height}/`,
        )}`
      }

      onSuccess({ url: imageUrl, publicId: public_id })
    }
  }

  return (
    <>
      <small>Fotos (requerido)</small>
      <Stack gap={4} direction="horizontal" className="mt-2 mb-4">
        <CldUploadWidget
          signatureEndpoint="/sign-cloudinary-params"
          options={{
            sources: ['local'],
            cropping: true,
            showSkipCropButton: false,
            croppingAspectRatio: 1,
            croppingShowDimensions: true,
            multiple: false,
            text: { ...cloudinaryText },
            language: 'es',
          }}
          uploadPreset="ml_products"
          onSuccess={handleUploadSuccess}>
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              style={{
                width: '96px',
                height: '96px',
                borderStyle: 'dashed',
              }}
              className={`border-primary rounded d-flex flex-column align-items-center justify-content-center text-primary ${photos?.length >= 5 ? 'opacity-50' : 'upload-button'}`}
              disabled={photos?.length >= 5}>
              {photos?.length >= 5 ? '' : <i className="bi bi-upload" />}
              <small>
                {photos?.length >= 5 ? 'Límite alcanzado' : 'Seleccionar'}
              </small>
            </button>
          )}
        </CldUploadWidget>

        {photos?.map(photo => (
          <ImagePreview
            key={photo.id}
            photo={photo}
            onDelete={onDelete}
            isDeleting={deletingPhotos[photo.id]}
          />
        ))}
      </Stack>
    </>
  )
}
