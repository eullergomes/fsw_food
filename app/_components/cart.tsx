import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order";
import { OrderStatus } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CartProps {
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const router = useRouter();
  const { data } = useSession();
  const { products, subtotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSignInClickGoogle = () => signIn("google");

  const handleSignInClickGithub = () => signIn("github");

  const handleFinishOrderClick = async () => {
    if (!data?.user) return;

    const restaurant = products[0].restaurant;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subtotalPrice,
        totalDiscounts: totalDiscount, // fix: put the same name in the schema
        totalPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTime,
        restaurant: {
          connect: { id: restaurant.id },
        },
        status: OrderStatus.CONFIRMED,
        user: {
          connect: { id: data?.user?.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhar na tela de seus pedidos",
        action: {
          label: "Meus pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col py-5">
        <div className="flex-auto space-y-4">
          {products.map((product) => (
            <CartItem cartProduct={product} key={product.id} />
          ))}
        </div>
        {/* TOTAIS */}
        {products.length > 0 ? (
          <>
            <div>
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal: </span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos: </span>
                    <span>- {formatCurrency(totalDiscount)}</span>
                  </div>

                  <Separator className="h-[0.9px]" />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega: </span>
                    <span>
                      {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                        <span className="uppercase text-primary">Grátis</span>
                      ) : (
                        formatCurrency(
                          Number(products?.[0].restaurant.deliveryFee),
                        )
                      )}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">Total: </span>
                    <span className="font-semibold">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Finalizar pedido
            </Button>
          </>
        ) : (
          <h2 className="text-center font-medium">Sua sacola está vazia</h2>
        )}
      </div>
      {/* FINISH ORDER */}
      {data?.user ? (
        <div onClick={() => setIsConfirmDialogOpen(false)}>
          <AlertDialog
            open={isConfirmDialogOpen}
            onOpenChange={setIsConfirmDialogOpen}
          >
            <AlertDialogContent className="w-2/3 rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Deseja finalizar seu pedido?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Ao finalizar o pedido, você não poderá mais alterá-lo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  onClick={handleFinishOrderClick}
                  disabled={isSubmitLoading}
                >
                  {isSubmitLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finalizar
                </AlertDialogAction>
                <AlertDialogCancel className="m-0">Cancelar</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div onClick={() => setIsConfirmDialogOpen(false)}>
          <AlertDialog
            open={isConfirmDialogOpen}
            onOpenChange={setIsConfirmDialogOpen}
          >
            <AlertDialogContent className="w-2/3 rounded-xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Faça o login da plataforma!</AlertDialogTitle>
                <AlertDialogDescription>
                  Conecte-se usando sua conta do Google ou Github.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {/* GITHUB */}
                <AlertDialogAction
                  className="group flex items-center justify-center gap-2 border-2 border-primary bg-white text-primary hover:bg-primary hover:fill-white hover:text-white"
                  onClick={handleSignInClickGithub}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="group-hover:fill-white"
                      d="M7.00065 0.833374C3.31732 0.833374 0.333985 3.81671 0.333985 7.50004C0.333183 8.89948 0.773051 10.2636 1.59119 11.399C2.40933 12.5344 3.56421 13.3833 4.89199 13.8254C5.22532 13.8834 5.35065 13.6834 5.35065 13.508C5.35065 13.35 5.34199 12.8254 5.34199 12.2667C3.66732 12.5754 3.23399 11.8587 3.10065 11.4834C3.02532 11.2914 2.70065 10.7 2.41732 10.5414C2.18399 10.4167 1.85065 10.108 2.40865 10.1C2.93399 10.0914 3.30865 10.5834 3.43399 10.7834C4.03399 11.7914 4.99199 11.508 5.37532 11.3334C5.43399 10.9 5.60865 10.6087 5.80065 10.442C4.31732 10.2754 2.76732 9.70004 2.76732 7.15004C2.76732 6.42471 3.02532 5.82537 3.45065 5.35871C3.38399 5.19204 3.15065 4.50871 3.51732 3.59204C3.51732 3.59204 4.07532 3.41671 5.35065 4.27471C5.89339 4.12431 6.45413 4.04872 7.01732 4.05004C7.58399 4.05004 8.15065 4.12471 8.68399 4.27471C9.95932 3.40804 10.5173 3.59204 10.5173 3.59204C10.884 4.50871 10.6507 5.19204 10.584 5.35871C11.0087 5.82537 11.2673 6.41671 11.2673 7.15004C11.2673 9.70871 9.70932 10.2754 8.22599 10.442C8.46732 10.65 8.67599 11.05 8.67599 11.6754C8.67599 12.5667 8.66732 13.2834 8.66732 13.5087C8.66732 13.6834 8.79265 13.8914 9.12599 13.8247C10.4492 13.3778 11.599 12.5272 12.4135 11.3927C13.2281 10.2581 13.6663 8.8967 13.6667 7.50004C13.6667 3.81671 10.6833 0.833374 6.99999 0.833374"
                      fill="#EA1D2C"
                    />
                  </svg>
                  Github
                </AlertDialogAction>

                {/* GOOGLE */}
                <AlertDialogAction
                  className="group flex items-center justify-center gap-2 border-2 border-primary bg-white text-primary hover:bg-primary hover:fill-white hover:text-white"
                  onClick={handleSignInClickGoogle}
                >
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="group-hover:fill-white"
                      d="M1.04332 4.50671C1.59799 3.4022 2.4489 2.47372 3.50094 1.82502C4.55298 1.17633 5.76469 0.832985 7.00065 0.833374C8.79732 0.833374 10.3067 1.49404 11.4607 2.57004L9.54932 4.48204C8.85798 3.82137 7.97932 3.48471 7.00065 3.48471C5.26398 3.48471 3.79398 4.65804 3.27065 6.23338C3.13732 6.63338 3.06132 7.06004 3.06132 7.50004C3.06132 7.94004 3.13732 8.36671 3.27065 8.76671C3.79465 10.3427 5.26398 11.5154 7.00065 11.5154C7.89732 11.5154 8.66065 11.2787 9.25798 10.8787C9.60428 10.6507 9.90074 10.3549 10.1295 10.009C10.3582 9.66322 10.5144 9.27461 10.5887 8.86671H7.00065V6.28804H13.2793C13.358 6.72404 13.4007 7.17871 13.4007 7.65137C13.4007 9.68204 12.674 11.3914 11.4127 12.5514C10.31 13.57 8.80065 14.1667 7.00065 14.1667C6.12507 14.1671 5.25801 13.9949 4.44901 13.66C3.64002 13.325 2.90495 12.834 2.28582 12.2149C1.6667 11.5957 1.17565 10.8607 0.840741 10.0517C0.505834 9.24268 0.333634 8.37562 0.333985 7.50004C0.333985 6.42404 0.591318 5.40671 1.04332 4.50671Z"
                      fill="#EA1D2C"
                    />
                  </svg>
                  Google
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </>
  );
};

export default Cart;
