"use client";
import React from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export type ColorType = "white" | "black" | "yellow" | "grey";

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

type textAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

export interface HeadingProps {
  children: string | JSX.Element;
  level: HeadingLevelType;
  as: HeadingAsType;
  weight?: 300 | 400 | 500;
  textAlign?: textAlign;
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
  children,
  weight = 300,
  level,
  as,
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

  const finalString =
    typeof children === "string" && upperCase
      ? children?.toUpperCase()
      : capitalise
      ? capitalizeString(children as string)
      : children;

  return (
    <CustomHeading
      className={cn(
        styles.heading,
        josefin.variable,
        styles[`level${level}`],
        {
          [styles.gradient]: color.includes("grad"),
          [styles.clickable]: clickable,
        },
        className
      )}
      style={{
        fontWeight: weight,
        color: `var(--${color})`,
        textAlign,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
      }}
    >
      {finalString}
    </CustomHeading>
  );
};
