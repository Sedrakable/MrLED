import React, { CSSProperties } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Paragraph, ParagraphProps } from "./Paragraph";
import { ColorType, TextWeightType } from "../Heading";

interface PortableTextContentProps extends Omit<ParagraphProps, "children"> {
  value: any;
}

export const PortableTextContent: React.FC<PortableTextContentProps> = ({
  value,
  color = "burgundy", // default color
  textAlign = "left",
  weight = 300,
  level = "regular",
  className,
}) => {
  const quote = (
    <strong style={{ fontWeight: 500, color: `var(--burgundy)` }}>"</strong>
  );
  const myComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          className={className}
        >
          {children}
        </Paragraph>
      ),
      blockquote: ({ children }) => (
        <Paragraph
          level={level}
          weight={weight}
          color={color}
          textAlign={textAlign}
          className={className}
        >
          <em>
            {quote}
            {children}
            {quote}
          </em>
        </Paragraph>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            style={{
              fontWeight: weight + 100,
              color: `var(--burgundy)`,
              textDecoration: "underline",
            }}
            {...value}
            target="_blank"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong style={{ fontWeight: weight + 200, color: `var(--burgundy)` }}>
          {children}
        </strong>
      ),
      em: ({ children }) => <em>{children}</em>,
    },
  };

  return <PortableText value={value} components={myComponents} />;
};
