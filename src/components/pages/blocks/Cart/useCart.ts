import { useState, useCallback } from "react";

import { getFromLocalStorage, setToLocalStorage } from "@/helpers/localStorage";
import { IProduct, ICartProduct } from "@/data.d";

export const CART_STORAGE_KEY = "cartProducts";

export const useCart = () => {
  const [checkCartAlert, setCheckCartAlert] = useState<boolean>(false);

  const addToCart = useCallback((product: IProduct, quantity: number) => {
    const cartProducts =
      getFromLocalStorage<ICartProduct[]>(CART_STORAGE_KEY) || [];
    setCheckCartAlert(true);

    const existingProduct = cartProducts.find(
      (item) => item.product.path === product.path
    );

    // For toiles products, we don't allow duplicates or quantity increases
    if (product.type === "toiles") {
      // If the product already exists, don't add it again
      if (existingProduct) {
        // Optionally, you could show a message here that the item is already in cart
        return;
      }

      // Add the toiles product with a quantity of 1, regardless of requested quantity
      setToLocalStorage(CART_STORAGE_KEY, [
        ...cartProducts,
        { product, quantity: 1 },
      ]);
      return;
    }

    // Handle non-toiles products as before
    if (existingProduct) {
      const updatedCartProducts = cartProducts.map((item) =>
        item.product.path === product.path
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setToLocalStorage(CART_STORAGE_KEY, updatedCartProducts);
    } else {
      setToLocalStorage(CART_STORAGE_KEY, [
        ...cartProducts,
        { product, quantity },
      ]);
    }
  }, []);

  return { addToCart, checkCartAlert };
};
