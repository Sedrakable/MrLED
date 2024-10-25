import {
  IBodyPart,
  IDateSort,
  IFlashStyle,
  IHennaColor,
  IFlashStatus,
  ITattooColor,
  ITattooStatus,
} from "../data.d";

interface Titles {
  history: string;
  work: string;
  reviews: string;
  blog: string;
  tarif: string;
  info: string;
  experience: string;
  cart: string;
}

interface Buttons {
  view: string;
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
  toiles: string;
  boutique: string;
  contact: string;
  blog: string;
  cart: string;
  privacy: string;
  terms: string;
  other: string;
}

interface Other {
  reserve: string;
}

interface Hours {
  title: string;
  to: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

interface Cart {
  itemAddedToCart: string;
  itemsAddedToCart: string;
  checkCartAlert: string;
  noItemsInCart: string;
  total: string;
}

type BodyPartsRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in IBodyPart]: string;
};

type TattooColorRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in ITattooColor]: string;
};

type TattooStatusRecord = {
  // eslint-disable-next-line no-unused-vars
  [K in ITattooStatus]: string;
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
  tattooColor: string;
  tattooColorOptions: TattooColorRecord;
  tattooStatus: string;
  tattooStatusOptions: TattooStatusRecord;
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
  hours: Hours;
  select: Select;
  cart: Cart;
  other: Other;
}
