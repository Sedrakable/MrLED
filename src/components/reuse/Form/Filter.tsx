import React, { useState, useRef, useEffect } from "react";
import styles from "./Select.module.scss";
import cn from "classnames";
import FlexDiv from "../FlexDiv";
import { Paragraph } from "../Paragraph/Paragraph";
import { Icon } from "../Icon";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n/request";
import { useLocale } from "next-intl";
import { OptionType } from "./Select";

interface FilterProps {
  options: OptionType[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const Filter: React.FC<FilterProps> = ({
  options,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
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
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className={styles.container} ref={filterRef}>
      <FlexDiv
        className={styles.select}
        onClick={handleToggle}
        flex={{ x: "space-between" }}
        gapArray={[5]}
      >
        <Paragraph level="regular" color="burgundy">
          {placeholder || translations.select.filter}
        </Paragraph>
        <Icon icon="filter" color="burgundy" size="small" />
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
              className={cn(styles.tab, {
                [styles.checked]: selected.includes(option.value),
              })}
              onClick={() => handleOptionClick(option.value)}
              key={option.value}
            >
              <Paragraph level="regular" color="burgundy">
                {option.label}
              </Paragraph>
              <div className={styles.check}>
                {selected.includes(option.value) && (
                  <Icon icon="check" color="burgundy" size="small" />
                )}
              </div>
            </FlexDiv>
          ))}
        </FlexDiv>
      )}
    </div>
  );
};
