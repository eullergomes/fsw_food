import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import CartBanner from "./_components/cart-banner";
import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import Header from "@/app/_components/header";
import About from "./_components/about";
import Search from "@/app/_components/search";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        // orderBy: {
        //   createdAt: "desc",
        // },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 15,
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

  if (!restaurant) {
    return notFound();
  }

  const session = await getServerSession(authOptions);
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <>
      <Header inputComponent={<Search />} />
      <div className="lg:mt-5">
        <div className="flex flex-col gap-0 lg:flex-row lg:gap-6 lg:px-24">
          <RestaurantImage
            restaurant={restaurant}
            userFavoriteRestaurants={userFavoriteRestaurants}
          />

          <div className=" rounded-lg lg:w-1/2 lg:border lg:border-solid lg:py-6 lg:shadow-sm">
            <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 py-5 pt-5">
              {/* TITLE */}
              <div className="flex items-center gap-[0.37rem]">
                <div className="relative h-8 w-8">
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    sizes="100%"
                    className="rounded-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-semibold">{restaurant.name}</h1>
              </div>

              <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
                <StarIcon
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="text-xs font-semibold">5.0</span>
              </div>
            </div>

            <div className="px-5">
              <DeliveryInfo restaurant={restaurant} />
            </div>

            <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
              {restaurant.categories.map((category) => (
                <div
                  key={category.id}
                  className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
                >
                  <span className="text-xs text-muted-foreground">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>

            <About restaurant={restaurant.name} />
          </div>
        </div>

        <div className="mt-6 space-y-4 lg:px-24">
          {/* FAZER IMPELMENTAÇÃO DE PRODUTOS MAIS PEDIDOS */}
          <h2 className="px-5 font-semibold lg:px-0 ">Mais Pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-6 space-y-4 lg:px-24" key={category.id}>
            <h2 className="px-5 font-semibold lg:px-0">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}

        <CartBanner restaurant={restaurant} />
      </div>
    </>
  );
};

export default RestaurantPage;
