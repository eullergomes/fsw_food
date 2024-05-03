import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductPrice, formatCurrency } from "../_helpers/price";
import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="min-w-[150px] space-y-2">
      {/* IMAGE */}
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />

        {product.discountPercentage > 0 && (
          <Badge
            variant="default"
            className="absolute left-2 top-2 px-1 font-semibold"
          >
            <ArrowDownIcon size={12} />
            <span>{product.discountPercentage}%</span>
          </Badge>
        )}
      </div>
      {/* PRICE */}
      <div>
        <h2 className="truncate">{product.name}</h2>
        <div className="flex gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
      </div>
      {/* RESTAURANT */}
      <span className="text-xs text-muted-foreground">
        {product.restaurant.name}
      </span>
    </div>
  );
};

export default ProductItem;
