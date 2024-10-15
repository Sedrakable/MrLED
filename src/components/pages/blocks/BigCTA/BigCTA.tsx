"use client";
import React from "react";
import { Heading } from "../../../reuse/Heading";
import { LocalPaths } from "../../../../data.d";
import { Button } from "../../../reuse/Button";
import { getTranslations } from "../../../../helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import { TextWrapper } from "../../../reuse/containers/TextWrapper/TextWrapper";
import FlexDiv from "@/components/reuse/FlexDiv";
import { ICustomImage } from "@/components/reuse/SanityImage/SanityImage";

export interface BigCTAProps {
  title: string;
  backgroundImage: ICustomImage;
}

export const BigCTA: React.FC<BigCTAProps> = ({ title, backgroundImage }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  return (
    <TextWrapper version={2} backgroundImage={backgroundImage}>
      <FlexDiv
        flex={{ direction: "column" }}
        gapArray={[0, 3, 3, 4]}
        padding={{ top: [0, 0, 2, 3] }}
      >
        <Heading
          as="h3"
          level="5"
          color="dark-burgundy"
          textAlign="center"
          weight={500}
        >
          {title}
        </Heading>
        <Button variant="primary" path={LocalPaths.CONTACT}>
          {translations.nav.contact}
        </Button>
      </FlexDiv>
    </TextWrapper>
  );
};
