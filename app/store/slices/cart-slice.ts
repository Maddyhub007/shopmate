import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("shopmate-cart")
      if (savedCart) {
        return JSON.parse(savedCart)
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }
  return { items: [], total: 0 }
}

const initialState: CartState = loadCartFromStorage()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      cartSlice.caseReducers.calculateTotal(state)
      cartSlice.caseReducers.saveToStorage(state)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.calculateTotal(state)
      cartSlice.caseReducers.saveToStorage(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
      cartSlice.caseReducers.calculateTotal(state)
      cartSlice.caseReducers.saveToStorage(state)
    },
    clearCart: (state) => {
      state.items = []
      state.total = 0
      cartSlice.caseReducers.saveToStorage(state)
    },
    calculateTotal: (state) => {
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    saveToStorage: (state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("shopmate-cart", JSON.stringify(state))
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
