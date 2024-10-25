import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";

import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import FlexDiv from "../FlexDiv";
import { Icon } from "../Icon";
import { Paragraph } from "../Paragraph/Paragraph";
import { OptionType } from "./Select";

interface SortProps {
  options: OptionType[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string) => void;
}

export const Sort: React.FC<SortProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const sortRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
    setSelected(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={sortRef}>
      <FlexDiv
        className={styles.select}
        onClick={handleToggle}
        flex={{ x: "space-between" }}
        gapArray={[5]}
      >
        <Paragraph level="regular" color="burgundy">
          {`${translations.select.sort}${
            selected
              ? ": " + options.find((opt) => opt.value === selected)?.label
              : ""
          }`}
        </Paragraph>
        <Icon icon="sort" color="burgundy" size="small" />
      </FlexDiv>
      {isOpen && (
        <FlexDiv
          flex={{ direction: "column", x: "flex-start" }}
          padding={{ vertical: [0, 0, 3, 3] }}
          className={styles.dropdown}
          as="ul"
        >
          {options.map((option) => (
            <FlexDiv
              flex={{ x: "space-between" }}
              width100
              as="li"
              gapArray={[5]}
              padding={{ vertical: [4, 4, 3], horizontal: [4] }}
              className={styles.tab}
              onClick={() => handleOptionClick(option.value)}
              key={option.value}
            >
              <Paragraph level="regular" color="burgundy">
                {option.label}
              </Paragraph>
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
    </div>
  );
};
