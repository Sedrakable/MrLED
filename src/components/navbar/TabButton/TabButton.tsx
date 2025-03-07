"use client";
import React, { FC, useState } from "react";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import { DropDown } from "../Dropdown/DropDown";
import { ICta } from "../../../data.d";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";
import { useGoogleEvent } from "@/app/api/sendGoogleEvent";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: () => void;
  dropdown?: ICta[];
}

const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
}) => {
  const pathname = usePathname();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { isMobileOrTablet } = useWindowResize();
  const sendEvent = useGoogleEvent();

  const handleDropdownToggle = () => {
    if (dropdown) {
      setDropDownOpen(!dropDownOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobileOrTablet && dropdown) {
      setDropDownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileOrTablet && dropdown) {
      setDropDownOpen(false);
    }
  };

  const handleClick = () => {
    sendEvent("Click Navbar", path);
    if (isMobileOrTablet) {
      handleDropdownToggle();
    }
    if (onClick) {
      onClick();
    }
  };

  const TabContent = () => {
    return (
      <FlexDiv
        padding={{ horizontal: [3] }}
        gapArray={[3]}
        className={styles.content}
      >
        <Paragraph
          level="regular"
          color="dark-burgundy"
          textAlign="left"
          capitalise
          clickable
        >
          {children}
        </Paragraph>
        {dropdown && (
          <Icon
            icon="arrow"
            size="small"
            rotate={dropDownOpen ? 180 : undefined}
          />
        )}
      </FlexDiv>
    );
  };

  return (
    <FlexDiv
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      flex={{ direction: "column", x: "flex-start" }}
      className={cn(styles.tabButton, className)}
    >
      {dropdown ? (
        <TabContent />
      ) : (
        <Link href={path} aria-label={path} style={{ width: "100%" }}>
          <TabContent />
        </Link>
      )}
      {pathname.includes(path) && !dropDownOpen && (
        <div className={styles.line} />
      )}
      {dropDownOpen && dropdown && (
        <DropDown dropdown={dropdown} parentPath={path} isOpen={dropDownOpen} />
      )}
    </FlexDiv>
  );
};

export default TabButton;
