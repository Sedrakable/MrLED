"use client";
import React, { FC } from "react";
import styles from "./Products.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { IProduct } from "@/data.d";
import { ProductCard } from "./ProductCard";

export const ProductGrid: FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <FlexDiv
      gapArray={[7, 5, 5, 6]}
      width100
      className={cn(styles.wrapper)}
      flex={{ y: "flex-start" }}
    >
      {products.map((product) => {
        return <ProductCard key={product.title} {...product} />;
      })}
    </FlexDiv>
  );
};
