import React, { FC } from "react";
import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./FloatingImageWrapper.module.scss";
import {
  ICustomImage,
  SanityImage,
} from "@/components/reuse/SanityImage/SanityImage";
import { useWindowResize } from "@/helpers/useWindowResize";
import { FormTitleProps, FormTitles } from "../Form";

export interface FloatingImageWrapperProps extends FormTitleProps {
  children: React.ReactNode;
  images: FloatingImages;
}

export interface FloatingImages {
  img1: ICustomImage;
  img2: ICustomImage;
  img3: ICustomImage;
}

export const FloatingImageWrapper: FC<FloatingImageWrapperProps> = ({
  title,
  subTitle,
  children,
  images,
}) => {
  const { isMobileOrTablet } = useWindowResize();

  const imagesArray = [images.img1, images.img2, images.img3];
  return (
    <FlexDiv gapArray={[5, 6, 6, 7]} width100 flex={{ direction: "column" }}>
      <FormTitles title={title} subTitle={subTitle} />
      <FlexDiv
        gapArray={[6, 7, 8, 9]}
        className={styles.wrapper}
        width100
        flex={{ y: "flex-start" }}
      >
        {children}
        {!isMobileOrTablet && (
          <FlexDiv
            className={styles.rightSide}
            width100
            flex={{ direction: "column" }}
          >
            {imagesArray.map((image, index) => {
              return <SanityImage key={index} {...image} quality={20} />;
            })}
          </FlexDiv>
        )}
      </FlexDiv>
    </FlexDiv>
  );
};
