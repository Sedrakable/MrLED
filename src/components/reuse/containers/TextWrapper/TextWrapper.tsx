"use client";
import React, { FC, ReactNode } from "react";
import cn from "classnames";
import styles from "./TextWrapper.module.scss";
import FlexDiv from "../../FlexDiv";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";

interface TextWrapperProps {
  children?: ReactNode;
  version?: 1 | 2 | 3;
  backgroundImage?: ICustomImage;
}

export const TextWrapper: FC<TextWrapperProps> = ({
  children,
  version = 1,
  backgroundImage,
}) => {
  return (
    <FlexDiv
      width100
      padding={{ vertical: [5, 6, 6, 6], horizontal: [6, 8, 8, 9] }}
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
          figureClassName={styles.backgroundImage}
          quality={30}
        />
      )}
      {children}
    </FlexDiv>
  );
};
