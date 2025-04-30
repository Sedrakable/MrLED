"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineConfig({
  projectId: projectId || "b32pygzt",
  dataset: dataset || "production",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool()],
});
