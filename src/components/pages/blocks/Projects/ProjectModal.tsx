"use client";
import React, { FC } from "react";

import styles from "./Projects.module.scss";
import cn from "classnames";

import { SanityImage } from "@/components/reuse/SanityImage/SanityImage";
import { IProject } from "@/data.d";

interface ProjectModalProps {
  project: IProject;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project }) => {
  return (
    <SanityImage
      image={project?.image.image}
      alt={project?.image.alt}
      figureclassname={cn(styles.modalImage, styles.image)}
      quality={100}
    />
  );
};
