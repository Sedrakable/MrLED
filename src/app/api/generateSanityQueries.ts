import { LangType } from "@/i18n/request";

export const navbarPageQuery = (locale: LangType, type: string): string => {
  return `*[_type == 'navbar' && lang == '${locale}' && type == '${type}'][0]`;
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
        hero,
        featureBlock->{
          ...,
          features[]->,
        },
        questionBlock->{
          ...,
          questions[]->,
        },
        reviewBlock->{
          ...,
          reviews[]->,
        },
        collapsible->,
      }`;
};

export const carouselQuery = `
  *[_type == "work"] {
    images[]
  }
`;

export const aboutPageQuery = (locale: LangType): string => {
  return `*[_type == 'aboutPage' && lang == '${locale}'][0] {

  }`;
};

export const contactPageQuery = (locale: LangType): string => {
  return `*[_type == 'contactPage' && lang == '${locale}'][0] {
    meta,
    contactHero,
    collapsible->,
  }`;
};

export const portfolioPageQuery = (locale: LangType): string => {
  return `*[_type == 'portfolioPage' && lang == '${locale}'][0] {
    meta,
    portfolioHero,
    workBlock->{
      ...,
      works[]->,
    },
  }`;
};

export const workPageQuery = (slug: string): string => {
  return `*[_type == 'work' && slug.current == '${slug}'][0]{
    ...,
    meta,
  }`;
};

export const sitemapWorkQuery: string = `*[_type == 'work']{
  images,
  slug,
  _updatedAt,
  }`;

export const formQuery = (slug: string, locale: LangType): string => {
  return `*[_type == '${slug}Form' && lang == '${locale}'][0]`;
};

export const legalPageQuery = (locale: LangType, slug: string): string => {
  return `*[_type == 'legalPage' && lang == '${locale}' && path == '/${slug}'][0]`;
};

export const notFoundPageQuery = (locale: LangType): string => {
  return `*[_type == 'notFoundPage' && lang == '${locale}'][0]`;
};
