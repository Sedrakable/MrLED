import { GoogleAnalytics } from "@next/third-parties/google";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { LangType } from "@/i18n/request";
import { montserrat } from "@/components/reuse/Paragraph/Paragraph";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { getTranslations } from "@/helpers/langUtils";
import { INavBar, LocalPaths } from "@/data.d";
import { footerPageQuery } from "../api/generateSanityQueries";
import { fetchPage } from "../api/fetchPage";

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}>) {
  const { locale } = await params;
  // Fetch in parallel
  const [trans, footerData] = await Promise.all([
    Promise.resolve(getTranslations(locale)),
    fetchPage(footerPageQuery(locale)),
  ]);

  const navbarData: INavBar = {
    navButton: {
      text: trans.buttons.contact,
      path: `/${locale}${LocalPaths.CONTACT}`,
    },
    links: [
      {
        text: trans.nav.portfolio,
        path: `/${locale}${LocalPaths.PORTFOLIO}`,
      },
    ],
  };

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <head>
          <meta name="theme-color" content="#44B297" />
        </head>
        <body className={montserrat.className}>
          {/* <ViewportGradient /> */}
          <div id="root">
            <Navbar
              {...navbarData}
              socials={{ links: footerData?.socials?.links }}
            />
            <div className={styles.app}>{children}</div>
            <Footer
              {...navbarData}
              legals={footerData?.legals}
              trademark={footerData?.trademark}
              socials={{ links: footerData?.socials?.links }}
            />
          </div>
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ID!} />
      </NextIntlClientProvider>
    </html>
  );
}
