import { LangType } from "@/i18n";
import dynamic from "next/dynamic";
import BoutiquePage from "./page";

const FlexDiv = dynamic(() => import("@/components/reuse/FlexDiv"), {
  ssr: false,
});

export default function AboutWorkLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: LangType;
}) {
  return (
    <FlexDiv flex={{ direction: "column" }} width100 height100>
      {/* <BoutiquePage params={{ locale, slug: "" }} /> */}
      {children}
    </FlexDiv>
  );
}
