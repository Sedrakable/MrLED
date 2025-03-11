"use client";

import ContentDesk from "@/assets/vector/ContentDesktop.svg";
import ContentMobile from "@/assets/vector/ContentMobile.svg"; // Add if you have these
import ContentTablet from "@/assets/vector/ContentTablet.svg";
import ContentLaptop from "@/assets/vector/ContentLaptop.svg";
import styles from "./DynamicContent.module.scss";
import FlexDiv from "@/components/reuse/FlexDiv";
import { useWindowResize } from "@/helpers/useWindowResize";

export const DynamicContent = () => {
  const { isMobile, isTablet, isLaptop, isDesktop } = useWindowResize();

  const ContentSVG = isMobile
    ? ContentMobile
    : isTablet
    ? ContentTablet
    : isLaptop
    ? ContentLaptop
    : ContentDesk; // Default to Desktop

  return (
    <FlexDiv className={styles.wrapper} width100 height100>
      <ContentSVG />
    </FlexDiv>
  );
};
