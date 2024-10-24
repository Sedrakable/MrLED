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
  ITattooStatus,
  tattooStatusArray,
} from "@/data.d";
import { Translations } from "@/langs/langTypes";

export interface IFilterOptions {
  yearFilterOptions: IFilter[];
  tattooColorFilterOptions?: IFilter[];
  tattooStatusFilterOptions?: IFilter[];
  bodyPartFilterOptions?: IFilter[];
  flashStyleFilterOptions?: IFilter[];
  flashStatusFilterOptions?: IFilter[];
  hennaColorFilterOptions?: IFilter[];
}

export interface IFilterChangeHandlers {
  handleYearFilterChange: (selected: string[]) => void;
  handleTattooColorFilterChange?: (selected: ITattooColor[]) => void;
  handleTattooStatusFilterChange?: (selected: ITattooStatus[]) => void;
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

  const [selectedTattooStatus, setSelectedTattooStatus] = useState<
    ITattooStatus[]
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

  const tattooStatusFilterOptions: IFilter[] = tattooStatusArray.map(
    (tattooStatus) => ({
      value: tattooStatus,
      label:
        translations.select.tattooStatusOptions[tattooStatus] || tattooStatus,
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
    console.log("Selected body parts:", selected);
    setSelectedBodyParts(selected);
  };

  const handleTattooColorFilterChange = (selected: ITattooColor[]) => {
    console.log("Selected tattoo colors:", selected);
    setSelectedTattooColor(selected);
  };

  const handleTattooStatusFilterChange = (selected: ITattooStatus[]) => {
    console.log("Selected tattoo statuses:", selected);
    setSelectedTattooStatus(selected);
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

  const handleSortChange = (selected: string) => {
    const sortValue = selected as "newest" | "oldest";
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

    if (type === "tattoo" && selectedTattooColor.length > 0) {
      result = result.filter((project: ITattoo) =>
        selectedTattooColor.includes(project.tattooColor)
      );
    }

    if (type === "tattoo" && selectedTattooStatus.length > 0) {
      result = result.filter((project: ITattoo) =>
        selectedTattooStatus.includes(project.tattooStatus)
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
    selectedTattooStatus,
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
      handleTattooStatusFilterChange,
      handleYearFilterChange,
      handleFlashStatusFilterChange,
      handleFlashStyleFilterChange,
      handleHennaColorFilterChange,
      handleSortChange,
    },
    filterOptions: {
      yearFilterOptions,
      tattooColorFilterOptions,
      tattooStatusFilterOptions,
      bodyPartFilterOptions,
      hennaColorFilterOptions,
      flashStyleFilterOptions,
      flashStatusFilterOptions,
    },
    sortOptions,
  };
};
