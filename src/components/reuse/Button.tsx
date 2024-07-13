"use client";
import React, { PropsWithChildren, ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import Link, { LinkProps } from "next/link";
import { IconType, Icon } from "./Icon";
import { Paragraph } from "./Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface ButtonProps {
  variant: "primary" | "transparent" | "white" | "extra";
  small?: boolean;
  fit?: "grow" | "shrink";
  icon?: IconType;
  onClick?: () => void;
  path?: string;
  disabled?: boolean;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}

export const Button: FC<PropsWithChildren<
  ButtonProps & (ButtonHTMLAttributes<HTMLButtonElement> | LinkProps)
>> = ({
  children,
  variant,
  icon,
  path,
  disabled,
  small,
  fit,
  target,
  ...props
}) => {
  const { isMobile } = useWindowResize();

  const onClick = () => {
    if (props?.onClick) {
      props.onClick();
    }
  };

  const ButtonHeading: React.FC = () => (
    <Paragraph
      level="regular"
      textAlign="center"
      color={variant === "primary" ? "cream-white" : "burgundy"}
      className={styles.textWrapper}
    >
      {children as string}
    </Paragraph>
  );

  const ButtonIcon = ({ icon }: { icon: IconType }) => {
    return <Icon icon={icon} color="burgundy" />;
  };

  return path ? (
    <Link
      href={path}
      className={cn(styles.button, styles[variant], {
        [styles.small]: small,
        [styles.withIcon]: icon,
      })}
      style={{ width: fit === "grow" || isMobile ? "100%" : "auto" }}
      target={target}
      aria-label={children as string}
    >
      {icon ? <ButtonIcon icon={icon} /> : <ButtonHeading />}
    </Link>
  ) : (
    <button
      className={cn(styles.button, styles[variant], {
        [styles.small]: small,
      })}
      style={{ width: fit === "grow" || isMobile ? "100%" : "auto" }}
      onClick={() => onClick()}
      disabled={disabled}
      aria-label={children as string}
    >
      <ButtonHeading />
    </button>
  );
};
