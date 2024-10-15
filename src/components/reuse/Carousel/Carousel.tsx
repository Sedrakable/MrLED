"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.scss";
import cn from "classnames";

import { ICustomImage, SanityImage } from "../SanityImage/SanityImage";
import { ICta, IProject, IWork } from "@/data.d";
import { shuffleArray } from "@/helpers/functions";
import FlexDiv from "../FlexDiv";
import { Button } from "../Button";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

interface ICarouselProps {
  data: IWork[];
  cta?: ICta;
}

export const Carousel: FC<ICarouselProps> = ({ data, cta }) => {
  const locale = useLocale() as LangType;

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({ playOnInit: true }),
  ]);

  const [autoplayPlugin, setAutoplayPlugin] = useState<any>(null);

  useEffect(() => {
    if (emblaApi) {
      setAutoplayPlugin(emblaApi.plugins().autoScroll);
    }
  }, [emblaApi]);

  const onPointerUp = useCallback(() => {
    if (autoplayPlugin) {
      autoplayPlugin.stop();
      setTimeout(() => {
        autoplayPlugin.play();
      }, 1000);
    }
  }, [autoplayPlugin]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("pointerUp", onPointerUp);

      return () => {
        emblaApi.off("pointerUp", onPointerUp);
      };
    }
  }, [emblaApi, onPointerUp]);

  const images: ICustomImage[] = useMemo(() => {
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return [];
    }
    const allImages = data.flatMap((work) =>
      (Array.isArray(work.projects) ? work.projects : [])
        .map((project: IProject) => ("image" in project ? project.image : null))
        .filter((image): image is ICustomImage => image !== null)
    );

    // Randomize the order of images
    return shuffleArray(allImages);
  }, [data]);

  if (!images.length) return null;

  return (
    <FlexDiv flex={{ direction: "column", x: "center" }} width100>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <SanityImage
                image={image?.image}
                alt={image?.alt}
                figureclassname={cn(styles.image)}
                quality={50}
              />
            </div>
          ))}
        </div>
      </div>
      {cta && (
        <Button variant="primary" path={`/${locale}${cta?.link?.join("")}`}>
          {cta?.text}
        </Button>
      )}
    </FlexDiv>
  );
};
