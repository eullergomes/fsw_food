import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import Search from "@/app/_components/search";
import { db } from "@/app/_lib/prisma";

const RecommendedProducts = async () => {
  //products with a discount percentage greater than zero
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0, //products with discount
      },
    },
    take: 20, //limit 20 products
    include: {
      //include only restaurant name
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <Header inputComponent={<Search />} />
      <div className="p-6 lg:px-24">
        <h2 className="mb-6 text-lg font-semibold">Pedidos Recomendados</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
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

export default RecommendedProducts;
