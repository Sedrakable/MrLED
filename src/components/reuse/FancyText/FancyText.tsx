import React, { CSSProperties } from "react";
import cn from "classnames";
import styles from "./FancyText.module.scss";
import { IFancyText } from "@/data.d";
import FlexDiv from "../FlexDiv";
import { Heading } from "../Heading";

export interface FancyTextProps extends IFancyText {
  flexHorizontal?: CSSProperties["justifyContent"];
  reverse?: boolean;
}
export const FancyText: React.FC<FancyTextProps> = ({
  part1,
  part2,
  flexHorizontal = "flex-start",
  reverse,
}) => {
  return (
    <FlexDiv
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      className={cn(styles.title)}
      width100
      // wrap
      customStyle={{ justifyContent: flexHorizontal }}
    >
      <Heading
        level="1"
        as="h1"
        color={reverse ? "cream-white" : "dark-burgundy"}
        className={reverse ? styles.part2 : styles.part1}
      >
        {part1}
      </Heading>
      <Heading
        level="1"
        as="h1"
        color={reverse ? "dark-burgundy" : "cream-white"}
        className={reverse ? styles.part1 : styles.part2}
      >
        {part2}
      </Heading>
    </FlexDiv>
  );
};
