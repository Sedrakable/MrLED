"use client";
import React from "react";
import styles from "./Features.module.scss";
import cn from "classnames";
import FlexDiv from "@/components/reuse/FlexDiv";
import { IFeature, IFeatureBlock } from "@/data.d";
import { useSvgComponent } from "@/helpers/useSvgComponent";
import { Block } from "@/components/containers/Block";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import GridDiv from "@/components/reuse/GridDiv";
import { AnimatedWrapper } from "@/components/containers/AnimatedWrapper/AnimatedWrapper";
import { Heading } from "@/components/reuse/Heading/Heading";

const Feature: React.FC<IFeature> = ({ title, svgName, desc }) => {
  const SvgComponent = useSvgComponent(svgName || "Bulb");

  return (
    <FlexDiv
      flex={{ direction: "column", x: "flex-start" }}
      width100
      className={cn(styles.container)}
      gapArray={[5, 4, 4, 5]}
    >
      <div className={styles.imgWrapper}>
        {SvgComponent ? (
          <SvgComponent />
        ) : (
          <div>Loading...</div> // You could replace this with a spinner or placeholder
        )}
      </div>
      <FlexDiv
        flex={{ direction: "column", y: "flex-start" }}
        width100
        className={styles.content}
        gapArray={[2]}
      >
        <Heading
          as="h3"
          level="5"
          color="white"
          textAlign="center"
          weight={500}
          className={styles.title}
        >
          {title}
        </Heading>
        <Paragraph level="regular" color="white" textAlign="center">
          {desc}
        </Paragraph>
      </FlexDiv>
    </FlexDiv>
  );
};

export const Features: React.FC<IFeatureBlock> = ({ features, title }) => {
  return (
    <Block
      title={{
        children: title,
        font: "title",
        color: "grad",
        weight: 400,
      }}
      variant="green"
      className={styles.block}
    >
      <GridDiv
        gapArray={[9, 6, 7, 8]}
        columns={[
          [1, 1],
          [2, 2],
          [3, 3],
          [3, 3],
        ]}
        width100
        as="ul"
      >
        {features?.map((feature: IFeature, key) => {
          return (
            <AnimatedWrapper from="inside" key={key} as="li">
              <Feature {...feature} />
            </AnimatedWrapper>
          );
        })}
      </GridDiv>
    </Block>
  );
};
