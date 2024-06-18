import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";
import Search from "../_components/search";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/"); //redirect home page
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <Header inputComponent={<Search />} />

      <div className="px-5 py-6 lg:px-24">
        <h2 className="pb-6 text-lg font-semibold">Meus pedidos</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
