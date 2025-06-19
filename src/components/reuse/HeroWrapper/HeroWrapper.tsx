"use client";
import { FC, ReactNode } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./HeroWrapper.module.scss";
import cn from "classnames";

import { Heading } from "@/components/reuse/Heading/Heading";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface IHeroWrapperProps {
  title: string;
  leftContentSmall: ReactNode;
  leftContentBig: ReactNode;
  rightContentSmall: ReactNode;
  rightContentBig: ReactNode;
}

export const HeroWrapper: FC<IHeroWrapperProps> = ({
  title,
  leftContentSmall,
  leftContentBig,
  rightContentSmall,
  rightContentBig,
}) => {
  const { isMobileOrTablet = true } = useWindowResize();

  return (
    <FlexDiv
      gapArray={[6]}
      className={cn(styles.content)}
      width100
      flex={{ direction: "column", y: "flex-start" }}
      padding={{ top: [8] }}
    >
      <FlexDiv width100 className={styles.textSplit}>
        <Heading
          level="2"
          as="h1"
          font="title"
          className={styles.heading}
          // capitalise
          textAlign="center"
          weight={400}
        >
          {title}
        </Heading>
      </FlexDiv>
      {isMobileOrTablet ? (
        <>
          {leftContentSmall}
          {rightContentSmall}
        </>
      ) : (
        <FlexDiv
          width100
          flex={{ y: "stretch" }}
          className={styles.split}
          gapArray={[0, 0, 10, 11]}
        >
          {leftContentBig}
          {rightContentBig}
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
