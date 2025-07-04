import React from "react";
import cn from "classnames";
import { atom, useAtom } from "jotai";
import { useLocale } from "next-intl";

import { ICta, ISocials, LocalPaths } from "../../../data.d";
import { getTranslations } from "../../../helpers/langUtils";
import styles from "./Sidebar.module.scss";

import FlexDiv from "../../reuse/FlexDiv";
import { Button } from "../../reuse/Button/Button";
import { IconButton } from "../../reuse/IconButton/IconButton";
import { LangSwitcher } from "../LangSwitcher/LangSwitcher";
import { LogoLink } from "../Navbar/Navbar";

import { LangType } from "@/i18n/request";
import { usePathname } from "@/navigation";
import { Socials } from "@/components/footer/Socials";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import Link from "next/link";

// Define sidebar atom
export const sidebarData = atom<boolean>(false);

interface SidebarProps {
  links?: ICta[];
  socials?: ISocials;
}

export const Sidebar: React.FC<SidebarProps> = ({ links, socials }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useAtom(sidebarData); // Cleanup: Renamed `sidebar` to `isOpen` for clarity
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  // Cleanup: Simplified tabWrapper to a reusable function with consistent props
  const renderTabWrapper = (
    child: React.ReactNode,
    key?: number,
    path?: string
  ) => {
    const content = (
      <FlexDiv
        key={key}
        className={cn(styles.tabWrapper, {
          [styles.selected]: path && pathname == path,
          [styles.linkTab]: path,
        })}
        flex={{ x: "flex-start" }}
        padding={{ horizontal: [6, 8], vertical: [5, 5] }}
        as={path ? "div" : "li"}
        width100
      >
        {child}
      </FlexDiv>
    );
    if (path) {
      return (
        <li key={key}>
          <Link
            href={path}
            aria-label={path}
            style={{ width: "100%" }}
            onClick={() => setIsOpen(false)}
          >
            {content}
          </Link>
        </li>
      );
    } else {
      return content;
    }
  };

  // Cleanup: Extracted common link rendering logic to reduce duplication
  const renderLink = (
    path: string,
    text: string,
    key: number,
    isSubTab = false
  ) => {
    return renderTabWrapper(
      <Paragraph
        color="grad"
        level={isSubTab ? "regular" : "big"}
        className={isSubTab ? styles.subTab : undefined}
        weight={500}
      >
        {text}
      </Paragraph>,
      key,
      path
    );
  };

  return (
    <div className={cn(styles.sidebar, { [styles.isOpen]: isOpen })}>
      {/* Cleanup: Simplified closeTab section for readability */}
      <FlexDiv
        className={styles.closeTab}
        width100
        flex={{ x: "space-between" }}
        padding={{ horizontal: [6, 8] }}
      >
        <LogoLink locale={locale} />
        <IconButton
          onClick={() => setIsOpen(false)}
          iconProps={{ icon: "close", size: "regular", color: "grad" }}
          aria-label="close sidebar"
        />
      </FlexDiv>

      <div className={styles.overlay} onClick={() => setIsOpen(false)} />

      <FlexDiv
        className={styles.tabs}
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        as="ul"
      >
        {/* Cleanup: Streamlined link rendering with early return for last link */}
        {links &&
          links.map((link, key) => renderLink(link.path!, link.text, key))}

        {/* Cleanup: Reordered LangSwitcher and Button for logical flow */}
        {renderTabWrapper(
          <FlexDiv flex={{ x: "space-between" }} gapArray={[4]} width100>
            <LangSwitcher onClick={() => setIsOpen(false)} />
            {socials && <Socials {...socials} />}
          </FlexDiv>
        )}
        {renderTabWrapper(
          <Button
            variant="simple"
            path={`/${locale}${LocalPaths.CONTACT}`}
            onClick={() => setIsOpen(false)}
          >
            {translations.buttons.contact}
          </Button>
        )}
      </FlexDiv>
    </div>
  );
};
