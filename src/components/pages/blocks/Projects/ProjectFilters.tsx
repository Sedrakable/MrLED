"use client";
import React, { FC } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { Filter } from "@/components/reuse/Form/Filter";
import { Sort } from "@/components/reuse/Form/Sort";
import {
  ProjectType,
  IBodyPart,
  IFlashStyle,
  IFlashStatus,
  IHennaColor,
} from "@/data.d";

export interface IFilter {
  value: string;
  label: string;
}

export const ProjectFilters: FC<{
  type: ProjectType;
  filterOptions: {
    yearFilterOptions: IFilter[];
    bodyPartFilterOptions?: IFilter[];
    flashStyleFilterOptions?: IFilter[];
    flashStatusFilterOptions?: IFilter[];
    hennaColorFilterOptions?: IFilter[];
  };
  sortOptions: IFilter[];
  onFilterChange: {
    handleYearFilterChange: (selected: string[]) => void;
    handleBodyPartFilterChange?: (selected: IBodyPart[]) => void;
    handleFlashStyleFilterChange?: (selected: IFlashStyle[]) => void;
    handleFlashStatusFilterChange?: (selected: IFlashStatus[]) => void;
    handleHennaColorFilterChange?: (selected: IHennaColor[]) => void;
    handleSortChange: (selected: string) => void;
  };
  translations: any;
}> = ({ type, filterOptions, onFilterChange, sortOptions, translations }) => {
  return (
    <FlexDiv
      gapArray={[3, 4, 4, 4]}
      width100
      flex={{ x: "flex-start" }}
      className={cn(styles.selectWrapper)}
    >
      <Filter
        options={filterOptions.yearFilterOptions}
        onChange={onFilterChange.handleYearFilterChange}
        placeholder={translations.select.year || "Select Year"}
      />
      {type === "tattoo" && (
        <Filter
          options={filterOptions.bodyPartFilterOptions!}
          onChange={onFilterChange.handleBodyPartFilterChange!}
          placeholder={translations.select.bodyParts || "Select Body Part"}
        />
      )}
      {type === "flash" && (
        <>
          <Filter
            options={filterOptions.flashStyleFilterOptions!}
            onChange={onFilterChange.handleFlashStyleFilterChange!}
            placeholder={
              translations.select.flashStyles || "Select Flash Style"
            }
          />
          <Filter
            options={filterOptions.flashStatusFilterOptions!}
            onChange={onFilterChange.handleFlashStatusFilterChange!}
            placeholder={translations.select.flashStatus}
          />
        </>
      )}
      {type === "henna" && (
        <Filter
          options={filterOptions.hennaColorFilterOptions!}
          onChange={onFilterChange.handleHennaColorFilterChange!}
          placeholder={translations.select.hennaColors || "Select Henna Color"}
        />
      )}
      <Sort options={sortOptions} onChange={onFilterChange.handleSortChange} />
    </FlexDiv>
  );
};
