import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Restaurant } from "@prisma/client";

interface deliveryProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTime">;
}

const DeliveryInfo = ({ restaurant }: deliveryProps) => {
  return (
    <>
      <Card className="mt-6 flex justify-around py-3">
        {/* Delivery Fee */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14} />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm">Grátis</p>
          )}
        </div>

        {/* Delivery Time */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>
          <p className="text-sm font-semibold">{restaurant.deliveryTime} min</p>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
