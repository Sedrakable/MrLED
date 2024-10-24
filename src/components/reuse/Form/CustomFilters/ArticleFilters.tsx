"use client";
import React, { FC } from "react";
import styles from "./CustomFilters.module.scss";
import cn from "classnames";
import FlexDiv from "../../FlexDiv";
import { Filter } from "@/components/reuse/Form/Filter";
import { Sort } from "@/components/reuse/Form/Sort";

import { Translations } from "@/langs/langTypes";
import { IFilter } from "@/data.d";

export const ArticleFilters: FC<{
  filterOptions: {
    yearFilterOptions: IFilter[];
  };
  sortOptions: IFilter[];
  onFilterChange: {
    handleYearFilterChange: (selected: string[]) => void;
    handleSortChange: (selected: string) => void;
  };
  translations: Translations;
}> = ({ filterOptions, onFilterChange, sortOptions, translations }) => {
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

      <Sort options={sortOptions} onChange={onFilterChange.handleSortChange} />
    </FlexDiv>
  );
};
