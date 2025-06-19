"use client";
import { FC } from "react";

import FlexDiv from "@/components/reuse/FlexDiv";
import styles from "./PortfolioHero.module.scss";
import cn from "classnames";

import { Block } from "@/components/containers/Block";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";
import { HeroWrapper } from "@/components/reuse/HeroWrapper/HeroWrapper";
import Image from "next/image";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface IPortfolioHeroProps {
  title: string;
  desc: string;
}
export const PortfolioHero: FC<IPortfolioHeroProps> = ({ title, desc }) => {
  const { isMobileOrTablet } = useWindowResize();

  const leftContent = (
    <FlexDiv
      width100
      className={styles.left}
      flex={{ y: "stretch" }}
      gapArray={[4]}
    >
      <div className={styles.grid}>
        <Image
          src={"/photos/Logomark-Grad.png"}
          alt="Logomark Grad"
          width={800}
          height={800}
        />
        <span />
        <span />
        <span />
      </div>
    </FlexDiv>
  );

  const rightContent = (
    <Paragraph
      level="big"
      color="white"
      className={styles.desc}
      weight={500}
      textAlign={isMobileOrTablet ? "center" : "start"}
    >
      {desc}
    </Paragraph>
  );

  return (
    <Block variant="split" className={cn(styles.blockContainer)}>
      <HeroWrapper
        title={title}
        leftContentSmall={leftContent}
        leftContentBig={leftContent}
        rightContentBig={rightContent}
        rightContentSmall={rightContent}
      />
    </Block>
  );
};
