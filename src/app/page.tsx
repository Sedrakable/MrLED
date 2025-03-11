import { DynamicContent } from "@/components/pages/home/DynamicContent";
import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./page.module.scss";
import { Heading } from "@/components/reuse/Heading";

export default async function Page() {
  return (
    <FlexDiv width100 height100 className={styles.page}>
      <FlexDiv
        className={styles.banner}
        padding={{ horizontal: [5, 6, 6, 7], vertical: [4, 5, 4, 4] }}
        flex={{ x: "center" }}
      >
        <Heading as="h1" level="5" color="white" weight={600}>
          Site en construction
        </Heading>
      </FlexDiv>
      <DynamicContent />
    </FlexDiv>
  );
}
