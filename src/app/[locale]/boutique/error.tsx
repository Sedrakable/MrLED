"use client"; // Error boundaries must be Client Components

import { LocalPaths } from "@/data.d";
import { redirect } from "next/navigation";

export default function Error() {
  redirect(`/fr/${LocalPaths.BOUTIQUE}`);
}
