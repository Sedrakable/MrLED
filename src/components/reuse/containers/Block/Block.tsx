import React, { CSSProperties, PropsWithChildren } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../../FlexDiv";
import Image from "next/image";
import cn from "classnames";

export const BlockVariants = ["default", "full-width"] as const;

export type BlockVariantType = typeof BlockVariants[number];

interface BlockProps {
  variant: BlockVariantType;
  illustrations?: boolean;
  customStyle?: CSSProperties;
}
export const Block: React.FC<PropsWithChildren<BlockProps>> = ({
  variant = "default",
  customStyle,
  illustrations,
  children,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      className={cn(styles.block, styles[variant])}
      padding={{
        horizontal: variant === "full-width" ? [0] : [6, 8, 11, 12],
        top: variant === "full-width" ? [10, 10, 10, 11] : [9, 9, 9, 10],
        bottom: variant === "full-width" ? [10, 10, 10, 11] : [7, 9, 9, 10],
      }}
      width100
      as="article"
      style={customStyle}
    >
      <FlexDiv
        flex={{ direction: "column", y: "flex-start" }}
        className={cn(styles.content)}
        gapArray={variant === "full-width" ? [11, 10, 11, 12] : [9, 9, 9, 10]}
        width100
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};
