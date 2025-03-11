"use client";
import React, { CSSProperties } from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";
import { Orbitron } from "next/font/google";

export const josefin = Orbitron({
  // variable: "--font-jose",
  style: ["normal"],
  subsets: ["latin"],
});

export type ColorType =
  | "white"
  | "green"
  | "blue"
  | "black"
  | "turquoise"
  | "error";

export const HeadingLevelArray = ["1", "2", "3", "4", "5", "6"] as const;

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

export type TextWeightType = 400 | 500 | 600 | 700 | 800 | 900;

export interface HeadingProps {
  children: string | JSX.Element;
  level: HeadingLevelType;
  as: HeadingAsType;
  weight?: TextWeightType;
  textAlign?: CSSProperties["textAlign"];
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  upperCase?: boolean;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
  width100?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  weight = 300,
  level,
  as,
  textAlign,
  paddingBottomArray,
  color = "white",
  upperCase = true,
  width100,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  const CustomHeading = as as keyof JSX.IntrinsicElements;

  const finalString =
    typeof children === "string" && upperCase
      ? children?.toUpperCase()
      : children;

  return (
    <CustomHeading
      className={cn(
        styles.heading,
        josefin.className,
        styles[`level${level}`],
        {
          [styles.clickable]: clickable,
        },
        className
      )}
      style={{
        fontWeight: weight,
        color: `var(--${color})`,
        textAlign,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
        width: width100 ? "100%" : undefined,
      }}
    >
      {finalString}
    </CustomHeading>
  );
};
