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

export interface IHeroV2 {
  title: string;
  subTitle?: string;
  desc: any;
  backgroundImage: ICustomImage;
  cta1?: ICta;
  cta2?: ICta;
}

export type ITheme = "light" | "dark";

export interface IHero {
  backgroundImage: ICustomImage;
  foregroundImage: ICustomImage;
  subTitle?: string;
  cta: ICta;
  message?: string;
  theme?: ITheme;
}

export interface IFeature {
  customImage?: ICustomImage; // Optional image field
  svgName?: string; // Optional SVG name
  title: string;
  desc: string;
}

export interface IQuestion {
  title: string;
  extraNote?: string;
  desc: any;
  theme?: ITheme;
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

export interface INavBar {
  navButton: ICta;
  links: ICta[];
  theme?: ITheme;
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
}
