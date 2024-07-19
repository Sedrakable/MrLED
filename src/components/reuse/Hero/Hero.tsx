"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import { Paragraph } from "../Paragraph";
import { IHomeHero } from "../../../data.d";
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

interface HeroProps extends IHomeHero {
  version?: VersionType;
}

export const Hero: React.FC<HeroProps> = ({
  backgroundImage,
  foregroundImage,
  title,
  subTitle,
  subTitle2,
  desc,
  ctas,
  version = 2,
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const locale = useLocale() as LangType;

  const vertical =
    (version === 1 && isMobileOrTablet) || (version === 2 && isMobile);

  const SubTitle = () =>
    subTitle && (
      <Heading
        as="h2"
        level="4"
        color="dark-burgundy"
        className={styles.subTitle}
      >
        {subTitle}
      </Heading>
    );

  const CTAs = () =>
    ctas && (
      <FlexDiv
        gapArray={[4, 4, 4, 4]}
        flex={{ direction: isMobile ? "column" : "row", x: "flex-start" }}
        width100
      >
        <Button variant="primary" path={`/${locale}${ctas.cta1?.link}`}>
          {ctas.cta1?.text}
        </Button>
        {ctas.cta2 && (
          <Button variant="transparent" path={`/${locale}${ctas.cta2?.link}`}>
            {ctas.cta2?.text}
          </Button>
        )}
      </FlexDiv>
    );

  const MainContent = () => (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
      padding={{
        horizontal: [6, 9, 11, 12],
        bottom: [6, 7, 7, 8],
        top: [7, 5, 0, 0],
      }}
      className={styles.main}
      gapArray={[5, 4, 4, 5]}
      width100
      customStyle={{ zIndex: 1 }}
    >
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        className={styles.textWrapper}
        width100
      >
        {!vertical && <SubTitle />}
        <FlexDiv
          flex={{ direction: "column", x: "flex-start" }}
          className={styles.desc}
        >
          {subTitle2 && (
            <Paragraph
              level="big"
              color="burgundy"
              paddingBottomArray={[2, 0, 0, 1]}
            >
              {subTitle2}
            </Paragraph>
          )}
          <Paragraph level="regular" color="darkest-burgundy">
            {desc}
          </Paragraph>
        </FlexDiv>
      </FlexDiv>
      <CTAs />
    </FlexDiv>
  );

  return (
    <header className={cn(styles.hero, styles["version" + version])}>
      {!vertical && (
        <div className={styles.illustration}>
          <Image src={fishes.src} alt="fishes" width={800} height={1200} />
        </div>
      )}
      <FlexDiv
        className={styles.content}
        flex={{
          direction: "column",
          x: "flex-start",
          y: "stretch",
        }}
        width100
        padding={{ horizontal: [6, 7, 0, 0] }}
      >
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
          figureClassName={cn(styles.image, styles.backgroundImage)}
          quality={version == 1 ? 10 : 40}
        />

        <FlexDiv
          padding={{ left: [0, 0, 10, 11] }}
          customStyle={{ zIndex: 1 }}
          className={styles.title}
          width100
          flex={{ x: "flex-start" }}
        >
          <FancyText
            {...title}
            reverse={vertical}
            overflowText={version == 2}
          />
        </FlexDiv>
        {vertical && <SubTitle />}
        {!vertical && <MainContent />}
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
      {vertical && <MainContent />}
    </header>
  );
};
