"use client";
import React, { FC } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { ICta, LocalPaths } from "../../../../data.d";
import { Heading } from "@/components/reuse/Heading";
import { Button } from "@/components/reuse/Button";
import { usePathname } from "@/navigation";
import { LangType } from "@/i18n";

export const ProjectNavigation: FC<{
  locale: LangType;
  translations: any;
}> = ({ translations, locale }) => {
  const pathname = usePathname();

  const getButtonPath = (page: ICta) =>
    `/${locale}${LocalPaths.PORTFOLIO}${page.link ? page.link[0] : ""}`;

  const pageOrder: ICta[] = [
    { text: translations.nav.tattoo, link: [LocalPaths.TATTOO] },
    { text: translations.nav.flash, link: [LocalPaths.FLASH] },
    { text: translations.nav.henna, link: [LocalPaths.HENNA] },
    { text: translations.nav.canvases, link: [LocalPaths.CONVAS] },
  ];

  const currentPageIndex = pageOrder.findIndex((page) =>
    pathname.includes(page.link ? page.link[0] : "")
  );
  const prevPage =
    currentPageIndex > 0
      ? pageOrder[currentPageIndex - 1]
      : pageOrder[pageOrder.length - 1];

  const nextPage =
    currentPageIndex < pageOrder.length - 1
      ? pageOrder[currentPageIndex + 1]
      : pageOrder[0];

  return (
    <FlexDiv
      width100
      flex={{ x: "space-between" }}
      className={cn(styles.navButtons)}
      padding={{ top: [4] }}
    >
      <FlexDiv gapArray={[3, 3, 3, 4]} flex={{ y: "center" }}>
        <Button
          variant="extra"
          iconProps={{ icon: "arrow", rotate: 90, size: "regular" }}
          path={getButtonPath(prevPage)}
        />
        <Heading
          as="h4"
          level="6"
          weight={400}
          color="burgundy"
          textAlign="center"
          className={styles.title}
        >
          {prevPage.text}
        </Heading>
      </FlexDiv>
      <FlexDiv gapArray={[3, 3, 3, 4]} flex={{ y: "center" }}>
        <Heading
          as="h4"
          level="6"
          weight={400}
          color="burgundy"
          textAlign="center"
          className={styles.title}
        >
          {nextPage.text}
        </Heading>
        <Button
          variant="extra"
          iconProps={{ icon: "arrow", rotate: 270, size: "regular" }}
          path={getButtonPath(nextPage)}
        />
      </FlexDiv>
    </FlexDiv>
  );
};
