"use client";
import React, { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./TextWrapper.module.scss";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import FlexDiv from "@/components/reuse/FlexDiv";
import { AnimatedWrapper } from "../AnimatedWrapper/AnimatedWrapper";

export type SizeType = "small" | "big";

interface TextWrapperProps {
  children?: ReactNode;
  version?: 1 | 2 | 3;
  backgroundImage?: ICustomImage;
  variant?: SizeType;
  animate?: boolean;
  direction?: "row" | "column";
}

export const TextWrapper: FC<TextWrapperProps> = ({
  children,
  version = 1,
  backgroundImage,
  variant,
  animate = true,
  direction = "column",
}) => {
  const wrapper = (
    <FlexDiv
      width100
      padding={{
        vertical: variant === "big" ? [6, 6, 6, 7] : [4, 4, 4, 5],
        horizontal: variant === "big" ? [4, 7, 7, 8] : [4, 6, 6, 7],
      }}
      flex={{ direction }}
      className={cn(styles.wrapper, styles[`version${version}`])}
    >
      {backgroundImage && version == 2 && (
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          figureclassname={styles.backgroundImage}
          quality={50}
        />
      )}

      {children}
    </FlexDiv>
  );
  return animate ? (
    <AnimatedWrapper from="inside">{wrapper}</AnimatedWrapper>
  ) : (
    wrapper
  );
};
