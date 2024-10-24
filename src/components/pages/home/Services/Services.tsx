"use client";
import React from "react";
import { Display, DisplayProps } from "@/components/reuse/Display/Display";

export interface ServicesProps {
  services: DisplayProps[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  return services?.map((service: DisplayProps, key) => {
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
