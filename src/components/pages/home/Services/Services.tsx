"use client";
import React from "react";
import styles from "./Services.module.scss";
import FlexDiv from "../../../reuse/FlexDiv";
import { Block } from "../../containers/Block";
import { IDisplay, IServices } from "../../../../data.d";
import { Display } from "@/components/reuse/Display/Display";

export const Services: React.FC<IServices> = ({ services }) => {
  console.log(services);
  return (
    <Block variant="full-width">
      {services?.map((service: IDisplay, key) => {
        return (
          <Display
            {...service}
            version="service"
            key={key}
            reverse={key % 2 === 1}
          />
        );
      })}
    </Block>
  );
};
