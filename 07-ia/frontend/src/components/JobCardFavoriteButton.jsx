import { useFavoritesStore } from "../store/favoritesStore"

export function JobCardFavoriteButton({ jobId, isLoggedIn }) {
  const { isFavorite } = useFavoritesStore()
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)

  return (
    <button disabled={!isLoggedIn} onClick={() => toggleFavorite(jobId)}>
      {isFavorite(jobId) ? "❤️" : "🤍"}
    </button>
  )
}
