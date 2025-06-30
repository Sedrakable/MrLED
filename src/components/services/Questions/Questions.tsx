"use client";
import React from "react";
import styles from "./Questions.module.scss";
import cn from "classnames";
import { Block } from "@/components/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { IQuestion, IQuestionBlock } from "@/data.d";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";
import { Heading } from "@/components/reuse/Heading/Heading";
import { AnimatedWrapper } from "@/components/containers/AnimatedWrapper/AnimatedWrapper";

const Question: React.FC<IQuestion> = ({ title, desc }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[2, 2, 2, 3]}
      padding={{
        top: [3, 3, 3, 3],
        bottom: [5, 5, 5, 5],
        horizontal: [4, 4, 4, 4],
      }}
      className={styles.question}
    >
      <Heading
        font="title"
        level="5"
        as="h3"
        color="grad"
        weight={400}
        textAlign="left"
      >
        {title}
      </Heading>

      <PortableTextContent
        level="small"
        weight={400}
        value={desc}
        className={styles.desc}
        differentColorForStrongText={false}
        color={"white"}
      />
    </FlexDiv>
  );
};

export const Questions: React.FC<IQuestionBlock> = ({
  title1,
  title2,
  questions,
}) => {
  return (
    <Block className={styles.block}>
      <FlexDiv flex={{ direction: "column", x: "center" }} width100>
        <AnimatedWrapper from="left">
          <Heading
            font="title"
            as="h3"
            level="3"
            color="white"
            className={styles.heading}
            textAlign="center"
            weight={400}
          >
            {title1}
          </Heading>
        </AnimatedWrapper>
        <AnimatedWrapper from="right">
          <Heading
            font="title"
            as="h3"
            level="3"
            color="grad"
            className={styles.heading}
            textAlign="center"
            weight={400}
            paddingBottomArray={[6, 7, 7, 8]}
          >
            {title2}
          </Heading>
        </AnimatedWrapper>
      </FlexDiv>
      <FlexDiv
        gapArray={[6, 7, 7, 8]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.questions)}
        as="ul"
      >
        {questions?.map((question: IQuestion, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Question {...question} />
            </AnimatedWrapper>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
