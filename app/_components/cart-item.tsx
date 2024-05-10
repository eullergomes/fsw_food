import Image from "next/image";
import { CartProduct } from "../_context/cart";
import { calculateProductPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          {/* NAME AND PRICE */}
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(calculateProductPrice(cartProduct))}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(cartProduct.price))}
              </span>
            )}
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 border border-muted-foreground"
            >
              <ChevronLeftIcon size={18} />
            </Button>
            <span className="w-2 text-sm">{cartProduct.quantity}</span>
            <Button size="icon" className="h-8 w-8">
              <ChevronRightIcon size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
