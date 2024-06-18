import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import SearchDesk from "./_components/search-desk";

const fetch = async () => {
  //products with a discount percentage greater than zero
  const getProducts = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0, //products with discount (bg - bigger then)
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

  const getBurguersCategory = await db.category.findFirst({
    where: {
      name: "Hambúrgueres",
    },
  });

  const getPizzasCategory = await db.category.findFirst({
    where: {
      name: "Pizzas",
    },
  });

  const [products, burguersCategory, pizzasCategory] = await Promise.all([
    getProducts,
    getBurguersCategory,
    getPizzasCategory,
  ]);

  return { products, burguersCategory, pizzasCategory };
};

const Home = async () => {
  const { products, burguersCategory, pizzasCategory } = await fetch();

  return (
    <div>
      <Header />

      <div className="px-5 py-3 md:hidden">
        <Search />
      </div>

      <SearchDesk />

      <div className="py-3 text-center lg:px-0">
        <CategoryList />
      </div>

      <div className="px-5 pt-6 md:hidden">
        <Link href={`/categories/${pizzasCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-pizza.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:px-24">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold lg:px-0">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>

      <div className="justify-center gap-4 px-5 pt-6 md:flex lg:px-24">
        <Link
          href={`/categories/${pizzasCategory?.id}/products`}
          className="hidden md:block"
        >
          <PromoBanner
            src="/banner-promo-pizza.png"
            alt="Até 30% de desconto em pizzas"
          />
        </Link>

        <Link href={`/categories/${burguersCategory?.id}/products`}>
          <PromoBanner
            src="/banner-promo-burger.png"
            alt="A partir de 17,90 em lanches"
          />
        </Link>
      </div>

      <div className="space-y-4 pt-6 lg:px-24">
        <div className="flex items-center justify-between px-5 lg:px-0">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </div>
  );
};

export default Home;
