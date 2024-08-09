import { LangType } from "@/i18n";

export default async function BoiutiquePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  // const servicePageData = await getServicePageData(locale, slug);
  return <>Boutique</>;
}
