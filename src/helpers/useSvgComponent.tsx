import { useState, useEffect } from "react";
import { FC, SVGProps } from "react";

export const useSvgComponent = (svgName: string) => {
  const [SvgComponent, setSvgComponent] = useState<FC<
    SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSvg = async () => {
      try {
        const modulee = await import(`@/assets/vector/Graphics/${svgName}.svg`);
        const Component = modulee.default as FC<SVGProps<SVGSVGElement>>;
        if (isMounted) setSvgComponent(() => Component);
      } catch {
        console.error(`SVG '${svgName}' not found. Falling back to 'Corner'.`);
        try {
          const fallbackModule = await import(
            `@/assets/vector/Graphics/Corner.svg`
          );
          const Fallback = fallbackModule.default as FC<
            SVGProps<SVGSVGElement>
          >;
          if (isMounted) setSvgComponent(() => Fallback);
        } catch {
          console.error("Failed to load fallback SVG 'Corner'.");
          if (isMounted) setSvgComponent(null);
        }
      }
    };

    if (svgName) {
      loadSvg();
    } else {
      setSvgComponent(null);
    }

    return () => {
      isMounted = false;
    };
  }, [svgName]);

  return SvgComponent;
};
