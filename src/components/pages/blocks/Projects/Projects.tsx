"use client";
import React, { FC, useState } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import {
  ICanvas,
  IFlash,
  IProject,
  IWork,
  LocalPaths,
  ProjectType,
} from "@/data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { Heading } from "@/components/reuse/Heading";
import Line from "@/assets/vector/Line.svg";

import { Modal, ModalProps } from "@/components/reuse/Modal";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { FlashModal } from "./FlashModal";
import { ProjectModal } from "./ProjectModal";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectFilters } from "../../../reuse/Form/CustomFilters/ProjectFilters";
import { useProjectFilters } from "../../../reuse/Form/CustomFilters/useProjectFilters";
import Infini from "@/assets/vector/Inifini.svg";

import Link from "next/link";
import { Paragraph } from "@/components/reuse/Paragraph/Paragraph";

interface ProjectProps {
  project: IProject;
  // eslint-disable-next-line no-unused-vars
  type: ProjectType;
}

export const Project: FC<ProjectProps> = ({ project, type }) => {
  const renderProjectText = () => {
    if (type === "flash") {
      const flashProject = project as IFlash;
      return (
        <>
          <Heading
            as="h3"
            level="5"
            color="dark-burgundy"
            weight={300}
            textAlign="center"
            className={styles.title}
          >
            {flashProject.title}
          </Heading>
          <Paragraph
            level="big"
            color="burgundy"
            weight={400}
            textAlign="center"
          >
            {`\u00A0x\u00A0`}
          </Paragraph>
          {flashProject.repeatable ? (
            <Infini className={styles.infini} />
          ) : (
            <Paragraph
              level="big"
              color="burgundy"
              weight={400}
              textAlign="center"
            >
              1
            </Paragraph>
          )}
          {flashProject.reserved && <Line className={styles.line} />}
        </>
      );
    } else {
      const toilesProject = project as ICanvas;
      return (
        <>
          <Heading
            as="h3"
            level="5"
            color="dark-burgundy"
            weight={300}
            textAlign="center"
            className={styles.title}
          >
            {toilesProject.title}
          </Heading>
          {toilesProject.reserved ? (
            <Line className={styles.line} />
          ) : (
            <Heading
              as="h4"
              level="6"
              color="burgundy"
              weight={400}
              textAlign="center"
              className={styles.price}
            >
              {`\u00A0• $${toilesProject.price}`}
            </Heading>
          )}
        </>
      );
    }
  };
  return (
    <FlexDiv
      className={cn(styles.container, { [styles.flash]: type === "flash" })}
      flex={{ direction: "column", y: "flex-start" }}
      height100
      width100
      gapArray={[3, 4, 4, 5]}
    >
      <SanityImage
        image={project?.image.image}
        alt={project?.image.alt}
        figureclassname={cn(styles.image)}
        quality={50}
      />

      {(type === "flash" || type === "toiles") && (
        <FlexDiv className={styles.text}>{renderProjectText()}</FlexDiv>
      )}
    </FlexDiv>
  );
};

export const Projects: React.FC<IWork> = ({ projects, workType }) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const {
    filteredProjects,
    filterHandlers,
    filterOptions,
    sortOptions,
  } = useProjectFilters(projects, workType, translations);

  return (
    <FlexDiv
      gapArray={[4]}
      width100
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
    >
      <ProjectFilters
        type={workType}
        filterOptions={filterOptions}
        filterHandlers={filterHandlers}
        translations={translations}
        sortOptions={sortOptions}
      />
      <FlexDiv gapArray={[4, 4, 4, 5]} width100 className={cn(styles.wrapper)}>
        {filteredProjects.map((project: IProject, index: number) => {
          return (
            <Link
              href={`/${locale}/${
                LocalPaths.PORTFOLIO
              }/${workType}/${project?.slug?.current?.toLowerCase()}`}
              key={index}
            >
              <Project type={workType} project={project} />
            </Link>
          );
        })}
      </FlexDiv>
      <ProjectNavigation locale={locale} translations={translations} />
    </FlexDiv>
  );
};
