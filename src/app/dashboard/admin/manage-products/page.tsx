import MyImage from "@/components/shared/Ui/Image/MyImage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types/product.type";
import { Pencil, Star, Trash2 } from "lucide-react";
import ManageProductsCategoryFilter from "./_components/ManageProductsCategoryFilter";
import ManageProductsSearch from "./_components/ManageProductsSearch";
import ManageProductsSort from "./_components/ManageProductsSort";
import ProductDetailsModal from "./_components/ProductDetailsModal";

const products: TProduct[] = [
  {
    _id: "68f4e96529e421708d9131bc",
    name: "Logitech MX Keys S Wireless Keyboard & MX Master 3S Mouse Combo",
    slug: "logitech-mx-keys-s-wireless-keyboard-and-mx-master-3s-mouse-combo",
    description:
      "Enhance your productivity setup with the Logitech MX Keys S and MX Master 3S combo — the ultimate wireless keyboard and mouse pair designed for professionals, creators, and multitaskers.",
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
    totalReviews: 120,
    averageRatings: 4.5,
    salesCount: 85,
    isDeleted: false,
    createdAt: "2025-10-19T13:36:37.158Z",
    updatedAt: "2025-10-19T13:36:37.158Z",
    __v: 0,
  },
];

const ManageProductsPage = () => {
  const categoryMap: Record<string, string> = {
    "keyboards-and-mice": "Keyboards & Mice",
    "laptops-and-computers": "Laptops & Computers",
  };

  return (
    <div className="min-h-screen w-full">
      <div>
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-card px-3 md:px-6">
            <div className="flex gap-4 items-center justify-between">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                All Product List
              </CardTitle>
              <Button variant="default" className="">
                Add Product
              </Button>
            </div>
          </CardHeader>

          <CardContent className="px-3 md:px-6">
            {/* Filters Section */}
            <div className="mb-6 flex flex-col gap-2 md:gap-4 sm:flex-row sm:items-center">
              <ManageProductsSearch />

              <ManageProductsCategoryFilter />

              <ManageProductsSort />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ">
              <Table>
                <TableHeader className="">
                  <TableRow className="">
                    <TableHead className="">Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="group border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="whitespace-normal align-top">
                        <div className="flex items-center gap-3 w-[200px] md:w-[250px]">
                          <MyImage
                            src={product.images[0]}
                            alt={product.name}
                            className="h-12 w-12 rounded-md object-cover border border-border"
                            width={48}
                            height={48}
                          />
                          <p className="font-medium leading-snug break-words line-clamp-3 block">
                            {product.name.length > 35
                              ? `${product.name.slice(0, 35)}...`
                              : product.name}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        ${product.sellingPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-muted-foreground">
                            {product.stock} Item Left
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.salesCount} Sold
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-foreground">
                        {categoryMap[product.category] || product.category}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="font-medium text-foreground">
                              {product.averageRatings.toFixed(1)}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.totalReviews} Review
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <ProductDetailsModal product={product} />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted"
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageProductsPage;
