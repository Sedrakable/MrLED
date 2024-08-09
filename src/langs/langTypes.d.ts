import {
  IBodyPart,
  IDateSort,
  IFlashStyle,
  IHennaColor,
  IFlashStatus,
} from "../data.d";

interface Titles {
  services: string;
  values: string;
  process: string;
  features: string;
  inspired: string;
  history: string;
  work: string;
  contact: string;
  reviews: string;
  blog: string;
}

interface Buttons {
  workWithMe: string;
  view: string;
  contact: string;
  send: string;
}

interface Form {
  name: string;
  email: string;
  companyName: string;
  budget: string;
  message: string;
  sent: string;
}

interface Nav {
  home: string;
  services: string;
  tattoo: string;
  henna: string;
  testTattoo: string;
  courses: string;
  inPerson: string;
  online: string;
  portfolio: string;
  flash: string;
  canvases: string;
  boutique: string;
  contact: string;
  blog: string;
}

interface Other {
  reserve: string;
}

type BodyPartsRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IBodyPart]: string;
};

type FlashStyleRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IFlashStyle]: string;
};

type FlashStatusRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IFlashStatus]: string;
};

type HennaColorRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IHennaColor]: string;
};

type DateSortRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IDateSort]: string;
};

interface Select {
  sort: string;
  filter: string;
  dateSort: DateSortRecord;
  year: string;
  bodyParts: string;
  bodyPartsOptions: BodyPartsRecord;
  flashStyles: string;
  flashStylesOptions: FlashStyleRecord;
  flashStatus: string;
  flashStatusOptions: FlashStatusRecord;
  hennaColors: string;
  hennaColorsOptions: HennaColorRecord;
}

export interface Translations {
  buttons: Buttons;
  titles: Titles;
  form: Form;
  nav: Nav;
  other: Other;
  select: Select;
}
