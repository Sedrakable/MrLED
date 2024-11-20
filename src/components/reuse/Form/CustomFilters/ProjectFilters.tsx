"use client";
import React, { FC } from "react";
import styles from "./CustomFilters.module.scss";
import cn from "classnames";
import FlexDiv from "../../FlexDiv";
import { Filter } from "@/components/reuse/Form/Filter";
import { Sort } from "@/components/reuse/Form/Sort";
import { ProjectType, IFilter } from "@/data.d";
import { Translations } from "@/langs/langTypes";
import { IFilterChangeHandlers, IFilterOptions } from "./useProjectFilters";

export interface IProjectFiltersProps {
  type: ProjectType;
  filterOptions: IFilterOptions;
  sortOptions: IFilter[];
  filterHandlers: IFilterChangeHandlers;
  translations: Translations;
}
export const ProjectFilters: FC<IProjectFiltersProps> = ({
  type,
  filterOptions,
  filterHandlers,
  sortOptions,
  translations,
}) => {
  return (
    <FlexDiv
      gapArray={[3, 4, 4, 4]}
      width100
      flex={{ x: "flex-start" }}
      className={cn(styles.selectWrapper)}
    >
      <Filter
        options={filterOptions.yearFilterOptions}
        onChange={filterHandlers.handleYearFilterChange}
        placeholder={translations.select.year || "Select Year"}
      />
      {type === "tattoo" && (
        <>
          <Filter
            options={filterOptions.bodyPartFilterOptions!}
            onChange={filterHandlers.handleBodyPartFilterChange!}
            placeholder={translations.select.bodyParts || "Select Body Part"}
          />
          <Filter
            options={filterOptions.tattooColorFilterOptions!}
            onChange={filterHandlers.handleTattooColorFilterChange!}
            placeholder={translations.select.tattooColor || "Select Tattoo"}
          />
          <Filter
            options={filterOptions.tattooOtherFilterOptions!}
            onChange={filterHandlers.handleTattooOtherFilterChange!}
            placeholder={translations.select.tattooOther || "Select Other"}
          />
        </>
      )}
      {type === "flash" && (
        <>
          <Filter
            options={filterOptions.flashStyleFilterOptions!}
            onChange={filterHandlers.handleFlashStyleFilterChange!}
            placeholder={
              translations.select.flashStyles || "Select Flash Style"
            }
          />
          <Filter
            options={filterOptions.flashStatusFilterOptions!}
            onChange={filterHandlers.handleFlashStatusFilterChange!}
            placeholder={translations.select.flashStatus}
          />
        </>
      )}
      {type === "henna" && (
        <Filter
          options={filterOptions.hennaColorFilterOptions!}
          onChange={filterHandlers.handleHennaColorFilterChange!}
          placeholder={translations.select.hennaColors || "Select Henna Color"}
        />
      )}
      <Sort options={sortOptions} onChange={filterHandlers.handleSortChange} />
    </FlexDiv>
  );
};
