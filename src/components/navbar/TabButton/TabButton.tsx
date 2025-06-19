"use client";
import React, { FC } from "react";
// import { Heading } from "@/components/reuse/Heading/Heading";
import styles from "./TabButton.module.scss";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { Icon } from "../../reuse/Icon/Icon";
import { ICta } from "../../../data.d";
// import { FancyText } from "../../reuse/FancyText";
import Link from "next/link";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";

export interface TabButtonProps {
  children: string;
  path: string;
  className?: string;
  onClick?: () => void;
  dropdown?: ICta[];
}

// const FancyHeadingComponent: FC<{ text: string }> = ({ text }) => {
//   const [hasFancyText, part1, part2, part3] = useFancyText(text);

//   return hasFancyText ? (
//     <FancyText mode="tab" part1={part1} part2={part2} part3={part3} dark />
//   ) : (
//     <Paragraph font="Outfit" level="5" as="h5" color="black">
//       {text}
//     </Heading>
//   );
// };

// const useFancyText = (text: string) => {
//   const parts = text.split("+");
//   type FancyTextPartsType = [boolean, string, string, string];
//   if (parts.length === 1) {
//     return [false, text, "", ""] as FancyTextPartsType;
//   } else {
//     return [true, parts[0], "+ ", parts[1]] as FancyTextPartsType;
//   }
// };

const TabButton: FC<TabButtonProps> = ({
  children,
  path,
  dropdown,
  onClick,
  className,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const TabContent = () => {
    return (
      <FlexDiv
        padding={{ bottom: [1], top: [1] }}
        gapArray={[3]}
        className={styles.textWrapper}
      >
        <Paragraph level="regular" color="grad">
          {children}
        </Paragraph>
        {dropdown && <Icon icon="arrow" size="extra-small" rotate={90} />}
      </FlexDiv>
    );
  };

  return (
    <FlexDiv
      onClick={handleClick}
      flex={{ direction: "column", x: "flex-start" }}
      className={cn(styles.tabButton, className)}
      height100
    >
      <Link href={path} aria-label={path}>
        <TabContent />
      </Link>
    </FlexDiv>
  );
};

export default TabButton;
