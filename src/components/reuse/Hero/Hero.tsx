"use client";
import React from "react";
import styles from "./Hero.module.scss";
import cn from "classnames";

import { IHero } from "../../../data.d";
import FlexDiv from "../FlexDiv";

import { useWindowResize } from "../../../helpers/useWindowResize";

import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { Button } from "../Button/Button";
import { Heading } from "../Heading/Heading";
import { PortableTextContent } from "../Paragraph/PortableTextContent";
import TitleFrench from "@/assets/vector/Titles/LedTaVie.svg";
import TitleEnglish from "@/assets/vector/Titles/LedYourLife.svg";
import PixelGrid from "@/assets/vector/Graphics/pixel-grid.svg";
import PixelGridMobile from "@/assets/vector/Graphics/pixel-grid-mobile.svg";
import GradientSvgWrapper from "@/components/containers/GradientSvgWrapper/GradientSvgWrapper";

export const Hero: React.FC<IHero> = ({ subTitle, desc, cta1, cta2 }) => {
  const locale = useLocale() as LangType;
  const { isMobile } = useWindowResize();

  return (
    <FlexDiv
      className={cn(styles.hero)}
      flex={{ direction: "column-reverse", x: "flex-start", y: "center" }}
      as={"header"}
      width100
      padding={{
        horizontal: [6, 8, 9, 10],
      }}
    >
      <FlexDiv
        padding={{
          bottom: [6, 9, 0, 0],
          top: [10, 10, 0, 0],
        }}
        gapArray={[4, 3, 4, 4]}
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
          <GradientSvgWrapper
            SvgComponent={TitleEnglish}
            className={styles.logo}
          />
        )}
        {desc && (
          <PortableTextContent
            level="regular"
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
        {isMobile ? (
          <PixelGridMobile className={styles.pixelGrid} />
        ) : (
          <PixelGrid className={styles.pixelGrid} />
        )}
      </div>
    </FlexDiv>
  );
};
