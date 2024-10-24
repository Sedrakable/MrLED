"use client";
import React, { FC } from "react";
import styles from "./Contact.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import {
  ContactForm,
  ContactFormProps,
} from "@/components/reuse/Form/ContactForm/ContactForm";
import {
  FloatingImages,
  FloatingImageWrapper,
} from "@/components/reuse/Form/FloatingImageWrapper/FloatingImageWrapper";

export interface ContactProps {
  form: ContactFormProps;
  images: FloatingImages;
}

export const Contact: FC<ContactProps> = ({ form, images }) => {
  return (
    <FlexDiv
      gapArray={[7, 7, 7, 8]}
      width100
      className={cn(styles.container)}
      flex={{ direction: "column" }}
    >
      <FloatingImageWrapper images={images}>
        <ContactForm {...form} />
      </FloatingImageWrapper>
    </FlexDiv>
  );
};
