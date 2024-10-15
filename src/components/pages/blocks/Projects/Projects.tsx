"use client";
import React, { FC, useState } from "react";
import styles from "./Projects.module.scss";
import cn from "classnames";
import FlexDiv from "../../../reuse/FlexDiv";
import { ICanvas, IFlash, IProject, IWork, ProjectType } from "@/data.d";
import { SanityImage } from "../../../reuse/SanityImage/SanityImage";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { useLocale } from "next-intl";
import { Heading } from "@/components/reuse/Heading";
import Line from "@/assets/vector/Line.svg";

import { Modal } from "@/components/reuse/Modal";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import { FlashModal } from "./FlashModal";
import { ProjectModal } from "./ProjectModal";
import { ProjectNavigation } from "./ProjectNavigation";
import { ProjectFilters } from "./ProjectFilters";
import { useProjectFilters } from "./useProjectFilters";
import { CanvasModal } from "./CanvasModal";

interface ProjectProps {
  project: IProject;
  // eslint-disable-next-line no-unused-vars
  onProjectClick: (project: IProject) => void;
  type: ProjectType;
}

export const Project: FC<ProjectProps> = ({
  project,
  type,
  onProjectClick,
}) => {
  const handleClick = () => {
    onProjectClick(project);
  };

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
          {flashProject.reserved && <Line className={styles.line} />}
        </>
      );
    } else {
      const canvasProject = project as ICanvas;
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
            {canvasProject.title}
          </Heading>
          {canvasProject.reserved ? (
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
              {`\u00A0• $${canvasProject.price}`}
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
      onClick={handleClick}
      gapArray={[3, 4, 4, 5]}
    >
      <SanityImage
        image={project?.image.image}
        alt={project?.image.alt}
        figureclassname={cn(styles.image)}
        quality={50}
      />

      <FlexDiv className={styles.text}>{renderProjectText()}</FlexDiv>
    </FlexDiv>
  );
};

interface ProjectsProps extends IWork {
  formData?: FormTitleProps;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  type,
  formData,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);

  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: IProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const {
    filteredProjects,
    filterHandlers,
    filterOptions,
    sortOptions,
  } = useProjectFilters(projects, type, translations);

  return (
    <FlexDiv
      gapArray={[4, 4, 4, 4]}
      width100
      flex={{ direction: "column", x: "flex-start", y: "flex-start" }}
    >
      <ProjectFilters
        type={type}
        filterOptions={filterOptions}
        onFilterChange={filterHandlers}
        translations={translations}
        sortOptions={sortOptions}
      />
      <FlexDiv gapArray={[4, 3, 4, 5]} width100 className={cn(styles.wrapper)}>
        {filteredProjects.map((project: IProject, index: number) => {
          return (
            <Project
              key={index}
              type={type}
              project={project}
              onProjectClick={handleProjectClick}
            />
          );
        })}
      </FlexDiv>
      <ProjectNavigation locale={locale} translations={translations} />
      {isModalOpen && selectedProject && (
        <Modal
          onClose={handleCloseModal}
          version={
            (type === "flash" || type === "toiles") &&
            !(selectedProject as IFlash | ICanvas).reserved
              ? "default"
              : "image"
          }
        >
          {type === "flash" && !(selectedProject as IFlash).reserved ? (
            <FlashModal
              project={selectedProject as IFlash}
              flashes={projects as IFlash[]}
              formData={formData}
            />
          ) : type === "toiles" && !(selectedProject as ICanvas).reserved ? (
            <CanvasModal project={selectedProject as ICanvas} />
          ) : (
            <ProjectModal project={selectedProject} />
          )}
        </Modal>
      )}
    </FlexDiv>
  );
};
