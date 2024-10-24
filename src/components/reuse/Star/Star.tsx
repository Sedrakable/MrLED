"use client";
import React, { useEffect, useState } from "react";

import styles from "./Star.module.scss";

// Import all stars from the /star folder
// Note: This assumes your stars are named like "Star-1.svg", "Star-2.svg", etc.
const starImports = {
  star1: () => import("@/assets/vector/stars/Star_1.svg"),
  star2: () => import("@/assets/vector/stars/Star_2.svg"),
  star3: () => import("@/assets/vector/stars/Star_3.svg"),
  star4: () => import("@/assets/vector/stars/Star_4.svg"),
  star5: () => import("@/assets/vector/stars/Star_5.svg"),
  star6: () => import("@/assets/vector/stars/Star_6.svg"),
  star7: () => import("@/assets/vector/stars/Star_7.svg"),
  star8: () => import("@/assets/vector/stars/Star_8.svg"),
};

type FlipState = {
  horizontal: boolean;
  vertical: boolean;
};

export const Star: React.FC = () => {
  const [StarComponent, setStarComponent] = useState<any>(null);
  const [flipState, setFlipState] = useState<FlipState>({
    horizontal: false,
    vertical: false,
  });

  useEffect(() => {
    const loadRandomStar = async () => {
      // Get all star keys
      const starKeys = Object.keys(starImports);

      // Select random star
      const randomKey = starKeys[Math.floor(Math.random() * starKeys.length)];

      // Import the selected star
      const { default: ImportedStar } = await starImports[
        randomKey as keyof typeof starImports
      ]();

      // Generate random flip state
      const randomFlip = {
        horizontal: Math.random() > 0.5,
        vertical: Math.random() > 0.5,
      };

      setStarComponent(() => ImportedStar);
      setFlipState(randomFlip);
    };

    loadRandomStar();
  }, []);

  if (!StarComponent) return null;

  return (
    <StarComponent
      className={styles.star}
      style={{
        transform: `scale(${flipState.horizontal ? -1 : 1}, ${
          flipState.vertical ? -1 : 1
        })`,
      }}
    />
  );
};
