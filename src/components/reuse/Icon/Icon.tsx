import React, {
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from "react";
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
import {
  LinearGradientSVG,
  useViewportGradient,
} from "@/components/containers/GradientSvgWrapper/GradientSvgWrapper";

const icons: {
  [key: string]: ReactNode;
} = {
  instagram: <Instagram />,
  facebook: <Facebook />,
  burger: <Burger />,
  close: <Close />,
  star: <Star />,
  upload: <Upload />,
  minus: <Minus />,
  plus: <Plus />,
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
  const svgRef = useRef<SVGSVGElement>(null);
  const { gradientId, offset, windowWidth } = useViewportGradient(
    svgRef,
    color === "grad"
  );

  if (!isIcon(icon)) {
    console.error(`Icon ${icon} not found`);
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (svgRef.current && color === "grad") {
      // Apply fill to all svg, path, and polygon elements
      const elements = svgRef.current.querySelectorAll(
        "svg, path, polygon,rect"
      );
      elements.forEach((element) => {
        element.setAttribute("fill", `url(#${gradientId})`);
      });
    }
  }, [gradientId, color]);

  return (
    <>
      {color === "grad" && (
        <LinearGradientSVG
          gradientId={gradientId}
          offset={offset}
          windowWidth={windowWidth}
        />
      )}
      <span
        className={cn(styles.icon, className, {
          [styles[`rotate_${rotate}deg`]]: rotate,
          [styles[`icon_${color}`]]: color !== "grad" && color, // Apply color only if gradient is false
          [styles[size]]: size,
        })}
      >
        {cloneElement(icons[icon] as ReactElement, { ref: svgRef })}
      </span>
    </>
  );
};
