"use client";
import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import styles from "./Carousel.module.scss";
import cn from "classnames";

import { ICustomImage, SanityImage } from "../../SanityImage/SanityImage";
import { IProject, IWork } from "@/data.d";
import { shuffleArray } from "@/helpers/functions";
import { usePrevNextButtons } from "./CarouselButtons";
import FlexDiv from "../../FlexDiv";
import { Button } from "../../Button";

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

export const Carousel: FC<{ data: IWork[] }> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    AutoScroll({ playOnInit: true }),
  ]);

  const [autoplayPlugin, setAutoplayPlugin] = useState<any>(null);
  // const {
  //   prevBtnDisabled,
  //   nextBtnDisabled,
  //   onPrevButtonClick,
  //   onNextButtonClick,
  //   onButtonHold,
  //   onButtonRelease,
  // } = usePrevNextButtons(emblaApi);

  const onButtonClick = useCallback(() => {
    if (autoplayPlugin) {
      autoplayPlugin.stop();
      setTimeout(() => {
        autoplayPlugin.play();
      }, 2000);
    }
  }, [autoplayPlugin]);

  // const handlePrevClick = useCallback(() => {
  //   onPrevButtonClick();
  //   onButtonClick();
  // }, [onPrevButtonClick, onButtonClick]);

  // const handleNextClick = useCallback(() => {
  //   onNextButtonClick();
  //   onButtonClick();
  // }, [onNextButtonClick, onButtonClick]);

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
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.embla__container}>
        {images.map((image, index) => (
          <div className={styles.embla__slide} key={index}>
            <SanityImage
              image={image?.image}
              alt={image?.alt}
              figureClassName={cn(styles.image)}
              quality={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
{
  /* <FlexDiv className={styles.buttons}>
        <Button
          variant="transparent"
          icon="cart"
          onMouseDown={() => onButtonHold("prev")}
          onMouseUp={onButtonRelease}
          onMouseLeave={onButtonRelease}
          disabled={prevBtnDisabled}
        />
        <Button
          variant="transparent"
          icon="cart"
          onClick={handleNextClick}
          onMouseDown={() => onButtonHold("next")}
          onMouseUp={onButtonRelease}
          onMouseLeave={onButtonRelease}
          disabled={nextBtnDisabled}
        />
      </FlexDiv>*/
}
