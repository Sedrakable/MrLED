"use client";
import React, { FC } from "react";
import styles from "./CustomFilters.module.scss";
import cn from "classnames";
import FlexDiv from "../../FlexDiv";
import { Filter } from "@/components/reuse/Form/Filter";
import { Sort } from "@/components/reuse/Form/Sort";

import { Translations } from "@/langs/langTypes";
import { IFilter } from "@/data.d";
import {
  IArticleFilterChangeHandlers,
  IArticleFilterOptions,
} from "./useArticleFilters";

export const ArticleFilters: FC<{
  filterOptions: IArticleFilterOptions;
  sortOptions: IFilter[];
  filterHandlers: IArticleFilterChangeHandlers;
  translations: Translations;
}> = ({ filterOptions, filterHandlers, sortOptions, translations }) => {
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
      <Filter
        options={filterOptions.typeFilterOptions}
        onChange={filterHandlers.handleTypeFilterChange}
        placeholder={translations.select.articleType || "Select Article"}
      />

      <Sort options={sortOptions} onChange={filterHandlers.handleSortChange} />
    </FlexDiv>
  );
};
