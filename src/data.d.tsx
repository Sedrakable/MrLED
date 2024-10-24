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

export interface IFilter {
  value: string;
  label: string;
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
  content: IBlock[];
}

export type ProjectType = "tattoo" | "flash" | "toiles" | "henna";

export interface IWork {
  workType: ProjectType;
  projects: IProjects;
}

export type IProjects = ITattoo[] | IFlash[] | ICanvas[] | IHenna[];

export type IProject = ITattoo | IFlash | ICanvas | IHenna;

interface IBaseProject {
  slug: ISlug;
  image: ICustomImage;
  year: number;
}
export interface IFlash extends IBaseProject {
  title: string;
  style: IFlashStyle;
  reserved: boolean;
  repeatable: boolean;
}

export interface ITattoo extends IBaseProject {
  bodyPart: IBodyPart;
  tattooColor: ITattooColor;
  tattooStatus: ITattooStatus;
}

export interface IHenna extends IBaseProject {
  hennaColor: IHennaColor;
}

export interface ICanvas extends IBaseProject {
  title: string;
  price: string;
  reserved: boolean;
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

export const tattooColorArray = ["black", "brown"] as const;
export type ITattooColor = typeof tattooColorArray[number];

export const tattooStatusArray = ["healed", "unhealed"] as const;
export type ITattooStatus = typeof tattooStatusArray[number];

export const flashStyleArray = [
  "ornamental",
  "floral",
  "mandala",
  "animal",
  "character",
  "other",
] as const;
export type IFlashStyle = typeof flashStyleArray[number];

export const flashStatusArray = [
  "reserved",
  "unReserved",
  "repeatable",
] as const;
export type IFlashStatus = typeof flashStatusArray[number];

export interface IProduct {
  path: string;
  images?: ICustomImage[];
  title: string;
  price: string;
  desc?: string;
  quantityDesc?: string;
  type: "toiles" | "boutique";
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

export interface IBlock {
  _key: string;
  _type: string;
  level: number;
  listItem?: string;
  markDefs: { _key: string; _type: string; href: string }[];
  style: "h1" | "h2" | "h3" | "h4" | "h5" | "normal" | "blockquote";
  children: { _key: string; _type: string; marks: string[]; text: string }[];
}

export interface ILegalPage {
  path: string;
  title: string;
  data: IBlock[];
}

export interface IHour {
  dayOfweek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  startTime: string;
  endTime: string;
}

export interface IOpeningHours {
  hours: IHour[];
}

export interface ISocials {
  links: IExternalLink[];
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
  TOILES = "/toiles",
  BOUTIQUE = "/boutique",
  BLOG = "/blog",
  CART = "/cart",
  CONTACT = "/contact",
  LEGAL = "/legal",
  TERMS = "/terms-and-conditions",
  PRIVACY = "/privacy-policy",
}
/* eslint-enable */
