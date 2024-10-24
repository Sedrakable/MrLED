import { SanityImageSource } from "@sanity/asset-utils";
import { urlFor } from "@/app/api/client";
import Img, { ImageProps } from "next/image";

export interface ICustomImage extends Omit<ImageProps, "src"> {
  alt: string;
  image: SanityImageSource;
  width?: number;
  figureclassname?: string;
  quality?: number;
}

export const SanityImage: React.FC<ICustomImage> = (props) => {
  const { quality = 30 } = props;

  return (
    <figure
      className={props.figureclassname}
      style={{
        position: "relative",
        width: "100%", // Ensure the container fills its parent width
        overflow: "hidden", // Hide any overflow from the image
      }}
    >
      <Img
        src={
          props.image &&
          urlFor(props.image).format("webp").quality(quality).url()
        }
        fill
        placeholder={props.image ? "blur" : undefined}
        blurDataURL={
          props.image && urlFor(props.image).width(24).height(24).blur(10).url()
        }
        style={{ objectFit: "cover" }}
        sizes="(max-width: 640px) 90vw, (max-width: 1200px) 80vw, (max-width: 1680px) 50vw, 33vw"
        priority={props.priority}
        {...props}
      />
    </figure>
  );
};
