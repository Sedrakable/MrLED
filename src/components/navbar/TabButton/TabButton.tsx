"use client";
import React, { FC, useState } from "react";
import { Heading } from "../../reuse/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import Line from "@/assets/vector/Line.svg";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon";
import { DropDown } from "../Dropdown/DropDown";
import { ICta } from "../../../data.d";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: Function;
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

  const onTabClick = () => {
    if (dropdown) {
      setDropDownOpen((prevState) => !prevState);
    } else {
      onClick && onClick();
    }
  };

  const TabContent = () => {
    return (
      <FlexDiv
        padding={{ bottom: [1], top: [1] }}
        gapArray={[2]}
        className={styles.textWrapper}
      >
        <Heading level="6" as="h6" color="black">
          {children}
        </Heading>
        {dropdown && <Icon icon="arrow" size="small" rotate={90} />}
      </FlexDiv>
    );
  };

  return (
    <div
      onClick={() => onTabClick()}
      className={cn(styles.tabButton, className)}
    >
      {dropdown ? (
        <TabContent />
      ) : (
        <Link href={path} aria-label={path}>
          <TabContent />
        </Link>
      )}
      {path === pathname && <Line className={styles.line} />}
      {dropDownOpen && dropdown && (
        <DropDown
          dropdown={dropdown}
          parentPath={path}
          isOpen={dropDownOpen}
          onClose={() => setDropDownOpen(false)}
        />
      )}
    </div>
  );
};

export default TabButton;
