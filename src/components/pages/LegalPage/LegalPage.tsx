import React from "react";
import FlexDiv from "@/components/reuse/FlexDiv";
import { ILegalPage } from "@/data.d";
import { Block } from "@/components/containers/Block";
import { Heading } from "@/components/reuse/Heading/Heading";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";

export const LegalPageComp: React.FC<ILegalPage> = ({ title, data }) => {
  return (
    <Block title={{ font: "title", children: title, color: "grad" }}>
      <FlexDiv flex={{ direction: "column", x: "flex-start" }}>
        {data?.map((block) => {
          return (
            <div key={block._key}>
              {block.children?.map((child) =>
                child.marks[0] === "strong" ? (
                  <Heading
                    font="title"
                    key={child._key}
                    as="h5"
                    level="5"
                    color="grad"
                    paddingBottomArray={[1, 2, 2, 3]}
                  >
                    {child.text}
                  </Heading>
                ) : (
                  <Paragraph
                    key={child._key}
                    level="regular"
                    color="white"
                    paddingBottomArray={[2, 3, 3, 4]}
                  >
                    {child.text}
                  </Paragraph>
                )
              )}
            </div>
          );
        })}
      </FlexDiv>
    </Block>
  );
};
