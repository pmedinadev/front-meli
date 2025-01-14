'use client'

import { Tabs, Tab, Container, Button } from 'react-bootstrap'
import { useState } from 'react'
import FavoriteItem from './components/FavoriteItem'
import { useFavorites } from '@/hooks/useFavorites'
import { useAuth } from '@/hooks/auth'
import LoadingSpinner from '@/components/layout/LoadingSpinner'
import ListsIcon from './components/ListsIcon'
import FavoritesIcon from './components/FavoritesIcon'

export default function Favorites() {
  const { user } = useAuth({ middleware: 'auth' })
  const { getFavoriteProducts, removeFavorite, isInitialLoading } =
    useFavorites(user?.favorite_id)
  const [key, setKey] = useState('favorites')

  const favorites = getFavoriteProducts.data || []

  if (!user || isInitialLoading) return <LoadingSpinner />

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Favoritos</h4>
        <Button className="primary">+ Crear lista</Button>
      </div>
      <Tabs
        id="Controlled-Tab-favs"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="mb-3">
        <Tab eventKey="favorites" title="Favoritos">
          {favorites.length > 0 ? (
            favorites.map(product => (
              <FavoriteItem
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                favorite_product_id={product.favorite_product_id}
                photos={product.photos}
                onRemove={() =>
                  removeFavorite.mutate(product.favorite_product_id)
                }
                isRemoving={removeFavorite.isPending}
              />
            ))
          ) : (
            <Container
              className="
              bg-disabled-meli
              d-flex
              flex-column
              align-items-center
              justify-content-center
              text-center"
              style={{ height: '100vh' }}>
              <div
                className="mb-3 d-flex justify-content-center align-items-center"
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  backgroundColor: '#EEEEEE',
                }}>
                <FavoritesIcon />
              </div>
              <h5 className="mb-2">Aún no tienes productos favoritos</h5>
              <p className="text-muted">
                Agrégalos haciendo clic en el corazón de la página de producto
              </p>
            </Container>
          )}
        </Tab>
        <Tab eventKey="lists" title="Listas">
          <Container
            className="
            bg-disabled-meli
            d-flex
            flex-column
            align-items-center
            justify-content-center
            text-center"
            style={{ height: '100vh' }}>
            <ListsIcon />
            <h5>Empieza a crear listas con tus productos favoritos</h5>
            <p className="mb-2">
              Organiza y agrupa los productos favoritos como profieras.
            </p>
            <Button>Crear tu primera lista</Button>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  )
}
