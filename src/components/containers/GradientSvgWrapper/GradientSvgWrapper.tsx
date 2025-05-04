"use client";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface GradientSvgWrapperProps {
  SvgComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  print?: boolean;
}

export const useViewportGradient = (
  svgRef: React.RefObject<SVGSVGElement>,
  enabled: boolean = true
) => {
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1920); // Fallback width
  const gradientId = `viewportGradient-${uuidv4()}`; // Generate once

  useEffect(() => {
    const updateOffset = () => {
      if (svgRef.current && enabled) {
        const { x } = svgRef.current.getBoundingClientRect();

        setOffset(-x);
        setWindowWidth(window.innerWidth);

        const paths = svgRef.current.querySelectorAll(
          'path[data-gradient="gradient"]'
        );
        paths.forEach((path) => {
          path.setAttribute("fill", `url(#${gradientId})`);
        });
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [enabled, svgRef, gradientId]); // Remove gradientId from dependencies

  return { gradientId, offset, windowWidth };
};

export const LinearGradientSVG: React.FC<{
  gradientId: string;
  offset: number;
  windowWidth: number;
}> = ({ gradientId, offset, windowWidth }) => {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        visibility: "hidden",
      }}
    >
      <defs>
        {gradientId && offset && windowWidth && (
          <linearGradient
            id={gradientId}
            x1={offset}
            y1="0"
            x2={offset + windowWidth}
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--led-green)" offset="0" />
            <stop stopColor="var(--led-blue)" offset="1" />
          </linearGradient>
        )}
      </defs>
      {/* Test path: 100px height, full viewport width */}
    </svg>
  );
};

const GradientSvgWrapper = ({
  SvgComponent,
  className,
  print = false,
}: GradientSvgWrapperProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { gradientId, offset, windowWidth } = useViewportGradient(svgRef);
  if (print) {
    console.log(gradientId, offset, windowWidth); // Debugging line
  }
  return (
    <>
      {gradientId && (
        <LinearGradientSVG
          gradientId={gradientId}
          offset={offset}
          windowWidth={windowWidth}
        />
      )}
      <SvgComponent ref={svgRef} className={className} />
    </>
  );
};
export default GradientSvgWrapper;
