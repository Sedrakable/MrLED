"use client";
import React, { FC, useCallback, useState } from "react";
import styles from "./Cart.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { ICartProduct, LocalPaths } from "../../../../data.d";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Button } from "@/components/reuse/Button";
import { getTranslations } from "@/helpers/langUtils";
import { getFromLocalStorage, setToLocalStorage } from "@/helpers/localStorage";
import { Line } from "@/components/reuse/Line";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import {
  CartForm,
  CartFormProps,
} from "@/components/reuse/Form/CartForm/CartForm";
import { CART_STORAGE_KEY } from "./useCart";
import { ProductTab } from "../Products/ProductTab";

export interface CartProps {
  deliveryMethods: string[];
  title: string;
  subTitle?: string;
}

export const Cart: FC<CartProps> = (props) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const [cart, setCart] = useState<ICartProduct[]>(
    () => getFromLocalStorage<ICartProduct[]>(CART_STORAGE_KEY) || []
  );

  const updateCart = useCallback((newCart: ICartProduct[]) => {
    setCart(newCart);
    setToLocalStorage(CART_STORAGE_KEY, newCart);
  }, []);

  const totalPrice = cart.reduce((total, cartProduct) => {
    const price = parseFloat(cartProduct.product.price); // Convert the price string to a number
    return total + price * cartProduct.quantity; // Multiply by the quantity and add to the total
  }, 0);

  const roundedPrice = Math.ceil(totalPrice * 100) / 100;

  const formData: CartFormProps = {
    ...props,
    cart,
  };

  return cart.length === 0 ? (
    <FlexDiv flex={{ direction: "column" }} gapArray={[4]}>
      {/* TODO:add translations */}
      <Heading as="h3" level="5" color="burgundy" textAlign="center">
        No items in the cart. Go to the Boutique!
      </Heading>
      <Button variant="primary" path={`/${locale}${LocalPaths.BOUTIQUE}`}>
        {translations.nav.boutique}
      </Button>
    </FlexDiv>
  ) : (
    <FlexDiv
      gapArray={[7, 7, 7, 8]}
      width100
      className={cn(styles.container)}
      flex={{ direction: "column" }}
    >
      <FlexDiv
        gapArray={[7, 5, 5, 6]}
        width100
        flex={{ direction: "column", y: "flex-start" }}
      >
        {cart.map((product, key) => {
          return (
            <ProductTab
              key={key}
              product={product.product}
              quantity={product.quantity}
              updateCart={updateCart}
            />
          );
        })}
        <Line rotation="horizontal" color="light-burgundy" />
        <FlexDiv
          gapArray={[4]}
          className={cn(styles.totalPrice)}
          width100
          flex={{ x: "flex-end" }}
        >
          <Paragraph level="big" color="burgundy">
            {/* TODO  */}Total:
          </Paragraph>
          <Paragraph level="big" color="dark-burgundy">
            {roundedPrice}
          </Paragraph>
        </FlexDiv>
      </FlexDiv>
      <Line rotation="vertical" color="light-burgundy" />
      <CartForm {...formData} />
    </FlexDiv>
  );
};
