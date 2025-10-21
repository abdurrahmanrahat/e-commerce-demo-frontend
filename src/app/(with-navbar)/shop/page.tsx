"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TCategory } from "@/types";
import { TProduct } from "@/types/product.type";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import Banner from "./_components/Banner";
import { FilterSidebar } from "./_components/FilterSidebar";
import { ProductCard } from "./_components/ProductCard";

// Mock data
const mockCategories: TCategory[] = [
  {
    _id: "1",
    name: "Laptops & Computers",
    slug: "laptops-and-computers",
    image: "",
    productsCount: 45,
    subCategories: [
      {
        _id: "1-1",
        name: "Gaming Laptops",
        slug: "gaming-laptops",
        productsCount: 15,
      },
      {
        _id: "1-2",
        name: "Business Laptops",
        slug: "business-laptops",
        productsCount: 20,
      },
      {
        _id: "1-3",
        name: "Desktop PCs",
        slug: "desktop-pcs",
        productsCount: 10,
      },
    ],
  },
  {
    _id: "2",
    name: "Keyboards & Mice",
    slug: "keyboards-and-mice",
    image: "",
    productsCount: 32,
    subCategories: [
      {
        _id: "2-1",
        name: "Mechanical Keyboards",
        slug: "mechanical-keyboards",
        productsCount: 18,
      },
      {
        _id: "2-2",
        name: "Gaming Mice",
        slug: "gaming-mice",
        productsCount: 14,
      },
    ],
  },
  {
    _id: "3",
    name: "Accessories",
    slug: "accessories",
    image: "",
    productsCount: 28,
    subCategories: [],
  },
];

const mockProduct: TProduct = {
  _id: "68f4e96529e421708d9131bc",
  name: "Logitech MX Keys S Wireless Keyboard & MX Master 3S Mouse Combo",
  slug: "logitech-mx-keys-s-wireless-keyboard-and-mx-master-3s-mouse-combo",
  description:
    "<p>Enhance your productivity setup with the Logitech MX Keys S and MX Master 3S combo.</p>",
  images: [
    "https://i.ibb.co/fVkmd3fH/keyboards-and-mice1.jpg",
    "https://i.ibb.co/SX8ChhG3/keyboards-and-mice2.jpg",
    "https://i.ibb.co/q3tL1PbW/keyboards-and-mice3.jpg",
    "https://i.ibb.co/qMPq5qwH/keyboards-and-mice4.jpg",
    "https://i.ibb.co/1Sn1RWN/keyboards-and-mice5.jpg",
  ],
  category: "keyboards-and-mice",
  price: 190,
  sellingPrice: 160,
  stock: 40,
  tags: ["laptops-and-computers", "keyboards-and-mice"],
  totalReviews: 24,
  averageRatings: 4.5,
  salesCount: 156,
  isDeleted: false,
  createdAt: "2025-10-19T13:36:37.158Z",
  updatedAt: "2025-10-19T13:36:37.158Z",
  __v: 0,
};

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  ...mockProduct,
  _id: `product-${i}`,
  name: `${mockProduct.name} ${i + 1}`,
  sellingPrice: mockProduct.sellingPrice + i * 10,
  price: mockProduct.price + i * 10,
}));

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const maxPrice = useMemo(() => {
    return Math.max(...mockProducts.map((p) => p.price));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.sellingPrice >= priceRange[0] && p.sellingPrice <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort(
          (a, b) => a.sellingPrice - b.sellingPrice
        );
        break;
      case "price-high":
        filtered = [...filtered].sort(
          (a, b) => b.sellingPrice - a.sellingPrice
        );
        break;
      case "rating":
        filtered = [...filtered].sort(
          (a, b) => b.averageRatings - a.averageRatings
        );
        break;
      case "newest":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, priceRange, sortBy]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Banner breadcrumbs={[{ label: "Shop", href: "/shop" }]} />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6">
              <FilterSidebar
                categories={mockCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={setSelectedCategories}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                maxPrice={maxPrice}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1 ">
            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="rating">Rating: High → Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FilterSidebar
                    categories={mockCategories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    maxPrice={maxPrice}
                  />
                </SheetContent>
              </Sheet>
            </div>

            <div className="mb-4 text-sm text-muted-foreground">
              Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
              products
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
