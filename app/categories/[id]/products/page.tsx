import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import Search from "@/app/_components/search";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!category) {
    return notFound();
  }

  return (
    <>
      <Header inputComponent={<Search />} />
      <div className="p-6 lg:px-24">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
