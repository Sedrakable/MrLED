interface Titles {}

interface Buttons {
  contact: string;
  submit: string;
}

interface Form {
  select: string;
  service: string;
  servicePlaceholder: string;
  firstName: string;
  firstNamePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  requiredAlert: string;
  emailSent: string;
  emailNotSent: string;
  additionalInfo: string;
  details: string;
  detailsPlaceholder: string;
  referanceImage: string;
  upload: string;
  budget: string;
  currency: string;
}

interface Nav {
  home: string;
  about: string;
  contact: string;
  work: string;
}

export interface Translations {
  buttons: Buttons;
  titles: Titles;
  form: Form;
  nav: Nav;
}
