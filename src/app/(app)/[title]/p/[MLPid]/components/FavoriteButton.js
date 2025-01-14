import { Spinner } from 'react-bootstrap'

export default function FavoriteButton({
  isFavorite,
  isLoading,
  handleFavoriteClick,
}) {
  return (
    <button
      className="btn p-0 border-0"
      onClick={handleFavoriteClick}
      disabled={isLoading}
      aria-label="Agregar a favoritos">
      {isLoading ? (
        <Spinner animation="border" size="sm" />
      ) : (
        <i
          className={`fs-5 text-primary bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}
        />
      )}
    </button>
  )
}
