"use client"

import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { store } from "./store/store"
import { Header } from "./components/header"
import { LoginPage } from "./components/login-page"
import { ProductsPage } from "./components/products-page"
import { CartPage } from "./components/cart-page"
import { ProtectedRoute } from "./components/protected-route"
import { Toaster } from "@/components/ui/toaster"

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <ProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </Provider>
  )
}
