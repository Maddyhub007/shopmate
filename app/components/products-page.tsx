"use client"

import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { addToCart } from "../store/slices/cart-slice"

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Coffee Maker",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Appliances",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Sports",
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Electronics",
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Sports",
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "Home",
  },
]

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleAddToCart = (product: (typeof mockProducts)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      }),
    )

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-muted-foreground">Discover amazing products at great prices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                <Badge variant="secondary" className="ml-2 shrink-0">
                  {product.category}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-primary">${product.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button onClick={() => handleAddToCart(product)} className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
