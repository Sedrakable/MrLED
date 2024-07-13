import React from "react";
import { IconType } from "../reuse/Icon";
import { Heading } from "../reuse/Heading";
import { IconButton } from "../reuse/IconButton";
import FlexDiv from "../reuse/FlexDiv";
import { ICta, ISocials } from "../../data.d";

export const Socials: React.FC<ISocials> = ({ title, links }) => {
  return (
    <FlexDiv gapArray={[2]} wrap flex={{ x: "flex-start" }}>
      {title && (
        <Heading as="h3" level="3" color="burgundy">
          {title}
        </Heading>
      )}
      <FlexDiv gapArray={[5]} wrap flex={{ x: "flex-start" }}>
        {links?.map((link: ICta, key) => {
          return (
            true && (
              <IconButton
                key={key}
                href={link?.link}
                iconProps={{
                  icon: link.text as IconType,
                  size: "regular",
                  color: "light_burgundy",
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
