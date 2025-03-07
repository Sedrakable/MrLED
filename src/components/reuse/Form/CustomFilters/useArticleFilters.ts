import { useState, useMemo } from "react";

import {
  IFilter,
  IArticle,
  articleTypeArray,
  IArticleType,
} from "@/data.d";
import { Translations } from "@/langs/langTypes";

export interface IArticleFilterChangeHandlers {
  handleTypeFilterChange: (selected: IArticleType[]) => void;
}

export interface IArticleFilterOptions {
  typeFilterOptions: IFilter[];
}

type UseArticleFiltersReturnProps = {
  filteredArticles: IArticle[];
  filterHandlers: IArticleFilterChangeHandlers;
  filterOptions: IArticleFilterOptions;
};

export const useArticleFilters = (
  articles: IArticle[],
  translations: Translations
): UseArticleFiltersReturnProps => {
  const [selectedTypes, setSelectedTypes] = useState<IArticleType[]>([]);

  const typeFilterOptions: IFilter[] = articleTypeArray.map((articleType) => ({
    value: articleType,
    label: translations.select.articleTypeOptions[articleType] || articleType,
  }));

  const handleTypeFilterChange = (selected: IArticleType[]) => {
    setSelectedTypes(selected);
  };

  const filteredArticles = useMemo(() => {
    let result = [...articles];

    if (selectedTypes.length > 0) {
      result = result.filter((article: IArticle) =>
        selectedTypes.includes(article.type)
      );
    }

    return result;
  }, [articles, selectedTypes]);

  return {
    filteredArticles,
    filterHandlers: {
      handleTypeFilterChange,
    },
    filterOptions: {
      typeFilterOptions,
    },
  };
};
