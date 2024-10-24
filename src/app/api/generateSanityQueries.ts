import { LangType } from "@/i18n";

export const socialsQuery = (): string => {
  return `*[_type == 'socials'][0]`;
};

export const hoursQuery = (): string => {
  return `*[_type == 'openingHours'][0]`;
};

export const homePageQuery = (locale: LangType): string => {
  return `*[_type == 'homePage' && lang == '${locale}'][0] {
        meta,
        homeHero->,
        services[]->,
        works[]->{
          path,
          reserve,
          hero{
            title,
            backgroundImage,
          },
        },
        history->,
        reviews,
        bigCTA->
      }`;
};

export const carouselQuery = (workType: string | undefined): string => {
  return `*[_type == 'work' ${workType ? `&& workType == '${workType}'` : ""}] {
    projects[]->
  }`;
};

export const portfolioPageQuery = (locale: LangType): string => {
  return `*[_type == 'portfolioPage' && lang == '${locale}'][0] {
        meta,
        hero,
        works[]->{
          path,
          reserve,
          hero{
            title,
            backgroundImage,
          },
        },
        history->,
      }`;
};

export const tattooServicePageQuery = (locale: LangType): string => {
  return `*[_type == 'tattooServicePage' && lang == '${locale}'][0] {
    meta,
    hero,
    tarifText,
    pricePlans[],
    multiDescriptions[],
    collapsible,
  }`;
};

export const hennaServicePageQuery = (locale: LangType): string => {
  return `*[_type == 'hennaServicePage' && lang == '${locale}'][0] {
    meta,
    hero,
    tarifText,
    pricePlans[],
    multiDescriptions[],
  }`;
};

export const testTattooServicePageQuery = (locale: LangType): string => {
  return `*[_type == 'testTattooServicePage' && lang == '${locale}'][0] {
    meta,
    hero,
    display,
    desc,
    pricePlans[],
    bigCTA->,
  }`;
};

export const inPersonCoursePageQuery = (locale: LangType): string => {
  return `*[_type == 'inPersonCoursePage' && lang == '${locale}'][0] {
    meta,
    hero,
    infoText,
    multiDescriptions[],
    image,
    pricePlans1[],
    experienceText,
    pricePlans2[],
    bigCTA->
  }`;
};

export const onlineCoursePageQuery = (locale: LangType): string => {
  return `*[_type == 'onlineCoursePage' && lang == '${locale}'][0] {
    meta,
    hero,
    desc,
    pricePlan,
    video {
      videoFile {
        asset->{
          url,
          mimeType
        }
      },
      externalVideo,
      caption,
      thumbnail,
    },
    features[],
  }`;
};

export const projectPageQuery = (type: string, id: string): string => {
  return `*[_type == '${type}Project' && slug.current == '${id}'][0]`;
};

export const workPageQuery = (path: string): string => {
  return `*[_type == 'workPage' && path == '/${path}'][0]{
    meta,
    hero,
    work->{
      ...,
      projects[]->
    },
  }`;
};

export const cartPageQuery = (locale: LangType): string => {
  return `*[_type == 'cartPage' && lang == '${locale}'][0]{
    meta,
    hero,
    collapsible,
  }`;
};

export const formQuery = (slug: string, locale: LangType): string => {
  return `*[_type == '${slug}Form' && lang == '${locale}'][0]`;
};

// export const flashFormQuery = (locale: LangType): string => {
//   return `*[_type == 'flashForm' && lang == '${locale}'][0]{
//     title,
//     subTitle,
//   }`;
// };

export const boutiquePageQuery = (locale: LangType): string => {
  return `*[_type == 'boutiquePage' && lang == '${locale}'][0] {
        meta,
        hero,
        displays[]->,
        desc,
        products[]->,
      }`;
};

export const productQuery = (path: string): string => {
  return `*[_type == 'product' && path == '${path}'][0]`;
};

export const blogPageQuery = (locale: LangType): string => {
  return `*[_type == 'blogPage' && lang == '${locale}'][0]{
    meta,
    blog->{
      articles[]->{
        path,
        title,
        desc,
        date,
        customImage
      }
    }
}`;
};

export const articlesOrderQuery = (locale: LangType): string => {
  return `*[_type == 'articlePage' && lang == '${locale}']{
    path,
    title,
}`;
};

export const articlePageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'articlePage' && lang == '${locale}' && path == '${slug}'][0]{
    ...,
    meta,
  }`;
};

export const contactPageQuery = (locale: LangType): string => {
  return `*[_type == 'contactPage' && lang == '${locale}'][0] {
    meta,
    notification,
    collapsible,
  }`;
};

export const pricePlansQuery = (pageType: string, locale: LangType): string => {
  return `*[_type == '${pageType}' && lang == '${locale}'][0] {
    pricePlans[],
    pricePlans1[],
    pricePlans2[],
  }`;
};

export const legalPageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'legalPage' && lang == '${locale}' && path == '${slug}'][0]`;
};

export const notFoundPageQuery = (locale: LangType): string => {
  return `*[_type == 'notFoundPage' && lang == '${locale}'][0]`;
};
