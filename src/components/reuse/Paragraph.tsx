"use client";
import React, { CSSProperties } from "react";
import styles from "./Paragraph.module.scss";
import cn from "classnames";
import {
  SpacingArrayType,
  useSpacingGenerator,
} from "../../helpers/SpacingGenerator";
import { ColorType, josefin, TextWeightType } from "./Heading";

export interface ParagraphProps {
  children: string | JSX.Element;
  level: "small" | "regular" | "big";
  textAlign?: CSSProperties["textAlign"];
  paddingBottomArray?: SpacingArrayType;
  color?: ColorType;
  weight?: TextWeightType;
  capitalise?: boolean;
  clickable?: boolean;
  className?: string;
}

const processChildren = (children: string | JSX.Element) => {
  if (typeof children === "string") {
    // Replace newline characters with <br /> elements
    return children.split("\n")?.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }
  return children;
};

export const Paragraph: React.FC<ParagraphProps> = ({
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

  return (
    <p
      className={cn(
        styles.paragraph,
        josefin.className,
        styles[level],
        {
          [styles.clickable]: clickable,
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
      {processChildren(children)}
    </p>
  );
};
