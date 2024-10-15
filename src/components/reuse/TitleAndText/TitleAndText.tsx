import React from "react";

import { TextWrapper } from "../containers/TextWrapper/TextWrapper";
import { TitleWrapper } from "../containers/TitleWrapper/TitleWrapper";
import { PortableTextContent } from "../Paragraph/PortableTextContent";

interface TitleAndTextProps {
  title: string;
  text: any;
}

export const TitleAndText: React.FC<TitleAndTextProps> = ({ text, title }) => {
  return (
    <TitleWrapper title={title}>
      <TextWrapper version={3}>
        <PortableTextContent
          value={text}
          color="dark-burgundy"
          textAlign="center"
        />
      </TextWrapper>
    </TitleWrapper>
  );
};
