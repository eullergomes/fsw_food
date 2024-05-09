"use server";

import { db } from "@/app/_lib/prisma";

//return searched restaurants
export const searchForRestaurants = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
      },
    },
  });

  return restaurants;
};
