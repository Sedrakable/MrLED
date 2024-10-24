import {
  productQuery,
  projectPageQuery,
} from "@/app/api/generateSanityQueries";
import { useFetchPage } from "@/app/api/useFetchPage";
import { ProductModal } from "@/components/pages/blocks/Products/ProductModal";
import { CanvasModal } from "@/components/pages/blocks/Projects/CanvasModal";
import { FlashModal } from "@/components/pages/blocks/Projects/FlashModal";
import { ProjectModal } from "@/components/pages/blocks/Projects/ProjectModal";
import { ICanvas, IFlash, IProduct, IProject, ProjectType } from "@/data.d";
import { ClientLogger } from "@/helpers/clientLogger";
import dynamic from "next/dynamic";
import { getWorkPageData, WorkPageProps } from "../page";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { FormTitleProps } from "@/components/reuse/Form/Form";

const Modal = dynamic(
  () => import("@/components/reuse/Modal").then((module) => module.Modal),
  {
    ssr: false,
  }
);

const getProjectData = async (type: string, id: string) => {
  const getProjectQuery = projectPageQuery(type, id);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const productData: IProject = await useFetchPage(
    getProjectQuery,
    `${type}-${id}`
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

export default async function ProjectPage({
  params: { projectId, projectType, locale },
}: {
  params: { projectId: string; projectType: string; locale };
}) {
  const workPageData: WorkPageProps = await getWorkPageData(projectType);
  const formData: FormTitleProps = await getFormData(
    projectType as ProjectType,
    locale
  );
  const selectedProject: IProject = await getProjectData(
    projectType,
    projectId
  );

  return (
    selectedProject && (
      <Modal
        version={
          (projectType === "flash" || projectType === "toiles") &&
          !(selectedProject as IFlash | ICanvas).reserved
            ? "default"
            : "image"
        }
      >
        <ClientLogger slug={selectedProject.image.alt} />
        {projectType === "flash" && !(selectedProject as IFlash).reserved ? (
          workPageData &&
          formData && (
            <FlashModal
              project={selectedProject as IFlash}
              flashes={workPageData.work.projects as IFlash[]}
              formData={formData}
            />
          )
        ) : projectType === "toiles" &&
          !(selectedProject as ICanvas).reserved ? (
          <CanvasModal project={selectedProject as ICanvas} />
        ) : (
          <ProjectModal project={selectedProject} />
        )}
      </Modal>
    )
    // <Modal>
    //
    // </Modal>
  );
}
