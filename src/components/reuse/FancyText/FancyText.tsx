import React, { CSSProperties, useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./FancyText.module.scss";
import { IFancyText } from "@/data.d";
import FlexDiv from "../FlexDiv";
import { Heading } from "../Heading";

export interface FancyTextProps extends IFancyText {
  flexHorizontal?: CSSProperties["justifyContent"];
  reverse?: boolean;
  overflowText?: boolean;
  blocker?: boolean;
}
export const FancyText: React.FC<FancyTextProps> = ({
  part1,
  part2,
  flexHorizontal = "flex-start",
  reverse,
  overflowText = false,
  blocker = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(
    undefined
  );
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflowAndSetHeight = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const childrenWidth = Array.from(containerRef.current.children).reduce(
          (total, child) => total + (child as HTMLElement).offsetWidth,
          0
        );
        const isOverflowing = childrenWidth > containerWidth;
        setIsOverflowing(isOverflowing && overflowText);

        if (isOverflowing && overflowText) {
          const firstChild = containerRef.current
            .firstElementChild as HTMLElement;
          if (firstChild) {
            const firstChildHeight = firstChild.offsetHeight;
            setContainerHeight(firstChildHeight * 1.5);
          }
        } else {
          setContainerHeight(undefined);
        }
      }
    };

    const handleLoad = () => {
      requestAnimationFrame(checkOverflowAndSetHeight);
    };

    handleLoad(); // Call on mount
    window.addEventListener("resize", checkOverflowAndSetHeight);

    return () => {
      window.removeEventListener("resize", checkOverflowAndSetHeight);
    };
  }, [containerRef, overflowText]);

  return (
    <FlexDiv
      className={cn(styles.title, {
        [styles.overflowing]: isOverflowing,
        [styles.reverse]: reverse,
        [styles.blocker]: blocker,
      })}
      ref={containerRef}
      flex={{ direction: "row", x: "flex-start", y: "flex-start" }}
      width100
      customStyle={{
        justifyContent: flexHorizontal,
        height: containerHeight,
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
          [styles.rightAligned]: isOverflowing,
        })}
      >
        {part2}
      </Heading>
    </FlexDiv>
  );
};
