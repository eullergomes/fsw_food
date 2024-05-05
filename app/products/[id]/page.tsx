import { Button } from "@/app/_components/ui/button";
import { calculateProductPrice, formatCurrency } from "@/app/_helpers/price";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductImage from "./_componentes/product-image";
import DiscountBadge from "../../_components/discount-badge";

interface ProductsPageProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductsPageProps) => {
  //product with all restaurant information
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  //if product not found
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      {/* TITLE AND PRICE */}
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
              <span>De {formatCurrency(Number(product.price))}</span>
            )}
          </div>

          <div className="w-[95px]">
            <Button>
              <ChevronLeftIcon />
            </Button>
            <input type="text" />
            <Button variant="default">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
