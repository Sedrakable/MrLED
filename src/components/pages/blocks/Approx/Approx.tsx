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
}

export const Approx: FC<ApproxProps> = ({ form, images }) => {
  return (
    <FlexDiv
      gapArray={[7, 7, 7, 8]}
      width100
      className={cn(styles.container)}
      flex={{ direction: "column" }}
    >
      <FloatingImageWrapper images={images}>
        <ApproxForm {...form} />
      </FloatingImageWrapper>
    </FlexDiv>
  );
};
