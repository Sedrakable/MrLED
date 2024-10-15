import React, { useEffect, useRef, useState } from "react";
import styles from "./UploadButton.module.scss";
import { Paragraph } from "../../Paragraph/Paragraph";
import { useLocale } from "next-intl";
import { getTranslations } from "@/helpers/langUtils";
import { LangType } from "@/i18n";
import { Icon } from "../../Icon";
import FlexDiv from "../../FlexDiv";
import Image from "next/image";

interface UploadButtonProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  uploadedFile?: File | null;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onFileSelect,
  accept = "image/*",
  uploadedFile,
}) => {
  const locale = useLocale() as LangType;
  const translations = getTranslations(locale);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      setPreviewUrl(objectUrl);

      // Free memory when this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [uploadedFile]);

  const handleClick = () => {
    if (uploadedFile) {
      // If there's an uploaded file, clicking should delete it
      onFileSelect(null);
    } else {
      // If no file is uploaded, open file dialog
      fileInputRef.current?.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <FlexDiv
      width100
      gapArray={[4, 5, 5, 5]}
      flex={{ x: "flex-start", y: "stretch" }}
    >
      <FlexDiv
        className={`${styles.uploadButton} ${
          dragActive ? styles.dragActive : ""
        } ${uploadedFile ? styles.uploaded : ""}`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        width100
        flex={{ direction: "column" }}
        gapArray={[3, 4, 4, 4]}
        padding={{ horizontal: [7], vertical: [5] }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          accept={accept}
          style={{ display: "none" }}
        />
        <Icon
          icon={uploadedFile ? "close" : "upload"}
          size="large"
          color="burgundy"
          className={styles.icon}
        />
        <Paragraph level="big" color="burgundy" weight={500} textAlign="center">
          {uploadedFile
            ? "remove uploaded file"
            : translations.form.general.upload}
        </Paragraph>
      </FlexDiv>
      {uploadedFile && previewUrl && (
        <FlexDiv flex={{ direction: "column" }} className={styles.imageWrapper}>
          <Image
            src={previewUrl}
            alt="preview"
            layout="fill"
            objectFit="cover"
          />
        </FlexDiv>
      )}
    </FlexDiv>
  );
};
