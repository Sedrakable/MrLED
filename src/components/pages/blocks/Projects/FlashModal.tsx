"use client";
import React, { FC } from "react";

import styles from "./Projects.module.scss";
import cn from "classnames";

import FlexDiv from "../../../reuse/FlexDiv";
import { IFlash } from "@/data.d";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { FlashForm } from "@/components/reuse/Form/FlashForm/FlashForm";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";

interface FlashModalProps {
  project: IFlash;
  flashes: IFlash[];
  formData?: FormTitleProps;
}

export const FlashModal: FC<FlashModalProps> = ({
  project,
  flashes,
  formData,
}) => {
  const flashOptions = flashes.map((flash) => ({
    value: flash.title,
    label: flash.title,
  }));

  return (
    <FlexDiv
      gapArray={[6, 7, 7, 8]}
      flex={{ direction: "column-reverse", y: "flex-start" }}
      className={styles.flashModalContainer}
    >
      <FlashForm
        flashOptions={flashOptions}
        flashFormData={formData}
        selectedFlash={project?.title}
      />

      <SanityImage
        image={project?.image.image}
        alt={project?.image.alt}
        figureclassname={cn(styles.modalImage, styles.image)}
        quality={100}
      />
    </FlexDiv>
  );
};
