import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  //get categories from the db
  const categories = await db.category.findMany({});

  //render an icon for each category
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 lg:px-24 xl:justify-center [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
