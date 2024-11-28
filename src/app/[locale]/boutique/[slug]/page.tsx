import { productQuery } from "@/app/api/generateSanityQueries";
import { fetchPageData } from "@/app/api/useFetchPage";
import { ProductModal } from "@/components/pages/blocks/Products/ProductModal";
import { Modal } from "@/components/reuse/Modal";
import { IProduct } from "@/data.d";

const getProductData = async (slug: string) => {
  const type = "product";
  const getProductQuery = productQuery(slug);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const productData: IProduct = await fetchPageData(
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
