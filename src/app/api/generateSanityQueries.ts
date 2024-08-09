import { LangType } from "@/i18n";

export const navbarPageQuery = (locale: LangType): string => {
  return `*[_type == 'navbar' && lang == '${locale}'][0]`;
};

export const footerPageQuery = (locale: LangType): string => {
  return `*[_type == 'footer' && lang == '${locale}'][0]{
    ...,
    legals[]->{
      title,
      path,
    },
    socials->{
      ...,
      links[],
    },
  }`;
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

// export const carouselQuery = (workType: string | undefined): string => {
//   return `*[_type == 'work' ${
//     workType && "&& workType == '" + workType + "'"
//   }] {
//         projects[]
//       }`;
// };

export const carouselQuery = (workType: string | undefined): string => {
  return `*[_type == 'work'] {
        projects[]
      }`;
};

export const portoflioPageQuery = (locale: LangType): string => {
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
  }`;
};

export const workPageQuery = (path: string): string => {
  return `*[_type == 'workPage' && path == '/${path}'][0]{
    meta,
    hero,
    work->,
  }`;
};

export const blogPageQuery = (locale: LangType): string => {
  return `*[_type == 'blogPage' && lang == '${locale}'][0]{
    meta,
    blog ->{
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

export const articlePageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'articlePage' && lang == '${locale}' && path == '${slug}'][0]{
    ...,
    meta,
  }`;
};

export const contactPageQuery = (locale: LangType): string => {
  return `*[_type == 'contactPage' && lang == '${locale}'][0] {
    meta,
    desc,
  }`;
};

export const legalPageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'legalPage' && lang == '${locale}' && path == '/${slug}'][0]`;
};

export const notFoundPageQuery = (locale: LangType): string => {
  return `*[_type == 'notFoundPage' && lang == '${locale}'][0]`;
};
