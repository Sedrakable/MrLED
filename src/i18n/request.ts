// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { getTranslations } from "@/helpers/langUtils";

export default getRequestConfig(async ({ locale }) => ({
  locale: locale || "en", // Provide a fallback locale
  messages: getTranslations((locale || "en") as "en" | "fr"),
}));
