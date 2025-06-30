"use client";
import { FC } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./ImageAndForm.module.scss";
import cn from "classnames";

import Image from "next/image";
import { Block } from "@/components/containers/Block";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { ContactForm } from "@/components/reuse/Form/ContactForm";

export const ImageAndForm: FC<FormTitleProps> = ({ title, subTitle }) => {
  return (
    <Block variant="blue">
      <FlexDiv
        gapArray={[7, 8, 8, 9]}
        className={cn(styles.container)}
        flex={{ direction: "column" }}
      >
        <ContactForm title={title} subTitle={subTitle} />
        <FlexDiv className={styles.imageContainer}>
          <Image
            src={`/photos/FulllLogoTransparent.png`}
            alt="form image"
            width={500}
            height={500}
          />
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
