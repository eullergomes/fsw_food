"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

//get only imageUrl and name from Product
interface ProductImageProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  //go back the page
  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
