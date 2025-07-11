import React, { PropsWithChildren } from "react";

import styles from "./InputWrapper.module.scss";

import { Paragraph } from "../../Paragraph/Paragraph";
import FlexDiv from "../../FlexDiv";

export interface InputWrapperProps {
  label: string;
  required?: boolean; // Optional prop to make input required
  isInvalid?: boolean; // To visually mark invalid fields
}

export const InputWrapper: React.FC<PropsWithChildren<InputWrapperProps>> = ({
  label,
  children,
  required = false,
  isInvalid = false,
}) => {
  return (
    <FlexDiv
      className={styles.inputContainer}
      flex={{ direction: "column" }}
      gapArray={[1, 2]}
      as="label"
    >
      <Paragraph
        level="small"
        color={isInvalid ? "error" : "white"} // Red color on invalid
        className={styles.label}
        weight={400}
      >
        {label} {required && <span className={styles.required}>*</span>}
      </Paragraph>
      {children}
    </FlexDiv>
  );
};
