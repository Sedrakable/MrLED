"use client";
import React, { FC } from "react";

import styles from "./Projects.module.scss";
import cn from "classnames";

import FlexDiv from "../../../reuse/FlexDiv";
import { IFlash } from "@/data.d";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { FlashForm } from "@/components/reuse/Form/FlashForm/FlashForm";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { Heading } from "@/components/reuse/Heading";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";

interface FlashModalProps {
  project: IFlash;
  formData?: FormTitleProps;
}

export const FlashModal: FC<FlashModalProps> = ({ project, formData }) => {
  const locale = useLocale() as LangType;
  const trans = getTranslations(locale);

  return (
    <FlexDiv
      gapArray={[6, 7, 7, 8]}
      flex={{ direction: "column-reverse", y: "flex-start" }}
      width100
      className={cn({ [styles.flashModalContainer]: true })}
    >
      {!project?.reserved && (
        <FlashForm flashFormData={formData} selectedFlash={project?.title} />
      )}

      {project?.reserved && (
        <FlexDiv
          className={styles.reserverWrapper}
          padding={{
            all: [3, 4, 4, 5],
            horizontal: [4, 5, 5, 6],
            bottom: [2, 3, 3, 4],
          }}
        >
          <Heading level="5" as="h4" color="dark-burgundy">
            {trans.other.notAvailable}
          </Heading>
        </FlexDiv>
      )}

      <FlexDiv
        gapArray={[3, 3, 4, 5]}
        className={styles.modalImageWrapper}
        flex={{ direction: "column" }}
        width100
      >
        {project.image && (
          <SanityImage
            image={project?.image.image}
            alt={project?.image.alt}
            figureClassName={cn(styles.modalImage, styles.image)}
            quality={100}
          />
        )}
        {project?.repeatable && (
          <Heading level="4" as="h4" color="dark-burgundy">
            {trans.other.repeatable}
          </Heading>
        )}
      </FlexDiv>
    </FlexDiv>
  );
};
