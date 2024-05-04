import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category; //db model
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex min-w-fit items-center justify-center gap-3 rounded-full px-4 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        quality={100}
        className="h-[30px]"
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
