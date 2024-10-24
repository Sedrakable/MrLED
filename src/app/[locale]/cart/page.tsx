import { ISeo } from "@/data.d";
import { useFetchPage } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n";
import { cartPageQuery } from "@/app/api/generateSanityQueries";
import {
  Collapsible,
  CollapsibleProps,
} from "@/components/reuse/Collapsible/Collapsible";
import { Block } from "@/components/reuse/containers/Block/Block";
import { getTranslations } from "@/helpers/langUtils";
import { TitleWrapper } from "@/components/reuse/containers/TitleWrapper/TitleWrapper";
import { Cart, CartProps } from "@/components/pages/blocks/Cart/Cart";
import { getFormData } from "@/components/reuse/Form/getFormData";

export interface CartPageProps {
  meta: ISeo;
  collapsible: CollapsibleProps;
}

const getCartPageData = async (locale: LangType) => {
  const type = "cartPage";
  const cartQuery = cartPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartPageData: CartPageProps = await useFetchPage(cartQuery, type);
  return cartPageData;
};

// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: LangType };
// }): Promise<Metadata> {
//   const cartPageData = await getCartPageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = cartPageData.meta;
//   const path = LocalPaths.cart;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function CartPage({
  params: { locale },
}: {
  params: { locale: LangType };
}) {
  const data = await getCartPageData(locale);
  const translations = getTranslations(locale);
  const formData: CartProps = await getFormData("cart", locale);

  return (
    <Block variant="default" illustrations>
      <TitleWrapper title={translations.titles.cart}>
        <Cart {...formData} />
      </TitleWrapper>

      {data?.collapsible && <Collapsible {...data.collapsible} />}
    </Block>
  );
}
