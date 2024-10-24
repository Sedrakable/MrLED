import React, { ReactNode } from "react";
import styles from "./Icon.module.scss";
import cn from "classnames";

import Burger from "@/assets/vector/Burger.svg";
import Close from "@/assets/vector/X.svg";
import Cart from "@/assets/vector/Cart.svg";
import Arrow from "@/assets/vector/Arrow.svg";
import Layout from "@/assets/vector/Layout.svg";
import Star from "@/assets/vector/Star.svg";

import Play from "@/assets/vector/Play.svg";
import Upload from "@/assets/vector/Upload.svg";

import Filter from "@/assets/vector/Filter.svg";
import Sort from "@/assets/vector/Sort.svg";
import Plus from "@/assets/vector/Plus.svg";
import Minus from "@/assets/vector/Minus.svg";
import Check from "@/assets/vector/Check.svg";
import Trash from "@/assets/vector/Trash.svg";

import Instagram from "@/assets/vector/Instagram.svg";
import Tiktik from "@/assets/vector/TikTok.svg";
import Facebook from "@/assets/vector/Facebook.svg";

const icons: {
  [key: string]: ReactNode;
} = {
  instagram: <Instagram />,
  tiktok: <Tiktik />,
  facebook: <Facebook />,
  burger: <Burger />,
  close: <Close />,
  cart: <Cart />,
  arrow: <Arrow />,
  layout: <Layout />,
  star: <Star />,
  filter: <Filter />,
  sort: <Sort />,
  plus: <Plus />,
  minus: <Minus />,
  check: <Check />,
  trash: <Trash />,
  play: <Play />,
  upload: <Upload />,
};

export const IconTypeArray = Object.keys(icons) as Array<keyof typeof icons>;

export type IconType = typeof IconTypeArray[number];

export const isIcon = (x: any): x is IconType => IconTypeArray.includes(x);

export const Rotations = [90, 180, 270] as const;

export type RotateType = typeof Rotations[number];

export type IconSizes = "small" | "regular" | "large";

type IconColorType =
  | "cream_white"
  | "light_burgundy"
  | "burgundy"
  | "dark_burgundy"
  | "darkest_burgundy";

export interface IconProps {
  icon: IconType;
  rotate?: RotateType;
  color?: IconColorType;
  size?: IconSizes;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  rotate,
  color = "burgundy",
  size = "regular",
  className,
}) => {
  if (!isIcon(icon)) {
    console.error(`Icon ${icon} not found`);
    return null;
  }

  return (
    <span
      className={cn(styles.icon, className, {
        [styles[`rotate_${rotate}deg`]]: rotate,
        [styles[`icon_${color}`]]: color,
        [styles[size]]: size,
      })}
    >
      {icons[icon] as ReactNode}
    </span>
  );
};
