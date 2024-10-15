import { LangType } from "@/i18n";
import BoutiquePage from "./page";
import FlexDiv from "@/components/reuse/FlexDiv";

export default function BoutiqueLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  return (
    <FlexDiv flex={{ direction: "column" }} width100 height100>
      <BoutiquePage params={{ locale }} />
      {children}
    </FlexDiv>
  );
}
