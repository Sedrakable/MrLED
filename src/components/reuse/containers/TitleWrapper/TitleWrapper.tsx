"use client";
import React, { FC, ReactNode } from "react";
import FlexDiv from "../../FlexDiv";
import { Heading } from "@/components/reuse/Heading";

interface TitleWrapperProps {
  children: ReactNode;
  title: string;
}

export const TitleWrapper: FC<TitleWrapperProps> = ({ children, title }) => {
  return (
    <FlexDiv
      gapArray={[4, 4, 5, 6]}
      flex={{ direction: "column", y: "flex-start" }}
      width100
    >
      <Heading as="h2" level="3" color="dark-burgundy">
        {title}
      </Heading>
      {children}
    </FlexDiv>
  );
};
