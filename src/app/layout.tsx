import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Analytics />
      <GoogleAnalytics gaId="G-9L7V0EC0B8" />
    </>
  );
}
