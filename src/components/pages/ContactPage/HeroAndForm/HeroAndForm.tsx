"use client";
import { FC } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./HeroAndForm.module.scss";
import cn from "classnames";

import { Block } from "@/components/containers/Block";
import { ContactForm } from "@/components/reuse/Form/ContactForm";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { HeroWrapper } from "@/components/reuse/HeroWrapper/HeroWrapper";

export interface IHeroAndFormProps {
  title: string;
  subTitle: string;
  contactInfos?: string[];
}
export const HeroAndForm: FC<IHeroAndFormProps> = ({
  title,
  subTitle,
  contactInfos,
}) => {
  const locale = useLocale() as LangType;
  const trans = getTranslations(locale);

  const leftContentSmall = (
    <FlexDiv
      width100
      className={styles.leftSmall}
      flex={{ y: "stretch" }}
      gapArray={[4]}
    >
      <Paragraph
        level="big"
        color="white"
        className={styles.subTitle}
        weight={600}
        textAlign="end"
      >
        {subTitle}
      </Paragraph>
      <div className={styles.line} />
      {contactInfos && (
        <FlexDiv
          gapArray={[2]}
          flex={{ direction: "column" }}
          className={styles.contactContainer}
        >
          <Paragraph level="big" color="grad">
            {trans.other.contactInfo}
          </Paragraph>
          {contactInfos?.map((info, index) => {
            return (
              <Paragraph key={index} level="regular" color="white" weight={500}>
                {info}
              </Paragraph>
            );
          })}
        </FlexDiv>
      )}
    </FlexDiv>
  );

  const leftContentBig = (
    <FlexDiv
      width100
      className={styles.leftBig}
      flex={{ direction: "column", x: "flex-start", y: "space-between" }}
    >
      <Paragraph
        level="big"
        color="white"
        className={styles.subTitle}
        weight={400}
        textAlign="end"
      >
        {subTitle}
      </Paragraph>

      <FlexDiv
        flex={{ x: "space-between", y: "flex-end" }}
        width100
        className={styles.bottom}
      >
        {contactInfos && (
          <FlexDiv
            gapArray={[2]}
            flex={{ direction: "column" }}
            className={styles.contactContainer}
            padding={{ left: [0, 0, 5, 6] }}
          >
            <Paragraph level="regular" weight={600} color="grad">
              {trans.other.contactInfo}
            </Paragraph>
            {contactInfos?.map((info, index) => {
              return (
                <Paragraph
                  key={index}
                  level="regular"
                  color="white"
                  weight={500}
                >
                  {info}
                </Paragraph>
              );
            })}
          </FlexDiv>
        )}
        <div className={styles.grid}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </FlexDiv>
    </FlexDiv>
  );

  const rightContent = (
    <FlexDiv width100 className={styles.right}>
      <ContactForm />
    </FlexDiv>
  );

  return (
    <Block variant="split" className={cn(styles.blockContainer)}>
      <HeroWrapper
        title={title}
        leftContentSmall={leftContentSmall}
        leftContentBig={leftContentBig}
        rightContentBig={rightContent}
        rightContentSmall={rightContent}
      />
    </Block>
  );
};
