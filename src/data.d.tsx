// @ts-ignore
import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string[];
}

export interface ICta {
  text: string;
  link?: string;
}

export interface ISlug {
  current: string;
  _type: string;
}

export interface IHero {
  subTitle?: string;
  title: string;
  desc: string;
  customImage: ICustomImage;
  ctas?: {
    cta1: ICta;
    cta2?: ICta;
  };
  quote: IQuote;
}

export interface IQuote {
  leftText: string;
  rightText: string;
}

export interface IServices {
  services: IService[];
}

export interface IService {
  title: string;
  metaTitle: string;
  path: string;
  features: IFeatures;
  processes: IProcesses;
  price?: string;
}

export interface IFeatures {
  features: IFeature[];
}

export interface IFeature {
  customImage: ICustomImage;
  title: string;
  desc: string;
}

export interface IProcesses {
  processes: IProcess[];
}

export interface IProcess {
  title: string;
  desc: string;
  features: IFeature[];
}

export interface IValues {
  values: IValue[];
}

export interface IValue {
  title: string;
  desc: string;
}

export interface IAboutContent {
  customImage: ICustomImage;
  name?: string;
  title1: string;
  desc1: string;
  title2?: string;
  desc2?: string;
  cta?: boolean;
}

export interface IAbout {
  content: IAboutContent;
}

export interface IWorkBlock {
  works: IWork[];
}

export interface IBlog {
  articles: IArticle[];
}

export interface IArticle {
  path: string;
  customImage: ICustomImage;
  title: string;
  desc: string;
  date: string;
  facebookLink?: string;
  content: IBlock[];
}

export interface IWork {
  slug: ISlug;
  thumbnailImage: ICustomImage;
  customImages: ICustomImage[];
  title: string;
  desc: string;
  primaryLink: ICta;
  secondaryLinks?: ICta[];
  behanceProjectId?: string;
  kickstarterProjectlink?: string;
}

export interface INavLink {
  text: string;
  link: string;
  ctaArray: ICta[];
}

export interface INavBar {
  links: (INavLink | ICta)[];
}

export interface ISocials {
  title?: string;
  links: ICta[];
}

export interface IBlock {
  _key: string;
  _type: string;
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "normal" | "blockquote";
  children: { _key: string; _type: string; marks: string[]; text: string }[];
}

export interface ILegalPage {
  path: string;
  title: string;
  data: IBlock[];
}
export interface IFooter {
  legals: { title: string; path: string }[];
  trademark: string;
  socials: ISocials;
}

export interface IForm {
  desc: IFancyText;
}

export interface INotFound {
  title: string;
  desc: string;
}

/* eslint-disable */
export enum LocalPaths {
  HOME = "/home",
  SERVICE = "/service",
  TEST_TATTOO = "/test-tattoo",
  COURSE = "/course",
  ONLINE = "/online",
  IN_PERSON = "/in-person",
  PORTFOLIO = "/portfolio",
  HENNA = "/henna",
  TATTOO = "/tattoo",
  FLASH = "/flash",
  TOILES = "/toiles",
  BOUTIQUE = "/boutique",
  BLOG = "/blog",
  CART = "/cart",
  CONTACT = "/contact",
  LEGAL = "/legal",
}
/* eslint-enable */
