import React from "react";
import styles from "./Line.module.scss";
import cn from "classnames";
import { ColorType } from "./Heading";

interface LineProps {
  color?: ColorType | "light-burgundy-30";
  rotation: "horizontal" | "vertical";
}
export const Line: React.FC<LineProps> = ({ color = "white", rotation }) => {
  return (
    <span
      className={cn(styles.line, {
        [styles.vertical]: rotation === "vertical",
        [styles.horizontal]: rotation === "horizontal",
      })}
      style={{ backgroundColor: `var(--${color})` }}
    />
  );
};
