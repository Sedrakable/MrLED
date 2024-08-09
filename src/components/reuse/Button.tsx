"use client";
import React, { PropsWithChildren, ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";
import Link, { LinkProps } from "next/link";
import { IconType, Icon, IconProps } from "./Icon";
import { Paragraph } from "./Paragraph";
import { useWindowResize } from "@/helpers/useWindowResize";

export interface ButtonProps {
  variant: "primary" | "transparent" | "white" | "extra";
  small?: boolean;
  fit?: "grow" | "shrink";
  iconProps?: IconProps;
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
  iconProps,
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

  return path ? (
    <Link
      href={path}
      className={cn(styles.button, styles[variant], {
        [styles.small]: small,
        [styles.withIcon]: iconProps,
      })}
      style={{ width: fit === "grow" || isMobile ? "100%" : "auto" }}
      target={target}
      aria-label={children as string}
    >
      {iconProps ? <Icon {...iconProps} color="burgundy" /> : <ButtonHeading />}
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
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <ButtonHeading />
    </button>
  );
};
