import {} from "@/data.d";
import { LangType } from "@/i18n";

export default async function ServicePage({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}) {
  // const servicePageData = await getServicePageData(locale, slug);
  return <>Online</>;
}
