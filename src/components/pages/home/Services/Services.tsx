"use client";
import React from "react";
import { IDisplay, IServices } from "../../../../data.d";
import { Display } from "@/components/reuse/Display/Display";

export const Services: React.FC<IServices> = ({ services }) => {
  return services?.map((service: IDisplay, key) => {
    return (
      <Display
        {...service}
        version="service"
        key={key}
        reverse={key % 2 === 1}
      />
    );
  });
};
