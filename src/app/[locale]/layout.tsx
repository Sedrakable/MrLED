/* eslint-disable @next/next/no-img-element */
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import styles from "./layout.module.scss";
import "@/styles/Main.css";
import "@/styles/ScrollBar.scss";
import "@/styles/index.scss";
import { NextIntlClientProvider } from "next-intl";
import { IOpeningHours, ISocials } from "@/data.d";
import { useFetchPage } from "../api/useFetchPage";
import { LangType } from "@/i18n/request";
import { hoursQuery, socialsQuery } from "../api/generateSanityQueries";
import { Navbar } from "@/components/navbar/Navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

const getHoursData = async () => {
  const type = "hours";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const hoursPageData: IOpeningHours = await useFetchPage(hoursQuery(), type);
  return hoursPageData;
};

//I need to get socials data the same way as the hours data
const getSocialsData = async () => {
  const type = "socials";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const socialsPageData: ISocials = await useFetchPage(socialsQuery(), type);
  return socialsPageData;
};

// export async function generateMetadata({
//    params,
// }: {
//   params: Promise<{ locale: LangType }>;
// }): Promise<Metadata> {
//   const homePageData = await getHomePageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = homePageData.meta;
//   const path = LocalPaths.HOME;
//   const crawl = true;

//   return setMetadata({
//     locale,
//     metaTitle,
//     metaDesc,
//     metaKeywords,
//     path,
//     crawl,
//   });
// }

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: LangType }>;
}>) {
  const socialsData: ISocials = await getSocialsData();
  const hoursData: IOpeningHours = await getHoursData();

  const { locale } = await params; // Await the params
  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <head>
          <meta name="theme-color" content="#fec301" />
          <meta
            name="facebook-domain-verification"
            content="z6nna7jlyl6ehzowkxc3qp1oha3wb6"
          />
          <meta name="enviroment" content={process.env.NODE_ENV} />
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '764726835805460');
            fbq('track', 'PageView');
            `,
            }}
          />
          <noscript>
            <img
              alt="facebook-pixel"
              height="1"
              width="1"
              style={{ display: "none" }}
              src="https://www.facebook.com/tr?id=764726835805460&ev=PageView&noscript=1"
            />
          </noscript>
        </head>
        <body className={inter.className}>
          <div id="root">
            <div className={styles.app}>
              <Navbar socials={socialsData} />
              <div className={styles.page}>{children}</div>
              <Footer socials={socialsData} openingHours={hoursData} />
            </div>
          </div>
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ID!} />
      </NextIntlClientProvider>
    </html>
  );
}
