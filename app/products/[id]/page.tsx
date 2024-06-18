import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_componentes/product-image";
import ProductDetails from "./_componentes/product-details";
import Header from "@/app/_components/header";
import Search from "@/app/_components/search";
import ProductList from "@/app/_components/product-list";

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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header inputComponent={<Search />} />

      <div className="flex flex-col gap-0 lg:mt-4 lg:flex-row lg:gap-6 lg:px-24">
        <ProductImage product={product} />

        <ProductDetails product={product} complementaryProducts={juices} />
      </div>

      <div className="hidden lg:block lg:px-24">
        {/* JUICES */}
        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold lg:px-0">Sucos</h3>
          <ProductList products={juices} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
