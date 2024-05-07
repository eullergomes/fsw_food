"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);

  const handleDecreaseQuantity = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });
  };

  return (
    <div className="p-5">
      {/* RESTAURANT */}
      <div className="flex items-center gap-[0.375rem]">
        <div className="relative h-4 w-4">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">{product.name}</span>
      </div>

      <h1 className="mb-3 mt-1 text-xl font-semibold">{product.name}</h1>

      {/* PRICE*/}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-1">
            <h2 className="items-center text-xl font-semibold">
              {formatCurrency(calculateProductPrice(product))}
            </h2>

            {product.discountPercentage > 0 && (
              <div className="h-[48px]">
                <DiscountBadge product={product} />
              </div>
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        {/* QUANTITY */}
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="border border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-3">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantity}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* delivery notes */}
      <Card>
        {/* Delivery Time */}
        <div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {Number(product.restaurant.deliveryFee) > 0 ? (
            <p className="text-sm font-semibold">
              {formatCurrency(Number(product.restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm">Retirada em 10-20 min</p>
          )}
        </div>

        {/* Delevery Fee */}
        <div></div>
      </Card>
    </div>
  );
};

export default ProductDetails;
