"use client";
import React, { useState } from "react";
import styles from "./Collapsible.module.scss";

import FlexDiv from "../../reuse/FlexDiv";
import cn from "classnames";
import { Paragraph } from "../Paragraph/Paragraph";
import { PortableTextContent } from "../Paragraph/PortableTextContent";
import { ICollapsible } from "@/data.d";
import { Block } from "@/components/containers/Block";
import { Heading } from "../Heading/Heading";
import { Icon } from "../Icon/Icon";

export const Collapsible: React.FC<ICollapsible> = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <Block>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
        width100
        gapArray={[4]}
      >
        {title && (
          <FlexDiv
            className={styles.titleWrapper}
            width100
            flex={{ x: "flex-start" }}
            padding={{ all: [3], left: [4] }}
          >
            <Heading font="title" level="4" as="h3" color="black" weight={400}>
              {title}
            </Heading>
          </FlexDiv>
        )}
        <FlexDiv
          flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
          width100
          gapArray={[2]}
        >
          {questions?.map((q, index) => (
            <FlexDiv
              key={index}
              width100
              flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
              className={styles.question}
              padding={{ horizontal: [4], vertical: [3, 3, 3, 4] }}
            >
              <button
                className={styles.questionToggle}
                onClick={() => toggleQuestion(index)}
              >
                <Paragraph
                  level="big"
                  color="white"
                  textAlign="left"
                  weight={openIndex === index ? 600 : 400}
                >
                  {q.question}
                </Paragraph>
                <Icon
                  icon={openIndex === index ? "minus" : "plus"}
                  size="extra-small"
                  className={cn(
                    styles.toggleIcon,
                    openIndex === index ? styles.minus : styles.plus
                  )}
                  color={openIndex === index ? "white" : "grad"}
                />
              </button>
              {openIndex === index && (
                <FlexDiv
                  className={styles.answer}
                  padding={{ vertical: [3], left: [4], right: [8] }}
                >
                  <PortableTextContent
                    level="small"
                    value={q.answer}
                    color="black"
                    weight={400}
                  />
                </FlexDiv>
              )}
            </FlexDiv>
          ))}
        </FlexDiv>
      </FlexDiv>
    </Block>
  );
};
