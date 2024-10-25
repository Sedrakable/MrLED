"use client";
import React, { useState, FC } from "react";

import styles from "../Form.module.scss";
import { Input, TextArea } from "@/components/reuse/Form/Input/Input";
import FlexDiv from "../../FlexDiv";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { ApproxFormData, FormErrorData } from "../formTypes";
import {
  FormSubmitButton,
  FormTitleProps,
  FormTitles,
  MultiColumn,
  Step,
} from "../Form";
import { Slider } from "../Slider/Slider";
import { UploadButton } from "../UploadButton/UploadButton";

export const ApproxForm: FC<FormTitleProps> = ({ title, subTitle }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const [formData, setFormData] = useState<ApproxFormData>({
    firstName: "",
    lastName: "",
    email: "",
    info: "",
    width: "4",
    length: "4",
    upload: "",
  });

  const [errors, setErrors] = useState<FormErrorData>({});
  const [submit, setSubmit] = useState<string | false>(false);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof ApproxFormData) => (
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleWidthChange = (selected: string) => {
    setFormData((prev) => ({ ...prev, width: selected }));
    if (errors.width) {
      setErrors((prev) => ({ ...prev, width: false }));
    }
  };

  const handleLengthChange = (selected: string) => {
    setFormData((prev) => ({ ...prev, length: selected }));
    if (errors.length) {
      setErrors((prev) => ({ ...prev, length: false }));
    }
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setFormData((prev) => ({ ...prev, upload: file.name }));
      if (errors.upload) {
        setErrors((prev) => ({ ...prev, upload: false }));
      }
      // Here you would typically handle the file upload to your server
      console.log("File to upload:", file);
      setUploadedFile(file);
    } else {
      // Handle file removal
      setFormData((prev) => ({ ...prev, upload: "" }));
      setUploadedFile(null);
      console.log("File removed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
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
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorData = {};
    (Object.keys(formData) as Array<keyof ApproxFormData>).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <FormTitles title={title} subTitle={subTitle} />
      <FlexDiv
        gapArray={[5, 5, 5, 5]}
        width100
        flex={{ direction: "column", x: "stretch", y: "flex-start" }}
      >
        <Step number={1}>
          <MultiColumn>
            <Input
              label={translations.form.general.firstName}
              type="text"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              required
              isInvalid={errors.firstName}
              placeholder={translations.form.general.firstNamePlaceholder}
            />
            <Input
              label={translations.form.general.lastName}
              type="text"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              required
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
          <TextArea
            label={translations.form.general.info}
            value={formData.info}
            onChange={handleInputChange("info")}
            required
            isInvalid={errors.info}
            placeholder={translations.form.general.infoPlaceholder}
          />
        </Step>
        <Step number={4}>
          <FlexDiv gapArray={[6, 6, 6, 7]} width100 wrap>
            <Slider
              label={translations.form.contact.width}
              max={40}
              min={1}
              onChange={handleWidthChange}
              value={formData.width}
              unit={translations.form.contact.unit}
              isInvalid={errors.width}
              required
              step={1}
            />
            <Slider
              label={translations.form.contact.length}
              max={40}
              min={1}
              onChange={handleLengthChange}
              value={formData.length}
              unit={translations.form.contact.unit}
              isInvalid={errors.lenght}
              required
              step={1}
            />
          </FlexDiv>
        </Step>
        <Step number={5}>
          <UploadButton
            onFileSelect={handleFileUpload}
            accept="image/*"
            uploadedFile={uploadedFile}
          />
        </Step>
      </FlexDiv>

      <FormSubmitButton
        submitText={submit}
        isValid={Object.keys(errors).length === 0}
        translations={translations}
      />
    </form>
  );
};
