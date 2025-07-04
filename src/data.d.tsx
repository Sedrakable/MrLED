import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaImage?: string;
}

export interface ICta {
  text: string;
  path?: string;
  scrollTarget?: LocalTargets;
}

export interface ISlug {
  current: string;
  _type: string;
}

export interface IHero {
  subTitle?: string;
  title: string;
  desc: any;
  cta1: ICta;
  cta2?: ICta;
}

export interface IFeature {
  svgName?: string; // Optional SVG name
  title: string;
  desc: string;
}

export interface IFeatureBlock {
  title: string;
  features: IFeature[];
}

export interface IReview {
  name: string;
  title: string;
  review: string;
}

export interface IReviewBlock {
  title: string;
  reviews: IReview[];
}

export interface IQuestion {
  title: string;
  desc: any;
}

export interface IQuestionBlock {
  title1: string;
  title2: string;
  questions: IQuestion[];
}

export interface IWorkBlock {
  titleFR: string;
  titleEN: string;
  works: IWork[];
}

export interface IWork {
  // title: string; // Optional for gallery
  descEN?: any; // Optional description in English
  descFR?: any;
  thumbnailImage: ICustomImage; // Sanity image asset
  slug: ISlug; // Optional for internal links
  images?: ICustomImage[]; // For modal slider (Wood Signs)
  date?: string; // Optional date for projects
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

export interface INavBar {
  navButton: ICta;
  links?: ICta[];
  socials?: ISocials;
}

export interface IFooter {
  legals: { title: string; path: string }[];
  trademark: string;
  socials: ISocials;
}

export interface ICollapsible {
  title?: string;
  questions: {
    question: string;
    answer: any;
  }[];
}

export interface INotFound {
  title: string;
  desc: string;
}

export enum LocalPaths {
  HOME = "/",
  PORTFOLIO = "/portfolio",
  CONTACT = "/contact",
  LEGAL = "/legal",
}

export enum LocalTargets {
  CONTACTFORM = "#contact-form",
  HOMEFAQ = "#home-faq",
}
