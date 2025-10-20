import MyImage from "@/components/shared/Ui/Image/MyImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TProduct } from "@/types/product.type";
import {
  Calendar,
  Eye,
  Package,
  Pencil,
  Star,
  Tag,
  TrendingUp,
} from "lucide-react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ProductDetailsModal = ({ product }: { product: TProduct }) => {
  return (
    <Dialog>
      {/* Trigger button (eye icon) */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
          <Eye className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto scroll-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold pr-8">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                      <MyImage
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                        fill
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            {/* Thumbnail Preview */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-border hover:border-primary transition-colors"
                >
                  <MyImage
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.sellingPrice}
                </span>
                {product.price !== product.sellingPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price}
                  </span>
                )}
              </div>
              {product.price !== product.sellingPrice && (
                <Badge variant="destructive" className="bg-destructive">
                  Save ${product.price - product.sellingPrice}
                </Badge>
              )}
            </div>

            <Separator />

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Stock</span>
                </div>
                <p className="text-lg font-semibold">{product.stock} Items</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">Sales</span>
                </div>
                <p className="text-lg font-semibold">
                  {product.salesCount} Sold
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Star className="h-4 w-4" />
                  <span className="text-sm">Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.averageRatings)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">
                    {product.averageRatings.toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm">Category</span>
                </div>
                <Badge variant="secondary" className="bg-secondary">
                  {product.category}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Metadata */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {formatDate(product.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated: {formatDate(product.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 mt-4">
          <h3 className="text-lg font-semibold">Product Description</h3>
          <div
            className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
          <Button variant="outline" className="flex-1">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
