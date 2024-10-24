"use client";
import React, { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./TextWrapper.module.scss";
import FlexDiv from "../../FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { Star } from "../../Star/Star";

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
        vertical: variant === "big" ? [6, 6, 6, 7] : [4, 4, 4, 5],
        horizontal: variant === "big" ? [4, 7, 7, 8] : [4, 6, 6, 7],
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
      {version === 1 && (
        <>
          <div className={styles.starWrapper1}>
            <Star />
          </div>

          <div className={styles.starWrapper2}>
            <Star />
          </div>
        </>
      )}

      {version === 2 && (
        <div className={styles.starWrapper3}>
          <Star />
        </div>
      )}
      {children}
    </FlexDiv>
  );
};
