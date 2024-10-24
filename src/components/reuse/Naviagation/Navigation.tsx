// components/reuse/Navigation/Navigation.tsx
"use client";
import React, { FC } from "react";
import styles from "./Navigation.module.scss";
import cn from "classnames";
import FlexDiv from "../../reuse/FlexDiv";
import { ICta } from "../../../data.d";
import { Heading } from "@/components/reuse/Heading";
import { Button } from "@/components/reuse/Button";

interface NavigationProps {
  prevPage: ICta;
  nextPage: ICta;
  getButtonPath: (page: ICta) => string;
  className?: string;
}

export const Navigation: FC<NavigationProps> = ({
  prevPage,
  nextPage,
  getButtonPath,
  className,
}) => {
  return (
    <FlexDiv
      width100
      flex={{ x: "space-between" }}
      className={cn(styles.navButtons, className)}
      padding={{ top: [4] }}
    >
      <FlexDiv gapArray={[3, 3, 3, 4]} flex={{ y: "center" }}>
        <Button
          variant="extra"
          iconProps={{ icon: "arrow", rotate: 90, size: "regular" }}
          path={getButtonPath(prevPage)}
        />
        <Heading
          as="h4"
          level="6"
          weight={400}
          color="burgundy"
          textAlign="center"
          className={styles.title}
        >
          {prevPage.text}
        </Heading>
      </FlexDiv>
      <FlexDiv gapArray={[3, 3, 3, 4]} flex={{ y: "center" }}>
        <Heading
          as="h4"
          level="6"
          weight={400}
          color="burgundy"
          textAlign="center"
          className={styles.title}
        >
          {nextPage.text}
        </Heading>
        <Button
          variant="extra"
          iconProps={{ icon: "arrow", rotate: 270, size: "regular" }}
          path={getButtonPath(nextPage)}
        />
      </FlexDiv>
    </FlexDiv>
  );
};
