import React from "react";
import cn from "classnames";
import styles from "./FancyText.module.scss";
import { IFancyText } from "@/data.d";
import FlexDiv from "../FlexDiv";
import { Heading } from "../Heading";

export interface FancyTextProps extends IFancyText {}
export const FancyText: React.FC<FancyTextProps> = ({ part1, part2 }) => {
  return (
    <FlexDiv
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      className={cn(styles.title)}
      width100
      wrap
    >
      <Heading level="1" as="h1" color="dark-burgundy" className={styles.part1}>
        {part1}
      </Heading>
      <Heading level="1" as="h1" color="cream-white" className={styles.part2}>
        {part2}
      </Heading>
    </FlexDiv>
  );
};
