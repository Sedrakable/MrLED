import React, { FC, useState } from "react";
import { useLocale } from "next-intl";
import { Input, TextArea } from "@/components/reuse/Form/Input/Input";
import { Select } from "../Select";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import styles from "../Form.module.scss";
import FlexDiv from "../../FlexDiv";
import {
  Step,
  MultiColumn,
  FormSubmitButton,
  FormTitles,
  FormTitleProps,
} from "../Form";
import { FlashFormData, FormErrorData } from "../formTypes";
import { OptionType } from "../Select";

export interface FlashFormProps {
  flashOptions: OptionType[];
  flashFormData?: FormTitleProps;
  selectedFlash: string;
}

export const FlashForm: FC<FlashFormProps> = ({
  flashOptions,
  flashFormData,
  selectedFlash,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const [formData, setFormData] = useState<FlashFormData>({
    firstName: "",
    lastName: "",
    email: "",
    selectedFlash: "",
    bodyPosition: "",
    availabilities: "",
    additionalComments: "",
  });

  const [errors, setErrors] = useState<FormErrorData>({});
  const [submit, setSubmit] = useState<string | false>(false);

  const handleInputChange = (field: keyof FlashFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };

  const handleFlashChange = (selected: string) => {
    setFormData((prev) => ({ ...prev, selectedFlash: selected }));
    if (errors.selectedFlash) {
      setErrors((prev) => ({ ...prev, selectedFlash: false }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorData = {};
    const requiredFields: (keyof FlashFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "selectedFlash",
      "bodyPosition",
      "availabilities",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // TODO API request
    try {
      const response = await fetch("/api/sendFlashRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmit(translations.form.general.emailSent);
        // Add success handling (e.g., show success message, reset form)
      } else {
        console.error("Failed to send flash request", response);
        setSubmit(translations.form.general.emailNotSent);
        // Add error handling (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmit(translations.form.general.emailNotSent);
      // Add error handling
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {flashFormData && (
        <FormTitles
          title={flashFormData?.title}
          subTitle={flashFormData?.subTitle}
        />
      )}

      <FlexDiv
        gapArray={[5, 5, 5, 5]}
        width100
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
      >
        <Step number={1}>
          <MultiColumn>
            <Input
              label={translations.form.general.firstName}
              onChange={handleInputChange("firstName")}
              required
              value={formData.firstName}
              type="text"
              isInvalid={errors.firstName}
              placeholder={translations.form.general.firstNamePlaceholder}
            />
            <Input
              label={translations.form.general.lastName}
              onChange={handleInputChange("lastName")}
              required
              value={formData.lastName}
              type="text"
              isInvalid={errors.lastName}
              placeholder={translations.form.general.lastNamePlaceholder}
            />
          </MultiColumn>
        </Step>

        <Step number={2}>
          <Input
            label={translations.form.general.email}
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            required
            isInvalid={errors.email}
            placeholder={translations.form.general.emailPlaceholder}
          />
        </Step>

        <Step number={3}>
          <Select
            label={translations.form.flash.selectedFlash}
            options={flashOptions}
            onChange={handleFlashChange}
            defaultValue={selectedFlash}
            required
            isInvalid={errors.selectedFlash}
          />
        </Step>

        <Step number={4}>
          <TextArea
            label={translations.form.flash.bodyPosition}
            value={formData.bodyPosition}
            onChange={handleInputChange("bodyPosition")}
            required
            isInvalid={errors.bodyPosition}
            placeholder={translations.form.flash.bodyPositionPlaceholder}
          />
        </Step>

        <Step number={5}>
          <TextArea
            label={translations.form.general.availabilities}
            value={formData.availabilities}
            onChange={handleInputChange("availabilities")}
            required
            isInvalid={errors.availabilities}
            placeholder={translations.form.general.availabilitiesPlaceholder}
          />
        </Step>

        <Step number={6}>
          <TextArea
            label={translations.form.general.additionalInfo}
            value={formData.additionalComments}
            onChange={handleInputChange("additionalComments")}
            placeholder={translations.form.general.additionalInfo}
          />
        </Step>
      </FlexDiv>

      <FormSubmitButton
        isValid={Object.keys(errors).length === 0}
        translations={translations}
        submitText={submit}
      />
    </form>
  );
};
