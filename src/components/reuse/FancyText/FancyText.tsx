import React, { CSSProperties, useEffect, useRef, useState } from "react";
import cn from "classnames";
import fitty from "fitty";
import styles from "./FancyText.module.scss";
import { IFancyText } from "@/data.d";
import FlexDiv from "../FlexDiv";
import { Heading } from "../Heading";

export interface FancyTextProps extends IFancyText {
  flexHorizontal?: CSSProperties["justifyContent"];
  reverse?: boolean;
  overflowText?: boolean;
  blocker?: boolean;
  className?: string;
}

export const FancyText: React.FC<FancyTextProps> = ({
  part1,
  part2,
  flexHorizontal = "flex-start",
  reverse,
  overflowText = false,
  blocker = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const applyFittyAndCheckOverflow = () => {
      if (containerRef.current) {
        const part1Element = containerRef.current.children[0];
        const part2Element = containerRef.current.children[1];

        // Apply fitty
        const baseFontSize = parseFloat(
          window.getComputedStyle(part1Element).fontSize
        );
        if (part1Element) {
          fitty(part1Element as HTMLElement, {
            minSize: 12,
            maxSize: baseFontSize,
          });
        }
        if (part2Element) {
          fitty(part2Element as HTMLElement, {
            minSize: 12,
            maxSize: baseFontSize,
          });
        }

        // Check overflow
        const containerWidth = containerRef.current.clientWidth;
        const childrenWidth = Array.from(containerRef.current.children).reduce(
          (total, child) => total + (child as HTMLElement).offsetWidth,
          0
        );
        setIsOverflowing(childrenWidth > containerWidth && overflowText);
      }
    };

    requestAnimationFrame(applyFittyAndCheckOverflow); // Single call for both

    window.addEventListener("resize", applyFittyAndCheckOverflow);
    return () =>
      window.removeEventListener("resize", applyFittyAndCheckOverflow);
  }, [containerRef, overflowText, part1, part2]);

  return (
    <FlexDiv
      className={cn(
        styles.title,
        {
          [styles.overflowing]: isOverflowing,
          [styles.reverse]: reverse,
          [styles.blocker]: blocker,
        },
        className
      )}
      ref={containerRef}
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      wrap
      width100
      customStyle={{
        justifyContent: flexHorizontal,
      }}
    >
      <Heading
        level="1"
        as="h1"
        color={reverse ? "cream-white" : "dark-burgundy"}
        className={cn(reverse ? styles.part2 : styles.part1)}
      >
        {part1}
      </Heading>

      <Heading
        level="1"
        as="h1"
        color={reverse ? "dark-burgundy" : "cream-white"}
        className={cn(reverse ? styles.part1 : styles.part2, {
          [styles.overflowWrap]: isOverflowing,
        })}
      >
        <div className={styles.textContainer}>
          <span className={styles.fittyText}>{part2}</span>
        </div>
      </Heading>
    </FlexDiv>
  );
};
