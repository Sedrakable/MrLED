"use client"; // Error boundaries must be Client Components

import { LocalPaths } from "@/data.d";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  redirect(`/fr/${LocalPaths.BLOG}`);
}
