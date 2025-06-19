import { LangType } from "@/i18n/request";
import PortfolioPage from "../page";

export default function ModalLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  return (
    <div>
      <PortfolioPage params={Promise.resolve({ locale })} />
      {children}
    </div>
  );
}
