// @ts-ignore
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ICustomImage } from "./components/reuse/SanityImage/SanityImage";
import { CollapsibleProps } from "./components/reuse/Collapsible/Collapsible";

export interface IFancyText {
  part1: string;
  part2: string;
}
export interface ISeo {
  metaTitle: string;
  metaDesc: string;
  metaKeywords: string[];
}

export interface ITrippleCtas {
  cta1: ICta;
  cta2?: ICta;
  cta3?: ICta;
}
export interface ICta {
  text: string;
  link?: string[];
}

export interface IExternalLink {
  text: string;
  link: string;
}

export interface ISlug {
  current: string;
  _type: string;
}

export interface IHomeHero extends IHero {
  foregroundImage?: ICustomImage;
  subTitle2?: string;
}

export interface IHero {
  backgroundImage: ICustomImage;
  title: IFancyText;
  subTitle?: string;
  desc: string;
  ctas?: ITrippleCtas;
}

export interface IServices {
  services: IDisplay[];
}

export interface IDisplay extends IHero {
  // date?: string;
}

export interface IVideo {
  videoFile: {
    asset: {
      url: string;
      mimeType: string;
    };
  };
  externalVideo?: string;
  caption?: string;
  thumbnail: ICustomImage;
}

export interface IQuote {
  leftText: string;
  rightText: string;
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

export interface IReviews {
  reviews: IReview[];
}

export interface IReview {
  name: string;
  message: string;
}

// export interface IWorkBlock {
//   works: IWork[];
// }

export interface IBlog {
  articles: IArticle[];
}

export interface IArticle {
  path: LocalPaths;
  customImage: ICustomImage;
  title: string;
  desc: string;
  date: string;
  facebookLink?: string;
  content: IBlock[];
}

export type ProjectType = "tattoo" | "flash" | "toiles" | "henna";

export interface IWork {
  type: ProjectType;
  projects: IProjects;
}

export type IProjects = ITattoo[] | IFlash[] | ICanvas[] | IHenna[];

export type IProject = ITattoo | IFlash | ICanvas | IHenna;

export interface IFlash {
  title: string;
  style: IFlashStyle;
  reserved: boolean;
  image: ICustomImage;
  year: number;
}

export interface ITattoo {
  image: ICustomImage;
  bodyPart: IBodyPart;
  year: number;
}

export interface IHenna {
  image: ICustomImage;
  hennaColor: IHennaColor;
  year: number;
}

export interface ICanvas {
  title: string;
  price: string;
  reserved: boolean;
  image: ICustomImage;
  year: number;
}

export const bodyPartsArray = [
  "hand",
  "arm",
  "foot",
  "leg",
  "back",
  "chest",
  "face",
] as const;
export type IBodyPart = typeof bodyPartsArray[number];

export const dateSortArray = ["newest", "oldest"] as const;
export type IDateSort = typeof dateSortArray[number];

export const hennaColorArray = ["jagua", "henna", "hennagua"] as const;
export type IHennaColor = typeof hennaColorArray[number];

export const flashStyleArray = [
  "ornamental",
  "floral",
  "mandala",
  "animal",
  "character",
  "other",
] as const;
export type IFlashStyle = typeof flashStyleArray[number];

export const flashStatusArray = ["reserved", "unReserved"] as const;
export type IFlashStatus = typeof flashStatusArray[number];

export interface IProduct {
  path: string;
  images?: ICustomImage[];
  title: string;
  price: string;
  desc?: string;
  quantityDesc?: string;
  type: "canvas" | "boutique";
  collapsible?: CollapsibleProps;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
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

export interface INotFound {
  title: string;
  desc: string;
}

/* eslint-disable */
export enum LocalPaths {
  HOME = "/",
  SERVICE = "/service",
  TEST_TATTOO = "/test-tattoo",
  COURSE = "/course",
  ONLINE = "/online",
  IN_PERSON = "/in-person",
  PORTFOLIO = "/portfolio",
  HENNA = "/henna",
  TATTOO = "/tattoo",
  FLASH = "/flash",
  CONVAS = "/canvas",
  BOUTIQUE = "/boutique",
  BLOG = "/blog",
  CART = "/cart",
  CONTACT = "/contact",
  LEGAL = "/legal",
}
/* eslint-enable */
