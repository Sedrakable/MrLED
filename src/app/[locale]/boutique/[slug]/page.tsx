import { productQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { ProductModal } from "@/components/pages/blocks/Products/ProductModal";
import { Modal } from "@/components/reuse/Modal";
import { setMetadata } from "@/components/SEO";
import { IProduct, ISeo, LocalPaths } from "@/data.d";
import { LangType } from "@/i18n/request";
import { Metadata } from "next";

const getProductData = async (slug: string) => {
  const getProductQuery = productQuery(slug);
  const productData: IProduct = await fetchPageData(getProductQuery);

  return productData;
};

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: LangType; slug: string };
}): Promise<Metadata> {
  const productPageData: IProduct = await getProductData(slug);
  const path = `${LocalPaths.BOUTIQUE}/${slug}`;
  const crawl = true;

  return setMetadata({
    locale,
    metaTitle: productPageData.title,
    metaDesc: productPageData.desc!,
    metaKeywords: [],
    path,
    crawl,
  });
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Await the params
  const productData: IProduct = await getProductData(slug);

  return (
    productData && (
      <Modal>
        <ProductModal {...productData} />
      </Modal>
    )
  );
}
