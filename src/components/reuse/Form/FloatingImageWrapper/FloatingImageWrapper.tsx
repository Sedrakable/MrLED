import React, { FC } from "react";
import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./FloatingImageWrapper.module.scss";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface FloatingImageWrapperProps {
  children: React.ReactNode;
  images: FloatingImages;
}

export interface FloatingImages {
  img1: ICustomImage;
  img2: ICustomImage;
  img3: ICustomImage;
}

export const FloatingImageWrapper: FC<FloatingImageWrapperProps> = ({
  children,
  images,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  return (
    <FlexDiv gapArray={[6, 7, 8, 9]} className={styles.wrapper} width100>
      {children}
      {!isMobileOrTablet && (
        <FlexDiv
          className={styles.rightSide}
          width100
          flex={{ direction: "column" }}
        >
          <SanityImage {...images.img1} />
          <SanityImage {...images.img2} />
          <SanityImage {...images.img3} />
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
