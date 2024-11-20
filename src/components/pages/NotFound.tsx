import React from "react";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { Button } from "../reuse/Button";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { INotFound, LocalPaths } from "@/data.d";
import { Block } from "../reuse/containers/Block/Block";
import { TitleWrapper } from "../reuse/containers/TitleWrapper/TitleWrapper";

export const NotFoundComp: React.FC<{ data: INotFound; locale: LangType }> = ({
  data,
  locale,
}) => {
  const translations = getTranslations(locale);
  return (
    data && (
      <>
        <Block>
          <TitleWrapper title={data.title}>
            <Paragraph level="big" color="dark-burgundy" textAlign="center">
              {data.desc}
            </Paragraph>
            <Button variant="primary" path={`/${locale}${LocalPaths.HOME}`}>
              {translations.nav.home}
            </Button>
          </TitleWrapper>
        </Block>
      </>
    )
  );
};
