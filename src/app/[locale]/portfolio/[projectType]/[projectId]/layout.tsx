import { LangType } from "@/i18n/request";
import ProjectPage from "./page";

export default function ModalLayout({
  children,
  locale,
  projectType,
  projectId,
}: {
  children: React.ReactNode;
  locale: LangType;
  projectType: string;
  projectId: string;
}) {
  return (
    <div>
      <ProjectPage
        params={Promise.resolve({ projectType, projectId, locale })}
      />
      {children}
    </div>
  );
}
