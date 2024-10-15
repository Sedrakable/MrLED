import {
  IBodyPart,
  IDateSort,
  IFlashStyle,
  IHennaColor,
  IFlashStatus,
} from "../data.d";

//TODO: check for unused
interface Titles {
  services: string;
  values: string;
  process: string;
  features: string;
  history: string;
  work: string;
  contact: string;
  reviews: string;
  blog: string;
  tarif: string;
  info: string;
  experience: string;
  cart: string;
}

interface Buttons {
  workWithMe: string;
  view: string;
  contact: string;
  send: string;
  submit: string;
  addToCart: string;
}

interface Form {
  general: {
    firstName: string;
    firstNamePlaceholder: string;
    lastName: string;
    lastNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    requiredAlert: string;
    emailSent: string;
    emailNotSent: string;
    availabilities: string;
    availabilitiesPlaceholder: string;
    additionalInfo: string;
    info: string;
    infoPlaceholder: string;
    referanceImage: string;
    upload: string;
  };
  cart: {
    province: string;
    city: string;
    postalCode: string;
    postalCodePlaceholder: string;
    delivery: string;
    addressLine: string;
  };
  flash: {
    selectedFlash: string;
    bodyPosition: string;
    bodyPositionPlaceholder: string;
  };
  contact: {
    service: string;
    plan: string;
    size: string;
    width: string;
    length: string;
    unit: string;
  };
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

interface Cart {
  itemAddedToCart: string;
  itemsAddedToCart: string;
  checkCartAlert: string;
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
  select: string;
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
  select: Select;
  cart: Cart;
  other: Other;
}
