"use client";
import React, { CSSProperties } from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";

import { Finger_Paint, Montserrat, Orbitron, Outfit } from "next/font/google";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "@/helpers/SpacingGenerator";

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: "400",
});

export type ColorType = "white" | "black" | "yellow" | "grey" | "error";

export const HeadingLevelArray = ["1", "2", "3", "4", "5"] as const;

type HeadingLevelType = typeof HeadingLevelArray[number];

export const HeadingAsArray = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
] as const;

type HeadingAsType = typeof HeadingAsArray[number];

export interface HeadingProps {
  font: "Display" | "Title";
  children: string | JSX.Element;
  level: HeadingLevelType;
  as: HeadingAsType;
  weight?: CSSProperties["fontWeight"];
  textAlign?: CSSProperties["textAlign"];
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  upperCase?: boolean;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

export const capitalizeString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const Heading: React.FC<HeadingProps> = ({
  font = "Title",
  children,
  level,
  as,
  weight = "400",
  textAlign,
  paddingBottomArray,
  color = "white",
  upperCase = true,
  capitalise,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  const CustomHeading = as as keyof JSX.IntrinsicElements;

  let finalString =
    typeof children === "string" && upperCase
      ? children?.toUpperCase()
      : capitalise
      ? capitalizeString(children as string)
      : children;

  return (
    <CustomHeading
      className={cn(
        styles.heading,
        styles[`level${level}`],
        styles[color],
        {
          [styles.gradient]: color.includes("grad"),
          [styles.clickable]: clickable,

          [orbitron.className]: font === "Title",
        },
        className
      )}
      style={{
        color: `var(--${color})`,
        textAlign,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
        fontWeight: weight,
      }}
      data-text={typeof finalString === "string" ? finalString : undefined}
    >
      {finalString}
    </CustomHeading>
  );
};
