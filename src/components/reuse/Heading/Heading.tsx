"use client";
import React, { CSSProperties } from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";

import { Orbitron } from "next/font/google";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "@/helpers/SpacingGenerator";

export const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Support multiple weights
});

export type ColorType =
  | "white"
  | "black"
  | "grad"
  | "led-turq"
  | "error"
  | "led-green"
  | "led-blue";
export type HeadingLevelType = "1" | "2" | "3" | "4" | "5";
export type HeadingAsType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
export type FontType = "title" | "display"; // Add "display" if needed
export type WeightType = 400 | 500 | 600;

export const HeadingAsArray = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "span",
] as const;

// type HeadingAsType = typeof HeadingAsArray[number];

export interface HeadingProps {
  font?: FontType;
  children: string | JSX.Element;
  level: HeadingLevelType;
  as?: HeadingAsType;
  weight?: WeightType; // Match Orbitron weights
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
  font = "title",
  children,
  level,
  as = `h${level}`,
  weight = "400",
  textAlign,
  paddingBottomArray,
  color = "white",
  upperCase = false,
  capitalise = false,
  clickable = false,
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
        styles[font],

        {
          [styles.gradient]: color === "grad",
          [styles.clickable]: clickable,

          [orbitron.className]: font === "title",
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
