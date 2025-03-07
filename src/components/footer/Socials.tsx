import React from "react";
import { IconType } from "../reuse/Icon";
import { IconButton } from "../reuse/IconButton";
import FlexDiv from "../reuse/FlexDiv";
import { IExternalLink, ISocials } from "../../data.d";
import { useGoogleEvent } from "@/app/api/sendGoogleEvent";

export const Socials: React.FC<ISocials> = ({ links }) => {
  const sendEvent = useGoogleEvent();

  return (
    <FlexDiv gapArray={[5]} wrap flex={{ x: "flex-start" }} as="ul">
      {links?.map((link: IExternalLink, key) => {
        return (
          <li key={key} onClick={() => sendEvent("Click Socials", link.text)}>
            <IconButton
              href={link?.link}
              iconProps={{
                icon: link.text as IconType,
                size: "regular",
                color: "light_burgundy",
              }}
              target="_blank"
              aria-label={link.text}
            />
          </li>
        );
      })}
    </FlexDiv>
  );
};
