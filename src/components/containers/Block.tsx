import React, { PropsWithChildren, forwardRef } from "react";
import styles from "./Block.module.scss";
import FlexDiv from "../reuse/FlexDiv";
import cn from "classnames";
import { Heading, HeadingProps } from "@/components/reuse/Heading/Heading";
import Corner from "@/assets/vector/Graphics/Corner.svg";
import Image from "next/image";
import { AnimatedWrapper } from "./AnimatedWrapper/AnimatedWrapper";

interface BlockProps {
  title?: Omit<HeadingProps, "level" | "as">;
  variant?: "green" | "blue" | "split";
  contentSize?: "small" | "default";
  className?: string;
  id?: string;
}

// ✅ Add forwardRef to support refs
export const Block = forwardRef<HTMLDivElement, PropsWithChildren<BlockProps>>(
  (
    { title, children, variant, contentSize = "default", id, className },
    ref
  ) => {
    return (
      <FlexDiv
        ref={ref}
        flex={{ direction: "column" }}
        className={cn(
          styles.block,
          variant && styles[`var-${variant}`],
          styles[`size_${contentSize}`],
          className
        )}
        gapArray={[7, 7, 7, 8]}
        padding={{
          top: [6, 7, 7, 8],
          bottom: [8, 9, 9, 10],
          horizontal:
            contentSize === "default" ? [6, 8, 9, 10] : [6, 9, 10, 12],
        }}
        width100
        as="article"
        id={id}
      >
        {variant === "split" && (
          <FlexDiv className={cn(styles.imgContainer)}>
            <Image
              src={"/photos/LavalMap.png"}
              alt="map image"
              width={800}
              height={800}
            />
          </FlexDiv>
        )}
        {title && (
          <AnimatedWrapper from="left" className={styles.titleWrapper}>
            <Heading {...title} as="h2" level="3" textAlign="center">
              {title.children}
            </Heading>
          </AnimatedWrapper>
        )}

        <FlexDiv
          className={styles.content}
          width100
          flex={{ direction: "column" }}
        >
          {children}
        </FlexDiv>
        {variant !== "split" && variant && <Corner className={styles.corner} />}
      </FlexDiv>
    );
  }
);

Block.displayName = "Block"; // Required for debugging with forwardRef
