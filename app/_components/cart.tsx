import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
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

          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <h2 className="text-center font-medium">SUa sacola está vazia</h2>
      )}
    </div>
  );
};

export default Cart;
