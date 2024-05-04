import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category; //db model
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        className="h-[30px]"
      />

      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
