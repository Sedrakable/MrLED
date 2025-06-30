import { workPageQuery } from "@/app/api/generateSanityQueries";
import { fetchPage } from "@/app/api/fetchPage";
import { ISeo, IWork, LocalPaths } from "@/data.d";
import { redirect } from "next/navigation";
import { LangType } from "@/i18n/request";
import { ProjectModalContent } from "@/components/pages/PortfolioPage/ProjectModal/ProjectModal";
import { Modal } from "@/components/reuse/Modal/Modal";
import { Metadata } from "next";
import { setMetadata } from "@/app/api/SEO";

export interface WorkProps extends IWork {
  meta: ISeo;
}

const getWorkPageData = async (slug: string): Promise<WorkProps | null> => {
  try {
    const workQuery = workPageQuery(slug);
    return await fetchPage(workQuery);
  } catch {
    return null;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: LangType; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const path = `${LocalPaths.PORTFOLIO}/${slug}`;
  const crawl = true;
  const workPageData = await getWorkPageData(slug);

  // Add fallback values in case landingPageData is null
  const metaTitle = workPageData?.meta?.metaTitle || "MR LED";
  const metaDesc = workPageData?.meta?.metaDesc || "MR LED";
  return setMetadata({
    locale,
    metaTitle,
    metaDesc,
    path,
    crawl,
  });
}

export default async function WorkModal({
  params,
}: {
  params: Promise<{ slug: string; locale: LangType }>;
}) {
  const { slug, locale } = await params;
  const workPageData = await getWorkPageData(slug);

  if (!workPageData) {
    redirect(`/${locale}${LocalPaths.PORTFOLIO}`);
  }

  return (
    workPageData && (
      <Modal>
        <ProjectModalContent {...workPageData} />
      </Modal>
    )
  );
}
