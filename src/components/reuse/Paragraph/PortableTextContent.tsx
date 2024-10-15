import React, { CSSProperties } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Paragraph } from "./Paragraph";
import { ColorType } from "../Heading";

interface PortableTextContentProps {
  value: any;
  color?: ColorType;
  textAlign?: CSSProperties["textAlign"];
}

export const PortableTextContent: React.FC<PortableTextContentProps> = ({
  value,
  color = "burgundy", // default color
  textAlign = "left",
}) => {
  const myComponents: PortableTextComponents = {
    block: {
      normal: ({ children }) => (
        <Paragraph
          level="regular"
          weight={300}
          color={color}
          textAlign={textAlign}
        >
          {children}
        </Paragraph>
      ),
      h1: ({ children }) => (
        <Paragraph level="big" color={color} textAlign={textAlign}>
          {children}
        </Paragraph>
      ),
      h2: ({ children }) => (
        <Paragraph level="regular" color={color} textAlign={textAlign}>
          {children}
        </Paragraph>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong style={{ fontWeight: 500, color: `var(--burgundy)` }}>
          {children}
        </strong>
      ),
      em: ({ children }) => <em>{children}</em>,
    },
  };

  return <PortableText value={value} components={myComponents} />;
};
