"use client";
import React, { CSSProperties, ReactNode } from "react";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../../helpers/SpacingGenerator";
import { ColorType } from "../Heading/Heading";
import { Montserrat } from "next/font/google";

export interface ParagraphProps {
  as?: "p" | "li" | "span"; // ✅ Allow different HTML elements
  children: string | ReactNode;
  level: "small" | "regular" | "big";
  textAlign?: CSSProperties["textAlign"];
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  weight?: 400 | 500 | 600;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
export const Paragraph: React.FC<ParagraphProps> = ({
  as = "p", // ✅ Allow different HTML elements
  children,
  level = "regular",
  textAlign,
  weight = 400,
  paddingBottomArray,
  color = "white",
  capitalise,
  clickable,
  className,
}) => {
  const { spacingNum } = useSpacingGenerator(paddingBottomArray);

  const CustomTag = as as keyof JSX.IntrinsicElements; // ✅ Dynamic HTML tag

  return (
    <CustomTag
      className={cn(
        styles.paragraph,
        montserrat.className,
        styles[level],
        {
          [styles.clickable]: clickable,
          [styles.grad]: color === "grad",
        },
        className
      )}
      style={{
        textTransform: capitalise ? "capitalize" : "none",
        color: `var(--${color})`,
        textAlign,
        fontWeight: weight,
        paddingBottom: spacingNum && `var(--pad-${spacingNum})`,
      }}
    >
      {children}
    </CustomTag>
  );
};
