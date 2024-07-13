"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import { Paragraph } from "../Paragraph";
import { IHero } from "../../../data.d";
import FlexDiv from "../FlexDiv";
import AdehnnaWordmark from "@/assets/vector/AdhennaWordmark.svg";
import Image from "next/image";
import { Button } from "../Button";
import { SanityImage } from "../SanityImage/SanityImage";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { Heading } from "../Heading";
import { FancyText } from "../FancyText/FancyText";
import fishes from "/public/photos/Fishes.jpeg";

export type VersionType = 1 | 2 | 3;

interface HeroProps extends IHero {
  version?: VersionType;
}

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  foregroundImage,
  title,
  subTitle1,
  subTitle2,
  desc,
  ctas,
  version = 2,
}) => {
  const { isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;
  return (
    <header className={cn(styles.hero)}>
      <div className={styles.illustration}>
        <Image src={fishes.src} alt="fishes" width={800} height={1200} />
      </div>
      <FlexDiv
        className={styles.content}
        flex={{ direction: "column", x: "flex-start", y: "stretch" }}
        width100
        height100
      >
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
          figureClassName={cn(styles.image, styles.backgroundImage)}
          quality={10}
        />
        <FlexDiv
          padding={{ left: [0, 0, 10, 11] }}
          customStyle={{ zIndex: 1 }}
          className={styles.title}
        >
          <FancyText {...title} />
        </FlexDiv>
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          padding={{ horizontal: [0, 0, 11, 12] }}
          className={styles.main}
          gapArray={[0, 0, 0, 6]}
          width100
          height100
          customStyle={{ zIndex: 1 }}
        >
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            className={styles.textWrapper}
            width100
          >
            {subTitle1 && (
              <Heading
                as="h2"
                level="4"
                color="dark-burgundy"
                className={styles.subTitle1}
              >
                {subTitle1}
              </Heading>
            )}
            <FlexDiv
              flex={{ direction: "column", x: "flex-start" }}
              className={styles.desc}
            >
              {subTitle2 && (
                <Paragraph level="big" color="burgundy">
                  {subTitle2}
                </Paragraph>
              )}
              <Paragraph level="regular" color="darkest-burgundy">
                {desc}
              </Paragraph>
            </FlexDiv>
          </FlexDiv>
          {ctas && (
            <FlexDiv gapArray={[0, 0, 0, 4]}>
              <Button variant="primary" path={`/${locale}${ctas.cta1?.link}`}>
                {ctas.cta1?.text}
              </Button>
              {ctas.cta2 && (
                <Button
                  variant="transparent"
                  path={`/${locale}${ctas.cta2?.link}`}
                >
                  {ctas.cta2?.text}
                </Button>
              )}
            </FlexDiv>
          )}
        </FlexDiv>
        <AdehnnaWordmark className={styles.wordMark} />
        {foregroundImage && (
          <SanityImage
            image={foregroundImage?.image}
            alt={foregroundImage?.alt}
            loading="eager"
            fetchPriority="high"
            rel="preload"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
            figureClassName={cn(styles.image, styles.foregroundImage)}
            quality={90}
          />
        )}
      </FlexDiv>
    </header>
  );
};
