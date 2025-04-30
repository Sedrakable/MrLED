import styles from "./LangSwitcher.module.scss";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { useTransition } from "react";
import FlexDiv from "@/components/reuse/FlexDiv";

import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";

export const LangSwitcher: React.FC<{ onClick?: Function }> = ({ onClick }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const locale = useLocale();
  const pathname = usePathname();

  const langClick = () => {
    const newLang = locale === "en" ? "fr" : "en";
    startTransition(() => {
      router.replace({ pathname }, { locale: newLang });
    });
    onClick && onClick();
  };

  return (
    <FlexDiv gapArray={[3]} className={styles.langWrapper} onClick={langClick}>
      <Paragraph level="big" color="grad">
        {locale?.toUpperCase()}
      </Paragraph>
    </FlexDiv>
  );
};
