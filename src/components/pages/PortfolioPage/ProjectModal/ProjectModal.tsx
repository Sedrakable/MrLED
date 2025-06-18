"use client";

import React from "react";
import styles from "./ProjectModal.module.scss";

import FlexDiv from "@/components/reuse/FlexDiv";
import { IWork } from "@/data.d";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { ThumbCarousel } from "@/components/reuse/Carousel/ThumbCarousel";

export const ProjectModalContent: React.FC<IWork> = (props) => {
  const { images, descEN, descFR } = props;
  const locale = useLocale() as LangType; // Replace with actual locale logic

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      gapArray={[3, 3, 3, 4]}
      className={styles.projectModal}
    >
      <Paragraph
        level="regular" // Use the appropriate level for your design
        color="white"
        weight={500}
        className={styles.desc}
        textAlign="center"
      >
        {locale === "en" ? descEN : descFR}
      </Paragraph>

      {images && <ThumbCarousel images={images} />}
    </FlexDiv>
  );
};
