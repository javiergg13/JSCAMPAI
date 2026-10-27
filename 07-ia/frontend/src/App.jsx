import { Routes, Route } from "react-router"
import { lazy, Suspense } from "react"

import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

const HomePage = lazy(() => import("./pages/Home.jsx"))
const SearchPage = lazy(() => import("./pages/Search.jsx"))
const NotFoundPage = lazy(() => import("./pages/404.jsx"))
const JobDetail = lazy(() => import("./pages/Detail.jsx"))
const Profile = lazy(() => import("./pages/Profile.jsx"))
const Login = lazy(() => import("./pages/Login.jsx"))
const Register = lazy(() => import("./pages/Register.jsx"))

function App() {
  return (
    <>
      <Header />

      <Suspense
        fallback={
          <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
          >
            Cargando...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}

export default App
