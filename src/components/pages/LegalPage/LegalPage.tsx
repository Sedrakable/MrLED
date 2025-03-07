"use client";
import React from "react";
import { ILegalPage } from "@/data.d";
import { Block } from "../../reuse/containers/Block/Block";
import { contentBlocks } from "@/components/reuse/ContentBlock/ContentBlock";
import FlexDiv from "@/components/reuse/FlexDiv";

export const LegalPageComp: React.FC<ILegalPage> = ({ title, data }) => {
  return (
    <Block variant="default" illustrations title={title}>
      <FlexDiv
        flex={{ direction: "column", x: "flex-start" }}
        width100
        as="section"
      >
        {data && contentBlocks({ blocks: data })}
      </FlexDiv>
    </Block>
  );
};
