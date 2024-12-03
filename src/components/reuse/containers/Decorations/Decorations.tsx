"use client";
import React, { useMemo } from "react";
import styles from "./Decorations.module.scss";
import { generateStarPositions } from "../../Star/generateStars";
import {
  DecorativeImages,
  ImagePositions,
} from "../../DecorativeImages/DecorativeImages";
import { Star } from "../../Star/Star";

export const BlockVariants = ["default", "full-width"] as const;
export type BlockVariantType = typeof BlockVariants[number];

interface DecorationsProps {
  scrollProgress: number;
  illustrations: boolean;
  imagePositions: ImagePositions | null;
  blockRef: React.RefObject<HTMLDivElement>;
}

export const Decorations: React.FC<DecorationsProps> = ({
  scrollProgress,
  illustrations,
  imagePositions,
  blockRef,
}) => {
  const starPositions = useMemo(() => {
    if (!blockRef.current) return [];
    const { clientWidth, clientHeight } = blockRef.current;
    return generateStarPositions(clientWidth, clientHeight);
  }, [blockRef.current?.clientWidth, blockRef.current?.clientHeight]);

  return (
    <div
      className={styles.decorations}
      style={
        {
          "--scroll-progress": scrollProgress,
        } as React.CSSProperties
      }
    >
      {illustrations && imagePositions && (
        <div className={styles.illustrations}>
          <DecorativeImages positions={imagePositions} />
        </div>
      )}

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
  );
};
