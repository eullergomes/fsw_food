import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  //products with a discount percentage greater than zero
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0, //products with discount
      },
    },
    take: 10, //limit 10 products
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
    <div>
      <Header />

      <div className="px-5 py-6">
        <Search />
      </div>

      <div className="py-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/banner-promo-pizza.png"
          alt="Até 30% de desconto em pizzas"
          height={0}
          width={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            <span>Ver todos</span>
            <ChevronRightIcon size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Home;
