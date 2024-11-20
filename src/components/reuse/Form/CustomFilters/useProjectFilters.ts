/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

import {
  IProject,
  ProjectType,
  IBodyPart,
  bodyPartsArray,
  dateSortArray,
  flashStatusArray,
  flashStyleArray,
  hennaColorArray,
  IDateSort,
  IFlash,
  IFlashStatus,
  IFlashStyle,
  IHenna,
  IHennaColor,
  ITattoo,
  IFilter,
  ITattooColor,
  tattooColorArray,
  ITattooOther,
  tattooOtherArray,
} from "@/data.d";
import { Translations } from "@/langs/langTypes";

export interface IFilterOptions {
  yearFilterOptions: IFilter[];
  tattooColorFilterOptions?: IFilter[];
  tattooOtherFilterOptions?: IFilter[];
  bodyPartFilterOptions?: IFilter[];
  flashStyleFilterOptions?: IFilter[];
  flashStatusFilterOptions?: IFilter[];
  hennaColorFilterOptions?: IFilter[];
}

export interface IFilterChangeHandlers {
  handleYearFilterChange: (selected: string[]) => void;
  handleTattooColorFilterChange?: (selected: ITattooColor[]) => void;
  handleTattooOtherFilterChange?: (selected: ITattooOther[]) => void;
  handleBodyPartFilterChange?: (selected: IBodyPart[]) => void;
  handleFlashStyleFilterChange?: (selected: IFlashStyle[]) => void;
  handleFlashStatusFilterChange?: (selected: IFlashStatus[]) => void;
  handleHennaColorFilterChange?: (selected: IHennaColor[]) => void;
  handleSortChange: (selected: string) => void;
}

interface UseProjectFiltersReturnProps {
  filteredProjects: IProject[];
  filterHandlers: IFilterChangeHandlers;
  filterOptions: IFilterOptions;
  sortOptions: IFilter[];
}

// hooks/useProjectFilters.ts
export const useProjectFilters = (
  projects: IProject[],
  type: ProjectType,
  translations: Translations
): UseProjectFiltersReturnProps => {
  const [selectedBodyParts, setSelectedBodyParts] = useState<IBodyPart[]>([]);
  const [selectedTattooColor, setSelectedTattooColor] = useState<
    ITattooColor[]
  >([]);

  const [selectedTattooOther, setSelectedTattooOther] = useState<
    ITattooOther[]
  >([]);

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

  const tattooColorFilterOptions: IFilter[] = tattooColorArray.map(
    (tattooColor) => ({
      value: tattooColor,
      label: translations.select.tattooColorOptions[tattooColor] || tattooColor,
    })
  );

  const tattooOtherFilterOptions: IFilter[] = tattooOtherArray.map(
    (tattooOther) => ({
      value: tattooOther,
      label: translations.select.tattooOtherOptions[tattooOther] || tattooOther,
    })
  );

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
    setSelectedBodyParts(selected);
  };

  const handleTattooColorFilterChange = (selected: ITattooColor[]) => {
    setSelectedTattooColor(selected);
  };

  const handleTattooOtherFilterChange = (selected: ITattooOther[]) => {
    setSelectedTattooOther(selected);
  };

  const handleYearFilterChange = (selected: string[]) => {
    setSelectedYears(selected);
  };

  const handleFlashStyleFilterChange = (selected: IFlashStyle[]) => {
    setSelectedFlashStyles(selected);
  };

  const handleFlashStatusFilterChange = (selected: IFlashStatus[]) => {
    setSelectedFlashStatus(selected);
  };

  const handleHennaColorFilterChange = (selected: IHennaColor[]) => {
    setSelectedHennaColors(selected);
  };

  const handleSortChange = (selected: string) => {
    const sortValue = selected as "newest" | "oldest";
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

    if (type === "tattoo" && selectedTattooColor.length > 0) {
      result = result.filter((project: ITattoo) =>
        selectedTattooColor.includes(project.tattooColor)
      );
    }

    //Fix after Here
    if (type === "tattoo" && selectedTattooOther.length > 0) {
      result = result.filter((project: ITattoo) => {
        return selectedTattooOther.some((option) => {
          switch (option) {
            case "cover-up":
              return project.tattooCoverUp;
            case "healed":
              return project.tattooHealed;
            default:
              return false;
          }
        });
      });
    }
    //Fix before Here

    if (type === "flash" && selectedFlashStyles.length > 0) {
      result = result.filter((project: IFlash) =>
        selectedFlashStyles.includes(project.style)
      );
    }

    if (type === "flash" && selectedFlashStatus.length > 0) {
      result = result.filter((project: IFlash) =>
        selectedFlashStatus.includes(
          project.reserved
            ? "reserved"
            : project.repeatable
            ? "repeatable"
            : "unReserved"
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
    selectedTattooColor,
    selectedTattooOther,
    selectedYears,
    selectedFlashStyles,
    selectedFlashStatus,
    selectedHennaColors,
    sortOrder,
    type,
  ]);

  return {
    filteredProjects,
    filterHandlers: {
      handleBodyPartFilterChange,
      handleTattooColorFilterChange,
      handleTattooOtherFilterChange,
      handleYearFilterChange,
      handleFlashStatusFilterChange,
      handleFlashStyleFilterChange,
      handleHennaColorFilterChange,
      handleSortChange,
    },
    filterOptions: {
      yearFilterOptions,
      tattooColorFilterOptions,
      tattooOtherFilterOptions,
      bodyPartFilterOptions,
      hennaColorFilterOptions,
      flashStyleFilterOptions,
      flashStatusFilterOptions,
    },
    sortOptions,
  };
};
