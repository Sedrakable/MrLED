import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import FlexDiv from "../FlexDiv";
import { Paragraph } from "../Paragraph";
import { DropDown } from "@/components/navbar/Dropdown/DropDown";
import { Icon } from "../Icon";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  variant: "filter" | "sort";
  options: Option[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  variant,
  options,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const selectRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    let newSelected: string[];
    if (variant === "filter") {
      newSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];
    } else {
      newSelected = [value];
    }
    setSelected(newSelected);
    onChange(newSelected);
    if (variant === "sort") {
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.container} ref={selectRef}>
      <FlexDiv
        className={styles.select}
        onClick={handleToggle}
        flex={{ x: "space-between" }}
        gapArray={[5]}
      >
        <Paragraph level="regular" color="burgundy">
          {variant === "filter"
            ? placeholder
              ? placeholder
              : translations.select.filter
            : `${translations.select.sort}${
                selected.length > 0
                  ? ": " +
                    selected
                      .map(
                        (value) =>
                          options.find((opt) => opt.value === value)?.label
                      )
                      .join(", ")
                  : ""
              }`}
        </Paragraph>
        <Icon
          icon={variant === "sort" ? "sort" : "filter"}
          color="burgundy"
          size="small"
        />
      </FlexDiv>
      {isOpen && (
        <>
          <FlexDiv
            flex={{ direction: "column", x: "flex-start" }}
            padding={{ vertical: [0, 0, 3, 3] }}
            className={styles.dropdown}
            as="ul"
          >
            {options?.map((option) => {
              return (
                <FlexDiv
                  flex={{ x: "space-between" }}
                  width100
                  as="li"
                  gapArray={[5]}
                  padding={{ vertical: [4, 4, 3], horizontal: [4] }}
                  className={cn(styles.tab, {
                    [styles.selected]:
                      variant === "sort" && selected.includes(option.value),
                    [styles.checked]:
                      variant === "filter" && selected.includes(option.value),
                  })}
                  onClick={() => handleOptionClick(option.value)}
                  key={option.value}
                >
                  <Paragraph level="regular" color="burgundy">
                    {option.label}
                  </Paragraph>
                  {variant === "filter" && (
                    <div className={styles.check}>
                      {selected.includes(option.value) && (
                        <Icon icon="check" color="burgundy" size="small" />
                      )}
                    </div>
                  )}
                </FlexDiv>
              );
            })}
          </FlexDiv>
        </>
      )}
    </div>
  );
};
