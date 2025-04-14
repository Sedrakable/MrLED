"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "../TabButton/TabButton";
import { useWindowResize } from "../../../helpers/useWindowResize";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
// import Logo from "@/assets/vector/LogoSmall.svg";
import { ICta, INavBar, ITheme } from "../../../data.d";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../helpers/langUtils";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import dynamic from "next/dynamic";
import { IconButton } from "@/components/reuse/IconButton/IconButton";
import { Button } from "@/components/reuse/Button/Button";

const Sidebar = dynamic(
  () => import("../Sidebar/Sidebar").then((module) => module.Sidebar),
  {
    ssr: false,
  }
);

export const Navbar: React.FC<INavBar> = ({
  links,
  navButton,
  theme = "light",
}) => {
  const { isMobile, isMobileOrTablet } = useWindowResize();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as LangType;
  const [, setSidebar] = useAtom(sidebarData);

  useEffect(() => {
    const handleScroll = () => {
      const offset = navRef?.current?.clientHeight!;
      const isScrolled = window.scrollY > offset;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);

  return (
    <>
      <nav
        className={cn(styles.navbarWrapper, styles[theme], {
          [styles.scrolled]: scrolled,
        })}
        ref={navRef}
      >
        <FlexDiv
          className={styles.navbar}
          flex={{ x: "space-between", y: "center" }}
          height100
        >
          <LogoLink locale={locale} />

          <FlexDiv
            flex={{ x: "space-between", y: "center" }}
            gapArray={[3, 5, 6, 7]}
            height100
          >
            {!isMobile && (
              <FlexDiv gapArray={[5, 4, 6, 7]} as="ul" height100>
                {links?.map((link: ICta, key) => {
                  return (
                    !isMobileOrTablet && (
                      <li key={key}>
                        <TabButton
                          className={styles.tab}
                          path={`/${locale}${link.path!}`}
                          theme={theme}
                        >
                          {link.text}
                        </TabButton>
                      </li>
                    )
                  );
                })}
                <li>
                  <NavButton {...navButton} />
                </li>
              </FlexDiv>
            )}
            {!isMobile && <LangSwitcher />}
            {isMobileOrTablet && (
              <IconButton
                onClick={() => setSidebar(true)}
                iconProps={{ icon: "burger", size: "regular" }}
                background="white"
                aria-label="burger menu"
              />
            )}
          </FlexDiv>
        </FlexDiv>
      </nav>
      {isMobileOrTablet && <Sidebar links={links} lang={locale} />}
    </>
  );
};

// Helper components
export const LogoLink: React.FC<{ locale: LangType }> = ({ locale }) => {
  const translations = getTranslations(locale);
  const [, setSidebar] = useAtom(sidebarData);
  return (
    <Link
      href={`/${locale}`}
      className={styles.logo}
      aria-label={translations.nav.home}
      onClick={() => setSidebar(false)}
    >
      {/* <Logo /> */}
    </Link>
  );
};

// Helper components
export const NavButton: React.FC<ICta> = ({ text, path, scrollTarget }) => {
  const { isMobile } = useWindowResize();

  return (
    <Button
      variant="primary"
      small={isMobile}
      path={path}
      scrollTarget={scrollTarget}
    >
      {text}
    </Button>
  );
};
