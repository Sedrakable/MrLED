"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import { Paragraph } from "../Paragraph/Paragraph";
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

const imageQuality: Record<VersionType, number> = {
  1: 60,
  2: 90,
  3: 80,
};

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
  const { isMobile, isTablet, isMobileOrTablet } = useWindowResize();
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
        flex={{
          direction: isMobile ? "column" : "row",
          x: version === 3 ? "center" : "flex-start",
        }}
        width100
      >
        <Button
          variant={version === 3 ? "extra" : "primary"}
          path={`/${locale}${ctas.cta1?.link}`}
        >
          {ctas.cta1?.text}
        </Button>
        {ctas.cta2 && version !== 3 && (
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
        horizontal: version === 2 ? [6, 0, 11, 12] : [6, 9, 11, 12],
        bottom: [6, 7, 7, 8],
        top: version === 3 ? [0, 0, 0, 0] : [7, 5, 0, 0],
      }}
      className={styles.main}
      gapArray={[5, 4, 4, 5]}
      width100
      customStyle={{ zIndex: 1 }}
    >
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        padding={{ horizontal: version === 3 ? [0, 4, 10, 12] : [0] }}
        className={styles.textWrapper}
        width100
      >
        {!vertical && <SubTitle />}
        <FlexDiv
          flex={{
            direction: "column",
            x: version === 3 ? "center" : "flex-start",
          }}
          width100={version === 3}
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
          <Paragraph
            level="regular"
            color={version === 3 ? "cream-white" : "darkest-burgundy"}
            textAlign={version === 3 ? "center" : "left"}
            weight={version === 3 ? 300 : 400}
          >
            {desc}
          </Paragraph>
        </FlexDiv>
      </FlexDiv>
      <CTAs />
    </FlexDiv>
  );

  return (
    <header className={cn(styles.hero, styles["version" + version])}>
      {!vertical && version !== 3 && (
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
        padding={{
          horizontal: version === 3 ? [0, 7, 0] : [6, 7, 0, 0],
          top: version === 3 ? [0, 6, 6, 7] : [0],
        }}
      >
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          loading="eager"
          fetchPriority="high"
          rel="preload"
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
          figureclassname={cn(styles.image, styles.backgroundImage)}
          quality={imageQuality[version]}
        />

        <FlexDiv
          padding={{ left: [0, 0, 10, 11], right: [0, 0, 4, 5] }}
          customStyle={{ zIndex: 1 }}
          className={styles.title}
          width100
          flex={{ x: "flex-start" }}
        >
          {version === 3 ? (
            <Heading as="h1" level={isTablet ? "1" : "2"}>
              {title.part1}
            </Heading>
          ) : (
            <FancyText
              {...title}
              reverse={vertical}
              overflowText={version == 2}
            />
          )}
        </FlexDiv>
        {vertical && <SubTitle />}
        {!vertical && <MainContent />}
        {version !== 3 && <AdehnnaWordmark className={styles.wordMark} />}
        {foregroundImage && (
          <SanityImage
            image={foregroundImage?.image}
            alt={foregroundImage?.alt}
            loading="eager"
            fetchPriority="high"
            rel="preload"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, (max-width: 1680px) 100vw"
            figureclassname={cn(styles.image, styles.foregroundImage)}
            quality={90}
          />
        )}
      </FlexDiv>
      {vertical && <MainContent />}
    </header>
  );
};
