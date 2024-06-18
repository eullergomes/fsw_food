import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";
import Search from "../_components/search";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <Header inputComponent={<Search />} />
      <div className="p-6 lg:px-24">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <h3 className="font-medium">
              Você ainda não favoritou nenhum restaurante
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
