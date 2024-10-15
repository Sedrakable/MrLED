"use client";
import React, { FC } from "react";
import styles from "./Contact.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import {
  ContactForm,
  ContactFormProps,
} from "@/components/reuse/Form/ContactForm/ContactForm";

export interface ContactProps {
  form: ContactFormProps;
}

export const Contact: FC<ContactProps> = ({ form }) => {
  return (
    <FlexDiv
      gapArray={[7, 7, 7, 8]}
      width100
      className={cn(styles.container)}
      flex={{ direction: "column" }}
    >
      <ContactForm {...form} />
    </FlexDiv>
  );
};
