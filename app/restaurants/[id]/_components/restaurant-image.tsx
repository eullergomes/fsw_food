"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useToggleFavoriteRestaurant from "../../_hook/use-toggle-favorite-restaurants";
import { useSession } from "next-auth/react";
import { isRestaurantFavorited } from "@/app/_helpers/restaurant";

//get only imageUrl and name from Restaurant
interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "id" | "imageUrl" | "name">;
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const RestaurantImage = ({
  restaurant,
  userFavoriteRestaurants,
}: RestaurantImageProps) => {
  const { data } = useSession();

  const router = useRouter();

  const isFavorite = isRestaurantFavorited(
    restaurant.id,
    userFavoriteRestaurants,
  );

  const { handleFavoriteClick } = useToggleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user.id,
    restaurantIsFavorited: isFavorite,
  });

  //go back the page
  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full lg:h-[330px] lg:w-2/3">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        sizes="100%"
        className="object-cover md:rounded-lg"
      />
      <Button
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
        onClick={handleFavoriteClick}
      >
        <HeartIcon size={20} className="fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
