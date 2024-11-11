import { Row } from 'react-bootstrap'
import PhotoUploader from './PhotoUploader'
import StockInput from './StockInput'
import UPCInput from './UPCInput'
import SKUInput from './SKUInput'

export default function PhotosStockSection({
  stock,
  upc,
  sku,
  photos,
  productId,
  onPhotoUpload,
  onChange,
  onPhotoDelete,
  deletingPhotos,
}) {
  return (
    <>
      <div className="p-4">
        <h6 className="fw-bold">Fotos y stock</h6>
        <p className="mb-0 text-muted">
          Suma fotos, stock y datos específicos de tu producto.
        </p>
      </div>
      <hr className="border-secondary m-0" />
      <div className="p-4">
        <PhotoUploader
          photos={photos}
          productId={productId}
          onSuccess={onPhotoUpload}
          onDelete={onPhotoDelete}
          deletingPhotos={deletingPhotos}
        />
        <Row>
          <StockInput value={stock} onChange={onChange} />
          <UPCInput value={upc} onChange={onChange} />
          <SKUInput value={sku} onChange={onChange} />
        </Row>
      </div>
    </>
  )
}
