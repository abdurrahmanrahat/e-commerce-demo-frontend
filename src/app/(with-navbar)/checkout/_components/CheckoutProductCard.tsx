import MyImage from "@/components/shared/Ui/Image/MyImage";
import { TCartProduct } from "@/types";

const CheckoutProductCard = ({ item }: { item: TCartProduct }) => {
  return (
    <div key={item.product._id} className="flex gap-3">
      <MyImage
        src={item.product.images[0]}
        alt={item.product.name}
        width={64}
        height={64}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm 2xl:text-base line-clamp-2">
          {item.product.name}
        </p>
        <p className="text-xs 2xl:text-sm text-muted-foreground">
          × {item.quantity}
        </p>
      </div>
      <span className="text-sm 2xl:text-base font-medium">
        ${(item.product.sellingPrice * item.quantity).toFixed(2)}
      </span>
    </div>
  );
};

export default CheckoutProductCard;
