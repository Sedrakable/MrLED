import FlexDiv from "@/components/reuse/FlexDiv";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FlexDiv flex={{ direction: "column" }} width100 height100>
      {children}
    </FlexDiv>
  );
}
