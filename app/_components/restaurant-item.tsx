import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps {
  restaurant: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className={cn("min-w-[266px] max-w-[266px]", className)}
    >
      <div className="w-full space-y-2">
        {/* IMAGE */}
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          <Badge className="absolute left-2 top-2 flex items-center gap-1 bg-white px-1 font-semibold transition-opacity duration-300 ease-in-out hover:bg-white hover:opacity-90">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-black">5.0</span>
          </Badge>

          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
          >
            <HeartIcon size={16} className="fill-white" />
          </Button>
        </div>
        {/* RESTAURANT */}
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <BikeIcon className="text-primary" size={12} />

              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <TimerIcon className="text-primary" size={12} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTime} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;
