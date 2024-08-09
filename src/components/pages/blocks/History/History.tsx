"use client";
import React from "react";
import styles from "./History.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import AdehnnaRoundLogo from "@/assets/vector/AdhennaRoundLogo.svg";
import { IHistory } from "../../../../data.d";

import { useWindowResize } from "../../../../helpers/useWindowResize";
import { TextWrapper } from "../../../reuse/containers/TextWrapper/TextWrapper";
import { Paragraph } from "@/components/reuse/Paragraph";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { TitleWrapper } from "../../../reuse/containers/TitleWrapper/TitleWrapper";

export const History: React.FC<IHistory> = ({ text }) => {
  const { isMobileOrTablet, isMobile } = useWindowResize();
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  return (
    <TitleWrapper title={translations.titles.history}>
      <FlexDiv
        width100
        flex={{ direction: isMobileOrTablet ? "column" : "row" }}
        gapArray={[7, 7, 7, 8]}
        className={styles.container}
        wrap
      >
        <AdehnnaRoundLogo className={styles.logo} />
        <TextWrapper>
          <Paragraph
            level={isMobile ? "regular" : "big"}
            color="darkest-burgundy"
            textAlign={isMobileOrTablet ? "center" : "left"}
            weight={300}
          >
            {text}
          </Paragraph>
        </TextWrapper>
      </FlexDiv>
    </TitleWrapper>
  );
};
