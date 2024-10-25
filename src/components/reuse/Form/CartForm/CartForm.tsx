"use client";
import React, { useState, useEffect, FC } from "react";

import styles from "../Form.module.scss";
import { Input, TextArea } from "@/components/reuse/Form/Input/Input";
import { OptionType, Select } from "../Select";
import { State, City } from "country-state-city";
import FlexDiv from "../../FlexDiv";
import { getTranslations } from "@/helpers/langUtils";
import { useLocale } from "next-intl";
import { LangType } from "@/i18n/request";
import { AddressFormData, FormErrorData } from "../formTypes";
import { FormSubmitButton, FormTitles, MultiColumn, Step } from "../Form";
import { CartProps } from "@/components/pages/blocks/Cart/Cart";
import { ICartProduct } from "@/data.d";

export interface CartFormProps extends CartProps {
  cart: ICartProduct[];
}

export const CartForm: FC<CartFormProps> = ({
  cart,
  deliveryMethods,
  title,
  subTitle,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const defaultCountry = "CA";
  const defaultState = "QC";
  const [formData, setFormData] = useState<AddressFormData>({
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    country: defaultCountry,
    state: defaultState,
    city: "Montréal",
    delivery: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrorData>({});
  const [submit, setSubmit] = useState<string | false>(false);

  const deliveryOptions = deliveryMethods.map((method, index) => ({
    value: `method-${index}`,
    label: method,
  }));
  const [states, setStates] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);

  useEffect(() => {
    setStates(
      State.getStatesOfCountry(defaultCountry).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    );
    setCities(
      City.getCitiesOfState(formData.country, defaultState).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    );
  }, []);

  const handleStateChange = (selected: string) => {
    const stateCode = selected;
    setFormData((prev) => ({ ...prev, state: stateCode } as AddressFormData));
    setCities(
      City.getCitiesOfState(formData.country, stateCode).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    );
  };

  const handleCityChange = (selected: string) => {
    const cityCode = selected;
    setFormData((prev) => ({ ...prev, city: cityCode } as AddressFormData));
  };

  const handleInputChange = (field: keyof AddressFormData) => (
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: false }));
    }
  };

  const handleDeliveryChange = (selected: string) => {
    setFormData((prev) => ({ ...prev, delivery: selected }));
    if (errors.delivery) {
      setErrors((prev) => ({ ...prev, delivery: false }));
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
        body: JSON.stringify({ formData, cart }),
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
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorData = {};
    Object.keys(formData).forEach((key) => {
      if (
        !formData[key as keyof AddressFormData] &&
        key !== "addressLine2" &&
        key !== "message"
      ) {
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
          <MultiColumn>
            <Select
              label={translations.form.cart.province}
              options={states}
              onChange={handleStateChange}
              defaultValue={formData.state}
            />
            <Select
              label={translations.form.cart.city}
              disabled={cities.length === 0}
              options={cities}
              onChange={handleCityChange}
              defaultValue={formData.city}
              placeholder={translations.form.cart.city}
            />
            <Input
              label={translations.form.cart.postalCode}
              type="text"
              value={formData.postalCode}
              onChange={handleInputChange("postalCode")}
              required
              isInvalid={errors.postalCode}
              placeholder={translations.form.cart.postalCodePlaceholder}
            />
          </MultiColumn>
          <Input
            label={translations.form.cart.addressLine + " 1"}
            type="text"
            value={formData.addressLine1}
            required
            isInvalid={errors.addressLine1}
            onChange={handleInputChange("addressLine1")}
          />
          <Input
            label={translations.form.cart.addressLine + " 2"}
            type="text"
            value={formData.addressLine2}
            onChange={handleInputChange("addressLine2")}
          />
        </Step>
        <Step number={4}>
          <Select
            label={translations.form.cart.delivery}
            options={deliveryOptions}
            onChange={handleDeliveryChange}
            required
            isInvalid={errors.delivery}
          />
        </Step>
        <Step number={5}>
          <TextArea
            label={translations.form.general.additionalInfo}
            value={formData.message}
            onChange={handleInputChange("message")}
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
