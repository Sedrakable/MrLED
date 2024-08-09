"use client";
import React, { FC, useMemo, useState } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import {
  bodyPartsArray,
  dateSortArray,
  flashStatusArray,
  flashStyleArray,
  hennaColorArray,
  IBodyPart,
  ICta,
  IDateSort,
  IFlash,
  IFlashStatus,
  IFlashStyle,
  IHenna,
  IHennaColor,
  IProject,
  ITattoo,
  IWork,
  LocalPaths,
} from "../../../../data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { Select } from "@/components/reuse/Select/Select";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { Heading } from "@/components/reuse/Heading";
import Line from "@/assets/vector/Line.svg";
import { Button } from "@/components/reuse/Button";
import { usePathname } from "@/navigation";

interface ProjectProps {
  project: IProject;
  type: string;
}
const Project: FC<ProjectProps> = ({ project, type }) => {
  return (
    <FlexDiv
      className={cn(styles.container, { [styles.flash]: type == "flash" })}
      flex={{ direction: "column", y: "flex-start" }}
      height100
      width100
      gapArray={[3, 4, 4, 5]}
    >
      <SanityImage
        image={project?.image.image}
        alt={project?.image.alt}
        figureClassName={cn(styles.image)}
        quality={50}
      />

      {type == "flash" && (
        <FlexDiv className={styles.text}>
          <Heading
            as="h3"
            level="5"
            color="dark-burgundy"
            weight={300}
            textAlign="center"
            className={styles.title}
          >
            {(project as IFlash).title}
          </Heading>
          {(project as IFlash).reserved && <Line className={styles.line} />}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};

interface IFilter {
  value: string;
  label: string;
}

export const Projects: React.FC<IWork> = ({ projects, type }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const pathname = usePathname();

  console.log("pathname", pathname);
  const [selectedBodyParts, setSelectedBodyParts] = useState<IBodyPart[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedFlashStyles, setSelectedFlashStyles] = useState<IFlashStyle[]>(
    []
  );

  const [selectedFlashStatus, setSelectedFlashStatus] = useState<
    IFlashStatus[]
  >([]);
  const [selectedHennaColors, setSelectedHennaColors] = useState<IHennaColor[]>(
    []
  );
  const [sortOrder, setSortOrder] = useState<IDateSort>("newest");

  const getUniqueYears = (projects: ITattoo[]): number[] => {
    const years = projects.map((project) => project.year);
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const yearFilterOptions: IFilter[] = getUniqueYears(
    projects as ITattoo[]
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const bodyPartFilterOptions: IFilter[] = bodyPartsArray.map((bodyPart) => ({
    value: bodyPart,
    label: translations.select.bodyPartsOptions[bodyPart] || bodyPart,
  }));

  const flashStyleFilterOptions: IFilter[] = flashStyleArray.map((style) => ({
    value: style,
    label: translations.select.flashStylesOptions[style] || style,
  }));

  const flashStatusFilterOptions: IFilter[] = flashStatusArray.map(
    (status) => ({
      value: status,
      label: translations.select.flashStatusOptions[status] || status,
    })
  );

  const hennaColorFilterOptions: IFilter[] = hennaColorArray.map((color) => ({
    value: color,
    label: translations.select.hennaColorsOptions[color] || color,
  }));

  const dateSortOptions: IFilter[] = dateSortArray.map((dateSort) => ({
    value: dateSort,
    label: translations.select.dateSort[dateSort] || dateSort,
  }));

  const sortOptions = [...dateSortOptions];

  const handleBodyPartFilterChange = (selected: IBodyPart[]) => {
    console.log("Selected body parts:", selected);
    setSelectedBodyParts(selected);
  };

  const handleYearFilterChange = (selected: string[]) => {
    console.log("Selected years:", selected);
    setSelectedYears(selected);
  };

  const handleFlashStyleFilterChange = (selected: IFlashStyle[]) => {
    console.log("Selected flash styles:", selected);
    setSelectedFlashStyles(selected);
  };

  const handleFlashStatusFilterChange = (selected: IFlashStatus[]) => {
    console.log("Selected flash styles:", selected);
    setSelectedFlashStatus(selected);
  };

  const handleHennaColorFilterChange = (selected: IHennaColor[]) => {
    console.log("Selected henna colors:", selected);
    setSelectedHennaColors(selected);
  };

  const handleSortChange = (selected: string[]) => {
    const sortValue = selected[0] as "newest" | "oldest";
    console.log("Selected sort option:", sortValue);
    setSortOrder(sortValue);
  };

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (selectedYears.length > 0) {
      result = result.filter((project) =>
        selectedYears.includes(project.year.toString())
      );
    }

    if (type === "tattoo" && selectedBodyParts.length > 0) {
      result = result.filter((project: ITattoo) =>
        selectedBodyParts.includes(project.bodyPart)
      );
    }

    if (type === "flash" && selectedFlashStyles.length > 0) {
      result = result.filter((project: IFlash) =>
        selectedFlashStyles.includes(project.style)
      );
    }

    if (type === "flash" && selectedFlashStatus.length > 0) {
      result = result.filter((project: IFlash) =>
        selectedFlashStatus.includes(
          project.reserved ? flashStatusArray[0] : flashStatusArray[1]
        )
      );
    }

    if (type === "henna" && selectedHennaColors.length > 0) {
      result = result.filter((project: IHenna) =>
        selectedHennaColors.includes(project.hennaColor)
      );
    }

    result.sort((a, b) =>
      sortOrder === "newest" ? b.year - a.year : a.year - b.year
    );

    return result;
  }, [
    projects,
    selectedBodyParts,
    selectedYears,
    selectedFlashStyles,
    selectedFlashStatus,
    selectedHennaColors,
    sortOrder,
    type,
  ]);

  const pageOrder: ICta[] = [
    { text: translations.nav.tattoo, link: [LocalPaths.TATTOO] },
    { text: translations.nav.flash, link: [LocalPaths.FLASH] },
    { text: translations.nav.henna, link: [LocalPaths.HENNA] },
    { text: translations.nav.canvases, link: [LocalPaths.TOILES] },
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

  const getButtonPath = (page: ICta) =>
    `/${locale}${LocalPaths.PORTFOLIO}${page.link ? page.link[0] : ""}`;
  return (
    <FlexDiv
      gapArray={[4, 4, 4, 4]}
      width100
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
    >
      <FlexDiv
        gapArray={[3, 4, 4, 4]}
        width100
        flex={{ x: "flex-start" }}
        className={cn(styles.selectWrapper)}
      >
        <Select
          variant="filter"
          options={yearFilterOptions}
          onChange={handleYearFilterChange}
          placeholder={translations.select.year || "Select Year"}
        />
        {type === "tattoo" && (
          <Select
            variant="filter"
            options={bodyPartFilterOptions}
            onChange={handleBodyPartFilterChange}
            placeholder={translations.select.bodyParts || "Select Body Part"}
          />
        )}
        {type === "flash" && (
          <>
            <Select
              variant="filter"
              options={flashStyleFilterOptions}
              onChange={handleFlashStyleFilterChange}
              placeholder={
                translations.select.flashStyles || "Select Flash Style"
              }
            />
            <Select
              variant="filter"
              options={flashStatusFilterOptions}
              onChange={handleFlashStatusFilterChange}
              placeholder={translations.select.flashStatus}
            />
          </>
        )}
        {type === "henna" && (
          <Select
            variant="filter"
            options={hennaColorFilterOptions}
            onChange={handleHennaColorFilterChange}
            placeholder={
              translations.select.hennaColors || "Select Henna Color"
            }
          />
        )}
        <Select
          variant="sort"
          options={sortOptions}
          onChange={handleSortChange}
        />
      </FlexDiv>
      <FlexDiv gapArray={[4, 3, 4, 5]} width100 className={cn(styles.wrapper)}>
        {filteredProjects.map((project: IProject, index: number) => {
          return <Project key={index} type={type} project={project} />;
        })}
      </FlexDiv>
      <FlexDiv
        width100
        flex={{ x: "space-between" }}
        className={cn(styles.navButtons)}
      >
        <FlexDiv
          gapArray={[3, 3, 3, 4]}
          flex={{ y: "flex-end" }}
          padding={{ top: [6] }}
        >
          <Button
            variant="extra"
            iconProps={{ icon: "arrow", rotate: 90, size: "regular" }}
            path={getButtonPath(prevPage)}
          />
          <Heading
            as="h4"
            level="5"
            weight={400}
            color="burgundy"
            textAlign="center"
            className={styles.title}
          >
            {prevPage.text}
          </Heading>
        </FlexDiv>
        <FlexDiv gapArray={[3, 3, 3, 4]} flex={{ y: "flex-end" }}>
          <Heading
            as="h4"
            level="5"
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
    </FlexDiv>
  );
};
