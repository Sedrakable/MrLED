import React, { PropsWithChildren, FC, ReactNode } from "react";

import styles from "./Form.module.scss";
import FlexDiv from "../FlexDiv";
import { Alert } from "../Alert/Alert";
import { useWindowResize } from "@/helpers/useWindowResize";
import { StepProps } from "./formTypes";
import { Paragraph } from "../Paragraph/Paragraph";
import { Translations } from "@/langs/langTypes";
import { LangType } from "@/i18n/request";
import { Button } from "../Button/Button";
import { Heading } from "../Heading/Heading";

export interface FormTitleProps {
  title?: string;
  subTitle?: string;
  alignText?: "left" | "center";
}
export const FormTitles: FC<FormTitleProps> = ({
  title,
  subTitle,
  alignText = "center",
}) => {
  return (
    title && (
      <FlexDiv
        width100
        flex={{
          direction: "column",
          x: alignText == "center" ? "center" : "flex-start",
        }}
        className={styles.formTitles}
      >
        <Heading
          font="title"
          as="h3"
          level="5"
          color="grad"
          weight={600}
          textAlign={alignText}
          paddingBottomArray={[3, 2, 3, 4]}
        >
          {title}
        </Heading>
        {subTitle && (
          <Paragraph
            level="regular"
            color="white"
            weight={400}
            textAlign={alignText}
          >
            {subTitle}
          </Paragraph>
        )}
      </FlexDiv>
    )
  );
};
export const Step: FC<PropsWithChildren<StepProps>> = ({
  children,
  number,
}) => {
  return (
    <FlexDiv
      gapArray={[3, 3, 3, 4]}
      flex={{ y: "flex-start" }}
      width100
      className={styles.step}
    >
      {number && (
        <Heading
          font="display"
          as="h4"
          level="4"
          color="black"
          weight={400}
          className={styles.number}
        >
          {number.toString()}
        </Heading>
      )}
      <FlexDiv
        gapArray={[3, 4]}
        flex={{ direction: "column" }}
        className={styles.stepContent}
      >
        {children}
      </FlexDiv>
    </FlexDiv>
  );
};

export const MultiColumn: FC<PropsWithChildren> = ({ children }) => {
  return (
    <FlexDiv gapArray={[4, 3, 3, 4]} width100 wrap>
      {children}
    </FlexDiv>
  );
};

export const FormSubmitButton: FC<{
  isValid: boolean;
  submitText: string | false;
  translations: Translations;
  loading: boolean;
  title: string;
}> = ({ isValid, translations, submitText, loading = true, title }) => {
  const { isMobile } = useWindowResize();

  return (
    <FlexDiv className={styles.submitWrapper} gapArray={[2]}>
      <Button type="submit" variant="simple">
        {title}
      </Button>
      {!isValid && (
        <Alert arrow={isMobile ? "bottom" : "left"}>
          {translations.form.requiredAlert}
        </Alert>
      )}
      {submitText && (
        <Alert arrow={isMobile ? "bottom" : "left"}>{submitText}</Alert>
      )}
      {loading && <div className={styles.spinner} />}
    </FlexDiv>
  );
};

export const FormSteps: FC<{
  steps: ReactNode[];
  stepNumbers?: boolean;
}> = ({ steps, stepNumbers = false }) => {
  return (
    <FlexDiv
      gapArray={[5, 5, 5, 5]}
      width100
      flex={{ direction: "column", x: "stretch", y: "flex-start" }}
    >
      {steps.map((step, index) => (
        <Step key={index} number={stepNumbers ? index + 1 : undefined}>
          {step}
        </Step>
      ))}
    </FlexDiv>
  );
};

export const FormSubmitMessage: FC<{
  locale: LangType;
  translations: Translations;
}> = ({ locale, translations }) => {
  return (
    <FlexDiv flex={{ direction: "column" }}>
      <Heading
        font="title"
        as="h3"
        level="4"
        color="grad"
        weight={500}
        textAlign="center"
      >
        {translations.form.emailSent}
      </Heading>
      {/* <Button variant="simple" path={`/${locale}${LocalPaths.HOME}`}>
        {translations.nav.home}
      </Button> */}
    </FlexDiv>
  );
};
