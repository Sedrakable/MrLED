"use client";
import React, { FC } from "react";
import styles from "./Approx.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import {
  FloatingImages,
  FloatingImageWrapper,
} from "@/components/reuse/Form/FloatingImageWrapper/FloatingImageWrapper";
import { ApproxForm } from "@/components/reuse/Form/ApproxForm/ApproxForm";
import { FormTitleProps } from "@/components/reuse/Form/Form";

export interface ApproxProps {
  form: FormTitleProps;
  images: FloatingImages;
  plan: string;
}

export const Approx: FC<ApproxProps> = ({ form, images, plan }) => {
  return (
    <FlexDiv
      gapArray={[7, 7, 7, 8]}
      width100
      className={cn(styles.container)}
      flex={{ direction: "column" }}
    >
      <FloatingImageWrapper
        images={images}
        title={form.title}
        subTitle={form.subTitle}
      >
        <ApproxForm {...form} plan={plan} />
      </FloatingImageWrapper>
    </FlexDiv>
  );
};
