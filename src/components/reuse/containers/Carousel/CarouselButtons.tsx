import { useCallback, useRef, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onButtonHold = useCallback(
    (direction: "prev" | "next") => {
      if (!emblaApi) return;
      animationFrameRef.current = requestAnimationFrame(() => {
        if (direction === "prev") {
          emblaApi.scrollPrev();
        } else {
          emblaApi.scrollNext();
        }
        onButtonHold(direction); // Keep animating
      });
    },
    [emblaApi]
  );

  const onButtonRelease = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
    onButtonHold,
    onButtonRelease,
  };
};
