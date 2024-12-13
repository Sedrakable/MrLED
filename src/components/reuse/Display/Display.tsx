"use client";
import React from "react";
import styles from "./Display.module.scss";
import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { IFancyText, IHero } from "@/data.d";
import { useWindowResize } from "@/helpers/useWindowResize";
import { Button } from "../Button";
import { FancyText } from "../FancyText/FancyText";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph/Paragraph";
import { SanityImage } from "../SanityImage/SanityImage";
import { AnimatedWrapper } from "../AnimatedWrapper/AnimatedWrapper";
import { PortableTextContent } from "../Paragraph/PortableTextContent";

export type VersionType = "service" | "article";

export interface DisplayProps extends Omit<IHero, "title" | "desc"> {
  date?: string;
  title?: IFancyText;
  desc?: any;
  version: VersionType;
  reverse?: boolean;
}

export const Display: React.FC<DisplayProps> = ({
  backgroundImage,
  title,
  subTitle,
  desc,
  ctas,
  version,
  reverse,
  date,
}) => {
  const { isMobile } = useWindowResize();
  const locale = useLocale() as LangType;

  const CTAs = () =>
    ctas && (
      <FlexDiv
        gapArray={[4]}
        padding={{ top: [5, 4, 4, 5] }}
        flex={{
          direction: isMobile ? "column" : "row",
          x: reverse ? "flex-end" : "flex-start",
        }}
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
        {ctas.cta3 && (
          <Button variant="transparent" path={`/${locale}${ctas.cta3?.link}`}>
            {ctas.cta3?.text}
          </Button>
        )}
      </FlexDiv>
    );

  return (
    <AnimatedWrapper from={reverse ? "left" : "right"}>
      <FlexDiv
        className={cn(styles.display, styles[version], {
          [styles.reverse]: reverse,
        })}
        flex={{ direction: "column", y: "flex-start" }}
        width100
      >
        <SanityImage
          image={backgroundImage?.image}
          alt={backgroundImage?.alt}
          figureclassname={cn(styles.image)}
          quality={100}
        />
        <FlexDiv
          className={styles.content}
          flex={{
            direction: "column",
            x: reverse ? "flex-end" : "flex-start",
            y: "stretch",
          }}
          width100
          padding={{ horizontal: [6, 9, 11, 12], bottom: [6, 7, 7, 8] }}
          gapArray={[2]}
        >
          {date && (
            <Paragraph
              level="big"
              color="dark-burgundy"
              textAlign={reverse ? "right" : "left"}
            >
              {date}
            </Paragraph>
          )}
          {title && (
            <FancyText
              {...title}
              reverse={reverse}
              overflowText
              flexHorizontal={reverse ? "flex-end" : "flex-start"}
              blocker={!isMobile}
            />
          )}
          {subTitle && (
            <Heading
              as="h2"
              level={version === "article" ? "4" : "5"}
              color="burgundy"
              weight={500}
              className={styles.subTitle}
              textAlign={reverse ? "right" : "left"}
            >
              {subTitle}
            </Heading>
          )}
          <PortableTextContent
            value={desc}
            color="darkest-burgundy"
            textAlign={reverse ? "right" : "left"}
            className={styles.desc}
            weight={400}
            level="regular"
          />
          {/* <Paragraph
            level="regular"
            color="darkest-burgundy"
            className={styles.desc}
            textAlign={reverse ? "right" : "left"}
          >
            {desc}
          </Paragraph> */}
          <CTAs />
        </FlexDiv>
      </FlexDiv>
    </AnimatedWrapper>
  );
};
