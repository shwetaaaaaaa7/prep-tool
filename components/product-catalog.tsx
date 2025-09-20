"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, TrendingUp, Package, Eye } from "lucide-react"
import { products } from "@/data/financial-products"

const categories = ["All", "ETFs", "Mutual Funds", "SMAs", "Insurance"]
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "sold", label: "Best Selling" },
  { value: "rating", label: "Rating" },
  { value: "margin", label: "Margin" },
]

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return b.price - a.price
        case "sold":
          return b.sold - a.sold
        case "rating":
          return b.rating - a.rating
        case "margin":
          return b.margin - a.margin
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const avgMargin = products.reduce((sum, p) => sum + p.margin, 0) / products.length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total portfolio value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Commission</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Average commission rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalog" className="space-y-4">
        <TabsList>
          <TabsTrigger value="catalog">Product Catalog</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Product Catalog</CardTitle>
              <CardDescription>Browse and manage your financial product portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search financial products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Product Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image || "/placeholder.svg?height=64&width=64&query=financial+chart"}
                          alt={product.name}
                          className="w-16 h-16 rounded-md object-cover bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{product.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{product.sold} clients</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold">${product.price}</div>
                              <div className="text-xs text-muted-foreground">{product.margin}% commission</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{product.stock} available</div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedProduct(product)}
                                className="mt-1"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Recommendations</CardTitle>
              <CardDescription>Smart product suggestions based on client data and market trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Top Performing Products</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {products
                    .filter((p) => p.tags.includes("Popular") || p.sold > 15)
                    .slice(0, 4)
                    .map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={product.image || "/placeholder.svg?height=48&width=48&query=financial+chart"}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover bg-muted"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.sold} clients this month</p>
                          <Badge variant="outline" className="mt-1">
                            High Demand
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">High Commission Opportunities</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {products
                    .filter((p) => p.margin > 35)
                    .slice(0, 4)
                    .map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={product.image || "/placeholder.svg?height=48&width=48&query=financial+chart"}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover bg-muted"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.margin}% commission rate</p>
                          <Badge variant="outline" className="mt-1 text-green-600 border-green-200">
                            High Commission
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Limited Availability</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {products
                    .filter((p) => p.stock < 25)
                    .map((product) => (
                      <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <img
                          src={product.image || "/placeholder.svg?height=48&width=48&query=financial+chart"}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover bg-muted"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">Only {product.stock} spots remaining</p>
                          <Badge variant="outline" className="mt-1 text-orange-600 border-orange-200">
                            Limited Spots
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Revenue Generators</CardTitle>
                <CardDescription>Best performing products by total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {products
                    .sort((a, b) => b.sold * b.price - a.sold * a.price)
                    .slice(0, 5)
                    .map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.sold} clients</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${(product.sold * product.price).toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription>Sales by financial product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.slice(1).map((category) => {
                    const categoryProducts = products.filter((p) => p.category === category)
                    const totalSold = categoryProducts.reduce((sum, p) => sum + p.sold, 0)
                    const totalRevenue = categoryProducts.reduce((sum, p) => sum + p.sold * p.price, 0)
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">{totalSold} clients</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${(totalSold / products.reduce((sum, p) => sum + p.sold, 0)) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-sm text-muted-foreground">${totalRevenue.toLocaleString()} revenue</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedProduct.name}</CardTitle>
                  <CardDescription>{selectedProduct.category}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedProduct.image || "/placeholder.svg?height=128&width=128&query=financial+chart"}
                  alt={selectedProduct.name}
                  className="w-32 h-32 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 space-y-2">
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-2xl font-bold">${selectedProduct.price}</div>
                      <div className="text-sm text-muted-foreground">Minimum Investment</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-green-600">{selectedProduct.margin}%</div>
                      <div className="text-sm text-muted-foreground">Commission</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">{selectedProduct.stock}</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.features.map((feature: string) => (
                    <Badge key={feature} variant="outline">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">{selectedProduct.sold}</div>
                    <div className="text-sm text-muted-foreground">Active Clients</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      {selectedProduct.rating}
                    </div>
                    <div className="text-sm text-muted-foreground">Client Rating</div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="text-lg font-semibold">
                      ${(selectedProduct.sold * selectedProduct.price).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Revenue</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
