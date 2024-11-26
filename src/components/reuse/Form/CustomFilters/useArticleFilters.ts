import { useState, useMemo } from "react";

import {
  dateSortArray,
  IDateSort,
  IFilter,
  IArticle,
  articleTypeArray,
  IArticleType,
} from "@/data.d";
import { Translations } from "@/langs/langTypes";

export interface IArticleFilterChangeHandlers {
  handleYearFilterChange: (selected: string[]) => void;
  handleTypeFilterChange: (selected: IArticleType[]) => void;
  handleSortChange: (selected: string) => void;
}

export interface IArticleFilterOptions {
  yearFilterOptions: IFilter[];
  typeFilterOptions: IFilter[];
}

type UseArticleFiltersReturnProps = {
  filteredArticles: IArticle[];
  filterHandlers: IArticleFilterChangeHandlers;
  filterOptions: IArticleFilterOptions;
  sortOptions: IFilter[];
};

export const useArticleFilters = (
  articles: IArticle[],
  translations: Translations
): UseArticleFiltersReturnProps => {
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<IArticleType[]>([]);

  const [sortOrder, setSortOrder] = useState<IDateSort>("newest");

  const getUniqueYears = (articles: IArticle[]): number[] => {
    const years = articles.map((article) =>
      parseInt(article.date.substring(0, 4))
    );
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const typeFilterOptions: IFilter[] = articleTypeArray.map((articleType) => ({
    value: articleType,
    label: translations.select.articleTypeOptions[articleType] || articleType,
  }));

  const yearFilterOptions: IFilter[] = getUniqueYears(
    articles as IArticle[]
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const dateSortOptions: IFilter[] = dateSortArray.map((dateSort) => ({
    value: dateSort,
    label: translations.select.dateSort[dateSort] || dateSort,
  }));

  const sortOptions = [...dateSortOptions];

  const handleYearFilterChange = (selected: string[]) => {
    setSelectedYears(selected);
  };

  const handleTypeFilterChange = (selected: IArticleType[]) => {
    setSelectedTypes(selected);
  };

  const handleSortChange = (selected: string) => {
    const sortValue = selected as "newest" | "oldest";
    setSortOrder(sortValue);
  };

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedYears.length > 0) {
      result = result.filter((article: IArticle) =>
        selectedYears.includes(article.date.substring(0, 4))
      );
    }

    if (selectedTypes.length > 0) {
      result = result.filter((article: IArticle) =>
        selectedTypes.includes(article.type)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, selectedYears, sortOrder, selectedTypes]);

  return {
    filteredArticles,
    filterHandlers: {
      handleYearFilterChange,
      handleTypeFilterChange,
      handleSortChange,
    },
    filterOptions: {
      yearFilterOptions,
      typeFilterOptions,
    },
    sortOptions,
  };
};
