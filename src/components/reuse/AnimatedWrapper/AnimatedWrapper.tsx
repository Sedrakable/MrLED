"use client";

import React, { forwardRef } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./AnimatedWrapper.module.scss";
import cn from "classnames";

export interface AnimatedWrapperProps {
  from: "left" | "right" | "inside"; // Determines animation direction
  children: React.ReactNode; // The wrapped component
  className?: string; // Additional className for styling
}

const AnimatedWrapper = forwardRef<HTMLDivElement, AnimatedWrapperProps>(
  ({ from, children, className }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true, // Animation runs only once
      threshold: 0.1, // Trigger when 10% of the element is visible
    });

    return (
      <div
        ref={(node) => {
          inViewRef(node); // Pass ref from useInView
          if (typeof ref === "function") {
            ref(node); // Call the ref callback if it's a function
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node; // Assign to current if it's a MutableRefObject
          }
        }}
        className={cn(styles.wrapper, className, {
          [styles.slideInLeft]: inView && from === "left",
          [styles.slideInRight]: inView && from === "right",
          [styles.popIn]: inView && from === "inside",
        })}
      >
        {children}
      </div>
    );
  }
);

AnimatedWrapper.displayName = "AnimatedWrapper"; // Set display name for debugging

export { AnimatedWrapper };
