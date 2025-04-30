"use client";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { chooseNavButtonData } from "@/data/navbarData";
import styles from "./layout.module.scss";
import { INavBar, IFooter } from "@/data.d";
import { LangType } from "@/i18n/request";
import { getTranslations } from "@/helpers/langUtils";

export default function NavWrapperClient({
  children,
  footerData,
  locale,
}: {
  children: React.ReactNode;
  footerData: IFooter;
  locale: LangType;
}) {
  const trans = getTranslations(locale);
  const navbarData: INavBar = {
    navButton: chooseNavButtonData(locale, trans),
    links: undefined,
  };

  return (
    <>
      <Navbar {...navbarData} socials={{ links: footerData?.socials?.links }} />
      <div className={styles.page}>{children}</div>
      <Footer
        {...navbarData}
        legals={footerData?.legals}
        trademark={footerData?.trademark}
        socials={{ links: footerData?.socials?.links }}
      />
    </>
  );
}
