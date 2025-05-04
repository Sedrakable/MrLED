import React from "react";
import { IconType } from "../reuse/Icon/Icon";
import FlexDiv from "../reuse/FlexDiv";
import { ICta, ISocials } from "../../data.d";
import { IconButton } from "../reuse/IconButton/IconButton";
import { Heading } from "@/components/reuse/Heading/Heading";

export const Socials: React.FC<ISocials> = ({ title, links }) => {
  return (
    <FlexDiv gapArray={[2]} wrap flex={{ x: "flex-start" }}>
      {title && (
        <Heading font="title" as="h3" level="3" color="white">
          {title}
        </Heading>
      )}
      <FlexDiv gapArray={[4, 4, 4, 5]} wrap flex={{ x: "flex-start" }}>
        {links?.map((link: ICta, key) => {
          return (
            true && (
              <IconButton
                key={key}
                href={link?.path}
                iconProps={{
                  icon: link.text as IconType,
                  size: "regular",
                  color: "grad",
                }}
                target="_blank"
                aria-label={link.text}
              />
            )
          );
        })}
      </FlexDiv>
    </FlexDiv>
  );
};
