"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import TabButton from "../TabButton/TabButton";
import { useWindowResize } from "../../../helpers/useWindowResize";
import { IconButton } from "../../reuse/IconButton";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import Logo from "@/assets/vector/LogoSmall.svg";
import { Button } from "../../reuse/Button";
import { ICta, INavLink, LocalPaths } from "../../../data.d";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { useAtom } from "jotai";
import { getTranslations } from "../../../helpers/langUtils";
import { sidebarData } from "../Sidebar/Sidebar";
import Link from "next/link";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";
import dynamic from "next/dynamic";

const Sidebar = dynamic(
  () => import("../Sidebar/Sidebar").then((module) => module.Sidebar),
  {
    ssr: false,
  }
);

export const isCta = (link: INavLink | ICta): link is ICta => {
  return (link as INavLink).ctaArray == undefined;
};

//FIX: Make titles hardcoded text. FR and EN
const links: (INavLink | ICta)[] = [
  {
    text: "Services",
    link: LocalPaths.SERVICE,
    ctaArray: [
      { text: "Tattooing", link: LocalPaths.TATTOO },
      {
        text: "Test Tattoo",
        link: LocalPaths.TEST_TATTOO,
      },
      { text: "Henna", link: LocalPaths.HENNA },
    ],
  } as INavLink,
  {
    text: "Courses",
    link: LocalPaths.COURSE,
    ctaArray: [
      { text: "Online", link: LocalPaths.ONLINE },
      { text: "In Person", link: LocalPaths.IN_PERSON },
    ],
  } as INavLink,
  {
    text: "Portfolio",
    link: LocalPaths.PORTFOLIO,
    ctaArray: [
      { text: "Tattoo", link: LocalPaths.TATTOO },
      { text: "FLASH", link: LocalPaths.FLASH },
      { text: "Henna", link: LocalPaths.HENNA },
      { text: "Toiles", link: LocalPaths.TOILES },
    ],
  } as INavLink,
  { text: "Boutique", link: LocalPaths.BOUTIQUE } as ICta,
  { text: "Blog", link: LocalPaths.BLOG } as ICta,
];

export const Navbar = () => {
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
        className={cn(styles.navbarWrapper, { [styles.scrolled]: scrolled })}
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
          >
            {!isMobile && (
              <FlexDiv gapArray={[5, 4, 5, 6]} as="ul">
                {links?.map((link: INavLink | ICta, key) => {
                  return (
                    !isMobileOrTablet &&
                    (isCta(link) ? (
                      <li key={key}>
                        <TabButton
                          className={styles.tab}
                          path={`/${locale}${link.link!}`}
                        >
                          {link.text}
                        </TabButton>
                      </li>
                    ) : (
                      <li key={key}>{dropDown(link, locale, key)}</li>
                    ))
                  );
                })}

                <li>
                  <Button
                    variant="secondary"
                    small={isMobile}
                    path={`/${locale}${LocalPaths.CART}`}
                  >
                    CART
                  </Button>
                </li>
                <li>
                  <Button
                    variant="fancy"
                    small={isMobile}
                    path={`/${locale}${LocalPaths.CONTACT}`}
                  >
                    Rendez-Vous
                  </Button>
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
      href={`/${locale}${LocalPaths.HOME}`}
      className={styles.logo}
      aria-label={translations.nav.home}
      onClick={() => setSidebar(false)}
    >
      <Logo />
    </Link>
  );
};

export const dropDown = (navLink: INavLink, locale: LangType, key?: number) => (
  <TabButton
    key={key}
    className={styles.tab}
    path={`/${locale}${navLink.link}`}
    dropdown={navLink.ctaArray}
  >
    {navLink.text}
  </TabButton>
);
