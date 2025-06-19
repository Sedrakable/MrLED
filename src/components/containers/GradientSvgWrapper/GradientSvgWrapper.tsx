"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(1920);
  const gradientId = useMemo(() => `viewportGradient-${uuidv4()}`, []);

  useEffect(() => {
    const updateOffset = () => {
      if (svgRef.current && enabled) {
        const { x } = svgRef.current.getBoundingClientRect();

        setOffset(-x);
        setWindowWidth(window.innerWidth);

        // Apply gradient to paths
        const paths = svgRef.current.querySelectorAll(
          'path[data-gradient="gradient"]'
        );

        paths.forEach((path) => {
          path.setAttribute("fill", `url(#${gradientId})`);
        });

        if (paths.length === 0) {
          const rects = svgRef.current.querySelectorAll(
            'rect[data-gradient="gradient"]'
          );

          rects.forEach((rect) => {
            rect.setAttribute("fill", `url(#${gradientId})`);
          });
        }
      }
    };

    // Initial update with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(updateOffset, 0);

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateOffset);
    };
  }, [enabled, svgRef, gradientId]);

  return { gradientId, offset, windowWidth };
};

export const LinearGradientDefs = ({ gradientId, offset, windowWidth }) => {
  return (
    <defs>
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
    </defs>
  );
};

const GradientSvgWrapper: React.FC<GradientSvgWrapperProps> = ({
  SvgComponent,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { gradientId, offset, windowWidth } = useViewportGradient(svgRef);

  // Method 1: Use a wrapper div and inject the defs directly into the SVG DOM
  useEffect(() => {
    if (svgRef.current && gradientId) {
      // Check if defs already exist
      let defsElement = svgRef.current.querySelector("defs");

      if (!defsElement) {
        defsElement = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        svgRef.current.insertBefore(defsElement, svgRef.current.firstChild);
      }

      // Remove existing gradient with this ID
      const existingGradient = defsElement.querySelector(`#${gradientId}`);
      if (existingGradient) {
        existingGradient.remove();
      }

      // Create new gradient element
      const gradientElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      gradientElement.setAttribute("id", gradientId);
      gradientElement.setAttribute("x1", offset.toString());
      gradientElement.setAttribute("y1", "0");
      gradientElement.setAttribute("x2", (offset + windowWidth).toString());
      gradientElement.setAttribute("y2", "0");
      gradientElement.setAttribute("gradientUnits", "userSpaceOnUse");

      // Create stops
      const stop1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop1.setAttribute("stop-color", "var(--led-green)");
      stop1.setAttribute("offset", "0");

      const stop2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "stop"
      );
      stop2.setAttribute("stop-color", "var(--led-blue)");
      stop2.setAttribute("offset", "1");

      gradientElement.appendChild(stop1);
      gradientElement.appendChild(stop2);
      defsElement.appendChild(gradientElement);
    }
  }, [gradientId, offset, windowWidth]);

  return <SvgComponent ref={svgRef} className={className} />;
};

export default GradientSvgWrapper;
