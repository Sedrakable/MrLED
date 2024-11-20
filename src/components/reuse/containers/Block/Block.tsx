"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Block.module.scss";
import cn from "classnames";
import FlexDiv from "../../FlexDiv";
import { Star } from "../../Star/Star";
import { generateStarPositions } from "../../Star/generateStars";
import {
  calculateImagePositions,
  DecorativeImages,
  ImagePositions,
} from "../../DecorativeImages/DecorativeImages";
import { useParallaxScroll } from "@/helpers/useParallaxScroll";

export const BlockVariants = ["default", "full-width"] as const;
export type BlockVariantType = typeof BlockVariants[number];

interface BlockProps {
  variant?: BlockVariantType;
  illustrations?: boolean;
  children: React.ReactNode;
}

export const Block: React.FC<BlockProps> = ({
  variant = "default",
  illustrations = false,
  children,
}) => {
  const [imagePositions, setImagePositions] = useState<ImagePositions | null>(
    null
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const [cssLoaded, setCssLoaded] = useState(false);
  // Use our custom hook
  const scrollProgress = useParallaxScroll(blockRef);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setCssLoaded(true);
      observer.disconnect();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    const timeoutId = setTimeout(() => {
      setCssLoaded(true);
      observer.disconnect();
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const starPositions = useMemo(() => {
    if (!blockRef.current) return [];
    const { clientWidth, clientHeight } = blockRef.current;
    return generateStarPositions(clientWidth, clientHeight);
  }, [blockRef.current?.clientWidth, blockRef.current?.clientHeight]);

  useLayoutEffect(() => {
    if (!cssLoaded || !illustrations || !contentRef.current) return;

    const calculateGaps = () => {
      if (!contentRef.current) return;
      const blockStyles = window.getComputedStyle(
        contentRef.current.parentElement!
      );
      const blockTopPadding = parseInt(blockStyles.paddingTop);

      const positions = calculateImagePositions(
        contentRef.current,
        blockTopPadding
      );
      setImagePositions(positions);
    };

    calculateGaps();
    window.addEventListener("resize", () =>
      requestAnimationFrame(calculateGaps)
    );
    return () =>
      window.removeEventListener("resize", () =>
        requestAnimationFrame(calculateGaps)
      );
  }, [cssLoaded, illustrations, children]);

  return (
    <FlexDiv
      ref={blockRef}
      flex={{ direction: "column", y: "flex-start" }}
      className={cn(styles.block, styles[variant])}
      padding={{
        horizontal: variant === "full-width" ? [0] : [6, 8, 11, 12],
        top: variant === "full-width" ? [10, 10, 10, 11] : [7, 7, 8, 9],
        bottom: [0],
      }}
      width100
      as="article"
    >
      <div
        className={styles.decorations}
        style={
          {
            "--scroll-progress": scrollProgress,
          } as React.CSSProperties
        }
      >
        <div className={styles.illustrations}>
          {illustrations && imagePositions && (
            <DecorativeImages positions={imagePositions} />
          )}
        </div>
        <div className={styles.stars}>
          {starPositions.map((pos, index) => (
            <div
              key={index}
              className={styles.starWrapper}
              style={{
                position: "absolute",
                top: `${pos.y}px`,
                left: `${pos.x}px`,
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                opacity: pos.opacity,
              }}
            >
              <Star />
            </div>
          ))}
        </div>
      </div>

      <FlexDiv
        ref={contentRef}
        flex={{ direction: "column", y: "flex-start" }}
        className={cn(styles.content)}
        gapArray={variant === "full-width" ? [11, 10, 11, 12] : [9, 9, 9, 10]}
        width100
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};
