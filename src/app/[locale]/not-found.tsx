import { INotFound } from "@/data.d";
import { fetchPage } from "../api/fetchPage";
import { notFoundPageQuery } from "../api/generateSanityQueries";
import { NotFoundComp } from "@/components/pages/NotFound";

export default async function NotFound() {
  const type = "notFoundPage";
  const notFoundQuery = notFoundPageQuery("en");
  const notFoundPageData: INotFound = await fetchPage(notFoundQuery, type);
  return <NotFoundComp data={notFoundPageData} locale={"en"} />;
}
