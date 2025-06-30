"use client";
import React from "react";
import styles from "./Footer.module.scss";
import { Paragraph } from "../reuse/Paragraph/Paragraph";

import FlexDiv from "../reuse/FlexDiv";
import { useWindowResize } from "../../helpers/useWindowResize";
import { ICta, IFooter, INavBar, LocalPaths } from "../../data.d";
import { NavButton } from "../navbar/Navbar/Navbar";
import { Socials } from "./Socials";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import Link from "next/link";
import LogoWord from "@/assets/vector/Logos/Logo-Wordmark.svg";
import GridMobile from "@/assets/vector/Graphics/footer/footer-grid-mobile.svg";
import GridTablet from "@/assets/vector/Graphics/footer/footer-grid-tablet.svg";
import GridDesktop from "@/assets/vector/Graphics/footer/footer-grid-desktop.svg";
import GradientSvgWrapper from "../containers/GradientSvgWrapper/GradientSvgWrapper";

const Line: React.FC = () => {
  return <div className={styles.line} />;
};

const linkComp = (
  locale: LangType,
  cta: ICta,
  key: number,
  linkPath?: string
) => {
  return (
    <li key={key}>
      <Link
        href={`/${locale}${linkPath ? linkPath : ""}${cta.path}`}
        aria-label={cta.path}
      >
        <Paragraph level="regular" capitalise clickable>
          {cta?.text}
        </Paragraph>
      </Link>
    </li>
  );
};
const Nav: React.FC<INavBar> = ({ links, navButton }) => {
  const locale = useLocale() as LangType;

  return (
    <FlexDiv
      className={styles.links}
      gapArray={[5]}
      flex={{ x: "center" }}
      wrap
      as="ul"
    >
      {links?.map((link, key) => {
        return linkComp(locale, link as ICta, key);
      })}
      <li key="button">
        <NavButton {...navButton} />
      </li>
    </FlexDiv>
  );
};

const Logo: React.FC<{ trademark: string }> = ({ trademark }) => {
  return (
    <FlexDiv
      className={styles.logo}
      flex={{ direction: "column" }}
      gapArray={[2]}
      padding={{ vertical: [5, 0, 0, 0] }}
    >
      <LogoWord />
      <Paragraph level="small" color="white" textAlign="center">
        {trademark}
      </Paragraph>
    </FlexDiv>
  );
};

const Legal: React.FC<{ legals: { title: string; path: string }[] }> = ({
  legals,
}) => {
  const locale = useLocale() as LangType;
  return (
    <FlexDiv
      className={styles.legal}
      gapArray={[5]}
      wrap
      flex={{ x: "flex-start", y: "flex-start" }}
    >
      {legals?.map((cta, key) => {
        return (
          <Link
            href={`/${locale}${LocalPaths.LEGAL}${cta?.path!}`}
            key={key}
            aria-label={cta?.title}
          >
            <Paragraph level="small" color="grad" clickable>
              {cta?.title}
            </Paragraph>
          </Link>
        );
      })}
    </FlexDiv>
  );
};

const DesktopFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
  navButton,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ vertical: [7] }}
      gapArray={[6]}
    >
      <Nav links={links} navButton={navButton} />
      <Line />
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv
        flex={{ direction: "column", y: "center", x: "flex-start" }}
        customStyle={{ flex: 1, minHeight: "100%" }}
        padding={{ vertical: [4] }}
        gapArray={[5]}
      >
        <Legal legals={legals} />
        {socials.links && <Socials {...socials} />}
      </FlexDiv>
    </FlexDiv>
  );
};

const TabletFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
  navButton,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ y: "stretch" }}
      padding={{ top: [7], bottom: [7] }}
      gapArray={[6]}
    >
      <Logo trademark={trademark} />
      <Line />
      <FlexDiv flex={{ direction: "column", x: "flex-start" }} gapArray={[4]}>
        <Nav links={links} navButton={navButton} />

        <Legal legals={legals} />
        {socials && <Socials {...socials} />}
      </FlexDiv>
    </FlexDiv>
  );
};
const MobileFooter: React.FC<FooterProps> = ({
  links,
  legals,
  trademark,
  socials,
  navButton,
}) => {
  return (
    <FlexDiv
      className={styles.container}
      flex={{ direction: "column", x: "center" }}
      padding={{ top: [6], bottom: [7] }}
      gapArray={[4]}
    >
      <Nav links={links} navButton={navButton} />
      <Logo trademark={trademark} />
      {socials && <Socials {...socials} />}
      <Legal legals={legals} />
    </FlexDiv>
  );
};

type FooterProps = IFooter & INavBar;
export const Footer: React.FC<FooterProps> = (props) => {
  const { isMobile, isTablet } = useWindowResize();

  return (
    <footer className={styles.footer}>
      {isMobile ? (
        <>
          <GradientSvgWrapper
            SvgComponent={GridMobile}
            className={styles.grid}
          />
          <MobileFooter {...props} />
        </>
      ) : isTablet ? (
        <>
          <GradientSvgWrapper
            SvgComponent={GridTablet}
            className={styles.grid}
          />
          <TabletFooter {...props} />
        </>
      ) : (
        <>
          <GradientSvgWrapper
            SvgComponent={GridDesktop}
            className={styles.grid}
          />
          <DesktopFooter {...props} />
        </>
      )}
    </footer>
  );
};
