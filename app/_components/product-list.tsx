import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  //products with a discount percentage greater than zero
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0, //products with discount
      },
    },
    take: 10, //limit 10 products
    include: {
      //include the restaurant name
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
