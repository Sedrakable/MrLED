import { footerPageQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { IFooter } from "@/data.d";
import { LangType } from "@/i18n/request";
import NavWrapperClient from "./NavWrapperClient";

export default async function NavWrapperServer({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  const footerQuery = footerPageQuery(locale);
  const footerData: IFooter = await useFetchPage(footerQuery, "footer");

  return (
    <NavWrapperClient locale={locale} footerData={footerData}>
      {children}
    </NavWrapperClient>
  );
}
