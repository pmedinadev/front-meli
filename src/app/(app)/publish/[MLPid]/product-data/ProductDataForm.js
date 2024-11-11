'use client'

import CardContainer from '@/components/layout/CardContainer'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import { useAuth } from '@/hooks/auth'
import { useCategories } from '@/hooks/useCategories'
import { useState, useEffect } from 'react'
import ConditionModal from '@/app/(app)/publish/[MLPid]/product-data/ConditionModal'
import TitleModal from '@/app/(app)/publish/[MLPid]/product-data/TitleModal'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { useProducts } from '@/hooks/useProducts'
import { useParams, useRouter } from 'next/navigation'
import CategorySection from '@/components/product/CategorySection'
import ConditionSection from '@/components/product/ConditionSection'
import PhotosStockSection from '@/components/product/PhotosStockSection'
import TitleSection from '@/components/product/TitleSection'
import DescriptionSection from '@/components/product/DescriptionSection'
import { usePhotos } from '@/hooks/usePhotos'

export default function ProductDataForm() {
  const { user } = useAuth({ middleware: 'auth' })
  useAuth({ middleware: 'verified', redirectIfAuthenticated: '/verify-email' })
  const { categories, loading, error } = useCategories()
  const { MLPid } = useParams()
  const { updateProduct, getProduct } = useProducts()
  const { createProductPhoto, deleteProductPhoto } = usePhotos()
  const router = useRouter()
  const [formData, setFormData] = useState({
    category_id: '',
    condition: '',
    stock: '',
    upc: '',
    sku: '',
    title: '',
    description: '',
  })
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [photos, setPhotos] = useState([])
  const [deletingPhotos, setDeletingPhotos] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [conditionModalShow, setConditionModalShow] = useState(false)
  const [titleModalShow, setTitleModalShow] = useState(false)

  useEffect(() => {
    const loadProductData = async () => {
      if (MLPid) {
        setIsLoadingProduct(true)
        const productId = MLPid.replace('MLP', '')
        try {
          const productData = await getProduct(productId)
          setFormData({
            category_id: productData.category_id || '',
            condition: productData.condition || '',
            stock: productData.stock || '',
            upc: productData.upc || '',
            sku: productData.sku || '',
            title: productData.title || '',
            description: productData.description || '',
          })
          setPhotos(productData.photos || [])
        } catch (error) {
          console.error('Error loading product:', error)
        } finally {
          setIsLoadingProduct(false)
        }
      }
    }

    loadProductData()
  }, [MLPid])

  const handlePhotoUpload = async ({ url, publicId }) => {
    try {
      const productId = MLPid.replace('MLP', '')
      const photo = await createProductPhoto({
        url: url,
        public_id: publicId,
        product_id: productId,
      })
      setPhotos(prev => [...prev, photo])
    } catch (error) {
      console.error(error)
    }
  }

  const handlePhotoDelete = async photoId => {
    try {
      setDeletingPhotos(prev => ({ ...prev, [photoId]: true }))
      const photoToDelete = photos.find(p => p.id === photoId)
      if (!photoToDelete) return

      const success = await deleteProductPhoto(photoId, photoToDelete.public_id)
      if (success) {
        setPhotos(prevPhotos =>
          prevPhotos.filter(photo => photo.id !== photoId),
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setDeletingPhotos(prev => ({ ...prev, [photoId]: false }))
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)

    const productId = MLPid.replace('MLP', '')

    // Filtrar solo los campos vacíos de upc y sku
    const dataToSubmit = {
      ...formData,
      ...(formData.upc === '' && { upc: undefined }),
      ...(formData.sku === '' && { sku: undefined }),
    }

    try {
      await updateProduct(productId, dataToSubmit)
      router.push(`/publish/${MLPid}/sales-condition`)
    } catch (error) {
      console.error('Error updating product:', error)
    }
    setIsSubmitting(false)
  }

  if (!user || isLoadingProduct) return <LoadingSpinner />

  return (
    <>
      <Container className="my-5">
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column align-items-center">
          <Row className="g-0 w-75">
            <h4 className="mb-5">Completa los datos del producto</h4>

            {/* Categoría */}
            <CardContainer className="bg-body mb-4">
              <CategorySection
                categoryId={formData.category_id}
                categories={categories}
                loading={loading}
                error={error}
                onChange={handleChange}
              />
            </CardContainer>

            {/* Condición */}
            <CardContainer className="bg-body mb-4">
              <ConditionSection
                condition={formData.condition}
                onChange={handleChange}
                onShowModal={() => setConditionModalShow(true)}
              />
              <ConditionModal
                show={conditionModalShow}
                onHide={() => setConditionModalShow(false)}
              />
            </CardContainer>

            {/* Fotos y stock */}
            <CardContainer className="bg-body mb-4">
              <PhotosStockSection
                stock={formData.stock}
                upc={formData.upc}
                sku={formData.sku}
                photos={photos}
                productId={MLPid}
                onPhotoUpload={handlePhotoUpload}
                onPhotoDelete={handlePhotoDelete}
                deletingPhotos={deletingPhotos}
                onChange={handleChange}
              />
            </CardContainer>

            {/* Título */}
            <CardContainer className="bg-body mb-4">
              <TitleSection
                title={formData.title}
                onChange={handleChange}
                onShowModal={() => setTitleModalShow(true)}
              />
              <TitleModal
                show={titleModalShow}
                onHide={() => setTitleModalShow(false)}
              />
            </CardContainer>

            {/* Descripción */}
            <CardContainer className="bg-body mb-4">
              <DescriptionSection
                description={formData.description}
                onChange={handleChange}
              />
            </CardContainer>
          </Row>

          <div className="w-75 d-flex justify-content-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Ir al siguiente paso'}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  )
}
