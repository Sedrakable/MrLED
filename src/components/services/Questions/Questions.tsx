"use client";
import React from "react";
import styles from "./Questions.module.scss";
import cn from "classnames";
import { Block } from "@/components/containers/Block";
import FlexDiv from "@/components/reuse/FlexDiv";
import { IQuestion } from "@/data.d";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { PortableTextContent } from "@/components/reuse/Paragraph/PortableTextContent";
import { Heading } from "@/components/reuse/Heading/Heading";

const Question: React.FC<IQuestion> = ({ title, desc }) => {
  return (
    <FlexDiv
      flex={{ direction: "column", y: "flex-start" }}
      width100
      gapArray={[3]}
      as="li"
    >
      <FlexDiv
        padding={{ horizontal: [5], bottom: [4], top: [3] }}
        flex={{ y: "flex-start", x: "flex-start" }}
        className={styles.titleContainer}
        width100
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
      </FlexDiv>

      <PortableTextContent
        level="regular"
        value={desc}
        className={styles.desc}
        differentColorForStrongText={false}
        color={"white"}
      />
    </FlexDiv>
  );
};

export interface QuestionBlockProps {
  title1: string;
  title2: string;
  questions: IQuestion[];
}

export const Questions: React.FC<QuestionBlockProps> = ({
  title1,
  title2,
  questions,
}) => {
  const locale = useLocale() as LangType;

  return (
    <Block className={styles.block}>
      <FlexDiv flex={{ direction: "column", x: "stretch" }} width100>
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
      </FlexDiv>
      <FlexDiv
        gapArray={[6, 7, 7, 8]}
        flex={{ y: "flex-start" }}
        width100
        className={cn(styles.questions)}
        as="ul"
      >
        {questions?.map((question: IQuestion, key) => {
          return <Question {...question} key={key} />;
        })}
      </FlexDiv>
    </Block>
  );
};
