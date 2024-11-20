import { useState, useMemo } from "react";

import { dateSortArray, IDateSort, IFilter, IArticle } from "@/data.d";
import { Translations } from "@/langs/langTypes";

// hooks/useArticleFilters.ts
export const useArticleFilters = (
  articles: IArticle[],
  translations: Translations
) => {
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const [sortOrder, setSortOrder] = useState<IDateSort>("newest");

  const getUniqueYears = (articles: IArticle[]): number[] => {
    const years = articles.map((article) =>
      parseInt(article.date.substring(0, 4))
    );
    return [...new Set(years)].sort((a, b) => b - a);
  };

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

  const handleSortChange = (selected: string) => {
    const sortValue = selected as "newest" | "oldest";
    setSortOrder(sortValue);
  };

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedYears.length > 0) {
      result = result.filter((article) =>
        selectedYears.includes(article.date.substring(0, 4))
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, selectedYears, sortOrder]);

  return {
    filteredArticles,
    filterHandlers: {
      handleYearFilterChange,
      handleSortChange,
    },
    filterOptions: {
      yearFilterOptions,
    },
    sortOptions,
  };
};
