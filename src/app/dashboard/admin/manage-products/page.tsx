import { getAllCategoriesFromDB } from "@/app/actions/categories";
import { getAllProductsFromDB } from "@/app/actions/product";
import NoDataFound from "@/components/shared/Ui/Data/NoDataFound";
import NoDataFoundBySearchFilter from "@/components/shared/Ui/Data/NoDataFoundBySearchFilter";
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
import { TCategory } from "@/types";
import { TProduct } from "@/types/product.type";
import { slugToTitle } from "@/utils/createSlug";
import { Pencil, Star } from "lucide-react";
import Link from "next/link";
import DeleteProductModal from "./_components/DeleteProductModal";
import ManageProductsCategoryFilter from "./_components/ManageProductsCategoryFilter";
import ManageProductsSearch from "./_components/ManageProductsSearch";
import ManageProductsSort from "./_components/ManageProductsSort";
import ProductDetailsModal from "./_components/ProductDetailsModal";

const ManageProductsPage = async () => {
  const categoriesResponse = await getAllCategoriesFromDB();
  const productsResponse = await getAllProductsFromDB();

  const categories = categoriesResponse?.data.flatMap((category: TCategory) => {
    const parentOption = {
      value: category.slug,
      label: category.name,
    };

    // sub categories options if avaiable
    const subOptions = category.subCategories?.map((sub) => ({
      value: sub.slug,
      label: `${category.name} > ${sub.name}`,
    }));

    return [parentOption, ...subOptions];
  });

  return (
    <div className="min-h-screen w-full">
      <div>
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-card px-3 md:px-6">
            <div className="flex gap-4 items-center justify-between">
              <CardTitle className="text-xl md:text-2xl font-semibold">
                All Product List
              </CardTitle>
              <Link href="/dashboard/admin/add-product">
                <Button variant="default" className="">
                  Add Product
                </Button>
              </Link>
            </div>
          </CardHeader>

          {!productsResponse?.success ? (
            <NoDataFound
              title="Products not found!"
              description="We couldn’t find any products right now. Please check back later for new arrivals."
            />
          ) : (
            <CardContent className="px-3 md:px-6">
              {/* Filters Section */}
              <div className="mb-6 flex flex-col gap-2 md:gap-4 sm:flex-row sm:items-center">
                <ManageProductsSearch />

                <ManageProductsCategoryFilter categories={categories} />

                <ManageProductsSort />
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 ">
                {productsResponse?.data?.data?.length === 0 ? (
                  <NoDataFoundBySearchFilter
                    title="Products not found!"
                    description="Try searching for something else or clear all filters to explore available collections."
                  />
                ) : (
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
                      {productsResponse?.data?.data?.map(
                        (product: TProduct) => (
                          <tr
                            key={product._id}
                            className="group border-b border-gray-200 dark:border-gray-700 hover:bg-muted/30 transition-colors"
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
                              {slugToTitle(product.category)}
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
                              <div className="flex items-center justify-center gap-1 md:gap-2">
                                <ProductDetailsModal product={product} />
                                <Link
                                  href={`/dashboard/admin/manage-products/${product._id}`}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-muted"
                                  >
                                    <Pencil className="h-4 w-4 text-muted-foreground" />
                                  </Button>
                                </Link>

                                <DeleteProductModal productId={product?._id} />
                              </div>
                            </TableCell>
                          </tr>
                        )
                      )}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManageProductsPage;
