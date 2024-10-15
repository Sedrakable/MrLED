"use client";
import React, { useState } from "react";
import { IVideo } from "@/data.d";
import styles from "./Video.module.scss";
import {
  PricePlan,
  PricePlanProps,
} from "@/components/pages/blocks/PricePlans/PricePlans";
import FlexDiv from "../FlexDiv";
import { SanityImage } from "../SanityImage/SanityImage";
import { Button } from "../Button";

export const Video: React.FC<IVideo> = ({
  videoFile,
  externalVideo,
  caption,
  thumbnail,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  console.log(videoFile.asset.mimeType);

  if (videoFile) {
    return (
      <div className={styles.video}>
        {!isPlaying ? (
          <div className={styles.thumbnailContainer} onClick={handlePlay}>
            <SanityImage
              image={thumbnail?.image}
              alt={caption || "Video thumbnail"}
              figureclassname={styles.thumbnail}
              quality={100}
            />
            <div className={styles.playButton}>
              <Button
                variant="extra"
                iconProps={{ icon: "play", size: "regular" }}
              />
            </div>
          </div>
        ) : (
          <video controls autoPlay>
            <source src={videoFile.asset.url} type={videoFile.asset.mimeType} />
            {videoFile.asset.mimeType === "video/quicktime" && (
              <>
                <source src={videoFile.asset.url} type="video/mp4" />
                <source src={videoFile.asset.url} type="video/webm" />
              </>
            )}
            Your browser does not support the video tag.
          </video>
        )}
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>
    );
  }

  if (externalVideo) {
    return (
      <div className={styles.video}>
        {!isPlaying ? (
          <div className={styles.thumbnailContainer} onClick={handlePlay}>
            <SanityImage
              image={thumbnail?.image}
              alt={caption || "Video thumbnail"}
              figureclassname={styles.thumbnail}
              quality={50}
            />
            <div className={styles.playButton}>
              <Button
                variant="extra"
                iconProps={{ icon: "arrow", rotate: 270, size: "regular" }}
              />
            </div>
          </div>
        ) : (
          <iframe
            width="560"
            height="315"
            src={`${externalVideo}${
              externalVideo.includes("?") ? "&" : "?"
            }autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>
    );
  }

  return null;
};

export interface VideoAndPriceProps {
  pricePlan: PricePlanProps;
  video: IVideo;
}

export const VideoAndPrice: React.FC<VideoAndPriceProps> = ({
  pricePlan,
  video,
}) => {
  return (
    <FlexDiv
      width100
      className={styles.container}
      gapArray={[4, 4, 5, 6]}
      flex={{ direction: "column-reverse" }}
    >
      {pricePlan && <PricePlan {...pricePlan} />}
      {video && <Video {...video} />}
    </FlexDiv>
  );
};
