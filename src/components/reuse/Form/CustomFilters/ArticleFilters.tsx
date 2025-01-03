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
  filterHandlers: IArticleFilterChangeHandlers;
  translations: Translations;
}> = ({ filterOptions, filterHandlers, translations }) => {
  return (
    <FlexDiv
      gapArray={[3, 4, 4, 4]}
      width100
      flex={{ x: "flex-start" }}
      className={cn(styles.selectWrapper)}
    >
      <Filter
        options={filterOptions.typeFilterOptions}
        onChange={filterHandlers.handleTypeFilterChange}
        placeholder={translations.select.articleType || "Select Article"}
      />
    </FlexDiv>
  );
};
