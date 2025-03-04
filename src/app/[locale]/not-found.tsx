import { INotFound } from "@/data.d";
import { fetchPageData } from "../api/useFetchPage";
import { notFoundPageQuery } from "../api/generateSanityQueries";
import { NotFoundComp } from "@/components/pages/NotFound";

export default async function NotFound() {
  const notFoundQuery = notFoundPageQuery("fr");
  const notFoundPageData: INotFound = await fetchPageData(notFoundQuery);
  return <NotFoundComp data={notFoundPageData} locale={"fr"} />;
}
