"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "../_lib/utils";

interface ProductItemProps {
  /* Prisma.<TableName>GetPayload */
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <Link
      className={cn("w-[150px] min-w-[150px]", className)}
      href={`/products/${product.id}`}
    >
      <div className="w-full space-y-2">
        {/* IMAGE */}
        <div className="relative aspect-square w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2">
              <DiscountBadge product={product} />
            </div>
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
    </Link>
  );
};

export default ProductItem;
