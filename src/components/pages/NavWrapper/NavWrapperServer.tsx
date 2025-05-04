import { footerPageQuery } from "@/app/api/generateSanityQueries";
import { IFooter } from "@/data.d";
import { LangType } from "@/i18n/request";
import NavWrapperClient from "./NavWrapperClient";
import { fetchPage } from "@/app/api/fetchPage";

export default async function NavWrapperServer({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  const footerQuery = footerPageQuery(locale);
  const footerData: IFooter = await fetchPage(footerQuery);

  return (
    <NavWrapperClient locale={locale} footerData={footerData}>
      {children}
    </NavWrapperClient>
  );
}
