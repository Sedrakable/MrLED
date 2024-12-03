import React from "react";
import styles from "./Slider.module.scss";
import cn from "classnames";
import { josefin } from "../../Heading";
import FlexDiv from "../../FlexDiv";
import { InputWrapper, InputWrapperProps } from "../InputWrapper/InputWrapper";
import { BaseInputProps } from "../Input/Input";
import { Paragraph } from "../../Paragraph/Paragraph";

interface SliderProps extends InputWrapperProps, BaseInputProps {
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  required = false,
  isInvalid = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const getPercentage = (value: number, min: number, max: number) => {
    const fixNum = 1;
    return ((value - (min - fixNum)) / (max + fixNum - (min - fixNum))) * 100;
  };

  const thumbPosition = getPercentage(Number(value), min, max);

  const customLabel = `${label} (${unit})`;

  return (
    <InputWrapper label={customLabel} required={required} isInvalid={isInvalid}>
      <FlexDiv
        width100
        gapArray={[3, 3, 3, 4]}
        className={styles.sliderWrapper}
        padding={{ top: [5, 5, 5, 6], bottom: [5, 5, 5, 6] }}
      >
        {/* Minimum value marker */}
        <Paragraph
          level="regular"
          color={isInvalid ? "error" : "burgundy"} // Gray color for min/max
          className={styles.marker}
        >
          {min}"
        </Paragraph>

        {/* Slider input */}
        <div className={styles.sliderContainer}>
          {/* Value on top of the thumb */}
          <div
            style={{ left: `${thumbPosition}%` }}
            className={styles.valueContainer}
          >
            <Paragraph
              level="big"
              color={isInvalid ? "error" : "burgundy"}
              className={styles.value}
            >
              {value}"
            </Paragraph>
          </div>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={cn(styles.slider, josefin.className, {
              [styles.invalid]: isInvalid,
            })}
          />
        </div>

        {/* Maximum value marker */}
        <Paragraph
          level="regular"
          color={isInvalid ? "error" : "burgundy"} // Gray color for min/max
          className={styles.marker}
        >
          {max}"
        </Paragraph>
      </FlexDiv>
    </InputWrapper>
  );
};
