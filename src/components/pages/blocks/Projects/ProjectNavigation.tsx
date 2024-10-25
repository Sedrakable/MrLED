// components/reuse/Navigation/ProjectNavigation.tsx
"use client";
import React, { FC } from "react";
import { usePathname } from "@/navigation";
import { LangType } from "@/i18n/request";
import { Navigation } from "@/components/reuse/Naviagation/Navigation";
import { ICta, LocalPaths } from "@/data.d";

interface ProjectNavigationProps {
  locale: LangType;
  translations: any;
}

export const ProjectNavigation: FC<ProjectNavigationProps> = ({
  translations,
  locale,
}) => {
  const pathname = usePathname();

  const getButtonPath = (page: ICta) =>
    `/${locale}${LocalPaths.PORTFOLIO}${page.link ? page.link[0] : ""}`;

  const pageOrder: ICta[] = [
    { text: translations.nav.tattoo, link: [LocalPaths.TATTOO] },
    { text: translations.nav.flash, link: [LocalPaths.FLASH] },
    { text: translations.nav.henna, link: [LocalPaths.HENNA] },
    { text: translations.nav.toileses, link: [LocalPaths.TOILES] },
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
    <Navigation
      prevPage={prevPage}
      nextPage={nextPage}
      getButtonPath={getButtonPath}
    />
  );
};
