"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, CheckCircle, Star, Package, Lightbulb, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

const allProducts = [
  {
    id: "1",
    name: "Vanguard Total Stock Market ETF",
    category: "ETFs",
    price: 245.5,
    image: "/financial-chart.png",
    description: "Broad market exposure with low expense ratio",
  },
  {
    id: "2",
    name: "Fidelity Growth Company Fund",
    category: "Mutual Funds",
    price: 156.75,
    image: "/financial-chart.png",
    description: "Growth-focused mutual fund with strong track record",
  },
  {
    id: "3",
    name: "BlackRock ESG Equity SMA",
    category: "SMAs",
    price: 500000,
    image: "/financial-chart.png",
    description: "Customized ESG-focused separately managed account",
  },
  {
    id: "4",
    name: "MetLife Variable Universal Life",
    category: "Insurance",
    price: 25000,
    image: "/insurance-policy.png",
    description: "Flexible premium life insurance with investment options",
  },
]

const recommendedProducts = [
  {
    id: "1",
    name: "Vanguard Total Stock Market ETF",
    category: "ETFs",
    price: 245.5,
    image: "/financial-chart.png",
    reason: "Matches preference for diversified, low-cost investments",
    confidence: 95,
  },
  {
    id: "3",
    name: "BlackRock ESG Equity SMA",
    category: "SMAs",
    price: 500000,
    image: "/financial-chart.png",
    reason: "Aligns with ESG investment interests and customization needs",
    confidence: 88,
  },
  {
    id: "2",
    name: "Fidelity Growth Company Fund",
    category: "Mutual Funds",
    price: 156.75,
    image: "/financial-chart.png",
    reason: "Complements existing growth-oriented portfolio strategy",
    confidence: 82,
  },
]

export function CustomerRightPanel({ customer }: { customer: any }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const router = useRouter()

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const createAgenda = () => {
    const selectedProductData = recommendedProducts.filter((p) => selectedProducts.includes(p.id))
    // In real app, this would navigate to agenda creation page with selected products
    router.push(`/agenda/create?customer=${customer.id}&products=${selectedProducts.join(",")}`)
  }

  return (
    <div className="space-y-6">
      {/* Last Meeting Recap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Last Meeting Recap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{customer.lastMeeting.date}</span>
            </div>
            <Badge variant="outline">{customer.lastMeeting.duration}</Badge>
          </div>
          <div>
            <h4 className="font-medium mb-2">Outcome</h4>
            <p className="text-sm text-muted-foreground">{customer.lastMeeting.outcome}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Next Steps</h4>
            <ul className="space-y-1">
              {customer.lastMeeting.nextSteps.map((step: string, index: number) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Product Catalog */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Catalog
          </CardTitle>
          <CardDescription>Browse all available products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {allProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-12 h-12 rounded-md object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{product.name}</h4>
                  <p className="text-sm text-muted-foreground truncate">{product.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-sm font-medium">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommended Products
          </CardTitle>
          <CardDescription>Personalized recommendations based on customer data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedProducts.includes(product.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => toggleProductSelection(product.id)}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{product.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{product.reason}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <span className="text-sm font-medium">${product.price}</span>
                    </div>
                  </div>
                  {selectedProducts.includes(product.id) && (
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <Button onClick={createAgenda} disabled={selectedProducts.length === 0} className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Meeting Agenda ({selectedProducts.length} products selected)
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
