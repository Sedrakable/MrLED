"use client";
import React, { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./TextWrapper.module.scss";
import FlexDiv from "../../FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";

export type SizeType = "small" | "big";

interface TextWrapperProps {
  children?: ReactNode;
  version?: 1 | 2 | 3;
  backgroundImage?: ICustomImage;
  variant?: SizeType;
}

export const TextWrapper: FC<TextWrapperProps> = ({
  children,
  version = 1,
  backgroundImage,
  variant,
}) => {
  return (
    <FlexDiv
      width100
      padding={{
        vertical:
          version == 3
            ? variant === "big"
              ? [6, 6, 6, 7]
              : [4, 4, 4, 5]
            : [5, 6, 6, 6],
        horizontal:
          version == 3
            ? variant === "big"
              ? [4, 7, 7, 8]
              : [3, 4, 4, 4]
            : [6, 8, 8, 9],
      }}
      className={cn(styles.wrapper, styles[`version${version}`])}
    >
      {backgroundImage && version == 2 && (
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
          figureclassname={styles.backgroundImage}
          quality={30}
        />
      )}
      {children}
    </FlexDiv>
  );
};
