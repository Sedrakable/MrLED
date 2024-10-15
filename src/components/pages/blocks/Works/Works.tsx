"use client";
import React, { FC } from "react";
import styles from "./Works.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Heading } from "../../../reuse/Heading";
import { IWork, LocalPaths } from "../../../../data.d";
import {
  ICustomImage,
  SanityImage,
} from "../../../reuse/SanityImage/SanityImage";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import Link from "next/link";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";
import { TitleWrapper } from "../../../reuse/containers/TitleWrapper/TitleWrapper";
import { WorkPageProps } from "@/app/[locale]/portfolio/[slug]/page";

export interface WorkProps {
  backgroundImage: ICustomImage;
  title: string;
  path: LocalPaths;
  reserve?: boolean;
}

const Work: FC<WorkProps> = ({ backgroundImage, title, path, reserve }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const { isMobileOrTablet } = useWindowResize();
  return (
    <Link
      href={`/${locale}${LocalPaths.PORTFOLIO}${path}`}
      key={path}
      className={styles.container}
      aria-label={title}
    >
      <SanityImage
        image={backgroundImage?.image}
        alt={backgroundImage?.alt}
        figureclassname={cn(styles.image)}
        quality={50}
      />

      <FlexDiv as="cite" className={styles.text}>
        <Heading
          as="h2"
          level="3"
          color="cream-white"
          weight={400}
          className={styles.title}
        >
          {title}
        </Heading>
        {reserve && (
          <FlexDiv
            padding={{ horizontal: [6], vertical: [3], bottom: [2] }}
            className={styles.reserve}
          >
            <Paragraph
              level={isMobileOrTablet ? "regular" : "big"}
              color="burgundy"
              weight={400}
            >
              {translations.other.reserve}
            </Paragraph>
          </FlexDiv>
        )}
      </FlexDiv>
    </Link>
  );
};

export const Works: React.FC<{ worksData: WorkPageProps[] }> = ({
  worksData,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const works: WorkProps[] = worksData.map((work) => {
    return {
      backgroundImage: work.hero.backgroundImage,
      path: work.path,
      title: work.hero.title.part1,
      reserve: work.reserve,
    };
  });
  return (
    <TitleWrapper title={translations.titles.work}>
      <FlexDiv gapArray={[6, 4, 5, 6]} width100 className={cn(styles.wrapper)}>
        {works.map((work) => {
          return <Work key={work.title} {...work} />;
        })}
      </FlexDiv>
    </TitleWrapper>
  );
};
