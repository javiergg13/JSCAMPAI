import { Navigate } from "react-router"
import { useAuthStore } from "../store/authStore"

export function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthStore()

  return !isLoggedIn ? <Navigate to="/login" replace /> : children
}
