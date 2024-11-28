import { notFoundPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { NotFoundComp } from "@/components/pages/NotFound";
import { INotFound } from "@/data.d";

export default async function NotFound() {
  const type = "notFoundPage";
  const notFoundQuery = notFoundPageQuery("fr");
  const notFoundPageData: INotFound = await fetchPageData(notFoundQuery);
  return <NotFoundComp data={notFoundPageData} locale={"fr"} />;
}
