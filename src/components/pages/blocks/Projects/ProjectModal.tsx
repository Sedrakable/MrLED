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
  console.log(project);
  return (
    project?.image && (
      <SanityImage
        image={project?.image.image}
        alt={project?.image.alt}
        figureClassName={cn(styles.modalImage, styles.image)}
        quality={100}
      />
    )
  );
};
