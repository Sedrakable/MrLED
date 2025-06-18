import React, { ReactNode } from "react";
import styles from "./Icon.module.scss";
import cn from "classnames";

import Burger from "@/assets/vector/Icons/Burger.svg";
import Close from "@/assets/vector/Icons/Close.svg";
import Star from "@/assets/vector/Icons/Star.svg";
import Upload from "@/assets/vector/Icons/Upload.svg";
import Minus from "@/assets/vector/Icons/Minus.svg";
import Plus from "@/assets/vector/Icons/Plus.svg";
import Instagram from "@/assets/vector/Icons/Instagram.svg";
import Facebook from "@/assets/vector/Icons/Facebook.svg";

import { ColorType } from "../Heading/Heading";
import GradientSvgWrapper from "@/components/containers/GradientSvgWrapper/GradientSvgWrapper";

// Create gradient-enabled versions of each icon
const GradientBurger = () => <GradientSvgWrapper SvgComponent={Burger} />;
const GradientClose = () => <GradientSvgWrapper SvgComponent={Close} />;
const GradientStar = () => <GradientSvgWrapper SvgComponent={Star} />;
const GradientUpload = () => <GradientSvgWrapper SvgComponent={Upload} />;
const GradientMinus = () => <GradientSvgWrapper SvgComponent={Minus} />;
const GradientPlus = () => <GradientSvgWrapper SvgComponent={Plus} />;
const GradientInstagram = () => <GradientSvgWrapper SvgComponent={Instagram} />;
const GradientFacebook = () => <GradientSvgWrapper SvgComponent={Facebook} />;

const icons: { [key: string]: ReactNode } = {
  instagram: <Instagram />,
  facebook: <Facebook />,
  burger: <Burger />,
  close: <Close />,
  star: <Star />,
  upload: <Upload />,
  minus: <Minus />,
  plus: <Plus />,
};

const gradientIcons: { [key: string]: ReactNode } = {
  instagram: <GradientInstagram />,
  facebook: <GradientFacebook />,
  burger: <GradientBurger />,
  close: <GradientClose />,
  star: <GradientStar />,
  upload: <GradientUpload />,
  minus: <GradientMinus />,
  plus: <GradientPlus />,
};

export const IconTypeArray = Object.keys(icons) as Array<keyof typeof icons>;
export type IconType = typeof IconTypeArray[number];
export const isIcon = (x: any): x is IconType => IconTypeArray.includes(x);

export const Rotations = [90, 180, 270] as const;
export type RotateType = typeof Rotations[number];
export type IconSizes = "extra-small" | "small" | "regular";

export interface IconProps {
  icon: IconType;
  rotate?: RotateType;
  color?: ColorType;
  size?: IconSizes;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  rotate,
  color = "led-green",
  size = "regular",
  className,
}) => {
  if (!isIcon(icon)) {
    console.error(`Icon ${icon} not found`);
    return null;
  }

  const iconToRender = color === "grad" ? gradientIcons[icon] : icons[icon];

  return (
    <span
      className={cn(styles.icon, className, {
        [styles[`rotate_${rotate}deg`]]: rotate,
        [styles[`icon_${color}`]]: color !== "grad" && color,
        [styles[size]]: size,
      })}
    >
      {iconToRender}
    </span>
  );
};
