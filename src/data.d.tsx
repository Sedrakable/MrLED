import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";

export type ServiceType = "wood" | "digital";
export type DigitalServiceType = "branding" | "web-design";

export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string[];
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

export interface IReviews {
  reviews: IReview[];
}

export interface IReview {
  name: string;
  title: string;
  review: string;
}

export interface IQuestion {
  title: string;
  desc: any;
}

export interface IAbout {
  profileImage: ICustomImage;
  title: string;
  subTitle: string;
  desc: any;
}

export interface IWorkBlock {
  title: string;
  works: IWork[];
  id: LocalTargets; // For anchor scrolling
}

export interface IWork {
  title?: string; // Optional for gallery
  thumbnailImage: ICustomImage; // Sanity image asset
  slug?: ISlug; // Optional for internal links
  link?: string; // External URL (e.g., Behance, Kickstarter)
  images?: ICustomImage[]; // For modal slider (Wood Signs)
  isFullWidth?: boolean; // For Branding
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
  WORK = "/work",
  CONTACT = "/contact",
  LEGAL = "/legal",
}

export enum LocalTargets {
  HOMEFORM = "#home-form",
  HOMEFAQ = "#home-faq",
}
