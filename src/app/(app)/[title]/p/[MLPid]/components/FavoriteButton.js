export default function FavoriteButton({ productId, favoriteId, isFavorite, handleFavoriteClick }) {
  return (
    <button
      className="btn p-0 border-0"
      onClick={() => handleFavoriteClick(favoriteId, productId)}
      aria-label="Agregar a favoritos">
      <i
        className={`fs-5 text-primary bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}
      />
    </button>
  )
}
  
