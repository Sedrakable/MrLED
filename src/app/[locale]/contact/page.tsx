import { ISeo, IWork, LocalPaths } from "@/data.d";
import { fetchPageData } from "@/app/api/useFetchPage";
import { LangType } from "@/i18n/request";
import {
  contactPageQuery,
  pricePlansQuery,
} from "@/app/api/generateSanityQueries";
import { getTranslations } from "@/helpers/langUtils";
import {
  Collapsible,
  CollapsibleProps,
} from "@/components/reuse/Collapsible/Collapsible";
import { Block } from "@/components/reuse/containers/Block/Block";

import {
  Notification,
  NotificationProps,
} from "@/components/pages/blocks/Notification/Notification";
import { getFormData } from "@/components/reuse/Form/getFormData";
import { FormTitleProps } from "@/components/reuse/Form/Form";
import {
  Contact,
  ContactProps,
} from "@/components/pages/blocks/Contact/Contact";
import { ServicesAndPlans } from "@/components/reuse/Form/ContactForm/ContactForm";
import { OptionType } from "@/components/reuse/Form/Select";
import { getCarouselData } from "@/components/reuse/Carousel/getCarouselData";
import { getImagesFromWorks, shuffleArray } from "@/helpers/functions";

export interface ContactPageProps {
  meta: ISeo;
  notification?: NotificationProps;
  collapsible?: CollapsibleProps;
}

const getContactPageData = async (locale: LangType) => {
  const type = "contactPage";
  const contactQuery = contactPageQuery(locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contactPageData: ContactPageProps = await fetchPageData(
    contactQuery,
    type
  );
  return contactPageData;
};

const getPlanData = async (pageType: string, locale: LangType) => {
  const type = "plans";
  const planQuery = pricePlansQuery(pageType, locale);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const planData: any = await fetchPageData(planQuery);
  return planData;
};

// export async function generateMetadata({
//    params,
// }: {
//   params: Promise<{ locale: LangType }>;
// }): Promise<Metadata> {
//   const contactPageData = await getContactPageData(locale);
//   const { metaTitle, metaDesc, metaKeywords } = contactPageData.meta;
//   const path = LocalPaths.CONTACT;
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: LangType }>;
}) {
  const { locale } = await params; // Await the params
  const trans = getTranslations(locale);
  const data = await getContactPageData(locale);
  const formData: FormTitleProps = await getFormData("contact", locale);

  const getPlansForService = async (
    pageType: string
  ): Promise<OptionType[]> => {
    const servicePlans = await getPlanData(pageType, locale);
    if (servicePlans.pricePlans1 && servicePlans.pricePlans2) {
      const pricePlans1 = servicePlans.pricePlans1.map((plan) => ({
        label: plan.title,
        value: plan.title,
      }));
      const pricePlans2 = servicePlans.pricePlans2.map((plan) => ({
        label: plan.title,
        value: plan.title,
      }));
      return [...pricePlans1, ...pricePlans2];
    } else {
      return servicePlans.pricePlans.map((plan) => ({
        label: plan.title,
        value: plan.title,
      }));
    }
  };

  const tattooServicePagePlans = await getPlansForService("tattooServicePage");
  const testTattooServicePagePlans = await getPlansForService(
    "testTattooServicePage"
  );
  const hennaServicePagePlans = await getPlansForService("hennaServicePage");
  const inPersonCoursePagePlans = await getPlansForService(
    "inPersonCoursePage"
  );
  const carouselData: IWork[] = await getCarouselData();
  const images = shuffleArray(getImagesFromWorks(carouselData));

  const servicesAndPlans: ServicesAndPlans[] = [
    {
      service: { label: trans.nav.tattoo, value: LocalPaths.TATTOO },
      plans: tattooServicePagePlans,
    },
    {
      service: { label: trans.nav.testTattoo, value: LocalPaths.TEST_TATTOO },
      plans: testTattooServicePagePlans,
    },
    {
      service: { label: trans.nav.henna, value: LocalPaths.HENNA },
      plans: hennaServicePagePlans,
    },
    {
      service: {
        label: `${trans.nav.courses}: ${trans.nav.inPerson}`,
        value: LocalPaths.IN_PERSON,
      },
      plans: inPersonCoursePagePlans,
    },
  ];

  const contactData: ContactProps = {
    form: {
      ...formData,
      servicesAndPlans: servicesAndPlans,
    },
    images: {
      img1: images[0],
      img2: images[1],
      img3: images[2],
    },
  };

  return (
    <Block variant="default" illustrations>
      {data?.notification && <Notification {...data.notification} />}
      {formData && <Contact {...contactData} />}
      {data?.collapsible && <Collapsible {...data.collapsible} />}
    </Block>
  );
}
