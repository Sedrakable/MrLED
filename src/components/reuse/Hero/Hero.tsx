"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";
import Image from "next/image";

import { IHero } from "../../../data.d";
import FlexDiv from "../FlexDiv";

import { useWindowResize } from "../../../helpers/useWindowResize";
import TitleFrench from "@/assets/vector/Titles/LedTaVie.svg";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { Button } from "../Button/Button";
import { Heading } from "../Heading/Heading";
import { PortableTextContent } from "../Paragraph/PortableTextContent";
import GradientSvgWrapper from "@/components/containers/GradientSvgWrapper/GradientSvgWrapper";

export const Hero: React.FC<IHero> = ({ subTitle, desc, cta1, cta2 }) => {
  const locale = useLocale() as LangType;
  // const translations = getTranslations(locale);
  const { isMobileOrTablet } = useWindowResize();
  // const heroRef = useRef<HTMLDivElement>(null);
  // const scrollProgress = useParallaxScroll(heroRef);

  return (
    <FlexDiv
      className={cn(styles.hero)}
      flex={{ direction: "column-reverse", x: "flex-start", y: "center" }}
      as={"header"}
      width100
      // ref={heroRef}
      // customStyle={
      //   {
      //     "--scroll-progress": scrollProgress,
      //   } as React.CSSProperties
      // }
    >
      <FlexDiv
        padding={{
          left: [6, 7, 8, 10],
          right: [6, 0],
          bottom: [6, 10, 0, 0],
        }}
        gapArray={[3, 3, 3, 4]}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        customStyle={{ zIndex: 3 }}
        className={styles.content}
      >
        {subTitle && (
          <Heading
            font="title"
            level="5"
            as="h2"
            color="grad"
            weight={500}
            className={styles.subTitle}
          >
            {subTitle}
          </Heading>
        )}

        {locale === "fr" ? (
          <GradientSvgWrapper
            SvgComponent={TitleFrench}
            className={styles.logo}
          />
        ) : (
          // <TitleFrench className={cn(styles.logo, styles.logoFrench)} />
          <TitleFrench className={cn(styles.logo, styles.logoFrench)} />
        )}
        {desc && (
          <PortableTextContent
            level={isMobileOrTablet ? "regular" : "big"}
            value={desc}
            color="white"
            className={styles.desc}
            paddingBottomArray={[4, 4, 4, 5]}
          />
        )}
        {cta1 && (
          <FlexDiv
            gapArray={[2, 3, 3, 4]}
            flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
            className={styles.ctas}
            width100
          >
            <Button
              variant={"simple"}
              path={cta1.path}
              scrollTarget={cta1.scrollTarget}
            >
              {cta1.text}
            </Button>
            {cta2 && (
              <Button
                variant="secondary"
                path={cta2.path}
                scrollTarget={cta2.scrollTarget}
              >
                {cta2.text}
              </Button>
            )}
          </FlexDiv>
        )}
      </FlexDiv>
      <div className={styles.imageContainer}>
        <Image
          src={`/photos/hero-background.png`}
          fill
          alt="stroke"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.backgroundImage}
        />
        <Image
          src={`/photos/hero-foreground.png`}
          fill
          alt="stroke"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.foregroundImage}
        />
      </div>
    </FlexDiv>
  );
};
