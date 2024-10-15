import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { formQuery } from "@/app/api/generateSanityQueries";

export const getFormData = async (slug: string, locale: LangType) => {
  const type = "FlashForm";
  const query = formQuery(slug, locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useFetchPage(query, type);
  return data;
};
