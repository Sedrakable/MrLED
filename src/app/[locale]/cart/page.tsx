import { IForm, ISeo, LocalPaths } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import { setMetadata } from "@/components/SEO";
import { contactPageQuery } from "@/app/api/generateSanityQueries";
import dynamic from "next/dynamic";

export interface CartPageProps extends IForm {
  meta: ISeo;
}

// const CartBlock = dynamic(
//   () =>
//     import("@/components/pages/cart/CartBlock").then(
//       (module) => module.CartBlock
//     ),
//   {
//     ssr: false,
//   }
// );

const getCartPageData = async (locale: LangType) => {
  const type = "contactPage";
  const contactQuery = contactPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartPageData: CartPageProps = await useFetchPage(contactQuery, type);
  return cartPageData;
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: LangType };
}): Promise<Metadata> {
  const cartPageData = await getCartPageData(locale);
  const { metaTitle, metaDesc, metaKeywords } = cartPageData.meta;
  const path = LocalPaths.CONTACT;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    metaKeywords,
    path,
    crawl,
  });
}

export default async function Cart({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const cartPageData: CartPageProps = await getCartPageData(locale);

  return <>Cart</>;
}
