import { productQuery } from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { ProductModal } from "@/components/pages/blocks/Products/ProductModal";

import { setMetadata } from "@/components/SEO";
import { IProduct, ISeo, IWork, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";

const Modal = dynamic(
  () => import("@/components/reuse/Modal").then((module) => module.Modal),
  {
    ssr: false,
  }
);

const getProductData = async (slug: string) => {
  const type = "product";
  const getProductQuery = productQuery(slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const productData: IProduct = await useFetchPage(
    getProductQuery,
    `${type}-${slug}`
  );

  return productData;
};

// export async function generateMetadata({
//   params: { locale, slug },
// }: {
//   params: { locale: LangType; slug: string };
// }): Promise<Metadata> {
//   const productPageData: IProduct = await getProductData(slug);
//   const path = `${LocalPaths.BOUTIQUE}/${slug}`;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle: productPageData.meta.metaTitle,
//     metaDesc: productPageData.meta.metaDesc,
//     metaKeywords: productPageData.meta.metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function Product({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const productData: IProduct = await getProductData(slug);

  return (
    productData && (
      <Modal>
        <ProductModal {...productData} />
      </Modal>
    )
  );
}
