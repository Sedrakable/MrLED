"use client";
import React, { FC } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import { IWork, IWorkBlock, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";

import Link from "next/link";
import FlexDiv from "@/components/reuse/FlexDiv";
import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import GridDiv from "@/components/reuse/GridDiv";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { Block } from "@/components/containers/Block";
import { AnimatedWrapper } from "@/components/containers/AnimatedWrapper/AnimatedWrapper";

export const Project: FC<IWork> = ({
  thumbnailImage,
  descEN,
  descFR,
  slug,
}) => {
  const locale = useLocale() as LangType;
  const content = (
    <FlexDiv
      width100
      flex={{ x: "flex-start", direction: "column" }}
      className={styles.card}
    >
      <SanityImage
        {...thumbnailImage}
        quality={100}
        // sizes={imageWidthsByColumns[columnCount]}
        figureclassname={styles.image} // Note: Kept your prop name as-is
      />

      <FlexDiv
        padding={{
          horizontal: [3, 3, 3, 4],
          bottom: [3, 3, 3, 4],
          top: [4, 3, 3, 4],
        }}
        flex={{ direction: "column" }}
        className={styles.text}
      >
        <Paragraph
          level="regular"
          color="black"
          className={styles.desc}
          weight={500}
        >
          {locale === "fr" && descFR ? descFR : descEN}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
  if (!slug || !slug.current) {
    return content;
  }
  return (
    <Link
      href={`/${locale}${LocalPaths.PORTFOLIO}/${slug.current}`}
      className={styles.link}
    >
      {content}
    </Link>
  );
};

export const Projects: React.FC<IWorkBlock> = ({
  works: projects,
  titleFR,
  titleEN,
}) => {
  const locale = useLocale() as LangType;
  console.log(projects);
  return (
    <Block
      title={{
        children: locale === "fr" && titleFR ? titleFR : titleEN,
        font: "title",
        color: "grad",
        weight: 400,
      }}
      // variant="green"
    >
      <GridDiv
        gapArray={[5, 4, 4, 5]}
        rowGapArray={[4, 5, 3, 4]}
        columns={[
          [1, 1],
          [1, 2],
          [3, 3],
          [3, 3],
        ]}
        className={cn(styles.projects)}
        width100
        fill
      >
        {projects.map((project, key) => (
          <AnimatedWrapper from="inside" key={key}>
            <Project {...project} />
          </AnimatedWrapper>
        ))}
      </GridDiv>
    </Block>
  );
};
